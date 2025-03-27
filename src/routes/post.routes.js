import { Router } from "express";
import { createPost, getAllPosts } from "../controllers/post.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const postRouter = new Router();

postRouter
    .post('/', verifyJWT ,createPost)
    .get('/', verifyJWT, getAllPosts)

export default postRouter