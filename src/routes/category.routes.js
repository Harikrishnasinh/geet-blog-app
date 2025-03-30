import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getAllCategories } from "../controllers/category.controller.js";

const categoryRoutes = new Router();

categoryRoutes
    .get('/', getAllCategories)

export default categoryRoutes