import {Request, Response, NextFunction} from "express"
import axios from "axios"
import * as dotenv from "dotenv"
import { getToken } from "../utils/auth"
import { WPEndpoints } from "../../types/WPTypes"

dotenv.config()


const createCategory = async (req:Request, res:Response, next:NextFunction) =>{
    try{
        const end_point: WPEndpoints = "categories"
        const token = await getToken()
        const {name, description, slug, parent} = req.body
        await axios.post(`${process.env.WP_URL}/wp-json/wp/v2/${end_point}`, {
            name, description, slug, parent
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        res.status(200).send("Category created")
    }catch(err){
        next(err)
    }
    
}

export default createCategory