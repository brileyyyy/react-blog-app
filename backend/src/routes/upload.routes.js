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
    app.post('/api/upload', authMiddleware, upload.single('image'), UploadController.uploadImage)
}

export default uploadRoutes