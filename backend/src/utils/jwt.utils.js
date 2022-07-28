import jwt from "jsonwebtoken";
import config from "config";

const privateKey = config.get('secret-key')

export function JWTSign(payload, options) {
    return jwt.sign(payload, privateKey, {...(options && options)})
}

export function JWTVerify(token) {
    try {
        return jwt.verify(token, privateKey)
    } catch (e) {
        return {
            decoded: null
        }
    }
}