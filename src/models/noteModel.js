const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const noteModel = {
    async findAll(userId) {
        return await prisma.note.findMany({
            where: { userId }
        })
    },

    async findFirst(userId) {
        return await prisma.note.findFirst({
            where: { userId },
            orderBy: { noteNumber: 'desc' }
        })
    },

    async findByNoteNumber(userId, noteNumber) {
        return await prisma.note.findFirst({
            where: {
                userId,
                noteNumber
            },
        })
    },

    async create(data) {
        return await prisma.note.create({
            data
        });
    },

    async update(id, data) {
        return await prisma.note.update({
            where: { id },
            data
        })
    },

    async delete(id) {
        return await prisma.note.delete({
            where: { id }
        })
    }
};

module.exports = noteModel;