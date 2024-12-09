const { body } = require('express-validator');

const validateNotePostBody = [
    body('technicalName')
        .notEmpty().withMessage('O nome técnico é obrigatório.')
        .isString().withMessage('O nome técnico deve ser uma string.')
        .isLength({ min: 3, max: 255 }).withMessage('O nome técnico deve ter entre 3 e 255 caracteres.')
        .trim().escape(),

    body('description')
        .notEmpty().withMessage('A descrição é obrigatória.')
        .isString().withMessage('A descrição deve ser uma string.')
        .trim().escape(),

    body('dateOfService')
        .optional()
        .matches(/^\d{4}-\d{2}-\d{2}$/).withMessage('A data do serviço deve estar no formato YYYY-MM-DD.')
        .trim().escape(),

    body('guarantee')
        .notEmpty().withMessage('O campo de garantia é obrigatório.')
        .isString().withMessage('A garantia deve ser uma string.')
        .trim().escape(),

    body('price')
        .optional()
        .isDecimal({ decimal_digits: '0,2' }).withMessage('O preço deve ser um valor decimal com até duas casas decimais.'),

    body('nameOfClient')
        .notEmpty().withMessage('O nome do cliente é obrigatório.')
        .isString().withMessage('O nome do cliente deve ser uma string.')
        .isLength({ min: 3, max: 255 }).withMessage('O nome do cliente deve ter entre 3 e 255 caracteres.')
        .trim().escape(),

    body('clientPhone')
        .optional()
        .isString().withMessage('O telefone do cliente deve ser uma string.')
        .isLength({ max: 20 }).withMessage('O telefone do cliente pode ter no máximo 20 caracteres.')
        .trim().escape(),

    body('clientAddress')
        .optional()
        .isString().withMessage('O endereço do cliente deve ser uma string.')
        .isLength({ max: 100 }).withMessage('O endereço do cliente pode ter no máximo 100 caracteres.')
        .trim().escape(),

    body('status')
        .optional()
        .isString().withMessage('O status deve ser uma string.'),

    body('userId')
        .isInt().withMessage('O ID do usuário deve ser um número inteiro.')
        .notEmpty().withMessage('O ID do usuário é obrigatório.'),
];

module.exports = {
    validateNotePostBody
};