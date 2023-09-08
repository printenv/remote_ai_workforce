import {Request, Response, NextFunction} from "express"
import { getToken } from "../utils/auth"
import axios from "axios"
import jmespath from "jmespath"
import * as dotenv from "dotenv"
import { WPEndpoints } from "../../types/WPTypes"
dotenv.config()


const port = process.env.PORT || 3000
const createAuthor = async (req:Request, res:Response, next:NextFunction) => {
    const {username, email, password, description} = req.body
    if(!username || !email || !password || !description){
        next(new Error("username, email, description and password are required."))
    }
    
    try{
        const response = await axios.get(`http://localhost:${port}/api/wp/get-authors`)
        const authors = jmespath.search(response.data, '[*].name')

        //1. check if username is already there
        if(!authors.includes(username)){            
            try{
                const token = await getToken()
                const endPoint: WPEndpoints = "users"
                const result = await axios.post(`${process.env.WP_URL}/wp-json/wp/v2/${endPoint}`,{
                    username, email, password, description,
                    roles: ['author']
                }, {
                    headers: {
                        'Authorization' : `Bearer ${token}`
                    }
                })
                res.send(`User created : ${username}`)
            }catch(err:any){
                console.log(err)
                throw new Error(`createAuthors() failed. ${err.message}`)
            }
        }else{
            res.send(`${username} already exists.`)
        }   
    }catch(err){
        next(err)
    }
}

export default createAuthor