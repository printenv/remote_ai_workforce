import {Request, Response, NextFunction} from "express"
import axios from "axios"
import * as dotenv from "dotenv"
import { getToken } from "../utils/auth"
import { makeThumbnaiilFormData, makeThumbnailPromptFromText } from "../utils/openai"
import { WPEndpoints } from "../../types/WPTypes"

import FormData from "form-data"

import OpenAI  from "openai"

dotenv.config()


const uploadImage = async (req:Request, res:Response, next:NextFunction) =>{
    try{
        const end_point: WPEndpoints = "media"
        const articleExcerpt = req.body.excerpt ?? null
        if(!articleExcerpt) throw new Error("ArticleExcerpt not passed for image generation.")
        const token = req.body.token ? req.body.token : await getToken()
        
        const prompt = await makeThumbnailPromptFromText(articleExcerpt)
        const formData = await makeThumbnaiilFormData(prompt)

        const result = await axios.post(`${process.env.WP_URL}/wp-json/wp/v2/${end_point}`, formData, {
            headers: {
              'Authorization': `Bearer ${token}`,
              ...formData.getHeaders(),
            },
          });
        res.json(Number(result.data.id))
    }catch(err){
        next(err)
    }
    
}

export default uploadImage