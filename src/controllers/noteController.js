const userModel = require("../models/noteModel");

const noteController = {
    getAllNotes: async (req, res) => {
        const { userId } = req;

        try {
            const notes = await userModel.findAll(userId);
            if (notes.length === 0) return res.status(200).json({ message: "Nenhuma nota de servilo encontrada!" });

            return res.status(200).json(notes);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Erro ao buscar as notas de servico!" });
        }
    },

    createNote: async (req, res) => {
        const userId = req.userId;

        try {
            const data = {
                ...req.body,
                dateOfService: req.body.dateOfService ? new Date(req.body.dateOfService) : new Date(),
                userId
            };

            const note = await userModel.create(data);
            
            return res.status(201).json(note);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Erro ao criar a nota de servico!" });
        }
    }
};

module.exports = noteController;