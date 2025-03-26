import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { login, logout, register } from "../controllers/user.contoller.js";
const router = Router();
router
  .post(
    "/register",register
  )
  .post("/login", login)
  .post("/logout", logout)
//   .post("/refresh-token", refershAccessToken)
//   .post("/update-password", verifyJWT, changeCurrentPassword)
//   .post("/current-user", verifyJWT, currentUser)
//   .post("/update-avatar", verifyJWT, upload.single("avatar"), updateAvatar)
//   .post(
//     "/update-cover",
//     verifyJWT,
//     upload.single("coverimage"),
//     updateCoverImage
//   )
//   .get("/channel-sub/:username", verifyJWT, getChannelSub)
//   .post("/watch-history", verifyJWT, getWatchHistory);
export { router };
