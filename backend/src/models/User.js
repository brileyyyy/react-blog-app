import mongoose from "mongoose"

const userModel = new mongoose.Schema(
    {
        email: {type: String, require: true, unique: true},
        password: {type: String, require: true},
        name: {type: String, require: true},
        avatarURL: {type: String, default: ''},
        posts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],
        comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
    },
    {
        timestamps: true
    }
)

const User = mongoose.model('User', userModel)
export default User