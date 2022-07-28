import {JWTVerify} from "../utils/jwt.utils.js";

export const authMiddleware = (req, res, next) => {
    if (req.method === 'OPTIONS') return next()

    try {
        const accessToken = req.headers.authorization?.split(' ')[1]
        if (!accessToken) return next()

        const decoded = JWTVerify(accessToken)
        if (decoded) {
            res.locals.user = decoded
            return next()
        }

        return next()
    } catch (e) {
        return res.status(401).json({message: 'Authorization error'})
    }
}