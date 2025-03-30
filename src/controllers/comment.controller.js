import { Comment } from "../models/comment.model.js"
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";

export const addComment = async (req, res, next) => {
    try {
        const { iUserId, iBlogId, sCommentContent, userMetaData } = req.body
        const comment = await Comment.create({
            iUserId,
            iBlogId,
            sCommentContent,
            userMetaData
        })
        return res.status(200).json(
            new apiResponse(
                200,
                "Commented Successfully!!",
                comment
            )
        );
    } catch (error) {
        console.log(error);
        return res.status(500).json(
            new apiError(
                500,
                "Error while creating the comment"
            )
        );
    }
}

export const fetchAllComment = async (req, res, next) => {
    try {
        const { iBlogId } = req.params
        const comments = await Comment.find(
            { iBlogId },
        )
        return res.status(200).json(
            new apiResponse(
                200,
                "Comment fetched successfully!!",
                comments
            )
        );
    } catch (error) {
        console.log(error);
        return res.status(500).json(
            new apiError(
                500,
                "Error while Fetching the comment"
            )
        );
    }
}