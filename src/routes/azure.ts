import express, {Request, Response, NextFunction} from "express"
import axios from 'axios'
import * as dotenv from "dotenv"
import jmespath from "jmespath"

dotenv.config()

const route = express.Router()

route.post("/ocr", async (req:Request, res:Response, next:NextFunction) => {
    const imageUrl = req.body.imageUrl
    const apiKey = process.env.AZ_VISION_API_KEY
    const endpoint = process.env.AZ_VISION_API_ENDPOINT
    console.log(apiKey, endpoint)
    try {
        const response = await axios.post(`${endpoint}vision/v3.2/ocr`,
            {url: imageUrl},
            {headers: {
                'Ocp-Apim-Subscription-Key':apiKey,
                'Content-Type': 'application/json'
            }}
        )
        const result: string[][] = jmespath.search(response.data, "regions[*].lines[*].words[*].text");
        const text = result.map(line => line.join(' ')).join(' ');
        res.json({
            text
        })
    } catch(err){
        next(err)
    }
})

export default route

//curl -v -X POST "https://westcentralus.api.cognitive.microsoft.com/vision/v3.2/read/analyze" -H "Content-Type: application/json" -H "Ocp-Apim-Subscription-Key: <key>" --data-ascii "{\"url\":\"https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Atomist_quote_from_Democritus.png/338px-Atomist_quote_from_Democritus.png\"}"