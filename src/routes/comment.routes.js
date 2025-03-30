import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addComment, fetchAllComment } from "../controllers/comment.controller.js";

const commentRoutes = new Router();

commentRoutes
    .post('/', verifyJWT, addComment)
    .get('/:iBlogId', fetchAllComment)

export default commentRoutes;