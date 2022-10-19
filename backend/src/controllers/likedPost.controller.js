import Post from "../models/Post.js";

class LikedPostController {
    async createLikedPost(req, res) {
        try {
            const userId = res.locals.user._id
            const postId = req.params.postId

            await Post.updateOne(
                {_id: postId},
                {$push: {likes: userId}}
            )
            const post = await Post.findOne({_id: postId})

            return res.json(post)
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: 'Create liked post error'})
        }
    }

    async getLikedPosts(req, res) {
        try {
            const userId = res.locals.user._id
            const likedPosts = (await Post.find({likes: userId}).exec()).reverse()

            return res.json(likedPosts)
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: 'Get liked posts error'})
        }
    }

    async deleteLikedPost(req, res) {
        try {
            const userId = res.locals.user._id
            const postId = req.params.postId

            await Post.updateOne(
                {_id: postId},
                {$pull: {likes: userId}}
            )
            const post = await Post.findOne({_id: postId})

            return res.json(post)
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: 'Delete liked post error'})
        }
    }
}

export default new LikedPostController()