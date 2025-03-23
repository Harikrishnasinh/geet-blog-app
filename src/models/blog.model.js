import mongoose, { Schema } from "mongoose";
import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    coverImage: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})