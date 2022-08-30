import User from "../models/User.js";
import bcrypt from 'bcrypt'
import {JWTSign} from "../utils/jwt.utils.js";
import UserService from "../services/user.service.js";
import lodash from 'lodash'
const {omit} = lodash

class UserController {
    async createUser(req, res) {
        try {
            const {email, password, name} = req.body

            const user = await User.findOne({email})
            if (user) {
                return res.status(400).json({message: `User with this email already exists`})
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
            const user = await UserService.comparePassword(req.body)
            if (!user) {
                return res.status(400).json({message: 'Invalid email or password'})
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
            const userId = res.locals.user._id

            const user = await User.findOne({_id: userId})
            if (!user) {
                return res.status(401).json({message: 'Unauthorized'})
            }

            const token = JWTSign({_id: user._id}, {expiresIn: '1hr'})

            return res.json({
                token,
                user: omit(user.toJSON(), 'password')
            })
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: 'Auth error'})
        }
    }

    async getAllUsers(req, res) {
        try {
            const users = await User.find()

            return res.json(users)
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: 'Get all users error'})
        }
    }
}

export default new UserController()