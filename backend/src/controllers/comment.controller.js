import User from "../models/User.js";
import Comment from "../models/Comment.js";
import Post from "../models/Post.js";

class CommentController {
    async addComment(req, res) {
        try {
            const {author, postId, avatar, text} = req.body
            const userId = res.locals.user._id

            const user = await User.findOne({_id: userId})
            const post = await Post.findOne({_id: postId})
            await Post.updateOne(
                {_id: postId},
                {$inc: {commentsCount: 1}}
            )

            const newComment
                = await Comment.create({avatar, text, author, user: userId, post: postId})

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
            const comments = await Comment.find({post: req.params.postId}).populate('user').exec()

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

    async getAllUserComments(req, res) {
        try {
            const userId = req.params.userId
            const comments = await Comment.find({user: userId})

            const commentsCount = await Comment.find({user: userId}).count()

            return res.json({comments, commentsCount})
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: 'Get all user comments error'})
        }
    }

    async deleteComment(req, res) {
        try {
            const commentId = req.params.commentId

            await Post.updateOne(
                {comments: commentId},
                {$pull: {comments: commentId}, $inc: {commentsCount: -1}}
            )

            await User.updateOne(
                {comments: commentId},
                {$pull: {comments: commentId}}
            )

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

    async updateComment(req, res) {
        try {
            const commentId = req.params.commentId
            const {newText} = req.body

            await Comment.updateOne(
                {_id: commentId},
                {$set: {text: newText}}
            )
            const comment = await Comment.findOne({_id: commentId})

            return res.json(comment)
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: 'Update comment error'})
        }
    }
}

export default new CommentController()