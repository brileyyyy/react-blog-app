import {body} from "express-validator";

export const postValidation = [
    body('title', 'Title is too short').isLength({min: 3}),
    body('description', 'Description is too short').isLength({min: 3}),
    body('tags', 'Invalid tags format').optional().isArray(),
    body('imageUrl', 'Invalid image Url').optional().isString()
]