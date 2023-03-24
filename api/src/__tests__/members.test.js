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


describe('follow society', () => {
  test('follow society with invalid token', async () => {
    const res = await request(app)
        .post('/societies/followSociety')
        .set('Authorization', `Bearer ` + 'invalid token');
    expect(res.statusCode).toBe(500);
    // Check the response
    expect(res.body).not.toBeNull();
    expect(res.body.message).toBe('Internal Server Error');
  });

  test('follow society with missing soc id', async () => {
    const res = await request(app)
        .post('/societies/followSociety')
        .set('Authorization', `Bearer ` + token);
    expect(res.statusCode).toBe(400);
    // Check the response
    expect(res.body).not.toBeNull();
    expect(res.body.message).toBe('Missing societyId');
  });

  test('follow society with bad soc id', async () => {
    const res = await request(app)
        .post('/societies/followSociety')
        .set('Authorization', `Bearer ` + token)
        .send({
          societyId: 500,
        });
    expect(res.statusCode).toBe(404);
    // Check the response
    expect(res.body).not.toBeNull();
    expect(res.body.message).toBe('Society not found');
  });

  test('follow society', async () => {
    // Check that the user is not a member
    const user = await prisma.members.findUnique({
      where: {
        userId_societyId: {
          userId: 1,
          societyId: 1,
        },
      },
    });
    // If the user is a member, remove them
    if (user) {
      await prisma.members.delete({
        where: {
          userId_societyId: {
            userId: 1,
            societyId: 1,
          },
        },
      });
    }
    const res = await request(app)
        .post('/societies/followSociety')
        .set('Authorization', `Bearer ` + token)
        .send({
          societyId: 1,
        });
    expect(res.statusCode).toBe(200);
    // Check the response
    expect(res.body).not.toBeNull();
    expect(res.body.message).toBe('User is now a member');
  });

  test('follow society when already member', async () => {
    // Check that the user is a member
    const user = await prisma.members.findUnique({
      where: {
        userId_societyId: {
          userId: 1,
          societyId: 1,
        },
      },
    });
    // If the user is not a member, add them
    if (!user) {
      await prisma.members.create({
        data: {
          userId: 1,
          societyId: 1,
        },
      });
    }
    const res = await request(app)
        .post('/societies/followSociety')
        .set('Authorization', `Bearer ` + token)
        .send({
          societyId: 1,
        });
    expect(res.statusCode).toBe(400);
    // Check the response
    expect(res.body).not.toBeNull();
    expect(res.body.message).toBe('User is already a member');
  });
});

describe('unfollow society', () => {
  test('unfollow society with invalid token', async () => {
    const res = await request(app)
        .post('/societies/unfollowSociety')
        .set('Authorization', `Bearer ` + 'invalid token');
    expect(res.statusCode).toBe(500);
    // Check the response
    expect(res.body).not.toBeNull();
    expect(res.body.message).toBe('Internal Server Error');
  });

  test('unfollow society with missing soc id', async () => {
    const res = await request(app)
        .post('/societies/unfollowSociety')
        .set('Authorization', `Bearer ` + token);
    expect(res.statusCode).toBe(400);
    // Check the response
    expect(res.body).not.toBeNull();
    expect(res.body.message).toBe('Missing societyId');
  });

  test('unfollow society with bad soc id', async () => {
    const res = await request(app)
        .post('/societies/unfollowSociety')
        .set('Authorization', `Bearer ` + token)
        .send({
          societyId: 500,
        });
    expect(res.statusCode).toBe(404);
    // Check the response
    expect(res.body).not.toBeNull();
    expect(res.body.message).toBe('Society not found');
  });

  test('unfollow society', async () => {
    // Check that the user is a member
    const user = await prisma.members.findUnique({
      where: {
        userId_societyId: {
          userId: 1,
          societyId: 1,
        },
      },
    });
    // If the user is not a member, add them
    if (!user) {
      await prisma.members.create({
        data: {
          userId: 1,
          societyId: 1,
        },
      });
    }
    const res = await request(app)
        .post('/societies/unfollowSociety')
        .set('Authorization', `Bearer ` + token)
        .send({
          societyId: 1,
        });
    expect(res.statusCode).toBe(200);
    // Check the response
    expect(res.body).not.toBeNull();
    expect(res.body.message).toBe('User is no longer a member');
  });

  test('unfollow society when already unfollowed', async () => {
    const res = await request(app)
        .post('/societies/unfollowSociety')
        .set('Authorization', `Bearer ` + token)
        .send({
          societyId: 20,
        });
    expect(res.statusCode).toBe(400);
    // Check the response
    expect(res.body).not.toBeNull();
    expect(res.body.message).toBe('User is not a member');
  });

  test('unfollow society when not followed', async () => {
    const res = await request(app)
        .post('/societies/unfollowSociety')
        .set('Authorization', `Bearer ` + token)
        .send({
          societyId: 21,
        });
    expect(res.statusCode).toBe(400);
    // Check the response
    expect(res.body).not.toBeNull();
    expect(res.body.message).toBe('User is not a member');
  });
});

describe('check User Is Member', () => {
  test('check user is member with invalid token', async () => {
    const res = await request(app)
        .post('/societies/checkUserIsMember')
        .set('Authorization', `Bearer ` + 'invalid token');
    expect(res.statusCode).toBe(500);
    // Check the response
    expect(res.body).not.toBeNull();
    expect(res.body.message).toBe('Internal Server Error');
  });

  test('check user is member with no soc id', async () => {
    const res = await request(app)
        .post('/societies/checkUserIsMember')
        .set('Authorization', `Bearer ` + token);
    expect(res.statusCode).toBe(400);
    // Check the response
    expect(res.body).not.toBeNull();
    expect(res.body.message).toBe('Missing societyId');
  });

  test('check user is member when not member', async () => {
    const res = await request(app)
        .post('/societies/checkUserIsMember')
        .set('Authorization', `Bearer ` + token)
        .send({
          societyId: 20,
        });
    expect(res.statusCode).toBe(200);
    // Check the response
    expect(res.body).not.toBeNull();
    expect(res.body.message).toBe('User is not a member');
  });

  test('check user is member when member', async () => {
    await prisma.members.create({
      data: {
        userId: 1,
        societyId: 6,
      },
    });

    const res = await request(app)
        .post('/societies/checkUserIsMember')
        .set('Authorization', `Bearer ` + token)
        .send({
          societyId: 6,
        });
    expect(res.statusCode).toBe(200);
    // Check the response
    expect(res.body).not.toBeNull();
    expect(res.body.message).toBe('User is a member');

    await prisma.members.delete({
      where: {
        userId_societyId: {
          userId: 1,
          societyId: 6,
        },
      },
    });
  });
});

describe('get Members', () => {
  test('get members with invalid token', async () => {
    const res = await request(app)
        .post('/societies/getMembers')
        .set('Authorization', `Bearer ` + 'invalid token');
    expect(res.statusCode).toBe(500);
    // Check the response
    expect(res.body).not.toBeNull();
    expect(res.body.message).toBe('Internal Server Error');
  });

  test('get members with no soc id', async () => {
    const res = await request(app)
        .post('/societies/getMembers')
        .set('Authorization', `Bearer ` + token);
    expect(res.statusCode).toBe(400);
    // Check the response
    expect(res.body).not.toBeNull();
    expect(res.body.message).toBe('Missing societyId');
  });

  test('get members when not member', async () => {
    const res = await request(app)
        .post('/societies/getMembers')
        .set('Authorization', `Bearer ` + token)
        .send({
          societyId: 2,
        });
    expect(res.statusCode).toBe(400);
    // Check the response
    expect(res.body).not.toBeNull();
    expect(res.body.message).toBe('User is not a committee member');
  });

  test('get members when no members', async () => {
    await prisma.members.delete({
      where: {
        userId_societyId: {
          userId: 1,
          societyId: 1,
        },
      },
    });

    const res = await request(app)
        .post('/societies/getMembers')
        .set('Authorization', `Bearer ` + token)
        .send({
          societyId: 1,
        });
    expect(res.statusCode).toBe(404);
    // Check the response
    expect(res.body).not.toBeNull();
    expect(res.body.message).toBe('No members found');

    await prisma.members.create({
      data: {
        userId: 1,
        societyId: 1,
      },
    });
  });

  test('get members', async () => {
    await prisma.members.create({
      data: {
        userId: 2,
        societyId: 1,
      },
    });

    const res = await request(app)
        .post('/societies/getMembers')
        .set('Authorization', `Bearer ` + token)
        .send({
          societyId: 1,
        });
    expect(res.statusCode).toBe(200);
    // Check the response
    expect(res.body).not.toBeNull();
    expect(res.body.message).toBe('Members found');

    await prisma.members.delete({
      where: {
        userId_societyId: {
          userId: 2,
          societyId: 1,
        },
      },
    });
  });
});
describe('get list of followed societies', () => {
  test('get list of followed societies with invalid token', async () => {
    const res = await request(app)
        .post('/societies/getFollowedSocieties')
        .set('Authorization', `Bearer ` + 'invalid token');
    expect(res.statusCode).toBe(500);
    // Check the response
    expect(res.body).not.toBeNull();
    expect(res.body.message).toBe('Internal Server Error');
  });

  test('get list of followed societies with follows', async () => {
    const res = await request(app)
        .post('/societies/getFollowedSocieties')
        .set('Authorization', `Bearer ` + token);
    expect(res.statusCode).toBe(200);
    // Check the response
    expect(res.body).not.toBeNull();
    expect(res.body.message).toBe('Societies found');
  });
});
