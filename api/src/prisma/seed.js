const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    // Seed your database here
    console.log('Seeding database...')
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