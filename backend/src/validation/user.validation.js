import {check} from 'express-validator'

export const registerValidation = [
    check('name', 'Name is too short (min 3)').isLength({ min: 3 }),
    check('email', 'Invalid email').isEmail(),
    check('password', 'Password is too short (min 5)').isLength({ min: 5 }),
    check('avatarURL').optional().isURL()
]

export const loginValidation = [
    check('email', 'Invalid email').isEmail(),
    check('password', 'Password is too short (min 5)').isLength({ min: 5 }),
]