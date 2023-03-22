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

describe('add committee members', () => {
  test('add committee member with invalid token', async () => {
    const res = await request(app)
        .post('/societies/addCommitteeMember')
        .set('Authorization', `Bearer` + 'invalid token');
    expect(res.statusCode).toBe(500);
    // Check the response
    expect(res.body).not.toBeNull();
    expect(res.body.message).toBe('Internal Server Error');
  });
  test('add committee member but user not a committee member', async () => {
    const res= await request(app).post('/user/login').send({
      email: 'student@kcl.ac.uk',
      password: 'student',
    });
    token = res.body.token;
    const res2 = await request(app)
        .post('/societies/addCommitteeMember')
        .set('Authorization', `Bearer` + token)
        .send({
          societyId: 1,
        });
    expect(res2.statusCode).toBe(401);
    // Check the response
    expect(res2.body.message).toBe('User not part of committee');
  });
  test('add committee member but user not president', async () => {
    const res = await request(app)
        .post('/user/login')
        .send({
          email: '',
          password: 'admin123',
        });
    token = res.body.token;
    expect(res.statusCode).toBe(200);
    // Check the response
    expect(res.body).not.toBeNull();
  });
});

describe('remove committee members', () => {
  test('remove committee member with invalid token', async () => {
    const res = await request(app)
        .post('/societies/removeCommitteeMember')
        .set('Authorization', `Bearer` + 'invalid token');
    expect(res.statusCode).toBe(500);
    // Check the response
    expect(res.body).not.toBeNull();
    expect(res.body.message).toBe('Internal Server Error');
  });
});

describe('update committee members', () => {
  test('update committee member with invalid token', async () => {
    const res = await request(app)
        .post('/societies/updateCommitteeMember')
        .set('Authorization', `Bearer` + 'invalid token');
    expect(res.statusCode).toBe(500);
    // Check the response
    expect(res.body).not.toBeNull();
    expect(res.body.message).toBe('Internal Server Error');
  });
});

describe('get committee members', () => {
  test('remove committee member with invalid token', async () => {
    const res = await request(app)
        .post('/societies/getCommitteeMember')
        .set('Authorization', `Bearer` + 'invalid token');
    expect(res.statusCode).toBe(500);
    // Check the response
    expect(res.body).not.toBeNull();
    expect(res.body.message).toBe('Internal Server Error');
  });
});
