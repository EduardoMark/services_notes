require('dotenv').config();
const { validationResult } = require("express-validator");
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userController = {
    getUserData: async (req, res) => {
        const userId = req.userId;

        try {
            const user = await userModel.findUniqueById(userId);
            if (!user) return res.status(404).json({ message: "Nenhum usuário encontrado!" });

            return res.status(200).json({ user: { name: user.name, email: user.email } });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Erro ao buscar os usuários!" });
        }
    },

    creteUser: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ message: errors.array() });

        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            req.body.password = hashedPassword;
            const newUser = await userModel.createUser(req.body);

            return res.status(201).json({ message: "Usuário criado com sucesso!", user: { name: newUser.name, email: newUser.email } });
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
            const userId = req.userId;

            const isEmpty = Object.keys(req.body).length === 0;
            if (isEmpty) return res.status(400).json({ message: "Nenhuma dado informado!" });

            const { name, email, currentPassword, newPassword } = req.body;

            const user = await userModel.findUniqueById(userId);
            if (!user) return res.status(404).json({ message: "Usuário não encontrado!" });

            if (newPassword && !currentPassword) return res.status(400).json({ message: "Senha atual obrigatória!" });
            if (currentPassword && !newPassword) return res.status(400).json({ message: "Nova senha obrigatória!" });

            let hashedPassword;
            if (newPassword && currentPassword) {
                const comparePassword = await bcrypt.compare(currentPassword, user.password);
                if (!comparePassword) return res.status(400).json({ message: "Senha atual incorreta!" });

                hashedPassword = await bcrypt.hash(newPassword, 10);
            }

            if (email) {
                const existingUser = await userModel.findUniqueByEmail(email);
                if (existingUser && existingUser.id !== userId) {
                    return res.status(400).json({ message: "Email ja cadastrado!" });
                }
            }

            const data = {};
            if (name) data.name = name;
            if (email) data.email = email;
            if (hashedPassword) data.password = hashedPassword;

            await userModel.updateUser(userId, data);
            return res.status(200).json({ message: "Usuário atualizado com sucesso!" });
        } catch (error) {
            // console.error(error);
            console.error("Erro ao atualizar usuário:", {
                userId,
                errorMessage: error.message,
                stack: error.stack,
            });
            return res.status(500).json({ error: "Erro ao tentar atualizar o usuário!" });
        }
    },

    deleteUser: async (req, res) => {
        const userId = req.userId;

        try {
            const user = await userModel.findUniqueById(userId);
            if (!user) return res.status(404).json({ message: "Usuário não encontrado!" });

            const deletedUser = await userModel.deleteUser(userId);
            return res.status(200).json({ message: "Usuário deletado com sucesso!", user: deletedUser.email });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Erro ao tentar deletar o usuário! " });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await userModel.findUniqueByEmail(email);
            if (!user) return res.status(400).json({ message: "Email ou senha inválidos!" });

            const comparePassword = await bcrypt.compare(password, user.password);
            if (!comparePassword) return res.status(400).json({ message: "Email ou senha inválidos!" });

            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

            return res.status(200).json({ auth: true, token });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Erro ao tentar logar!" });
        }
    }
};

module.exports = userController;