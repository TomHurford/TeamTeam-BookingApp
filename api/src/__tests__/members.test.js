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
        .set('Authorization', `Bearer` + 'invalid token');
    expect(res.statusCode).toBe(500);
    // Check the response
    expect(res.body).not.toBeNull();
    expect(res.body.message).toBe('Internal Server Error');
  });
});
