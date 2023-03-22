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

describe('add committee members', () => {
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
});

describe('remove committee members', () => {
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

describe('update committee members', () => {
  test('Update Committee members successfully (Change role)', async () => {
    await prisma.committee.create({
      data: {
        societyId: 1,
        userId: 2,
        role: 'committee member',
        isPresident: false,
      },
    });
    const res = await request(app)
        .post('/societies/updateCommitteeMember')
        .set('Authorization', `Bearer ` + token)
        .send({
          userId: 2,
          societyId: 1,
          role: 'i dunno',
          isPresident: false,
        });
    expect(res.statusCode).toBe(200);
    // Check the response
    expect(res.body).not.toBeNull();
    expect(res.body.message).toBe('User updated in committee');
    await prisma.committee.delete({
      where: {
        userId_societyId: {
          societyId: 1,
          userId: 2,
        },
      },
    });
  });

  test('update committee member with invalid token', async () => {
    const res = await request(app)
        .post('/societies/updateCommitteeMember')
        .set('Authorization', `Bearer ` + 'invalid token');
    expect(res.statusCode).toBe(500);
    // Check the response
    expect(res.body).not.toBeNull();
    expect(res.body.message).toBe('Internal Server Error');
  });

  test('Update Committee members successfully (Change president)', async () => {
    const res = await request(app)
        .post('/societies/updateCommitteeMember')
        .set('Authorization', `Bearer ` + token)
        .send({
          userId: 2,
          societyId: 1,
          role: 'i dunno',
          isPresident: true,
        });
    expect(res.statusCode).toBe(200);
    // Check the response
    expect(res.body).not.toBeNull();
    expect(res.body.message).toBe('User updated in committee');
  });

  test('Update Committee members with no permission', async () => {
    const res = await request(app)
        .post('/societies/updateCommitteeMember')
        .set('Authorization', `Bearer ` + token)
        .send({
          userId: 2,
          societyId: 1,
          role: 'i dunno',
          isPresident: true,
        });
    expect(res.statusCode).toBe(401);
    // Check the response
    expect(res.body).not.toBeNull();
    expect(res.body.message).toBe('Unauthorized');
  });

  test('Update Invalid Committee members', async () => {
    const res = await request(app)
        .post('/societies/updateCommitteeMember')
        .set('Authorization', `Bearer ` + token)
        .send({
          userId: 4,
          societyId: 1,
          role: 'i dunno',
          isPresident: true,
        });
    expect(res.statusCode).toBe(400);
    // Check the response
    expect(res.body).not.toBeNull();
    expect(res.body.message).toBe('User is not a committee member');
  });
});

describe('get committee members', () => {
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
