import mongoose from "mongoose";

const commentModel = new mongoose.Schema(
    {
        avatar: {type: String, default: ''},
        text: {type: String, required: true},
        date: {type: Date, required: true},
        user: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
        post: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Post'}
    },
    {
        timestamps: true
    }
)

const Comment = mongoose.model('Comment', commentModel)
export default Comment