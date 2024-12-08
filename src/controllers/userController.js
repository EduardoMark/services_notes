const { validationResult } = require("express-validator");
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

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
    },

    updateUser: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ message: errors.array() });

        try {
            const { id } = req.params;
            const { name, email, newPassword, currentPassword } = req.body;
            if (!name && !email && !newPassword && !currentPassword) return res.status(200).json({ message: "Nenhum dado informado!" });

            const user = await userModel.findUnique(id);
            if (!user) return res.status(400).json({ message: "Usuário não encontrado!" });
            console.log(newPassword, user.password);
            console.log(currentPassword);

            if (!(user.password === currentPassword)) return res.status(400).json({ message: "Senha atual incorreta!" });

            const data = {};
            if (name) data.name = name;
            if (email) data.email = email;
            if (newPassword) data.password = newPassword;

            await userModel.updateUser(+id, data);
            return res.status(200).json({ message: "Usuário atualizado com sucesso!" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Erro ao tentar atualizar o usuário!" });
        }
    },

    deleteUser: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ message: errors.array() });

        try {
            const { id } = req.params;
            const user = await userModel.findUnique(id);
            if (!user) return res.status(400).json({ message: "Usuário não encontrado!" });

            const deletedUser = await userModel.deleteUser(id);
            return res.status(200).json({ message: "Usuário deletado com sucesso!", user: deletedUser.email });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Erro ao tentar deletar o usuário! "});
        }
    }
};

module.exports = userController;