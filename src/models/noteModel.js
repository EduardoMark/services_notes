const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const noteModel = {
    async findAll(userId) {
        return await prisma.note.findMany({
            where: {userId}
        })
    },

    async create(data) {
        return await prisma.note.create({
            data
        });
    }
};

module.exports = noteModel;