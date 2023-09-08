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
        const name = req.body.name
        const response = await axios.post(`${process.env.WP_URL}/wp-json/wp/v2/${end_point}`, {
            name
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    res.json(response.data.id)
    }catch(err){
        next(err)
    }
    
}

export default createCategory