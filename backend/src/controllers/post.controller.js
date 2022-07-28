import Post from "../models/Post.js";
import User from "../models/User.js";

class PostController {
    async createPost(req, res) {
        try {
            const {title, description, tags, imageUrl} = req.body
            const userId = res.locals.user._id

            const user = await User.findOne({_id: userId})

            const post = await Post.findOne({title, description, tags, imageUrl})
            if (post) {
                return res.status(400).json({message: 'This post is already exists'})
            }

            const newPost = await Post.create({title, description, tags, user: userId, imageUrl})
            user.posts.push(newPost._id)

            await user.save()

            return res.json(newPost)
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: 'Create post error'})
        }
    }

    async getAllPosts(req, res) {
        try {
            const allPosts = await Post.find().populate('user').exec()

            return res.json(allPosts)
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: 'Get all post error'})
        }
    }

    async getOnePost(req, res) {
        try {
            const postId = req.params.id
            Post.findOneAndUpdate(
                {_id: postId},
                {$inc: {viewsCount: 1}},
                {returnDocument: 'after'},
                (err, doc) => {
                    if (err) {
                        console.log(err)
                        return res.status(500).json({message: 'Get one post error'})
                    }

                    if (!doc) {
                        return res.status(404).json({message: 'Post in not found'})
                    }

                    return res.json(doc)
                }
            )
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: 'Get one post error'})
        }
    }

    async deletePost(req, res) {
        try {
            const postId = req.params.id
            Post.findOneAndDelete(
                {_id: postId},
                (err, doc) => {
                    if (err) {
                        return res.status(500).json({message: 'Delete post error'})
                    }

                    if (!doc) {
                        return res.status(404).json({message: 'Post in not found'})
                    }

                    return res.json({message: 'Post was deleted'})
                }
            )
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: 'Delete post error'})
        }
    }

    async updatePost(req, res) {
        try {
            const postId = req.params.id
            const data = req.body

            await Post.updateOne(
                {_id: postId},
                {...data}
            )

            return res.json({message: 'Post was updated'})
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: 'Update post error'})
        }
    }
}

export default new PostController()