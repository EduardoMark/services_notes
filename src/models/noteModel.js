const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const noteModel = {
    async findAll(userId) {
        return await prisma.note.findMany({
            where: {userId}
        })
    },

    async findUniqueById(id) {
        return await prisma.note.findUnique({ where: { id } });
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
    }
};

module.exports = noteModel;