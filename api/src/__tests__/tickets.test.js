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
    expect(response.statusCode).toBe(200);
  });

  test('Get tickets with invalid token', async () => {
    const response = await request(app)
        .get('/tickets/')
        .set('Authorization', 'Bearer ' + 'invalidtoken');
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe('Unauthorised');
  });
  test('Get tickets with invalid user', async () => {
    // line 36 testing requires breaking prisma bd rules to get invalid user id
  });
});

describe('Use Tickets', () =>{
  test('Use tickets with invalid token', async () => {
    const response = await request(app)
        .post('/tickets/use')
        .set('Authorization', 'Bearer ' + 'invalid token');
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe('Unauthorised');
  });
  test('Use Ticket', async () =>{
    const response = await request(app)
        .post('/tickets/use')
        .set('Authorization', 'Bearer ' + token)
        .send({
          ticketId: 1,
          quantity: 10,
        });
    console.log('response from /tickets/use\n' + response.body);
    expect(response.statusCode).toBe(200);
  });
  test('Use Ticket with no ticketId', async () =>{
    const response = await request(app)
        .post('/tickets/use')
        .set('Authorization', 'Bearer ' + token)
        .send({
          ticketId: undefined,
          quantity: 10,
        });
    console.log('response from /tickets/use\n' + response.body);
    expect(response.statusCode).toBe(400);
    expect(response.message).toBe('Invalid Ticket Type');
  });
  test('Use Ticket with invalid ticketId', async () =>{
    const response = await request(app)
        .post('/tickets/use')
        .set('Authorization', 'Bearer ' + token)
        .send({
          ticketId: undefined,
          quantity: 10,
        });
    console.log('response from /tickets/use\n' + response.body);
    expect(response.statusCode).toBe(400);
    expect(response.message).toBe('Invalid Ticket Type');
  });
});
