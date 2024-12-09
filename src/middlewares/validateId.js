const { param } = require('express-validator');

const validateId = [
    param('id')
        .isInt({ min: 1 })
        .withMessage('O id precisa ser um número inteiro positivo')
        .toInt()
];

module.exports = validateId;