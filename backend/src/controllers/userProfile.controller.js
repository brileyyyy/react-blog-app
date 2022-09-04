import User from "../models/User.js";
import DeleteImageService from "../services/deleteImage.service.js";
import Comment from "../models/Comment.js";

class UserProfileController {
    async getUserProfile(req, res) {
        try {
            const userId = req.params.userId
            const foundUser = await User.findOne({_id: userId})

            return res.json(foundUser)
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: 'Get one user error'})
        }
    }

    async uploadUserAvatarImage(req, res) {
        try {
            const imageURL = `http://localhost:5000/uploads/${req.file.originalname}`
            const userId = res.locals.user._id

            await User.updateOne(
                {_id: userId},
                {$set: {avatarUrl: imageURL}}
            )
            await Comment.updateMany(
                {user: userId},
                {$set: {avatar: imageURL}}
            )
            const user = await User.findOne({_id: userId})

            return res.json(user)
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: 'Upload user avatar image error'})
        }
    }

    async uploadUserAvatarBgImage(req, res) {
        try {
            const imageURL = `http://localhost:5000/uploads/${req.file.originalname}`
            const userId = res.locals.user._id

            await User.updateOne(
                {_id: userId},
                {$set: {backgroundAvatarUrl: imageURL}}
            )
            const user = await User.findOne({_id: userId})

            return res.json(user)
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: 'Upload user avatar background image error'})
        }
    }

    async deleteUserAvatarImage(req, res) {
        try {
            const userId = res.locals.user._id
            const filePath = req.body.filePath

            DeleteImageService.getUploadPath(filePath)

            await User.updateOne(
                {_id: userId},
                {$set: {avatarUrl: 'https://i.imgur.com/TF0ZEH7.jpg'}}
            )

            return res.json({message: 'Avatar image was deleted'})
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: 'Delete user avatar image error'})
        }
    }

    async deleteUserAvatarBgImage(req, res) {
        try {
            const userId = res.locals.user._id
            const filePath = req.body.filePath

            DeleteImageService.getUploadPath(filePath)

            await User.updateOne(
                {_id: userId},
                {$set: {backgroundAvatarUrl: 'https://i.imgur.com/TF0ZEH7.jpg'}}
            )

            return res.json({message: 'Background avatar image was deleted'})
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: 'Delete user avatar background image error'})
        }
    }
}

export default new UserProfileController()