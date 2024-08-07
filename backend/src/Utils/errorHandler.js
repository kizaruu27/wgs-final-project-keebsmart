const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const handleError = async (userId, errorMsg, res) => {
    const error = await prisma.errorLog.create({
        data: {
            userId,
            errorMsg
        }
    });

    res.json(error);
}

module.exports = { handleError }