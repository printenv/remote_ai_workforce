import express, {Request, Response} from 'express'

import openaiRoute from './routes/openai'
import azureRoute from "./routes/azure"
import bardRoute from './routes/bard'

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.use("/api/openai/", openaiRoute)
app.use("/api/azure", azureRoute)
app.use("/api/bard/", bardRoute)

app.listen(port, ()=>{
    console.log(`Server running on https://localhost:${port}`)
})