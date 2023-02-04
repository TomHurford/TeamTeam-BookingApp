const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    await seedUserTypes()
}

async function seedUserTypes() {
    const userType1 = await prisma.userType.create({
        data: {
            type: 'ADMIN',
        },
    })
    const userType2 = await prisma.userType.create({
        data: {
            type: 'STUDENT',
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