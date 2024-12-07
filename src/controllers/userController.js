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
};

module.exports = userController;