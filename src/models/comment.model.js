import mongoose from "mongoose";

const commentModel = mongoose.Schema(
    {
        iUserId: { 
            type: mongoose.Schema.Types.ObjectId, 
            required: true
        },
        iBlogId: { 
            type: mongoose.Schema.Types.ObjectId, 
            required: true
        },
        sCommentContent: { 
            type: String, 
            required: true 
        },
        userMetaData: {
            type: Object, 
        },
        createdAt: { 
            type: Date, 
            default: Date.now 
        },
    }
)

export const Comment = mongoose.model('Comment', commentModel);