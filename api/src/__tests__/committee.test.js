const request = require('supertest');
const app = require('../server.js');
const prisma = require('../../prisma/prisma.js');
// Disable eslint for this file because we want to use console.log
/* eslint-disable */
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
    console.log(res.body);
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

  test('add committee member but user is already a committee member', async () => {
    await prisma.committee.create({
      data: {
        societyId: 1,
        userId: 2,
        role: 'Committee Member'
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
        email: 'student@kcl.ac.uk',
      });
    console.log(res.body);
    expect(res.statusCode).toBe(200);
    expect(res.body).not.toBeNull();
    expect(res.body.message).toBe('User removed from committee');
  });

  test('remove committee member with invalid token', async () => {
    const res = await request(app)
        .post('/societies/removeCommitteeMember')
        .set('Authorization', `Bearer ` + 'invalid token');
    expect(res.statusCode).toBe(500);
    // Check the response
    expect(res.body).not.toBeNull();
    expect(res.body.message).toBe('Internal Server Error');
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
