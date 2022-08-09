import User from "../models/User.js";
import Comment from "../models/Comment.js";

class CommentController {
    async addComment(req, res) {
        try {
            const {avatar, date, text} = req.body
            const userId = res.locals.user._id

            const user = await User.findOne({_id: userId})
            const newComment = await Comment.create({avatar, date, user: userId, text})

            user.comments.push(newComment._id)

            await user.save()

            return res.json(newComment)
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: 'Add comment error'})
        }
    }

    async getAllComments(req, res) {
        try {
            const comments = await Comment.find()

            return res.json(comments)
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: 'Get all comments error'})
        }
    }
}

export default new CommentController()