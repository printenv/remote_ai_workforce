import express, {Request, Response, NextFunction} from 'express'
import * as dotenv from "dotenv"
import { getToken } from '../wp/utils/auth'
import createCategory from '../wp/controller/createCategory'
import {getDataFromWp, getWpAuthors} from '../wp/controller/get'
import uploadImage from '../wp/controller/uploadImage'
import postArticle from '../wp/controller/postArticle'
import createAuthor from '../wp/controller/createAuthor'

dotenv.config()

const route = express.Router()


//GET
route.get("/get", getDataFromWp)
route.get("/get-authors", getWpAuthors)


/**
 * POST /post-article
 * 
 */
route.post("/post-article", postArticle)

/**
 * POST /create-author
 * @param username
 */
route.post("/create-author", createAuthor)

/**
 * POST /create-category
 * @param name (required) - The name of the category
 * @param description (optional) - A description for the category
 * @param slug (optional) - A URL-friendly slug for the category
 * @param parent (optional) - The ID of the parent category
 */
route.post("/create-category", createCategory)

/**
 * POST /upload-image
 * @param excerpt (required) - Exceprt of the aticle for image generation prompt.
 * @returns {number} - Returns the ID of the uploaded media item, which can be used as featured image for a post.
 */
route.post("/upload-image", uploadImage)

/**
 * POST /publish-article
 */
route.post("/post-article", postArticle)

export default route