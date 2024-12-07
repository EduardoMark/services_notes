const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const userModel = {
    async findAll() {
        return await prisma.user.findMany();
    },   

    async createUser({ name, email, password }) {
        return await prisma.user.create({
            data: {
                name,
                email,
                password
            }
        })
    }
}

module.exports = userModel;