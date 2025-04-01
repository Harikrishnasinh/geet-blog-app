import mongoose from "mongoose";
import { Post } from "../models/post.model.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createPost = async (req, res, next) => {
    try {
        const { title, content, userMetaData, image, categoryMetaData } = req.body;
        if (!title || !content || !userMetaData) {
            return next(new apiError(400, "Please fill all the fields"));
        }
        const post = await Post.create({
            content,
            title,
            userMetaData,
            image,
            categoryMetaData,
        });
        res.status(200).json({
            success: true,
            message: "Post created successfully!!!!",
            post,
        });
    } catch (error) {
        console.log(error)
        next(error);
    }
};

export const getAllPosts = async (req, res, next) => {
    try {
        const posts = await Post.find({}).sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            message: "Posts retrieved successfully!!!!",
            posts,
        });
    } catch (error) {
        console.log(error)
        next(error);
    }
}

export const getPostWithCategoryId = async (req, res, next) => {
    try {
        const { iCategoryId } = req.params;
        const posts = await Post.find({ "categoryMetaData._id": iCategoryId }).sort({ createdAt: -1 });
        return res.status(200).json(
            new apiResponse(
                200,
                "All post fetched successfully",
                posts
            )
        );
    } catch (error) {
        console.log(error);
        return res.status(500).json(
            new apiError(
                500,
                "An error occurred while fetching posts"
            )
        );
    }
}

export const getPostWithId = asyncHandler(async (req, res, next) => {
    try {
        const post = await Post.findOne({
            "_id": req.params.iPostId
        })
        return res.status(200).json(
            new apiResponse(
                200,
                "All post fetched successfully",
                post
            )
        );
    } catch (error) {
        console.log(error);
        return res.status(500).json(
            new apiError(
                500,
                "An error occurred while fetching posts"
            )
        );
    }
})

export const handleLike = asyncHandler(async (req, res, next) => {
    try {
        const { iPostId, iUserId } = req.body;
        const post = await Post.findById(iPostId);
        if (!post) return res.status(404).json(
            new apiError(
                500,
                "An error occurred while fetching blog"
            )
        );

        const likedIndex = post.likes.indexOf(iUserId);

        if (likedIndex === -1) {
            // If not liked, add user ID
            post.likes.push(iUserId);
            await post.save();
            return res.status(200).json(
                new apiResponse(
                    200,
                    "Liked successfully",
                    {
                        likesCount: post.likes.length
                    }
                )
            );
        } else {
            // If already liked, remove user ID (unlike)
            post.likes.splice(likedIndex, 1);
            await post.save();
            return res.status(200).json(
                new apiResponse(
                    200,
                    "Unliked successfully",
                    {
                        likesCount: post.likes.length
                    }
                )
            );
        }


    } catch (error) {
        console.log(error);
        return res.status(500).json(
            new apiError(
                500,
                "An error occurred while adding like"
            )
        );
    }
})

export const handleSave = asyncHandler(async (req, res, next) => {
    try {
        const { iPostId, iUserId } = req.body;
        const post = await Post.findById(iPostId);
        if (!post) return res.status(404).json(
            new apiError(
                500,
                "An error occurred while fetching blog"
            )
        );

        const savedIndex = post.saved.indexOf(iUserId);

        if (savedIndex === -1) {
            // If not liked, add user ID
            post.saved.push(iUserId);
            await post.save();
            return res.status(200).json(
                new apiResponse(
                    200,
                    "Post Saved",
                    {
                        savedCount: post.saved.length
                    }
                )
            );
        } else {
            // If already liked, remove user ID (unlike)
            post.saved.splice(savedIndex, 1);
            await post.save();
            return res.status(200).json(
                new apiResponse(
                    200,
                    "Post Unsaved",
                    {
                        savedCount: post.saved.length
                    }
                )
            );
        }


    } catch (error) {
        console.log(error);
        return res.status(500).json(
            new apiError(
                500,
                "An error occurred while saving the post."
            )
        );
    }
})

export const fetchTabBlogs = asyncHandler(async (req, res, next) => {
    try {
        const { iUserId } = req.params
        const { tab } = req.body

        const userId = new mongoose.Types.ObjectId(iUserId)
        let blogs = []

        if (tab == 'all') {
            blogs = await Post.find({"userMetaData._id": iUserId})
        } else {
            const query = {
                [tab]: { $in: [userId] }
            }
            const mainQuery = {
                $match: query
            }
            blogs = await Post.aggregate([mainQuery]);
        }

        return res.status(200).json(
            new apiResponse(
                200,
                "Blogs fetched successfully",
                blogs
            )
        );
    } catch (error) {
        return res.status(500).json(
            new apiError(
                500,
                "An error occurred while fetching the blogs"
            )
        )
    }
});

export const userPost = asyncHandler(async (req, res, next) => {
    try {
        const { iUserId } = req.params;
        // const userId = new mongoose.Types.ObjectId(iUserId);
        const posts = await Post.find({ 'userMetaData._id': iUserId })
        return res.status(200).json(
            new apiResponse(
                200,
                "All posts fetched successfully",
                posts
            )
        )
    } catch (error) {
        console.log(error)
        return res.status(500).json(
            new apiError(
                500,
                "An error occurred while fetching the posts"
            )
        )
    }
})

export const handleSearch = asyncHandler(async (req, res, next) => {
    try {
        const { search } = req.body;
        const regex = new RegExp(search, 'i');
        const posts = await Post.find({
            $or: [
                { title: regex },
                { content: regex },
            ],
        });
        return res.status(200).json(
            new apiResponse(
                200,
                "All posts fetched successfully",
                posts
            )
        );
    } catch (error) {
        console.log(error)
        return res.status(500).json(
            new apiError(
                500,
                "An error occurred while fetching the posts"
            )
        )
    }
})

export const suggestedPost = asyncHandler(async (req, res, next) => {
    try {
        const posts = await Post.find().sort({
            likes: -1
        }).limit(3)
        return res.status(200).json(
            new apiResponse(
                200,
                "Most liked posts fetched successfully",
                posts
            )
        )
    } catch (error) {
        console.log(error)
        return res.status(500).json(
            new apiError(
                500,
                "An error occurred while fetching the suggested posts",
                error
            )
        )
    }
})

export const getTopUsers = asyncHandler(async (req, res) => {
    try {
        const topUsers = await Post.aggregate([
            {
                $group: {
                    _id: "$userMetaData._id", // Group by user ID
                    postCount: { $sum: 1 } // Count posts
                }
            },
            { $sort: { postCount: -1 } }, // Sort by most posts
            { $limit: 5 }, // Get top 5 users
            {
                $lookup: {
                    from: "users", // Ensure correct collection name
                    let: { userId: { $toObjectId: "$_id" } }, // Convert to ObjectId
                    pipeline: [
                        { $match: { $expr: { $eq: ["$_id", "$$userId"] } } },
                        { $project: { _id: 1, userName: 1, email: 1 } }
                    ],
                    as: "userDetails"
                }
            },
            { $unwind: { path: "$userDetails", preserveNullAndEmptyArrays: true } }, // Avoid errors if user not found
            {
                $project: {
                    _id: 0,
                    userId: "$_id",
                    userName: "$userDetails.userName",
                    email: "$userDetails.email",
                    postCount: 1,
                }
            }
        ]);


        return res.status(200).json(
            new apiResponse(
                200,
                "Top users fetched successfully",
                topUsers
            )
        );
    } catch (error) {
        console.error("Error fetching top users:", error);
        return res.status(500).json(
            new apiError(
                500,
                "An error occurred while fetching the top users"
            )
        );
    }
});

export const deletePost = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const post = await Post.findById(id);
    if (!post) {
        res.status(404);
        return res.status(500).json(
            new apiError(
                500,
                "Post not found!!"
            )
        );
    }
    await post.deleteOne();

    res.status(200).json(
        new apiResponse(
            200,
            "Post deleted successfully",
        )
    );

});