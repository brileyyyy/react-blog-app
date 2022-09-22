import {authMiddleware} from "../middlewares/auth.middleware.js";
import tagController from "../controllers/tag.Controller.js";

const tagRoutes = (app) => {
    app.get('/api/tags', authMiddleware, tagController.getPopularTags)
}

export default tagRoutes