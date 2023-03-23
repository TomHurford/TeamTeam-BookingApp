// Test file for tickets routes

const request = require('supertest');
const app = require('../server.js');
const prisma = require('../../prisma/prisma.js');

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
    const ticket = await prisma.ticket.create({
      data: {
        ticketData: "ticket text purchases",
        purchase: {
          connect: {
            id: 1,
          },
        },
        ticketType: {
          connect: {
            id: 1,
          },
        },
        event: {
          connect: {
            id: 1,
          },
        },
        user: {
          connect: {
            id: 1,
          },
        },
      },
    });
    const res = await request(app)
        .post('/tickets/use')
        .set('Authorization', 'Bearer ' + token)
        .send({
          ticketTypeId: ticket.id, 
        });
    expect(res.statusCode).toBe(200);
    console.log('ticket.id: ' + ticket.id);
    await prisma.ticket.delete({
      where: {
          id: ticket.id,
        }
      });
  });
  test('Use Ticket with no ticketId', async () =>{
    const response = await request(app)
        .post('/tickets/use')
        .set('Authorization', 'Bearer ' + token)
        .send({
<<<<<<< Updated upstream
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
=======
          ticketTypeId: undefined,
        });
    console.log('response from /tickets/use\n' + response);
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Missing Body');
>>>>>>> Stashed changes
  });
  test('Use Ticket with invalid ticketId', async () =>{
    const response = await request(app)
        .post('/tickets/use')
        .set('Authorization', 'Bearer ' + token)
        .send({
<<<<<<< Updated upstream
          ticketId: undefined,
=======
          ticketTypeId: -1,
>>>>>>> Stashed changes
          quantity: 10,
        });
    console.log('response from /tickets/use\n' + response);
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Invalid Ticket ID');
  });
  test('Use Ticket withused ticket', async () =>{
    const ticket = await prisma.ticket.create({
      data: {
        ticketData: "ticket text purchases",
        status: "USED",
        purchase: {
          connect: {
            id: 1,
          },
        },
        ticketType: {
          connect: {
            id: 1,
          },
        },
        event: {
          connect: {
            id: 1,
          },
        },
        user: {
          connect: {
            id: 1,
          },
        },
      },
    });
    const res = await request(app)
        .post('/tickets/use')
        .set('Authorization', 'Bearer ' + token)
        .send({
          ticketTypeId: ticket.id, 
        });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Ticket already used');
    await prisma.ticket.delete({
      where: {
          id: ticket.id,
        }
      });
  });
});