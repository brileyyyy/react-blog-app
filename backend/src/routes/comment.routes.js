import CommentController from "../controllers/comment.controller.js";
import {authMiddleware} from "../middlewares/auth.middleware.js";

const commentRoutes = (app) => {
    app.post('/api/comment', authMiddleware, CommentController.addComment)

    app.get('/api/comment/:postId', authMiddleware, CommentController.getPostComments)
    app.get('/api/comment', authMiddleware, CommentController.getAllComments)

    app.delete('/api/comment/:commentId', authMiddleware, CommentController.deleteComment)

    app.patch('/api/comment/:commentId', authMiddleware, CommentController.updateComment)
}

export default commentRoutes