// Test file for tickets routes

const request = require('supertest');
const app = require('../server.js');

let token = null;

beforeEach(async () => {
  // Login
  const response = await request(app).post('/user/login').send({
    email: 'admin@admin.com',
    password: 'admin123',
  });
  token = response.body.token;
});

describe('Get Tickets', () => {
  test('Get all tickets belonging to a user', async () => {
    const response = await request(app)
        .get('/tickets/')
        .set('Authorization', 'Bearer ' + token);
    console.log(response.body);
    expect(response.statusCode).toBe(200);
  });

  test('Get tickets with invalid token', async () => {
    const response = await request(app)
        .get('/tickets/')
        .set('Authorization', 'Bearer ' + 'invalidtoken');
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe('Unauthorised');
  });
});
