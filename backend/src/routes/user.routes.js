import UserController from "../controllers/user.controller.js";
import {authMiddleware} from "../middlewares/auth.middleware.js";
import {loginValidation, registerValidation} from "../validation/user.validation.js";
import {validationMiddleware} from "../middlewares/validation.middleware.js";
import multer from "multer";

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'src/uploads')
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({storage})

const userRoutes = (app) => {
    app.post('/api/auth/register', registerValidation, validationMiddleware, UserController.createUser)
    app.post('/api/auth/login', loginValidation, validationMiddleware, UserController.createSession)
    app.post('/api/upload/image',
        authMiddleware, upload.single('image'), UserController.uploadUserAvatarImage)
    app.post('/api/upload/bg_image',
        authMiddleware, upload.single('image'), UserController.uploadUserAvatarBgImage)

    app.get('/api/auth/me', authMiddleware, UserController.getAuth)
    app.get('/api/users', authMiddleware, UserController.getAllUsers)

    app.delete('/api/upload/image', authMiddleware, UserController.deleteUserAvatarImage)
    app.delete('/api/upload/bg_image', authMiddleware, UserController.deleteUserAvatarBgImage)
}

export default userRoutes