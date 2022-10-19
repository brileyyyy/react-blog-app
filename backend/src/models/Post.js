import mongoose from "mongoose";

const postModel = new mongoose.Schema(
    {
        title: {type: String, require: true},
        description: String,
        tags: {type: [String], default: []},
        viewsCount: {type: Number, default: 0},
        author: {type: String, required: true},
        user: {type: mongoose.Schema.Types.ObjectId, require: true, ref: 'User'},
        imageUrl: {type: String, default: ''},
        comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
        commentsCount: {type: Number, default: 0},
        likes: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
    },
    {
        timestamps: true
    }
)

const Post = mongoose.model('Post', postModel)
export default Post