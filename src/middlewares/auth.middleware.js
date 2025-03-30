import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/user.model.js";
dotenv.config({
  path: "./.env",
});
const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accesstoken ||
      req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      console.log("token not available")
      throw new apiError(401, "Unauthorized Request");
    }
    const verifiedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    verifiedToken;
    const user = await User.findById(verifiedToken?._id).select(
      "-password -refreshtoken"
    );
    if (!user) {
      return res.status(400).json(new apiError(400, "User is Not Authorized for this request"))
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json( new apiError(401, error?.message || "invalid token error"))
  }
});
export { verifyJWT };
