import {Response, Request, NextFunction} from "express"
import { getToken } from "../utils/auth"

const postArticle = async (req:Request, res:Response, next:NextFunction) => {
    const token = await getToken()

    //1.scrape
    
    //2.get available categories

    //3.openai make titile, content, excerpt, category

    //4.make thumbnail from excerpt

    //5.post

}

export default postArticle