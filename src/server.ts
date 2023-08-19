import express, {Request, Response} from 'express'

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.get('/api/test', (req:Request, res:Response) => {
    res.json("OK")
})

app.listen(port, ()=>{
    console.log(`Server running on https://localhost:${port}`)
})