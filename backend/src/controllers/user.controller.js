import User from "../models/User.js";
import bcrypt from 'bcrypt'
import {validationResult} from 'express-validator'
import {JWTSign} from "../utils/jwt.utils.js";

class UserController {
    async createUser(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json(errors.array())
            }

            const {email, password, name} = req.body

            const user = await User.findOne({email})
            if (user) {
                return res.status(400).json({message: `User with email ${email} already exists`})
            }

            const hashPassword = bcrypt.hashSync(password, 8)
            await User.create({email, password: hashPassword, name})

            return res.json({message: 'User was created'})
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: 'Registration failed'})
        }
    }

    async createSession(req, res) {
        try {
            const {email, password} = req.body

            const user = await User.findOne({email})
            if (!user) {
                return res.status(404).json({message: 'User not found'})
            }

            const isValidPassword = await bcrypt.compare(password, user.password)
            if (!isValidPassword) {
                return res.status(401).json({message: 'Invalid email or password'})
            }

            const token = JWTSign({_id: user._id}, {expiresIn: '1hr'})

            return res.json({
                token,
                user
            })
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: 'Login failed'})
        }
    }

    async getAuth(req, res) {
        try {
            const userId = res.locals.user?._id

            const user = await User.findOne({_id: userId})
            if (!user) {
                return res.status(401).json({message: 'Unauthorized'})
            }

            const token = JWTSign({_id: user._id}, {expiresIn: '1hr'})

            return res.json({
                token,
                user
            })
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: 'Auth error'})
        }
    }
}

export default new UserController()