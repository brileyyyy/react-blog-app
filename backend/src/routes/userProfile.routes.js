import {authMiddleware} from "../middlewares/auth.middleware.js";
import UserProfileController from "../controllers/userProfile.controller.js";

const userProfileRoutes = (app) => {
    app.get('/api/user_profile/:userId', authMiddleware, UserProfileController.getUserProfile)
}

export default userProfileRoutes