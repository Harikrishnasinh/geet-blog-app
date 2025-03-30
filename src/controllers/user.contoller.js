import { User } from "../models/user.model.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const generateAccessTokenAndRefreshToken = async (userId) => {
    // generate refreshToken
    const user = await User.findById(userId);
    if (!user)
        throw new apiError(
            401,
            "something went wrong while fetching the user at generate access token"
        );
    const refreshToken = user.generateRefreshToken();

    if (!refreshToken)
        throw new apiError(401, "error while making the refresh token");
    user.refreshtoken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { refreshToken };
};

const register = asyncHandler(async (req, res, next) => {
    try {
        const { firstName, lastName, userName, email, password } = req.body;
        if (!firstName || !lastName || !userName || !email || !password) {
            return next(new apiError(400, "Please fill all the fields"));
        }
        const user = await User.create({
            firstName,
            lastName,
            userName,
            email,
            password,
        });
        const { refreshToken } = await generateAccessTokenAndRefreshToken(
            user._id
        );
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user,
            refreshToken,
        });
    } catch (error) {
        console.log(error);
        return next(new apiError(400, "Please fill all the fields"));
    }
})

const login = asyncHandler(async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return next(new apiError(400, "Please fill all the fields"));
        }
        const user = await User.findOne({ email }).select("+password");
        if (!user || !(await user.isPasswordCorrect(password))) {
            return next(new apiError(401, "Invalid credentials"));
        }
        const { refreshToken } = await generateAccessTokenAndRefreshToken(user._id);
        // Convert Mongoose document to plain object
        const userObject = user.toObject(); // ✅ Converts Mongoose document to plain object

        // Remove password from response
        delete userObject.password;
        delete userObject.createdAt;
        res.json({
            success: true,
            message: "User logged in successfully",
            user: userObject,
            refreshToken,
        });
    } catch (error) {
        console.log(error);
        return next(new apiError(400, "Invalid credentials"));
    }
})

const logout = asyncHandler(async (req, res, next) => {
    try {
        req.user.refreshToken = null;
        await req.user.save({ validateBeforeSave: false });
        res.json({ success: true, message: "User logged out successfully" });
    } catch (error) {
        console.log(error);
        return next(new apiError(500, "Something went wrong while logging out"));
    }
})

const fetchUser = asyncHandler(async (req, res, next) => {
    try {
        const { iUserId } = req.params
        const user = await User.findById(iUserId).select("-password");
        return res.status(200).json(
            new apiResponse(
                200,
                'User fetched successfully',
                user,
            )
        )
    } catch (error) {
        console.log(error);
        return res.status(500).json(
            new apiError(
                500,
                "Something went wrong while fetching user",
                error,
            )
        )
    }
})

export const updateUser = asyncHandler(async (req, res, next) => {
    try {
        const { id } = req.params
        const { firstName, lastName, email } = req.body
        const updatedUser = await User.findByIdAndUpdate(id, { firstName, lastName, email }, { new: true, runValidators: true })
        return res.status(200).json(
            new apiResponse(
                200,
                'User updated successfully',
                updatedUser,
            )
        )
    } catch (error) {
        console.log(error);
        return res.status(500).json(
            new apiError(
                500,
                "Something went wrong while updating user",
                error,
            )
        )
    }
})


export { register, login, logout, fetchUser }