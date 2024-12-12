const { param } = require('express-validator');

const validateNoteNumber = [
    param('noteNumber')
        .isInt({ min: 1 })
        .withMessage('O id precisa ser um número inteiro positivo')
        .toInt()
];

module.exports = validateNoteNumber;