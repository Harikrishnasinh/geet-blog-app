import { Router } from "express";
import { createPost, deletePost, fetchTabBlogs, getAllPosts, getPostWithCategoryId, getPostWithId, getTopUsers, handleLike, handleSave, handleSearch, suggestedPost, userPost } from "../controllers/post.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const postRouter = new Router();

postRouter
    .post('/', verifyJWT, createPost)
    .post('/search', handleSearch)
    .get('/suggestedPost', suggestedPost)
    .get('/top-users', getTopUsers)
    .get('/', getAllPosts)
    .get('/category/:iCategoryId', getPostWithCategoryId)
    .get('/:iPostId', getPostWithId)
    .post('/like', handleLike)
    .post('/save', handleSave)
    .post('/tab/:iUserId', fetchTabBlogs)
    .get('/user/:iUserId', userPost)
    .delete('/:id', deletePost)

export default postRouter