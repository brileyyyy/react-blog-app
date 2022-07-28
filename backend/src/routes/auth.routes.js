import UserController from "../controllers/user.controller.js";
import {authMiddleware} from "../middlewares/auth.middleware.js";
import {loginValidation, registerValidation} from "../validation/user.validation.js";

const authRoutes = (app) => {
    app.post('/api/auth/register', registerValidation, UserController.createUser)

    app.post('/api/auth/login', loginValidation, UserController.createSession)

    app.get('/api/auth/me', authMiddleware, UserController.getAuth)
}

export default authRoutes