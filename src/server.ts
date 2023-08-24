import express, {Request, Response} from 'express'
import errorHandler from "./midlleware/errorHandler"
import openaiRoute from './routes/openai'
import azureRoute from "./routes/azure"
import wpRoute from './routes/wp'

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(errorHandler)

app.use("/api/openai/", openaiRoute)
app.use("/api/azure", azureRoute)
app.use("/api/wp", azureRoute)

app.listen(port, ()=>{
    console.log(`Server running on https://localhost:${port}`)
})