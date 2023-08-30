import express, {Request, Response} from 'express'
import errorHandler from "./midlleware/errorHandler"
import openaiRoute from './routes/openai'
import azureRoute from "./routes/azure"
import wpRoute from './routes/wp'
import initWp from './wp/init'
import wpLogger from './wp/logger'

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.use("/api/openai/", openaiRoute)
app.use("/api/azure", azureRoute)
app.use("/api/wp", wpRoute)

app.use(errorHandler)

initWp().catch(error => {
    wpLogger.error(`${error}`)
})



app.listen(port, ()=>{
    console.log(`Server running on https://localhost:${port}`)
})