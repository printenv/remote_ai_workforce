import {Response, Request, NextFunction} from "express"
import axios from "axios"
import * as dotenv from "dotenv"
import { getToken } from "../utils/auth"
import wpAuthors from "../authors/authors"
import { ChatMessages, WPEndpoints, WpPost, WpPostPrompt } from "../../types/WPTypes"
import { getChatCompletionResult, getWpPostPromptString, makeThumbnailPromptFromText } from "../utils/openai"
import { Author } from "../authors/Author"

dotenv.config()

const port = process.env.PORT || 3000

const postArticle = async (req:Request, res:Response, next:NextFunction) => {
    const authorName = req.body.author
    const author = wpAuthors.find(author => author.props.username === authorName)
    if(!author){
        throw new Error("Author not found.")
    }
    
    try{
        const htmlString = await prepHtmlString(author)
        const {title, category, excerpt} = await prepWpProps(htmlString, author)
        const category_id = await prepCategoryId(category)
        const media_id = await uploadMedia(excerpt, author)
        
        const end_point: WPEndpoints = "posts"
        const token = await getToken(author.props.username, author.props.password)

        await axios.post(`${process.env.WP_URL}/wp-json/wp/v2/${end_point}`, {
            title,
            excerpt,
            content: htmlString,
            status:"publish",
            featured_media: media_id,
            categories: [category_id]
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        //TODO : Add post creation log
        res.status(200).send("New post created")
    }catch(err){
        next(err)
    }
}
export default postArticle


//Helper functions
async function prepHtmlString(author:Author):Promise<string>{
    const messagesForHtmlPrompt: ChatMessages = author.makeMessagesForHtmlPrompt()
    try{
        const completionResponse = await getChatCompletionResult(messagesForHtmlPrompt)
        const htmlString = completionResponse.choices[0].message.content
        if(htmlString===null) throw new Error("completionResponse.choices[0].message.content is null.")
        return htmlString
    }catch(err){
        throw err
    }
}
async function prepWpProps(htmlString: string, author:Author):Promise<WpPost>{
    try{
        const wpPostResponse = await getWpPostPromptString(author.makeMessagesForWpPostPrompt(htmlString))        
        if(wpPostResponse.choices[0].message.content === null) throw new Error()
        return JSON.parse(wpPostResponse.choices[0].message.content)
    }catch(err){
        throw err
    }
}

async function uploadMedia(excerpt: string, author:Author) :Promise<number>{
    try{
        const token = await getToken(author.props.username, author.props.password)
        const response = await axios.post(`http://localhost:${port}/api/wp/upload-image`, {excerpt, token})
        const featured_media_id = response.data
        console.log(featured_media_id, typeof featured_media_id)

        if(!featured_media_id || typeof featured_media_id !== "number") throw new Error("featured_media_id is not set.")
        return featured_media_id
    }catch(err){
        throw err
    }
}

async function prepCategoryId(category: string):Promise<number>{
    try{
        const category_id = await getCategoryIdByName(category)
        if(category_id){
            return category_id
        }else{
            const response = await axios.post(`http://localhost:${port}/api/wp/create-category`, {name:category})
            return response.data
        }
    }catch(err){
        console.log(err)
        return 0
    }
}


interface Category {
    id:number | string
    name: string
}
async function getCategoryIdByName(category: string){
    try{
        const response = await axios.get(`http://localhost:${port}/api/wp/get?end_point=categories`)
        const categories = response.data
        if(!categories.length) return false
        const foundCategory = categories.find((cat:Category) => cat.name === category)
        if(foundCategory){
            return foundCategory.id
        }else{
            return false
        }
    }catch(err){
        throw err
    }
}
