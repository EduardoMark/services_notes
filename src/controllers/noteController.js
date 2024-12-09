const noteModel = require("../models/noteModel");
const { validationResult } = require('express-validator');

const noteController = {
    getAllNotes: async (req, res) => {
        const { userId } = req;

        try {
            const notes = await noteModel.findAll(userId);
            if (notes.length === 0) return res.status(200).json({ message: "Nenhuma nota de servilo encontrada!" });

            return res.status(200).json(notes);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Erro ao buscar as notas de servico!" });
        }
    },

    createNote: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ message: errors.array() });

        const userId = req.userId;

        try {
            const data = {
                ...req.body,
                dateOfService: req.body.dateOfService ? new Date(req.body.dateOfService) : new Date(),
                userId
            };

            const note = await noteModel.create(data);

            return res.status(201).json(note);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Erro ao criar a nota de serviço!" });
        }
    },

    updateNote: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ message: errors.array() });

        const { id } = req.params;
        const userId = req.userId;

        try {
            const note = await noteModel.findUniqueById(id);

            if (!note || note.userId !== userId) return res.status(403).json({ message: "Você não tem permissão para alterar essa nota" });

            const isEmpty = Object.keys(req.body).length === 0;
            if (isEmpty) return res.status(400).json({ message: "Nenhuma informação informada!" });

            const data = {
                ...req.body,
                dateOfService: req.body.dateOfService ? new Date(req.body.dateOfService) : new Date()
            };

            const updatedNote = await noteModel.update(id, data);

            return res.status(200).json(updatedNote);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Erro ao atualizar a nota de serviço!" });
        }
    }
};

module.exports = noteController;