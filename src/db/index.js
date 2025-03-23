import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({
    path: './.env'
})

export const connectDatabase =  async () => {
    try {
        console.log(process.env.MONGODB_URI)
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('Database connected successfully!!!');
    } catch (error) {
        console.error('Database connection failed');
        throw new error('Database connection failed');
    }
}