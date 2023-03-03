const prisma = require('./prisma.js');
const {faker} = require('@faker-js/faker');

/**
 * Seed the database with some dummy data
 */
async function main() {
  await clearDatabase();
  seedDatabase();
}

/**
 * Seed the database with some dummy data
 */
async function seedDatabase() {
  console.log('Seeding the database...');
  await seedUserTypes();
  console.log('User types seeded!');
  await seedUsers();
  console.log('Users seeded!');
  await seedSocieties();
  console.log('Societies seeded!');
  await seedCommittee();
  console.log('Committees seeded!');
  await seedMembers();
  console.log('Members seeded!');
  await seedEvents();
  console.log('Events seeded!');
  await seedTicketTypes();
  console.log('Ticket types seeded!');
  await seedPurchasesandTickets();
  console.log('Tickets and Purchases seeded!');
  console.log('Database seeded!');
}

/**
 * Clear the database
 */
async function clearDatabase() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "Society" CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "Committee" CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "Members" CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "Event" CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "TicketType" CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "Ticket" CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "Purchase" CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "UserType" CASCADE;`;
  console.log('Database cleared!');
}

/**
 * Seed the user types
 */
async function seedUserTypes() {
  await prisma.userType.create({
    data: {
      id: 1,
      type: 'ADMIN',
    },
  });
  await prisma.userType.create({
    data: {
      id: 2,
      type: 'STUDENT',
    },
  });
}

/**
 * Seed the users
 */
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
  });

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
  });
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
    });
  }
}

/**
 * Seed the societies
 */
async function seedSocieties() {
  await prisma.society.create({
    data: {
      name: 'Society 1',
      email: 'society@societymail.com',
      description: 'Society 1 description',
      category: faker.random.word(),
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
  });
  // use faker to generate 10 random societies
  for (let i = 0; i < 10; i++) {
    await prisma.society.create({
      data: {
        name: faker.company.name(),
        email: faker.internet.email(),
        description: faker.lorem.paragraph(),
        category: faker.random.word(),
        links: {
          create: {
            facebook: faker.internet.url(),
            instagram: faker.internet.url(),
            twitter: faker.internet.url(),
            website: faker.internet.url(),
            logo: faker.image.imageUrl(),
            banner: faker.image.imageUrl(),
          },
        },
      },
    });
  }
}

/**
 * Seed the committees
 */
async function seedCommittee() {
  // For each society, add 3 committee members, one user could be in
  // multiple committees or none
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
      isPresident: true,
    },
  });
  const societies = await prisma.society.findMany();
  for (let i = 0; i < societies.length; i++) {
    const society = societies[i];
    const userId = faker.datatype.number({min: 1, max: 50});
    // Make sure the user is not already in the committee
    const userInCommittee = await prisma.committee.findMany({
      where: {
        societyId: society.id,
        userId: userId,
      },
    });
    if (userInCommittee.length == 0) {
      await prisma.committee.create({
        data: {
          society: {
            connect: {
              id: society.id,
            },
          },
          user: {
            connect: {
              id: userId,
            },
          },
          role: faker.name.jobTitle(),
          isPresident: true,
        },
      });
    }
  }
}

/**
 * Seed the members
 */
async function seedMembers() {
  // For each society, add 20 members, one user could be in
  // multiple societies or none
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
  });

  const societies = await prisma.society.findMany();
  for (let i = 0; i < societies.length; i++) {
    const society = societies[i];
    for (let j = 0; j < 20; j++) {
      // We need to make sure that the user is not already a member
      // of the society
      let userID = faker.datatype.number({min: 1, max: 50});
      let present = true;
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
        });
        if (members.length == 0) {
          present = false;
        } else {
          userID = faker.datatype.number({min: 1, max: 50});
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
      });
    }
  }
}

/**
 * Seed the events
 */
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
      date: new Date('2023-12-2'),
      isArchived: false,
    },
  });
  // For each society, add 3 events in the next 3 months
  const societies = await prisma.society.findMany();
  for (let i = 0; i < societies.length; i++) {
    const society = societies[i];
    for (let j = 0; j < 3; j++) {
      await prisma.event.create({
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
          isArchived: false,
        },
      });
    }
  }
}

/**
 * Seed the ticket types
 */
async function seedTicketTypes() {
  const events = await prisma.event.findMany();
  for (let i = 0; i < events.length; i++) {
    const event = events[i];
    await prisma.ticketType.create({
      data: {
        ticketType: 'FREE',
        price: 0,
        quantity: 100,
        event: {
          connect: {
            id: event.id,
          },
        },
      },
    });
    await prisma.ticketType.create({
      data: {
        ticketType: 'PAID',
        price: 10,
        quantity: 100,
        event: {
          connect: {
            id: event.id,
          },
        },
      },
    });
  }
}

/**
 * Seed the purchases and tickets
 */
async function seedPurchasesandTickets() {
  // For each event, sell tickets of each type to different users
  const setPurchase = await prisma.purchase.create({
    data: {
      total: 0,
      paymentMethod: 'paypal',
      user: {
        connect: {
          id: 1,
        },
      },
      event: {
        connect: {
          id: 1,
        },
      },
    },
  });

  await prisma.ticket.create({
    data: {
      ticketData: 'sdgsgbsfgbsumfin',
      purchase: {
        connect: {
          id: setPurchase.id,
        },
      },
      ticketType: {
        connect: {
          id: 1,
        },
      },
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
    },
  });

  const events = await prisma.event.findMany();
  for (let i = 0; i < events.length; i++) {
    const offset = faker.datatype.number({min: 1, max: 44});
    for (let j = offset; j < offset + 5; j++) {
      const qoftickets = faker.datatype.number({min: 1, max: 10});
      const ticketTypes = await prisma.ticketType.findMany({
        where: {eventId: i + 1},
      });
      const ticketType = ticketTypes[faker.datatype.number({min: 0, max: 1})];
      const purchase = await prisma.purchase.create({
        data: {
          total: ticketType.price * qoftickets,
          paymentMethod: 'paypal',
          user: {
            connect: {
              id: j + 1,
            },
          },
          event: {
            connect: {
              id: i + 1,
            },
          },
        },
      });
      for (let k = 0; k < qoftickets; k++) {
        await prisma.ticket.create({
          data: {
            ticketData: '' + (i + 4 * 3) * (j * 2 + 6) * (k * 7 * 8 + 5 * 6),
            purchase: {
              connect: {
                id: purchase.id,
              },
            },
            ticketType: {
              connect: {
                id: ticketType.id,
              },
            },
            event: {
              connect: {
                id: i + 1,
              },
            },
            user: {
              connect: {
                id: j + 1,
              },
            },
          },
        });
      }
    }
  }
}

main()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      console.log('Error seeding database');
      await prisma.$disconnect();
      process.exit(1);
    });

// make the functions available to other modules
module.exports = {
  seedUsers,
  seedSocieties,
  seedCommittee,
  seedMembers,
  seedEvents,
  seedPurchasesandTickets,
  seedDatabase,
  clearDatabase,
};
