import mongoose from "mongoose";

const postModel = new mongoose.Schema(
    {
        title: {type: String, require: true},
        description: String,
        tags: {type: Array, default: []},
        viewsCount: {type: Number, default: 0},
        user: {type: mongoose.Schema.Types.ObjectId, require: true, ref: 'User'},
        imageUrl: {type: String, default: ''}
    },
    {
        timestamps: true
    }
)

const Post = mongoose.model('Post', postModel)
export default Post