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
  console.log(token);
});

describe('get past purchases',() => {
    test('get past purchases with invalid token', async () => {
        const response = await request(app)
            .get('/purchase/')
            .set('Authorization', 'Bearer ' + "invalid token");
        expect(response.statusCode).toBe(401);
        expect(response.body.error).toBe('Unauthorized');
        expect(response.body.token).toBe(null);
      });
    test('get past purchases', async () => {
        const response = await request(app)
            .get('/purchase/')
            .set('Authorization', 'Bearer ' + token);
        expect(response.statusCode).toBe(200);
        expect(response.body).not.toBeNull();
    });
});

describe('get future purchases',() => {
    test('get future purchases with invalid token', async () => {
        const response = await request(app)
            .get('/purchase/future')
            .set('Authorization', 'Bearer ' + "invalid token");
        expect(response.statusCode).toBe(401);
        expect(response.body.error).toBe('Unauthorized');
        expect(response.body.token).toBe(null);
      });
});

describe('create purchases',() => {
    test('Create purchases with invalid token', async () => {
        const response = await request(app)
            .get('/purchase/create')
            .set('Authorization', 'Bearer ' + "invalid token");
        expect(response.statusCode).toBe(401);
        expect(response.body.error).toBe('Unauthorized');
        expect(response.body.token).toBe(null);
      });
});
