import express, {Request, Response} from 'express'

const route = express.Router()

route.get("/test", (req:Request, res:Response) => {
    res.json("bard route")
})

export default route