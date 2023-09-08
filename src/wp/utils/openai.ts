import OpenAI from "openai"
import * as dotenv from "dotenv"
import FormData from 'form-data'
import { ChatMessages, WpPostPrompt } from "../../types/WPTypes"

dotenv.config()
const openai = new OpenAI({apiKey:process.env.OPENAI_API_KEY})

export const makeThumbnaiilFormData = async (prompt: string) : Promise<FormData> => {
    const image = await openai.images.generate({
        prompt,
        n: 1,
        size: "256x256",
        response_format: "b64_json"
    })
    const imgB64Json = image.data[0].b64_json ?? ""
    const imgData = Buffer.from(imgB64Json, 'base64')
    const formData = new FormData()
    const filename = prompt.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '').toLowerCase() + ".png"
    formData.append('file',imgData, {
        filename,
        contentType: 'image/png'
    })
    return formData
}

export const makeThumbnailPromptFromText = async (text:string): Promise<string> => {
    const response = await openai.chat.completions.create({
        model:"gpt-3.5-turbo",
        messages: [
            {
                "role":"system",
                "content":"You are a machine that generate image generation idea from a given text."
            },
            {
                "role":"user",
                "content":"read a article excerpt and make suitable thumbnail image description for the excerpt in English. ---Kanazawa, often overshadowed by Tokyo and Kyoto, is a city in Japan's Ishikawa Prefecture that offers a rich blend of history, culture, and natural beauty. Known as Little Kyoto, it's a must-visit for anyone interested in traditional Japanese arts and crafts.---"
            },
            {
                "role":"assistant",
                "content":"Japanese historic arts and crafts"
            },
            {
                "role":"user",
                "content": `read a article excerpt and make suitable thumbnail image description for the excerpt in English. ---${text}---`
            }
        ],
        temperature: 0.2,
        max_tokens: 1024
    })
    const style = " cubism painting."
    return response.choices[0].message.content + style
}

export const getChatCompletionResult = async (chatMessages: ChatMessages) => {
    try{
        const response = await openai.chat.completions.create({
            model: "gpt-4-0314",
            messages: chatMessages,
            temperature: 0.2,
            max_tokens: 2000
        })
        return response
    }catch(error){
        throw error
    }
}

export const getWpPostPromptString = async (chatMessages: ChatMessages) => {
    try{
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo-0613",
            messages: chatMessages,
            temperature: 0,
            max_tokens: 1000
        })
        return response
    }catch(error){
        throw error
    }
}