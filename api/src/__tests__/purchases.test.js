const request = require('supertest');
const app = require('../server.js');
// const prisma = require('../../prisma/prisma.js');

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

/**
 * List of functions in controllers/purchase.js
 * 1. getPastPurchases
 * 2. getFutureTickets
 * 3. createPurchase
 */

describe('getPastPurchases', () => {
  test('It should return past purchases when all is normal', async () => {
    const res = await request(app)
        .post('/purchase/')
        .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.pastTickets).toBeDefined();
  });

  test('It should return an error when the user is not authenticated',
      async () => {
        const res = await request(app)
            .post('/purchase/');
        expect(res.statusCode).toEqual(401);
        expect(res.body.error).toBeDefined();
      });
});

describe('getFuturePurchases', () => {
  test('It should return upcoming purchases when all is normal', async () => {
    const res = await request(app)
        .post('/purchase/future')
        .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.futureTickets).toBeDefined();
  });

  test('It should return an error when the user is not authenticated',
      async () => {
        const res = await request(app)
            .post('/purchase/future');
        expect(res.statusCode).toEqual(401);
        expect(res.body.error).toBeDefined();
      });
});

// Create purchase requires the following fields in the request body:
// status, total, method, ticket_quantities, eventId
describe('Create Purchase', () => {
  test('It should create a purchase when all is normal', async () => {
    const res = await request(app)
        .post('/purchase/create')
        .set('Authorization', `Bearer ${token}`)
        .send({
          status: 'paid',
          total: 20,
          method: 'air',
          ticket_quantities: {
            types: [
              {
                id: 2,
                quantity: 2,
              },
            ],
          },
          eventId: 1,
        });
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBeDefined();
  });

  test('It should return an error when the user is not authenticated',
      async () => {
        const res = await request(app)
            .post('/purchase/create')
            .send({
              status: 'paid',
              total: 20,
              method: 'air',
              ticket_quantities: {
                types: [
                  {
                    id: 2,
                    quantity: 2,
                  },
                ],
              },
              eventId: 1,
            });
        expect(res.statusCode).toEqual(401);
        expect(res.body.error).toBeDefined();
      });

  test('It should return an error when ticket_quantities is not provided',
      async () => {
        const res = await request(app)
            .post('/purchase/create')
            .set('Authorization', `Bearer ${token}`)
            .send({
              status: 'paid',
              total: 20,
              method: 'air',
              eventId: 1,
            });
        expect(res.statusCode).toEqual(400);
        expect(res.body.error).toBeDefined();
      });

  test('It should return an error when the eventId is undefined',
      async () => {
        const res = await request(app)
            .post('/purchase/create')
            .set('Authorization', `Bearer ${token}`)
            .send({
              status: 'paid',
              total: 20,
              method: 'air',
              ticket_quantities: {
                types: [
                  {
                    id: 2,
                    quantity: 2,
                  },
                ],
              },
            });
        expect(res.statusCode).toEqual(400);
        expect(res.body.error).toBeDefined();
      });

  test('It should return an error when the eventId is invalid',
      async () => {
        const res = await request(app)
            .post('/purchase/create')
            .set('Authorization', `Bearer ${token}`)
            .send({
              status: 'paid',
              total: 20,
              method: 'air',
              ticket_quantities: {
                types: [
                  {
                    id: 2,
                    quantity: 2,
                  },
                ],
              },
              eventId: -1,
            });
        expect(res.statusCode).toEqual(400);
        expect(res.body.error).toBeDefined();
      });

  test('It should return an error when the status is undefined',
      async () => {
        const res = await request(app)
            .post('/purchase/create')
            .set('Authorization', `Bearer ${token}`)
            .send({
              total: 20,
              method: 'air',
              ticket_quantities: {
                types: [
                  {
                    id: 2,
                    quantity: 2,
                  },
                ],
              },
              eventId: 1,
            });
        expect(res.statusCode).toEqual(400);
        expect(res.body.error).toBeDefined();
      });

  test('It should return an error when the status is invalid',
      async () => {
        const res = await request(app)
            .post('/purchase/create')
            .set('Authorization', `Bearer ${token}`)
            .send({
              status: 1,
              total: 20,
              method: 'air',
              ticket_quantities: {
                types: [
                  {
                    id: 2,
                    quantity: 2,
                  },
                ],
              },
              eventId: 1,
            });
        expect(res.statusCode).toEqual(400);
        expect(res.body.error).toBeDefined();
      });

  test('It should return an error when the method is undefined',
      async () => {
        const res = await request(app)
            .post('/purchase/create')
            .set('Authorization', `Bearer ${token}`)
            .send({
              status: 'paid',
              total: 20,
              ticket_quantities: {
                types: [
                  {
                    id: 2,
                    quantity: 2,
                  },
                ],
              },
              eventId: 1,
            });
        expect(res.statusCode).toEqual(400);
        expect(res.body.error).toBeDefined();
      });

  test('It should return an error when the method is invalid',
      async () => {
        const res = await request(app)
            .post('/purchase/create')
            .set('Authorization', `Bearer ${token}`)
            .send({
              status: 'paid',
              total: 20,
              method: 1,
              ticket_quantities: {
                types: [
                  {
                    id: 2,
                    quantity: 2,
                  },
                ],
              },
              eventId: 1,
            });
        expect(res.statusCode).toEqual(400);
        expect(res.body.error).toBeDefined();
      });

  test('It should return an error when the total is undefined',
      async () => {
        const res = await request(app)
            .post('/purchase/create')
            .set('Authorization', `Bearer ${token}`)
            .send({
              status: 'paid',
              method: 'air',
              ticket_quantities: {
                types: [
                  {
                    id: 2,
                    quantity: 2,
                  },
                ],
              },
              eventId: 1,
            });
        expect(res.statusCode).toEqual(400);
        expect(res.body.error).toBeDefined();
      });

  test('It should return an error when the total is invalid',
      async () => {
        const res = await request(app)
            .post('/purchase/create')
            .set('Authorization', `Bearer ${token}`)
            .send({
              status: 'paid',
              total: '20',
              method: 'air',
              ticket_quantities: {
                types: [
                  {
                    id: 2,
                    quantity: 2,
                  },
                ],
              },
              eventId: 1,
            });
        expect(res.statusCode).toEqual(400);
        expect(res.body.error).toBeDefined();
      });

  // eslint-disable-next-line max-len
  test('It should return an error when the ticket_quantities does not have a types field',
      async () => {
        const res = await request(app)
            .post('/purchase/create')
            .set('Authorization', `Bearer ${token}`)
            .send({
              status: 'paid',
              total: 20,
              method: 'air',
              ticket_quantities: {
              },
              eventId: 1,
            });
        expect(res.statusCode).toEqual(400);
        expect(res.body.error).toBeDefined();
      });

  // eslint-disable-next-line max-len
  test('It should return an error when the ticket_quantities.types does not have an id field',
      async () => {
        const res = await request(app)
            .post('/purchase/create')
            .set('Authorization', `Bearer ${token}`)
            .send({
              status: 'paid',
              total: 20,
              method: 'air',
              ticket_quantities: {
                types: [
                  {
                    quantity: 2,
                  },
                  {
                    id: 2,
                    quantity: 2,
                  },
                ],
              },
              eventId: 1,
            });
        expect(res.statusCode).toEqual(400);
        expect(res.body.error).toBeDefined();
      });

  // eslint-disable-next-line max-len
  test('It should return an error when the ticket_quantities.types does not have a quantity field',
      async () => {
        const res = await request(app)
            .post('/purchase/create')
            .set('Authorization', `Bearer ${token}`)
            .send({
              status: 'paid',
              total: 20,
              method: 'air',
              ticket_quantities: {
                types: [
                  {
                    id: 2,
                  },
                  {
                    id: 2,
                    quantity: 2,
                  },
                ],
              },
              eventId: 1,
            });
        expect(res.statusCode).toEqual(400);
        expect(res.body.error).toBeDefined();
      });

  // eslint-disable-next-line max-len
  test('It should return an error when the ticket_quantities.types has Invalid ids',
      async () => {
        const res = await request(app)
            .post('/purchase/create')
            .set('Authorization', `Bearer ${token}`)
            .send({
              status: 'paid',
              total: 20,
              method: 'air',
              ticket_quantities: {
                types: [
                  {
                    id: -1,
                    quantity: 2,
                  },
                  {
                    id: 2,
                    quantity: 2,
                  },
                ],
              },
              eventId: 1,
            });
        expect(res.statusCode).toEqual(400);
        expect(res.body.error).toBeDefined();
      });

  // eslint-disable-next-line max-len
  test('It should return an error when the ticket_quantities.types has invalid quantities',
      async () => {
        const res = await request(app)
            .post('/purchase/create')
            .set('Authorization', `Bearer ${token}`)
            .send({
              status: 'paid',
              total: 20,
              method: 'air',
              ticket_quantities: {
                types: [
                  {
                    id: 1,
                    quantity: -2,
                  },
                  {
                    id: 2,
                    quantity: 2,
                  },
                ],
              },
              eventId: 1,
            });
        expect(res.statusCode).toEqual(400);
        expect(res.body.error).toBeDefined();
      });
});
