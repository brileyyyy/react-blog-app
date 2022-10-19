import multer from "multer";
import PostController from "../controllers/post.controller.js";
import {postValidation} from "../validation/post.validation.js";
import {authMiddleware} from "../middlewares/auth.middleware.js";
import {validationMiddleware} from "../middlewares/validation.middleware.js";

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'src/uploads')
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({storage})

const postRoutes = (app) => {
    app.post('/api/posts',
        authMiddleware, postValidation, validationMiddleware, PostController.createPost)
    app.post('/api/posts/upload',
        authMiddleware, upload.single('image'), PostController.uploadPostImage)

    app.get('/api/posts', PostController.getAllPosts)
    app.get('/api/posts/user/:userId', authMiddleware, PostController.getAllUserPosts)
    app.get('/api/posts/:postId', PostController.getOnePost)
    app.get('/api/posts/comment/:commentId', PostController.getOnePostByComment)
    app.get('/api/posts-popular', PostController.getPopularPosts)

    app.delete('/api/posts/:postId', authMiddleware, PostController.deletePost)

    app.patch('/api/posts/:postId',
        authMiddleware, postValidation, validationMiddleware, PostController.updatePost)
}

export default postRoutes