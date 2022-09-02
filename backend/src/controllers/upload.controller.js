import User from "../models/User.js";

class UploadController {
    async uploadPostImage(req, res) {
        try {
            const imageURL = `http://localhost:5000/uploads/${req.file.originalname}`

            return res.json(imageURL)
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: 'Upload image error'})
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

            return res.json(imageURL)
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

            return res.json(imageURL)
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: 'Upload user avatar background image error'})
        }
    }
}

export default new UploadController()