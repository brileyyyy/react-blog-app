import multer from "multer";
import {authMiddleware} from "../middlewares/auth.middleware.js";
import UserProfileController from "../controllers/userProfile.controller.js";

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'src/uploads')
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({storage})

const userProfileRoutes = (app) => {
    app.get('/api/user_profile/:userId', authMiddleware, UserProfileController.getUserProfile)

    app.post('/api/upload/image',
        authMiddleware, upload.single('image'), UserProfileController.uploadUserAvatarImage)
    app.post('/api/upload/bg_image',
        authMiddleware, upload.single('image'), UserProfileController.uploadUserAvatarBgImage)

    app.delete('/api/upload/image', authMiddleware, UserProfileController.deleteUserAvatarImage)
    app.delete('/api/upload/bg_image', authMiddleware, UserProfileController.deleteUserAvatarBgImage)
}

export default userProfileRoutes