import { Category } from "../models/category.model.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getAllCategories = asyncHandler(async (req, res) => {
    try {
        const categories = await Category.find();
        return res.status(200).json(
            new apiResponse(
                200,
                "All categories fetched successfully",
                categories
            )
        );
    } catch (error) {
        console.log(error);
        return res.status(500).json(
            new apiError(
                500,
                "An error occurred while fetching all categories"
            )
        );
    }
});
