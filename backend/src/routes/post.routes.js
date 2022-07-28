import PostController from "../controllers/post.controller.js";
import {postValidation} from "../validation/post.validation.js";
import {authMiddleware} from "../middlewares/auth.middleware.js";
import {validationMiddleware} from "../middlewares/validation.middleware.js";

const postRoutes = (app) => {
    app.post('/api/posts',
        authMiddleware,
        postValidation,
        validationMiddleware,
        PostController.createPost)

    app.get('/api/posts', PostController.getAllPosts)
    app.get('/api/posts/:id', PostController.getOnePost)

    app.delete('/api/posts/:id', authMiddleware, PostController.deletePost)

    app.patch('/api/posts/:id',
        authMiddleware,
        postValidation,
        validationMiddleware,
        PostController.updatePost)
}

export default postRoutes