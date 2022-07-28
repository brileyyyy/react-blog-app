import {check} from 'express-validator'

export const registerValidation = [
    check('email', 'Invalid email').isEmail(),
    check('password', 'Password is too short').isLength({ min: 5 }),
    check('name', 'Name is too short').isLength({ min: 3 }),
    check('avatarURL').optional().isURL()
]

export const loginValidation = [
    check('email', 'Invalid email').isEmail(),
    check('password', 'Password is too short').isLength({ min: 5 }),
]