import { Router } from "express";
import { createPost } from "../controllers/post.controller.js";

const postRouter = new Router();

postRouter
    .post('/',createPost)

export default postRouter