const noteModel = require("../models/noteModel");

const noteController = {
    getAllNotes: async (req, res) => {
        const { userId } = req;

        try {
            const notes = await noteModel.findAll(userId);
            if (notes.length === 0) return res.status(404).json({ message: "Nenhuma nota de serviço encontrada!" });

            return res.status(200).json(notes);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Erro ao buscar as notas de servico!" });
        }
    },

    createNote: async (req, res) => {
        const errorMessage = validateResult(req);
        if (errorMessage) {
            return res.status(400).json({ errors: errorMessage });
        }

        const userId = req.userId;

        try {
            const lastNote = await noteModel.findFirst(userId);

            const nextNoteNumber = lastNote ? lastNote.noteNumber + 1 : 1;

            const data = {
                ...req.body,
                noteNumber: nextNoteNumber,
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
        const errorMessage = validateResult(req);
        if (errorMessage) {
            return res.status(400).json({ errors: errorMessage });
        }

        const { noteNumber } = req.params;
        const userId = req.userId;

        try {
            const note = await noteModel.findByNoteNumber(userId, noteNumber);

            if (!note) return res.status(404).json({ message: "Nota não encontrada!" });

            const isEmpty = Object.keys(req.body).length === 0;
            if (isEmpty) return res.status(400).json({ message: "Nenhuma dado informado!" });

            const data = {
                ...req.body,
                dateOfService: req.body.dateOfService ? new Date(req.body.dateOfService) : new Date()
            };

            const updatedNote = await noteModel.update(note.id, data);

            return res.status(200).json(updatedNote);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Erro ao atualizar a nota de serviço!" });
        }
    },

    deleteNote: async (req, res) => {
        const errorMessage = validateResult(req);
        if (errorMessage) {
            return res.status(400).json({ errors: errorMessage });
        }

        const { noteNumber } = req.params;
        const userId = req.userId;

        try {
            const note = await noteModel.findByNoteNumber(userId, noteNumber);
            if (!note) return res.status(404).json({ message: "Nota não encontrada" });

            const deletedNote = await noteModel.delete(note.id);

            return res.status(200).json({ message: "Nota deletada com sucesso!", note: deletedNote });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ erro: "Erro ao tentar deletar a nota." });
        }
    }
};

module.exports = noteController;