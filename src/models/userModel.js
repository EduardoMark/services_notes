const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const userModel = {
    async findAll() {
        return await prisma.user.findMany();
    },   
}

module.exports = userModel;