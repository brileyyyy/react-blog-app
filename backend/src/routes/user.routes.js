import UserController from "../controllers/user.controller.js";
import {authMiddleware} from "../middlewares/auth.middleware.js";
import {loginValidation, registerValidation} from "../validation/user.validation.js";
import {validationMiddleware} from "../middlewares/validation.middleware.js";

const userRoutes = (app) => {
    app.post('/api/auth/register', registerValidation, validationMiddleware, UserController.createUser)

    app.post('/api/auth/login', loginValidation, validationMiddleware, UserController.createSession)

    app.get('/api/auth/me', authMiddleware, UserController.getAuth)
    app.get('/api/users', authMiddleware, UserController.getAllUsers)
}

export default userRoutes