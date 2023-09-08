import axios from 'axios'
import * as dotenv from 'dotenv'
dotenv.config()

const baseURL=process.env.WP_URL
const rootUsername=process.env.WP_ROOT_USER
const rootPassword=process.env.WP_ROOT_PASSWORD

if(!baseURL || !rootUsername || !rootPassword){
    throw new Error("Credential is not set.")
}

export async function getToken(
    username: string=rootUsername as string, 
    password: string=rootPassword as string
    ){
    try{
        const result = await axios.post(`${baseURL}/wp-json/jwt-auth/v1/token`, {
            username,
            password
        })
        return result.data.token
    }catch(err: any){
        throw new Error(`Failed to getToken. ${err.message}`)
    }
}