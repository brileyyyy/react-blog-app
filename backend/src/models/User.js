import mongoose from "mongoose"

const userModel = new mongoose.Schema(
    {
        email: {type: String, require: true, unique: true},
        password: {type: String, require: true},
        name: {type: String, require: true},
        avatarURL: {
            type: String,
            default: 'http://s1.bwallpapers.com/wallpapers/2014/05/09/blue-color_034147333.jpg'
        },
        posts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],
        comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
    },
    {
        timestamps: true
    }
)

const User = mongoose.model('User', userModel)
export default User