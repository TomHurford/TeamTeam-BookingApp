const prisma = require('./prisma.js')
const { faker } = require('@faker-js/faker')

async function main() {
    await clearDatabase()
    seedDatabase()
}

async function seedDatabase() {
    console.log('Seeding the database...')
    await seedUserTypes()
    console.log('User types seeded!')
    await seedUsers()
    console.log('Users seeded!')
    await seedSocieties()
    console.log('Societies seeded!')
    await seedCommittee()
    console.log('Committees seeded!')
    await seedMembers()
    console.log('Members seeded!')
    await seedEvents()
    console.log('Events seeded!')
    await seedTicketTypes()
    console.log('Ticket types seeded!')
    await seedTickets()
    console.log('Tickets seeded!')
    await seedPurchase()
    console.log('Purchases seeded!')
    console.log('Database seeded!')
}

const TICKET_STATUS = ['PENDING', 'PAID', 'CANCELLED']


// I want all other functions to wait for this function to finish before continuing, 
async function clearDatabase() {
    await prisma.$executeRaw`TRUNCATE TABLE "User" CASCADE;`
    await prisma.$executeRaw`TRUNCATE TABLE "Society" CASCADE;`
    await prisma.$executeRaw`TRUNCATE TABLE "Committee" CASCADE;`
    await prisma.$executeRaw`TRUNCATE TABLE "Members" CASCADE;`
    await prisma.$executeRaw`TRUNCATE TABLE "Event" CASCADE;`
    await prisma.$executeRaw`TRUNCATE TABLE "TicketType" CASCADE;`
    await prisma.$executeRaw`TRUNCATE TABLE "Ticket" CASCADE;`
    await prisma.$executeRaw`TRUNCATE TABLE "Purchase" CASCADE;`
    await prisma.$executeRaw`TRUNCATE TABLE "UserType" CASCADE;`
    console.log('Database cleared!')
}

async function seedUserTypes() {
    await prisma.userType.create({
        data: {
            id: 1,
            type: 'ADMIN',
        },
    })
    await prisma.userType.create({
        data: {
            id: 2,
            type: 'STUDENT',
        },
    })
}

async function seedTicketTypes() {
    await prisma.ticketType.create({
        data: {
            type: 'FREE',
            price: 0,
        },
    })
    await prisma.ticketType.create({
        data: {
            type: 'PAID',
            price: 10,
        },
    })
}

async function seedUsers() {
    await prisma.user.create({
        data: {
            name: 'Admin',
            email: 'admin@admin.com',
            password: 'admin',
            type: {
                connect: {
                    id: 1,
                },
            },
        },
    })

    await prisma.user.create({
        data: {
            name: 'Student',
            email: 'student@kcl.ac.uk',
            password: 'student',
            type: {
                connect: {
                    id: 2,
                },
            },
        },
    })
    // Use faker to generate 50 random users
    for (let i = 0; i < 50; i++) {
        await prisma.user.create({
            data: {
                name: faker.name.fullName(),
                email: faker.internet.email(),
                password: faker.internet.password(),
                type: {
                    connect: {
                        id: 2,
                        
                    },
                },
            },
        })
    }
}

async function seedSocieties() {
    await prisma.society.create({
        data: {
            name: 'Society 1',
            description: 'Society 1 description',
            links: {
                create: {
                    facebook: 'https://www.facebook.com/',
                    instagram: 'https://www.instagram.com/',
                    twitter: 'https://twitter.com/',
                    website: 'https://www.google.com/',
                    logo: 'https://picsum.photos/200',
                    banner: 'https://picsum.photos/200',
                },
            },
        },
    })
    // use faker to generate 10 random societies
    for (let i = 0; i < 10; i++) {
        await prisma.society.create({
            data: {
                name: faker.company.name(),
                description: faker.lorem.paragraph(),
                links: {
                    create: {
                        facebook: faker.internet.url(),
                        instagram: faker.internet.url(),
                        twitter: faker.internet.url(),
                        website: faker.internet.url(),
                        logo: faker.image.imageUrl(),
                        banner: faker.image.imageUrl(),
                    }
                }
            },
        })
    }
}

async function seedCommittee() {
    // For each society, add 3 committee members, one user could be in multiple committees or none
    await prisma.committee.create({
        data: {
            society: {
                connect: {
                    id: 1,
                },
            },
            user: {
                connect: {
                    id: 1,
                },
            },
            role: 'President',
        },
    })
    const societies = await prisma.society.findMany()
    for (let i = 0; i < societies.length; i++) {
        const society = societies[i]
        await prisma.committee.create({
            data: {
                society: {
                    connect: {
                        id: society.id,
                    },
                },
                user: {
                    connect: {
                        id: faker.datatype.number({ min: 1, max: 50 }),
                    },
                },
                role: faker.name.jobTitle(),
            },
        })
    }
}

async function seedMembers() {
    // For each society, add 20 members, one user could be in multiple societies or none
    await prisma.members.create({
        data: {
            society: {
                connect: {
                    id: 1,
                },
            },
            user: {
                connect: {
                    id: 1,
                },
            },
        },
    })

    const societies = await prisma.society.findMany()
    for (let i = 0; i < societies.length; i++) {
        const society = societies[i]
        for (let j = 0; j < 20; j++) {
            // We need to make sure that the user is not already a member of the society
            var userID = faker.datatype.number({ min: 1, max: 50 })
            var present = true
            while (present) {
                const members = await prisma.members.findMany({
                    where: {
                        user: {
                            id: userID,
                        },
                        society: {
                            id: society.id,
                        },
                    },
                })
                if (members.length == 0) {
                    present = false
                } else {
                    userID = faker.datatype.number({ min: 1, max: 50 })
                }
            }
            
            await prisma.members.create({
                data: {
                    society: {
                        connect: {
                            id: society.id,
                        },
                    },
                    user: {
                        connect: {
                            id: userID,
                        },
                    },
                },
            })
        }
    }
}

async function seedEvents() {
    await prisma.event.create({
        data: {
            society: {
                connect: {
                    id: 1,
                },
            },
            name: 'Event 1',
            description: 'Event 1 description',
            location: 'Event 1 location',
            date: '2023-2-2T00:10:00.000Z',
        },
    })
    // For each society, add 3 events in the next 3 months
    const societies = await prisma.society.findMany()
    for (let i = 0; i < societies.length; i++) {
        const society = societies[i]
        for (let j = 0; j < 3; j++) {
            const event = await prisma.event.create({
                data: {
                    society: {
                        connect: {
                            id: society.id,
                        },
                    },
                    name: faker.lorem.words(),
                    description: faker.lorem.paragraph(),
                    location: faker.address.streetAddress(),
                    date: faker.date.future(),
                },
            })
        }
    }
}

async function seedTickets() {
    // For each event, add 20 tickets, one user could have multiple tickets or none, one ticket could be free or paid, to have a ticket you must be a member of the society
    await prisma.ticket.create({
        data: {
            event: {
                connect: {
                    id: 1,
                },
            },
            user: {
                connect: {
                    id: 1,
                },
            },
            ticketType: {
                connect: {
                    id: 1,
                },
            },
            status: TICKET_STATUS[1],
        },
    })
    const events = await prisma.event.findMany()
    for (let i = 0; i < events.length; i++) {
        const event = events[i]
        for (let j = 0; j < 20; j++) {
            const ticket = await prisma.ticket.create({
                data: {
                    event: {
                        connect: {
                            id: event.id,
                        },
                    },
                    user: {
                        connect: {
                            id: faker.datatype.number({ min: 1, max: 50 }),
                        },
                    },
                    ticketType: {
                        connect: {
                            id: faker.datatype.number({ min: 1, max: 2 }),
                        },
                    },
                    status: TICKET_STATUS[Math.floor(Math.random() * TICKET_STATUS.length)],
                },
            })
        }
    }
}

async function seedPurchase() {
    // For each ticket where the status is true, add a purchase, if one user has purchased multiple tickets, sum the total price
    await prisma.purchase.create({
        data: {
            date: new Date(),
            total: 0,
            paymentMethod: faker.finance.accountName(),
            user: {
                connect: {
                    id: 1,
                },
            },
            ticket: {
                connect: {
                    id: 1,
                }
            },
            status: TICKET_STATUS.PAID,
        },
    })

    const tickets = await prisma.ticket.findMany()
    for (let i = 0; i < tickets.length; i++) {
        const ticket = tickets[i]
        if (ticket.status == 'PAID') {
            // Calculate the total price, this is done by summing the price of each ticket that the user has purchased
            const purchases = await prisma.ticket.findMany({
                where: {
                    user: {
                        id: ticket.userId,
                    },
                    status: 'PAID',
                },
            })
            var total = 0
            for (let j = 0; j < purchases.length; j++) {
                const price = await prisma.ticketType.findUnique({
                    where: {
                        id: purchases[j].ticketTypeId,
                    },
                })
                total += price.price
            }

            const purchase = await prisma.purchase.create({
                data: {
                    ticket: {
                        connect: {
                            id: ticket.id,
                        },
                    },
                    user: {
                        connect: {
                            id: ticket.userId,
                        },
                    },
                    total: total,
                    date: faker.date.past(),
                    paymentMethod: faker.finance.accountName(),
                },
            })
        }
    }
}










main()
    .then(async() => {
        await prisma.$disconnect()
    })
    .catch(async e => {
        console.error(e)
        console.log('Error seeding database')
        await prisma.$disconnect()
        process.exit(1)
    })

//make the functions available to other modules
module.exports = {
    seedUsers,
    seedSocieties,
    seedCommittee,
    seedMembers,
    seedEvents,
    seedTickets,
    seedPurchase,
    seedDatabase,
    clearDatabase
}