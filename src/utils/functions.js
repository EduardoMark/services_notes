const { validationResult } = require('express-validator');

function validateResult(req) {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
        return erros.array().map(err => err.msg)
    }
    return null;
}

module.exports = validateResult;