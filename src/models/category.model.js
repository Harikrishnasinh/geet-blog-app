import { mongoose } from "mongoose";

const categorySchema = mongoose.Schema(
    {
        sName: {
            type: String,
            required: true,
            unique: true,
        },
        sValue: {
            type: String,
            required: true,
            unique: true,
        },
        categoryMetaData: { 
            type: Object,
            required: false,
        }
        // posts: [{ type: Mongoose.Schema.Types.ObjectId, ref: "Post" }],
    },
    { timestamps: true }
)

export const Category = mongoose.model("Category", categorySchema);