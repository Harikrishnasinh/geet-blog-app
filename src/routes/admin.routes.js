import { Router } from "express";
import { adminLogin, list, update, handleDelete} from "../controllers/admin.controller.js";

const adminRoutes = new Router();

adminRoutes
    .post('/login', adminLogin )
    .post('/list', list )
    .post('/update', update)
    .post('/delete', handleDelete)

export default adminRoutes;