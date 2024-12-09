require('dotenv').config();
const jwt = require('jsonwebtoken');

const validateJWT = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ message: "Não autorizado!" });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ message: "Token inválido!" });

        req.userId = decoded.userId;
        next();
    })
};

module.exports = validateJWT;