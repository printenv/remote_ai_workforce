import express, {Request, Response, NextFunction} from 'express'
import * as dotenv from "dotenv"

dotenv.config()

const route = express.Router()


//GET
route.get("/get-authours", async(req:Request, res:Response) => {
    res.send("under development...")
})
route.get("/get-categories", async(req:Request, res:Response) => {
    res.send("under development...")
})


//POST
route.post("/post-article", async(req:Request, res:Response) => {
    res.send("under development...")
})
route.post("/create-author", async(req:Request, res:Response) => {
    res.send("under development...")
})
route.post("/create-category", async(req:Request, res:Response) => {
    res.send("under development...")
})
route.post("/upload-image", async(req:Request, res:Response) => {
    res.send("under development...")
})



export default route