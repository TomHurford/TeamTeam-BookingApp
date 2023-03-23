const request = require('supertest');
const app = require('../server.js');
const prisma = require('../../prisma/prisma.js');
let token = null;

beforeAll(async () => {
  console.log(
      'MAKE SURE BEFORE YOU RUN THESE TESTS THAT YOU HAVE RUN:\n' +
    ' npx prisma migrate reset',
  );
});

beforeEach(async () => {
  // Before Each test we want to login as a user
  const res = await request(app)
      .post('/user/login')
      .send({
        email: 'admin@admin.com',
        password: 'admin123',
      });
  token = res.body.token;
});

describe('addCommitteeMember', () => {
  test('add committee member with valid token', async () => {
    // Check if the user is already a committee member in the database
    const member = await prisma.committee.findUnique({
      where: {
        userId_societyId: {
          societyId: 1,
          userId: 2,
        },
      },
    });
    if (member) {
      await prisma.committee.delete({
        where: {
          userId_societyId: {
            societyId: 1,
            userId: 2,
          },
        },
      });
    }
    const res = await request(app)
        .post('/societies/addCommitteeMember')
        .set('Authorization', `Bearer ` + token)
        .send({
          societyId: 1,
          email: 'student@kcl.ac.uk',
        });
    expect(res.statusCode).toBe(200);
    expect(res.body).not.toBeNull();
    expect(res.body.message).toBe('User added to committee');
    await prisma.committee.delete({
      where: {
        userId_societyId: {
          societyId: 1,
          userId: 2,
        },
      },
    });
  });

  test('add committee member with invalid token', async () => {
    const res = await request(app)
        .post('/societies/addCommitteeMember')
        .set('Authorization', `Bearer ` + 'invalid token');
    expect(res.statusCode).toBe(400);
    // Check the response
    expect(res.body).not.toBeNull();
    expect(res.body.message).toBe('Unauthorized');
  });

  test('add committee member but user not a committee member', async () => {
    const member = await prisma.committee.findUnique({
      where: {
        userId_societyId: {
          societyId: 1,
          userId: 2,
        },
      },
    });
    if (member) {
      await prisma.committee.delete({
        where: {
          userId_societyId: {
            societyId: 1,
            userId: 2,
          },
        },
      });
    }
    const res = await request(app).post('/user/login').send({
      email: 'student@kcl.ac.uk',
      password: 'student',
    });
    token = res.body.token;
    const res2 = await request(app)
        .post('/societies/addCommitteeMember')
        .set('Authorization', `Bearer ` + token)
        .send({
          societyId: 1,
          email: 'student@kcl.ac.uk',
        });
    expect(res2.statusCode).toBe(400);
    // Check the response
    expect(res2.body.message).toBe('Unauthorized');
  });

  test('add committee member but user does not exist', async () => {
    const res = await request(app)
        .post('/societies/addCommitteeMember')
        .set('Authorization', `Bearer ` + token)
        .send({
          societyId: 1,
          email: 'invalid email',
        });
    expect(res.statusCode).toBe(400);
    // Check the response
    expect(res.body).not.toBeNull();
    expect(res.body.message).toBe('User does not exist');
  });

  test('add committee member without email field', async () => {
    const res = await request(app)
        .post('/societies/addCommitteeMember')
        .set('Authorization', `Bearer ` + token)
        .send({
          societyId: 1,
        });
    expect(res.statusCode).toBe(400);
    // Check the response
    expect(res.body).not.toBeNull();
    expect(res.body.message).toBe('Invalid Request');
  });

  test('add committee member without societyId field', async () => {
    const res = await request(app)
        .post('/societies/addCommitteeMember')
        .set('Authorization', `Bearer ` + token)
        .send({
          email: 'student@kcl.ac.uk',
        });
    expect(res.statusCode).toBe(400);
    // Check the response
    expect(res.body).not.toBeNull();
    expect(res.body.message).toBe('Invalid Request');
  });

  test('add committee member but user is already a committee member',
      async () => {
        await prisma.committee.create({
          data: {
            societyId: 1,
            userId: 2,
            role: 'Committee Member',
          },
        });
        const res = await request(app)
            .post('/societies/addCommitteeMember')
            .set('Authorization', `Bearer ` + token)
            .send({
              societyId: 1,
              email: 'student@kcl.ac.uk',
            });
        expect(res.statusCode).toBe(400);
        // Check the response
        expect(res.body).not.toBeNull();
        expect(res.body.message).toBe('User is already a committee member');
        await prisma.committee.delete({
          where: {
            userId_societyId: {
              societyId: 1,
              userId: 2,
            },
          },
        });
      });
});

describe('removeCommitteeMember', () => {
  test('remove committee member with valid token', async () => {
    await prisma.committee.create({
      data: {
        societyId: 1,
        userId: 2,
        role: 'Committee Member',
        isPresident: false,
      },
    });
    const res = await request(app)
        .post('/societies/removeCommitteeMember')
        .set('Authorization', `Bearer ` + token)
        .send({
          societyId: 1,
          userId: 2,
        });
    expect(res.statusCode).toBe(200);
    expect(res.body).not.toBeNull();
    expect(res.body.message).toBe('User removed from committee');
  });

  test('remove committee member with invalid token', async () => {
    const res = await request(app)
        .post('/societies/removeCommitteeMember')
        .set('Authorization', `Bearer ` + 'invalid token')
        .send({
          societyId: 1,
          userId: 2,
        });
    expect(res.statusCode).toBe(500);
    // Check the response
    expect(res.body).not.toBeNull();
    expect(res.body.message).toBe('Internal Server Error');
  });

  test('remove committee member with missing parameters (userId)', async () => {
    const res = await request(app)
        .post('/societies/removeCommitteeMember')
        .set('Authorization', `Bearer ` + token)
        .send({
          societyId: 1,
        });
    expect(res.statusCode).toBe(400);
    // Check the response
    expect(res.body).not.toBeNull();
    expect(res.body.message).toBe('Invalid Request');
  });

  test('remove committee member with missing parameters (societyId)',
      async () => {
        const res = await request(app)
            .post('/societies/removeCommitteeMember')
            .set('Authorization', `Bearer ` + token)
            .send({
              userId: 2,
            });
        expect(res.statusCode).toBe(400);
        // Check the response
        expect(res.body).not.toBeNull();
        expect(res.body.message).toBe('Invalid Request');
      });

  test('remove committee member with invalid societyId', async () => {
    const res = await request(app)
        .post('/societies/removeCommitteeMember')
        .set('Authorization', `Bearer ` + token)
        .send({
          societyId: -1,
          userId: 2,
        });
    expect(res.statusCode).toBe(400);
    // Check the response
    expect(res.body).not.toBeNull();
    expect(res.body.message).toBe('Invalid Request');
  });

  test('remove committee member with invalid userId', async () => {
    const res = await request(app)
        .post('/societies/removeCommitteeMember')
        .set('Authorization', `Bearer ` + token)
        .send({
          societyId: 1,
          userId: -1,
        });
    expect(res.statusCode).toBe(400);
    // Check the response
    expect(res.body).not.toBeNull();
    expect(res.body.message).toBe('Invalid Request');
  });

  test('remove committee member with invalid societyId (string)',
      async () => {
        const res = await request(app)
            .post('/societies/removeCommitteeMember')
            .set('Authorization', `Bearer ` + token)
            .send({
              societyId: 'string',
              userId: 2,
            });
        expect(res.statusCode).toBe(400);
        // Check the response
        expect(res.body).not.toBeNull();
        expect(res.body.message).toBe('Invalid Request');
      });

  test('remove committee member with invalid userId (string)',
      async () => {
        const res = await request(app)
            .post('/societies/removeCommitteeMember')
            .set('Authorization', `Bearer ` + token)
            .send({
              societyId: 1,
              userId: 'string',
            });
        expect(res.statusCode).toBe(400);
        // Check the response
        expect(res.body).not.toBeNull();
        expect(res.body.message).toBe('Invalid Request');
      });

  test('remove committee member with invalid userId (large number)',
      async () => {
        const res = await request(app)
            .post('/societies/removeCommitteeMember')
            .set('Authorization', `Bearer ` + token)
            .send({
              societyId: 1,
              userId: 10000000,
            });
        expect(res.statusCode).toBe(400);
        // Check the response
        expect(res.body).not.toBeNull();
        expect(res.body.message).toBe('User does not exist');
      });

  test('remove committee member with invalid societyId (large number)',
      async () => {
        const res = await request(app)
            .post('/societies/removeCommitteeMember')
            .set('Authorization', `Bearer ` + token)
            .send({
              societyId: 10000000,
              userId: 2,
            });
        expect(res.statusCode).toBe(400);
        // Check the response
        expect(res.body).not.toBeNull();
        expect(res.body.message).toBe('Society does not exist');
      });

  test('remove committee member who is not in the committee',
      async () => {
        // Check if user is in the committee
        const user = await prisma.committee.findUnique({
          where: {
            userId_societyId: {
              userId: 2,
              societyId: 1,
            },
          },
        });

        if (user) {
          await prisma.committee.delete({
            where: {
              userId_societyId: {
                userId: 2,
                societyId: 1,
              },
            },
          });
        }
        const res = await request(app)
            .post('/societies/removeCommitteeMember')
            .set('Authorization', `Bearer ` + token)
            .send({
              societyId: 1,
              userId: 2,
            });
        expect(res.statusCode).toBe(400);
        // Check the response
        expect(res.body).not.toBeNull();
        expect(res.body.message).toBe('User is not a committee member');
      });

  test('remove committee member logged in as someone not in the committee',
      async () => {
        // Check if user is in the committee
        const user = await prisma.committee.findUnique({
          where: {
            userId_societyId: {
              userId: 2,
              societyId: 1,
            },
          },
        });

        if (user) {
          await prisma.committee.delete({
            where: {
              userId_societyId: {
                userId: 2,
                societyId: 1,
              },
            },
          });
        }

        // Add a different user to the committee
        await prisma.committee.create({
          data: {
            userId: 3,
            societyId: 1,
            role: 'Committee Member',
          },
        });
        // Login as a user not in the committee
        const res = await request(app)
            .post('/user/login')
            .send({
              email: 'student@kcl.ac.uk',
              password: 'student',
            });
        expect(res.statusCode).toBe(200);
        // Check the response
        expect(res.body).not.toBeNull();
        expect(res.body.token).not.toBeNull();
        const token = res.body.token;
        // Make the request
        const res2 = await request(app)
            .post('/societies/removeCommitteeMember')
            .set('Authorization', `Bearer ` + token)
            .send({
              societyId: 1,
              userId: 3,
            });
        expect(res2.statusCode).toBe(400);
        // Check the response
        expect(res2.body).not.toBeNull();
        expect(res2.body.message).toBe('Unauthorized');

        // Remove the user from the committee
        await prisma.committee.delete({
          where: {
            userId_societyId: {
              userId: 3,
              societyId: 1,
            },
          },
        });
      });

  test('remove president from committee', async () => {
    await prisma.committee.create({
      data: {
        societyId: 1,
        userId: 2,
        role: 'Committee Member',
        isPresident: false,
      },
    });
    // Login as not president
    const res = await request(app)
        .post('/user/login')
        .send({
          email: 'student@kcl.ac.uk',
          password: 'student',
        });
    expect(res.statusCode).toBe(200);
    // Check the response
    expect(res.body).not.toBeNull();
    expect(res.body.token).not.toBeNull();
    const token = res.body.token;
    // Make the request
    const res2 = await request(app)
        .post('/societies/removeCommitteeMember')
        .set('Authorization', `Bearer ` + token)
        .send({
          societyId: 1,
          userId: 1,
        });
    expect(res2.statusCode).toBe(400);
    // Check the response
    expect(res2.body).not.toBeNull();
    expect(res2.body.message).toBe('Cannot remove president');
    // Remove the user from the committee
    await prisma.committee.delete({
      where: {
        userId_societyId: {
          userId: 2,
          societyId: 1,
        },
      },
    });
  });
});

describe('getCommitteeMember', () => {
  test('Get Committee Members', async () => {
    const res = await request(app)
        .post('/societies/getCommitteeMembers')
        .send({
          societyId: 1,
        });
    expect(res.statusCode).toBe(200);
    // Check the response
    expect(res.body).not.toBeNull();
  });

  test('Send missing society ID', async () => {
    const res = await request(app)
        .post('/societies/getCommitteeMembers');
    expect(res.statusCode).toBe(400);
    // Check the response
    expect(res.body).not.toBeNull();
    expect(res.body.message).toBe('Missing societyId');
  });
});

describe('checkIfUserIsCommitteeMember', () => {
  test('Check if user is committee member', async () => {
    const res = await request(app)
        .post('/societies/checkCommitteeMember')
        .set('Authorization', `Bearer ` + token)
        .send({
          eventId: 1,
        });
    expect(res.statusCode).toBe(200);
    // Check the response
    expect(res.body).not.toBeNull();
    expect(res.body.isCommitteeMember).toBe(true);
  });

  test('Check if user is committee member with no token', async () => {
    const res = await request(app)
        .post('/societies/checkCommitteeMember')
        .send({
          eventId: 1,
        });
    expect(res.statusCode).toBe(400);
    // Check the response
    expect(res.body).not.toBeNull();
    expect(res.body.message).toBe('Unauthorized');
  });

  test('Send missing event ID', async () => {
    const res = await request(app)
        .post('/societies/checkCommitteeMember')
        .set('Authorization', `Bearer ` + token);
    expect(res.statusCode).toBe(400);
    // Check the response
    expect(res.body).not.toBeNull();
    expect(res.body.message).toBe('Missing eventId');
  });

  test('Send invalid eventId', async () => {
    const res = await request(app)
        .post('/societies/checkCommitteeMember')
        .set('Authorization', `Bearer ` + token)
        .send({
          eventId: 1000000,
        });
    expect(res.statusCode).toBe(404);
    // Check the response
    expect(res.body).not.toBeNull();
    expect(res.body.message).toBe('Event not found');
  });

  test('Check if user is not committee member', async () => {
    // Login as a user not in the committee
    const res = await request(app)
        .post('/user/login')
        .send({
          email: 'student@kcl.ac.uk',
          password: 'student',
        });
    expect(res.statusCode).toBe(200);
    // Check the response
    expect(res.body).not.toBeNull();
    expect(res.body.token).not.toBeNull();
    const token = res.body.token;
    const res2 = await request(app)
        .post('/societies/checkCommitteeMember')
        .set('Authorization', `Bearer ` + token)
        .send({
          eventId: 2,
        });
    expect(res2.statusCode).toBe(200);
    // Check the response
    expect(res2.body).not.toBeNull();
    expect(res2.body.isCommitteeMember).toBe(false);
  });
});

describe('checkIfUserIsPresident', () => {
  test('Check if user is president', async () => {
    const res = await request(app)
        .post('/societies/checkPresident')
        .set('Authorization', `Bearer ` + token)
        .send({
          societyId: 1,
        });
    expect(res.statusCode).toBe(200);
    // Check the response
    expect(res.body).not.toBeNull();
    expect(res.body.isPresident).toBe(true);
  });

  test('Check if user is president with no token', async () => {
    const res = await request(app)
        .post('/societies/checkPresident')
        .send({
          societyId: 1,
        });
    expect(res.statusCode).toBe(400);
    // Check the response
    expect(res.body).not.toBeNull();
    expect(res.body.message).toBe('Unauthorized');
  });

  test('Send missing society ID', async () => {
    const res = await request(app)
        .post('/societies/checkPresident')
        .set('Authorization', `Bearer ` + token);
    expect(res.statusCode).toBe(400);
    // Check the response
    expect(res.body).not.toBeNull();
    expect(res.body.message).toBe('Missing societyId');
  });

  test('Send invalid societyId (large number)', async () => {
    const res = await request(app)
        .post('/societies/checkPresident')
        .set('Authorization', `Bearer ` + token)
        .send({
          societyId: 1000000,
        });
    expect(res.statusCode).toBe(400);
    // Check the response
    expect(res.body).not.toBeNull();
    expect(res.body.message).toBe('Society does not exist');
  });

  test('Send invalid societyId (neg number)', async () => {
    const res = await request(app)
        .post('/societies/checkPresident')
        .set('Authorization', `Bearer ` + token)
        .send({
          societyId: -1,
        });
    expect(res.statusCode).toBe(400);
    // Check the response
    expect(res.body).not.toBeNull();
    expect(res.body.message).toBe('Invalid Request');
  });

  test('Check if user is not president', async () => {
    // Login as a user not in the committee
    const res = await request(app)
        .post('/user/login')
        .send({
          email: 'student@kcl.ac.uk',
          password: 'student',
        });
    expect(res.statusCode).toBe(200);
    // Check the response
    expect(res.body).not.toBeNull();
    expect(res.body.token).not.toBeNull();
    const token = res.body.token;
    const res2 = await request(app)
        .post('/societies/checkPresident')
        .set('Authorization', `Bearer ` + token)
        .send({
          societyId: 1,
        });
    expect(res2.statusCode).toBe(200);
    // Check the response
    expect(res2.body).not.toBeNull();
    expect(res2.body.isPresident).toBe(false);
  });
});

describe('changePresident', () => {
  test('Change president', async () => {
    // Add a new user to the society
    await prisma.committee.create({
      data: {
        societyId: 1,
        userId: 2,
        role: 'Committee Member',
      },
    });
    const res = await request(app)
        .post('/societies/changePresident')
        .set('Authorization', `Bearer ` + token)
        .send({
          societyId: 1,
          userId: 2,
        });
    expect(res.statusCode).toBe(200);
    // Check the response
    expect(res.body).not.toBeNull();
    expect(res.body.message).toBe('President changed');
    // Change the president back in the database
    await prisma.committee.update({
      where: {
        userId_societyId: {
          societyId: 1,
          userId: 2,
        },
      },
      data: {
        role: 'Committee Member',
        isPresident: false,
      },
    });
    await prisma.committee.update({
      where: {
        userId_societyId: {
          societyId: 1,
          userId: 1,
        },
      },
      data: {
        role: 'President',
        isPresident: true,
      },
    });
  });
});
