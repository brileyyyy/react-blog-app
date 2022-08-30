import {authMiddleware} from "../middlewares/auth.middleware.js";
import LikedPostController from "../controllers/likedPost.controller.js";

const likedPostRoutes = (app) => {
    app.post('/api/liked_posts/:postId', authMiddleware, LikedPostController.createLikedPost)

    app.get('/api/liked_posts', authMiddleware, LikedPostController.getLikedPosts)

    app.patch('/api/liked_posts/:postId', authMiddleware, LikedPostController.deleteLikedPost)
}

export default likedPostRoutes