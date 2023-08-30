import { Request, Response, NextFunction } from "express"
import * as dotenv from "dotenv"
import axios from "axios"
import { WPEndpoints } from "../../types/WPTypes"
import { getToken } from "../utils/auth"

dotenv.config()

export const getDataFromWp = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const endPoint:WPEndpoints = req.query.end_point as WPEndpoints

        const result = await axios.get(`${process.env.WP_URL}/wp-json/wp/v2/${endPoint}`) 
        res.json(result.data)
    }catch(err){
        next(err)
    }
}

export const getWpAuthors = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const token = await getToken()
        const endPoint:WPEndpoints = 'users'
        const result = await axios.get(`${process.env.WP_URL}/wp-json/wp/v2/${endPoint}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        res.json(result.data)
    } catch(err){
        next(err)
    }
}