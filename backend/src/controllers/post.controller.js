import Post from "../models/Post.js";
import User from "../models/User.js";
import Comment from "../models/Comment.js";

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
            const {sortType, sortValue} = req.query

            let posts
            switch (sortType) {
                case 'all':
                    posts = (await Post.find().populate('user').exec()).reverse()
                    break
                case 'category':
                    posts = await Post.find()
                    posts = posts.filter(post => post.tags.includes(sortValue))
                    break
                default:
                    posts = await Post.find()
                    if (sortValue[0] === '#') {
                        posts = posts.filter(post => post.tags.includes(sortValue))
                    } else {
                        posts = posts.filter(post => post.title.includes(sortValue))
                    }
                    break
            }

            return res.json(posts)
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

    async getPopularPosts(req, res) {
        try {
            const popularPosts = await Post.find().sort({'viewsCount': -1})

            return res.json(popularPosts)
        } catch(e) {
            console.log(e)
            return res.status(500).json({message: 'Get popular posts error'})
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
            const userId = res.locals.user._id

            const user = await User.findOne({_id: userId})
            const postComments = await Post.find({post: postId}, {comments: 1, _id: 0})

            await User.updateOne(
                {posts: postId},
                {$pull: {posts: postId}}
            )

            for (let el of postComments) {
                const index = user.comments.indexOf(el)
                user.comments.splice(index, 1)
            }
            await user.save()

            await Comment.deleteMany({post: postId})

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