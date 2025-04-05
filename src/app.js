import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { router as userRouter} from "./routes/user.routes.js";
import postRouter from "./routes/post.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import commentRoutes from "./routes/comment.routes.js";
import adminRoutes from "./routes/admin.routes.js";

const app = express();
app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/api/v1/users", userRouter);
app.use("/api/v1/post", postRouter)
app.use("/api/v1/categories", categoryRoutes)
app.use("/api/v1/comment", commentRoutes)
app.use("/api/v1/admin", adminRoutes)
export { app };
