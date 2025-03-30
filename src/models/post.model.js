import mongoose, { Schema } from "mongoose";
import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});

const postSchema = new Schema({
    userMetaData: {
        type: Object,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    categoryMetaData: {
        type: Object,
    },
    likes: [
        { 
            type: mongoose.Schema.Types.ObjectId, ref: "User" 
        }
    ],
    saved: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: "User"
        }
    ]
    ,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const Post = mongoose.model("Post", postSchema);