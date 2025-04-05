import { Comment } from "../models/comment.model.js";
import { Category } from "../models/category.model.js";
import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";
import { apiError } from "../utils/apiError.js"
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const adminLogin =  asyncHandler(async (req, res, next) => {
    try {
        const { userName, password } = req.body;
        if (!userName || !password) {
            return next(new apiError(400, "Please fill all the fields"));
        }
        const user = await User.findOne({ userName }).select("+password");
        if (!user || !(await user.isPasswordCorrect(password))) {
            return next(new apiError(401, "Invalid credentials"));
        }
        // Convert Mongoose document to plain object
        const userObject = user.toObject(); // ✅ Converts Mongoose document to plain object

        // Remove password from response
        delete userObject.password;
        delete userObject.createdAt;
        res.json({
            success: true,
            message: "User logged in successfully",
            user: userObject,
        });
    } catch (error) {
        console.log(error);
        return next(new apiError(400, "Invalid credentials"));
    }
})

export const list = async (req, res) => {
    try {
        const { menu, iUserId } = req.body;
        if(iUserId != "67dfa28043add9d652eb0cae") {
            return res.status(401).json(
                new apiError(
                    401,
                    "Unauthorized",
                    "You are not authorized to access this resource"
                )
            )
        }
        if (menu == 'home') {
            const users = await User.find({}).select("-createdAt -updatedAt -__v");
            return res.status(200).json(
                new apiResponse(
                    200,
                    "Users fetched successfully",
                    users
                )
            )
        } else if (menu == 'categories'){
            const categories = await Category.find({}).select("-updatedAt -__v");
            return res.status(200).json(
                new apiResponse(
                    200,
                    "Categories fetched successfully",
                    categories
                )
            )
        } else if (menu == 'comments') {
            const comments = await Comment.find({}).select("-updatedAt -__v")
            return res.status(200).json(
                new apiResponse(
                    200,
                    "Comments fetched successfully",
                    comments
                )
            )
        } else if (menu == 'post') {
            const posts = await Post.find({}).select("-updatedAt -__v")
            return res.status(200).json(
                new apiResponse(
                    200,
                    "Posts fetched successfully",
                    posts
                )
            )
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json(
            new apiError(
                500,
                "Failed to fetch users",
                error.message
            )
        )
    }
}

export const update = asyncHandler(async (req, res) => {
    try {
        const {forLabel, updateData} = req.body
        if(forLabel == 'post') {
            const post = await Post.findByIdAndUpdate(updateData._id, updateData, {new: true, useFindAndModify: false})
            return res.status(200).json(
                new apiResponse(
                    200,
                    "Post updated successfully",
                    post
                )
            )
        } else if (forLabel == 'home') {
            const user = await User.findByIdAndUpdate(updateData._id, updateData, {new: true, useFindAndModify: false})
            return res.status(200).json(
                new apiResponse(
                    200,
                    "User updated successfully",
                    user
                )
            )
        }else if (forLabel == 'categories') {
            const category = await Category.findByIdAndUpdate(updateData._id, updateData, {new: true, useFindAndModify: false})
            return res.status(200).json(
                new apiResponse(
                    200,
                    "Category updated successfully",
                    category
                )
            )
        }else if (forLabel == 'comments') {
            const comments = await Comment.findByIdAndUpdate(updateData._id, updateData, {new: true, useFindAndModify: false})
            return res.status(200).json(
                new apiResponse(
                    200,
                    "Comment updated successfully",
                    comments
                )
            )
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json(
            new apiError(
                500,
                "Failed to Update",
                error.message
            )
        )
    }
})

export const handleDelete = asyncHandler(async (req, res) => {
    try {
        const {forLabel, _id} = req.body
        if(forLabel == 'post') {
            const post = await Post.findByIdAndDelete(_id)
            return res.status(200).json(
                new apiResponse(
                    200,
                    "Post updated successfully",
                    post
                )
            )
        } else if (forLabel == 'home') {
            const user = await User.findByIdAndDelete(_id)
            return res.status(200).json(
                new apiResponse(
                    200,
                    "User updated successfully",
                    user
                )
            )
        }else if (forLabel == 'categories') {
            const category = await Category.findByIdAndDelete(_id)
            return res.status(200).json(
                new apiResponse(
                    200,
                    "Category updated successfully",
                    category
                )
            )
        }else if (forLabel == 'comments') {
            const comments = await Comment.findByIdAndDelete(_id)
            return res.status(200).json(
                new apiResponse(
                    200,
                    "Comment updated successfully",
                    comments
                )
            )
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json(
            new apiError(
                500,
                "Failed to Update",
                error.message
            )
        )
    }
})
