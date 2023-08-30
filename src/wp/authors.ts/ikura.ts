import * as dotenv from "dotenv"
dotenv.config()
import { WPAuthors } from "../../types/WPTypes"

const password = process.env.WP_IKURA_PASSWORD
if(!password){
    throw new Error("WP_IKURA_PASSWORD is not set.")
}

const ikura : WPAuthors = {
    username: "19ra",
    email: "ikura@bux-web.com",
    password,
    systemRole: "",
    prompts: []
}

const wpAuthors : WPAuthors[] =  [
    ikura
]

export default wpAuthors