import * as dotenv from "dotenv"
import authors from "./authors/authors"
import axios from "axios"
import * as cron from 'node-cron'
import wpAuthors from "./authors/authors"
import { getToken } from "./utils/auth"
import wpLogger from "./logger"
const port = process.env.PORT || 3000

dotenv.config()

export async function createAuthors(){
    const port = process.env.PORT || 3000
    const endpoint = `http://localhost:${port}/api/wp/create-author`
    for(const author of authors){
        try{
            await axios.post(endpoint, {
                username: author.props.username,
                email: author.props.email,
                description: author.props.personality,
                password: author.props.password
            })
        }catch(err:any){
            throw new Error(`Failed to create ${author.props.username}. ${err.message}`)
        }
    }
}

export async function postAutomation(){
    let authorIndex = 0


    // # ┌────────────── second (optional)
    // # │ ┌──────────── minute
    // # │ │ ┌────────── hour
    // # │ │ │ ┌──────── day of month
    // # │ │ │ │ ┌────── month
    // # │ │ │ │ │ ┌──── day of week
    // # │ │ │ │ │ │
    // # │ │ │ │ │ │
    // # * * * * * *
    
    cron.schedule('*/5 * * * *', async () => {
        const author = authors[authorIndex]
        authorIndex = (authorIndex + 1) % authors.length
        console.log("cron start")
        try{
            await axios.post(`http://localhost:${port}/api/wp/post-article`,{author:author.props.username})
        } catch(err : any){
            //TODO: Improve Logger
            wpLogger.error(`Failed to auto post article. ${err.message}`) 
        }
        console.log("cron end")
    })
}

