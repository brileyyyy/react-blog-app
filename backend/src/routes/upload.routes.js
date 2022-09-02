import multer from "multer";
import {authMiddleware} from "../middlewares/auth.middleware.js";
import UploadController from "../controllers/upload.controller.js";

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'src/uploads')
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({storage})

const uploadRoutes = (app) => {
    app.post('/api/upload/post',
        authMiddleware, upload.single('image'), UploadController.uploadPostImage)
    app.post('/api/upload/image',
        authMiddleware, upload.single('image'), UploadController.uploadUserAvatarImage)
    app.post('/api/upload/bg_image',
        authMiddleware, upload.single('image'), UploadController.uploadUserAvatarBgImage)
}

export default uploadRoutes