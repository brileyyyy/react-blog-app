import Post from "../models/Post.js";
import User from "../models/User.js";

class PostController {
    async createPost(req, res) {
        try {
            const {author, title, description, tags, imageUrl} = req.body
            const userId = res.locals.user._id

            const user = await User.findOne({_id: userId})

            const post = await Post.findOne({title, description, tags, imageUrl})
            if (post) {
                return res.status(400).json({message: 'This post already exists'})
            }

            const newPost = await Post.create({title, description, tags, author, user: userId, imageUrl})
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
            const allPosts = (await Post.find().populate('user').exec()).reverse()

            return res.json(allPosts)
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: 'Get all post error'})
        }
    }

    async getAllUserPosts(req, res) {
        try {
            const userId = req.params.userId
            const posts = await Post.find({user: userId})

            const postsCount = await Post.find({user: userId}).count()

            return res.json({posts, postsCount})
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: 'Get all user posts error'})
        }
    }

    async getOnePost(req, res) {
        try {
            const postId = req.params.postId

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
                        return res.status(404).json({message: 'Post not found'})
                    }

                    return res.json(doc)
                }
            )
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: 'Get one post error'})
        }
    }

    async getOnePostByComment(req, res) {
        try {
            const commentId = req.params.commentId

            Post.findOneAndUpdate(
                {comments: commentId},
                {$inc: {viewsCount: 1}},
                {returnDocument: 'after'},
                (err, doc) => {
                    if (err) {
                        console.log(err)
                        return res.status(500).json({message: 'Get one post by comment error'})
                    }

                    if (!doc) {
                        return res.status(404).json({message: 'Post not found'})
                    }

                    return res.json(doc)
                }
            )
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: 'Get one post by comment error'})
        }
    }

    async deletePost(req, res) {
        try {
            const postId = req.params.postId

            await User.updateOne(
                {posts: postId},
                {$pull: {posts: postId}}
            )

            Post.findOneAndDelete(
                {_id: postId},
                (err, doc) => {
                    if (err) {
                        return res.status(500).json({message: 'Delete post error'})
                    }

                    if (!doc) {
                        return res.status(404).json({message: 'Post not found'})
                    }

                    return res.json(doc)
                }
            )
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: 'Delete post error'})
        }
    }

    async updatePost(req, res) {
        try {
            const postId = req.params.postId
            const data = req.body

            await Post.updateOne(
                {_id: postId},
                {...data}
            )
            const post = await Post.findOne({_id: postId})

            return res.json(post)
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: 'Update post error'})
        }
    }

    async uploadPostImage(req, res) {
        try {
            const imageURL = `http://localhost:5000/uploads/${req.file.originalname}`

            return res.json(imageURL)
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: 'Upload post image error'})
        }
    }
}

export default new PostController()