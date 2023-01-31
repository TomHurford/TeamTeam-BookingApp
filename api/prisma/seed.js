const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    // Add userTypes
    const userType1 = await prisma.userType.create({
        data: {
            type: 'admin',
        },
    })
    const userType2 = await prisma.userType.create({
        data: {
            type: 'student',
        },
    })
}

main()
    .then(async() => {
        await prisma.$disconnect()
    })
    .catch(async e => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })