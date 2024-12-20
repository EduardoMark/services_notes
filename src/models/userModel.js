const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const userModel = {
    async findAll() {
        return await prisma.user.findMany();
    },

    async findUniqueById(id) {
        return await prisma.user.findUnique({ where: { id } });
    },

    async findUniqueByEmail(email) {
        return await prisma.user.findUnique({ where: { email } });
    },

    async createUser({ name, email, password }) {
        return await prisma.user.create({
            data: {
                name,
                email,
                password
            }
        })
    },

    async updateUser(id, data) {
        return await prisma.user.update({
            where: { id },
            data
        })
    },

    async deleteUser(id) {
        return await prisma.user.delete({
            where: { id }
        });
    }
}

module.exports = userModel;