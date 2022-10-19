import User from "../models/User.js";

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
}

export default new UserProfileController()