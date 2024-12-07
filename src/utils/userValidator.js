const { body } = require('express-validator');

const validateUserBody = [
    body('name')
        .notEmpty()
        .withMessage('O nome não pode ser vazio!')
        .isString()
        .isLength({ min: 3, max: 100 })
        .withMessage('O nome deve ter entre 3 e 100 caracteres')
        .trim()
        .escape(),

    body('email')
        .notEmpty()
        .withMessage('O email não pode ser vazio!')
        .isEmail()
        .withMessage('O email deve ser um email válido')
        .trim()
        .escape(),

    body('password')
        .notEmpty()
        .withMessage('A senha não pode ser vazia')
        .isString()
        .withMessage('A senha deve ser do tipo texto!')
        .isLength({ min: 8 })
        .withMessage('A senha deve ter no mínimo 8 caracteres!')
        .trim()
        .escape()
];

module.exports = {
    validateUserBody
}