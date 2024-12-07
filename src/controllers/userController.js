const { validationResult } = require("express-validator");
const userModel = require("../models/userModel");

const userController = {
    getAllUsers: async (req, res) => {
        try {
            const users = await userModel.findAll();

            if (users.length === 0) return res.status(200).json({ message: "Nenhum usuário encontrado!" });

            return res.status(200).json(users);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Erro ao buscar os usuários!" });
        }
    },

    creteUser: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ message: errors.array() });

        try {
            const newUser = await userModel.createUser(req.body);

            const { name, email } = newUser;
            return res.status(201).json({ message: "Usuário criado com sucesso!", user: { name, email } });
        } catch (error) {
            if (error.code === 'P2002') return res.status(400).json({ error: "Email já cadastrado!" });

            console.error(error);
            return res.status(500).json({ error: "Erro ao tentar criar o usuário!" });
        }
    }
};

module.exports = userController;