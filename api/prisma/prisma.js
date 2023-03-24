// This file is used to create a single instance of the Prisma Client.


const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = prisma;
