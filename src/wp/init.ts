import { postAutomation, createAuthors } from "./automation"

const port = process.env.PORT || 3000

const initWp = async () => {
    //createAuthors()
    postAutomation()
}



export default initWp