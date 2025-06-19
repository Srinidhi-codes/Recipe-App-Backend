const { PrismaClient } = require("../../prisma/generated/prisma");

const prisma = new PrismaClient({
    log: ["query"],
});

module.exports = prisma;