import { Post } from "../models/post.model.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";

export const createPost = async (req, res, next) => {
    try {
        const { title, content, userMetaData, image } = req.body;
        if (!title || !content || !userMetaData) {
            return next(new apiError(400, "Please fill all the fields"));
        }
        const post = await Post.create({
            title,
            content,
            userMetaData,
            image
        });
        res.status(200).json({
            success: true,
            message: "Post created successfully!!!!",
            post,
        });
    } catch (error){
        console.log(error)
        next(error);
    }
};