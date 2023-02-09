const prisma = require("../../prisma/prisma.js");

// I want to test the database by testing the constraints on the database

test("UserType type must be unique", // Attempt to create a user type with the id 1 and type 'ADMIN'
// This should throw an error because the id 1 is already taken
async () => {
  await expect(
    prisma.userType.create({
      data: {
        id: 1,
        type: "ADMIN",
      },
    })
  ).rejects.toThrow();
});

test("User email must be unique", async () => {
  await expect(
    prisma.user.create({
      data: {
        name: "Admin",
        email: "admin@admin.com",
        password: "admin",
        type: {
          connect: {
            id: 1,
          },
        },
      },
    })
  ).rejects.toThrow();
});

test("Society name must be unique", async () => {
  await expect(
    prisma.society.create({
      data: {
        name: "Society 1",
        description: "Society 1 description",
        committee: {
          connect: {
            id: 1,
          },
        },
      },
    })
  ).rejects.toThrow();
});

test("Society should not be able to have two link records", async () => {
  await expect(
    prisma.societyLinks.create({
      data: {
        society: {
          connect: {
            id: 1,
          },
        },
        link: "https://www.google.com",
      },
    })
  ).rejects.toThrow();
});

test("A user should not be in a committee twice", async () => {
  await expect(
    prisma.committee.create({
      data: {
        user: {
          connect: {
            id: 1,
          },
        },
        society: {
          connect: {
            id: 1,
          },
        },
      },
    })
  ).rejects.toThrow();
});

test("A user should not be a member of a society twice", async () => {
  await expect(
    prisma.members.create({
      data: {
        user: {
          connect: {
            id: 1,
          },
        },
        society: {
          connect: {
            id: 1,
          },
        },
      },
    })
  ).rejects.toThrow();
});

test("A ticket should not have two records with the same userId and eventId", async () => {
  await expect(
    prisma.ticket.create({
      data: {
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
    })
  ).rejects.toThrow();
});

test("A user should not be able to purchase the same ticket twice", async () => {
  await expect(
    prisma.ticket.create({
      data: {
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
    })
  ).rejects.toThrow();
});
