import CommentController from "../controllers/comment.controller.js";
import {authMiddleware} from "../middlewares/auth.middleware.js";

const commentRoutes = (app) => {
    app.post('/api/comment', authMiddleware, CommentController.addComment)

    app.get('/api/comment', authMiddleware, CommentController.getAllComments)
}

export default commentRoutes