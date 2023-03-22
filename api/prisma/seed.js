const prisma = require('./prisma.js');
const {faker} = require('@faker-js/faker');
const {randomString} = require('../src/utils/random.js');
const bcrypt = require('../src/utils/bcrypt.js');

/**
 * This file is used to seed the database with fake data
 */
async function main() {
  await clearDatabase();
  seedDatabase();
}

/**
 * This function is used to seed the database with fake data
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
 * This function is used to clear the database
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
 * This function is used to seed the user types
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
 * This function is used to seed the users
 */
async function seedUsers() {
  await prisma.user.create({
    data: {
      name: 'Admin',
      email: 'admin@admin.com',
      password: bcrypt.hashPassword('admin123'),
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
      password: bcrypt.hashPassword('student'),
      type: {
        connect: {
          id: 2,
        },
      },
    },
  });

  await prisma.user.create({
    data: {
      name: 'Professor',
      email: 'professor@kcl.ac.uk',
      password: bcrypt.hashPassword('professor'),
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
        password: bcrypt.hashPassword(faker.internet.password()),
        type: {
          connect: {
            id: 2,
          },
        },
      },
    });
  }
}

const randomCategory = ['Sports', 'Academic', 'Social', 'Other'];

/**
 * This function is used to seed the societies
 */
async function seedSocieties() {
  await prisma.society.create({
    data: {
      name: 'Society 1',
      email: 'society@societymail.com',
      description: 'Society 1 description',
      category: 'Other',
      links: {
        create: {
          facebook: 'https://www.facebook.com/',
          instagram: 'https://www.instagram.com/',
          twitter: 'https://twitter.com/',
          website: 'https://www.google.com/',
          logo: faker.image.abstract(200, 200),
          banner: faker.image.abstract(200, 200),
        },
      },
    },
  });
  // use faker to generate 20 random societies
  for (let i = 0; i < 20; i++) {
    await prisma.society.create({
      data: {
        name: faker.company.name(),
        email: faker.internet.email(),
        description: faker.lorem.paragraph(),
        category: randomCategory[faker.datatype.number(3)],
        links: {
          create: {
            facebook: faker.internet.url(),
            instagram: faker.internet.url(),
            twitter: faker.internet.url(),
            website: faker.internet.url(),
            logo: faker.image.abstract(200),
            banner: faker.image.abstract(200),
          },
        },
      },
    });
  }
}

/**
 * This function is used to seed the committee
 */
async function seedCommittee() {
  // For each society, add 3 committee members, one user could be in multiple
  // committees or none
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
  for (let i = 1; i < societies.length; i++) {
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
 * This function is used to seed the members
 */
async function seedMembers() {
  // For each society, add between 5 to 30 members, one user could be in
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
  for (let i = 1; i < societies.length; i++) {
    const society = societies[i];
    for (let j = 0; j < Math.floor(Math.random() * 30) + 5; j++) {
      // We need to make sure that the user is not already a member of the
      // society
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
 * This function is used to seed the events
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

  await prisma.event.create({
    data: {
      society: {
        connect: {
          id: 1,
        },
      },
      name: 'Past Event',
      description: 'This event has already happened',
      location: 'Event 1 location',
      date: new Date('2022-12-2'),
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
          banner: faker.image.city(1600, 400, randomize=true),
        },
      });
    }
  }
}

/**
 * This function is used to seed the ticket types
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
 * This function is used to seed the purchases and tickets
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

  const ticketEncode = {
    ticketTypeName: 'FREE',
    ticketTypeID: 1,
    userID: 1,
    eventID: 1,
    purchaseID: setPurchase.id,
    ticketSecret: randomString(),
  };

  const ticketText = Buffer.from(
      JSON.stringify(ticketEncode)).toString('base64');

  await prisma.ticket.create({
    data: {
      ticketData: ticketText,
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

  const setPurchasePast = await prisma.purchase.create({
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
          id: 2,
        },
      },
    },
  });

  const ticketEncodePast = {
    ticketTypeName: 'FREE',
    ticketTypeID: 1,
    userID: 1,
    eventID: 2,
    purchaseID: setPurchasePast.id,
    ticketSecret: randomString(),
  };

  const ticketTextPast = Buffer.from(
      JSON.stringify(ticketEncodePast)).toString('base64');

  await prisma.ticket.create({
    data: {
      ticketData: ticketTextPast,
      purchase: {
        connect: {
          id: setPurchasePast.id,
        },
      },
      ticketType: {
        connect: {
          id: 3,
        },
      },
      event: {
        connect: {
          id: 2,
        },
      },
      user: {
        connect: {
          id: 1,
        },
      },
    },
  });

  const setPurchasePastSecond = await prisma.purchase.create({
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
          id: 2,
        },
      },
    },
  });

  const ticketEncodePastSecond = {
    ticketTypeName: 'FREE',
    ticketTypeID: 1,
    userID: 1,
    eventID: 2,
    purchaseID: setPurchasePastSecond.id,
    ticketSecret: randomString(),
  };

  const ticketTextPastSecond = Buffer.from(
      JSON.stringify(ticketEncodePastSecond)).toString('base64');

  await prisma.ticket.create({
    data: {
      ticketData: ticketTextPastSecond,
      purchase: {
        connect: {
          id: setPurchasePastSecond.id,
        },
      },
      ticketType: {
        connect: {
          id: 3,
        },
      },
      event: {
        connect: {
          id: 2,
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
        const ticketEncode = {
          ticketTypeName: ticketType.ticketType,
          ticketTypeID: ticketType.id,
          userID: j + 1,
          eventID: i + 1,
          purchaseID: purchase.id,
          ticketSecret: randomString(),
        };

        const ticketText = Buffer.from(
            JSON.stringify(ticketEncode)).toString('base64');

        await prisma.ticket.create({
          data: {
            // ticketData: '' + (i + 4 * 3) * (j * 2 + 6) * (k * 7 * 8 + 5 * 6),
            ticketData: ticketText,
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
