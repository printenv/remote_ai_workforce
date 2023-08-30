import * as dotenv from "dotenv"
import authors from "./authors.ts/ikura"
import axios from "axios"


const port = process.env.PORT || 3000

const initWp = async () => {
    throw new Error("error test.")
    //Create author
    const endpoint = `http://localhost:${port}/api/wp/create-author`
    for(const author of authors){
        await axios.post(endpoint, {
            username: author.username,
            email: author.email,
            password: author.password
        })
    }
}

export default initWp