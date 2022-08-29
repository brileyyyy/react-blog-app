import User from "../models/User.js";
import Comment from "../models/Comment.js";
import Post from "../models/Post.js";

class CommentController {
    async addComment(req, res) {
        try {
            const {postId, avatar, date, text} = req.body
            const userId = res.locals.user._id

            const user = await User.findOne({_id: userId})
            const post = await Post.findOne({_id: postId})
            const newComment = await Comment.create({avatar, text, date, user: userId, post: postId})

            user.comments.push(newComment._id)
            post.comments.push(newComment._id)

            await user.save()
            await post.save()

            return res.json(newComment)
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: 'Add comment error'})
        }
    }

    async getPostComments(req, res) {
        try {
            const comments = await Comment.find({post: req.params.postId})

            return res.json(comments)
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: 'Get post comments error'})
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

    async deleteComment(req, res) {
        try {
            const commentId = req.params.commentId

            Comment.findOneAndDelete(
                {_id: commentId},
                (err, doc) => {
                    if (err) {
                        return res.status(500).json({message: 'Delete comment error'})
                    }

                    if (!doc) {
                        return res.status(404).json({message: 'Comment in not found'})
                    }

                    return res.json(doc)
                }
            )
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: 'Delete comment error'})
        }
    }
}

export default new CommentController()