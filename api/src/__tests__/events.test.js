const request = require('supertest');
const prisma = require('../../prisma/prisma.js');
const app = require('../server.js');
const {faker} = require('@faker-js/faker');

let token = null;

beforeAll(async () => {
  console.log(
      'MAKE SURE BEFORE YOU RUN THESE TESTS THAT YOU HAVE RUN:\n' +
    ' npx prisma migrate reset',
  );
});

beforeEach(async () => {
  const response = await request(app).post('/user/login').send({
    email: 'admin@admin.com',
    password: 'admin123',
  });
  token = response.body.token;
});

/*
Here I want to test all routes that are created in the events controller

I want to test the following routes:
Create event
Get all events
    - Can be done by any user
Get event by id
    - Can be done by any user
Get events by societyId
    - Can be done by any user
Get events by date range
    - Can be done by any user
    - Can be done by societyId
Update event by id
    - Can only be done by committee members of the society
Delete event by id
    - Can only be done by committee members of the society
*/

describe('Get Events', () => {
  // This is a GET request
  test('Get all events', async () => {
    const response = await request(app)
        .get('/events')
        .set('Authorization', 'Bearer ' + token);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('events');
  });

  // This is a POST request
  test('Get event by id', async () => {
    // Create a json object with the eventId
    const eventId = {
      eventId: 1,
    };
    const response = await request(app)
        .post('/events')
        .set('Authorization', 'Bearer ' + token)
        .send(eventId);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('event');
  });
  test('Get event with invalid token', async () => {
    const response = await request(app)
        .post('/events')
        .set('Authorization', 'Bearer ' + 'invalid token');
    expect(response.statusCode).toBe(401);
    expect(response.body.error).toBe('Unauthorized');
    expect(response.body.token).toBe(null);
  });
  test('Get event with no eventId in body', async () => {
    const invalidJson = {

    };
    const response = await request(app)
        .post('/events')
        .set('Authorization', 'Bearer ' + token)
        .send(invalidJson);
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Missing Event ID');
  });
  test('Get event with event that doesnt exist', async () => {
    const invalidEventId = {
      eventId: -1,
    };
    const response = await request(app)
        .post('/events')
        .set('Authorization', 'Bearer ' + token)
        .send(invalidEventId);
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Invalid eventId');
  });
});

describe('Create Event', () => {
  test('Create event with invalid token', async () => {
    const response = await request(app)
        .post('/events/create')
        .set('Authorization', 'Bearer ' + 'invalid token');
    expect(response.statusCode).toBe(401);
    expect(response.body.error).toBe('Unauthorized');
    expect(response.body.token).toBe(null);
  });
  test('Create event as committee member', async () => {
    // Create a json object with the event details
    const event = {
      'name': 'Test Event',
      'description': 'This is a test event',
      'date': '2023-12-02T00:10:00.000Z',
      'location': faker.address.streetAddress(),
      'societyId': 1,
      'ticketType': [{
        name: 'Test Ticket Type1',
        price: 200,
        quantity: 10,
      }, {
        name: 'Test Ticket Type2',
        price: 100,
        quantity: 10,
      }],
    };
    const response = await request(app)
        .post('/events/create')
        .set('Authorization', 'Bearer ' + token)
        .send(event);
    if (response.body.error) {
      console.log('ERROR HERE: ' + response.body.error);
    }
    expect(response.statusCode).toBe(200);

    expect(response.body).toHaveProperty('event');
    // Expect the event to be created
    expect(response.body.event.name).toBe('Test Event');
    expect(response.body.event.description).toBe('This is a test event');
    expect(response.body.event.date).toBe('2023-12-02T00:10:00.000Z');
    expect(response.body.event.societyId).toBe(1);
    // Delete ticket types
    for (let i = 0; i< Object.keys(response.body.ticket_types).length; i++) {
      await prisma.ticketType.delete({
        where: {
          id: response.body.ticket_types[i].id,
        },
      });
    }
    // Delete the event
    await prisma.event.delete({
      where: {
        id: response.body.event.id,
      },
    });
  });
  test('Create event with missing details (name)', async () => {
    // Create a json object with the event details
    const event = {
      'description': 'This is a test event',
      'date': '2023-12-02T00:10:00.000Z',
      'location': faker.address.streetAddress(),
      'societyId': 1,
      'ticketType': [{
        name: 'Test Ticket Type1',
        price: 200,
        quantity: 10,
      }, {
        name: 'Test Ticket Type2',
        price: 100,
        quantity: 10,
      }],
    };
    const response = await request(app)
        .post('/events/create')
        .set('Authorization', 'Bearer ' + token)
        .send(event);
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error');
    // Expect the event to not be created
    expect(response.body.error).toBe('Missing Event Details');
  });
  test('Create event with missing details (description)', async () => {
    // Create a json object with the event details
    const event = {
      'name': 'Test Event',
      'date': '2023-12-02T00:10:00.000Z',
      'location': faker.address.streetAddress(),
      'societyId': 1,
      'ticketType': [{
        name: 'Test Ticket Type1',
        price: 200,
        quantity: 10,
      }, {
        name: 'Test Ticket Type2',
        price: 100,
        quantity: 10,
      }],
    };
    const response = await request(app)
        .post('/events/create')
        .set('Authorization', 'Bearer ' + token)
        .send(event);
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error');
    // Expect the event to not be created
    expect(response.body.error).toBe('Missing Event Details');
  });
  test('Create event with missing details (date)', async () => {
    // Create a json object with the event details
    const event = {
      'name': 'Test Event',
      'description': 'This is a test event',
      'location': faker.address.streetAddress(),
      'societyId': 1,
      'ticketType': [{
        name: 'Test Ticket Type1',
        price: 200,
        quantity: 10,
      }, {
        name: 'Test Ticket Type2',
        price: 100,
        quantity: 10,
      }],
    };
    const response = await request(app)
        .post('/events/create')
        .set('Authorization', 'Bearer ' + token)
        .send(event);
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error');
    // Expect the event to not be created
    expect(response.body.error).toBe('Missing Event Details');
  });
  test('Create event with missing details (location)', async () => {
    // Create a json object with the event details
    const event = {
      'name': 'Test Event',
      'description': 'This is a test event',
      'date': '2023-12-02T00:10:00.000Z',
      'societyId': 1,
      'ticketType': [{
        name: 'Test Ticket Type1',
        price: 200,
        quantity: 10,
      }, {
        name: 'Test Ticket Type2',
        price: 100,
        quantity: 10,
      }],
    };
    const response = await request(app)
        .post('/events/create')
        .set('Authorization', 'Bearer ' + token)
        .send(event);
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error');
    // Expect the event to not be created
    expect(response.body.error).toBe('Missing Event Details');
  });
  test('Create event with missing details (societyId)', async () => {
    // Create a json object with the event details
    const event = {
      'name': 'Test Event',
      'description': 'This is a test event',
      'date': '2023-12-02T00:10:00.000Z',
      'location': faker.address.streetAddress(),
      'ticketType': [{
        name: 'Test Ticket Type1',
        price: 200,
        quantity: 10,
      }, {
        name: 'Test Ticket Type2',
        price: 100,
        quantity: 10,
      }],
    };
    const response = await request(app)
        .post('/events/create')
        .set('Authorization', 'Bearer ' + token)
        .send(event);
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error');
    // Expect the event to not be created
    expect(response.body.error).toBe('Missing Event Details');
  });
  test('Create event with missing details (ticketType)', async () => {
    // Create a json object with the event details
    const event = {
      name: 'Test Event',
      description: 'This is a test event',
      date: '2023-12-02T00:10:00.000Z',
      location: faker.address.streetAddress(),
      societyId: 1,
    };
    const response = await request(app)
        .post('/events/create')
        .set('Authorization', 'Bearer ' + token)
        .send(event);
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error');
    // Expect the event to not be created
    expect(response.body.error).toBe('Missing Event Details');
  });

  test('Create event with missing ticket type body', async () => {
    // Create a json object with the event details
    const event = {
      'name': 'Test Event',
      'description': 'This is a test event',
      'date': '2023-12-02T00:10:00.000Z',
      'location': faker.address.streetAddress(),
      'societyId': 1,
      'ticketType': {
      },
    };
    const response = await request(app)
        .post('/events/create')
        .set('Authorization', 'Bearer ' + token)
        .send(event);
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Missing Ticket Type Body');
  });
  test('Create event with missing ticket type field(name)', async () => {
    // Create a json object with the event details
    const event = {
      'name': 'Test Event',
      'description': 'This is a test event',
      'date': '2023-12-02T00:10:00.000Z',
      'location': faker.address.streetAddress(),
      'societyId': 1,
      'ticketType': [{
        name: 'Test Ticket Type1',
        price: 200,
        quantity: 10,
      }, {
        // MISSING NAME HERE
        price: 100,
        quantity: 10,
      }],
    };
    const response = await request(app)
        .post('/events/create')
        .set('Authorization', 'Bearer ' + token)
        .send(event);
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Missing Ticket Type Details');
  });
  test('Create event with missing ticket type field(price)', async () => {
    // Create a json object with the event details
    const event = {
      'name': 'Test Event',
      'description': 'This is a test event',
      'date': '2023-12-02T00:10:00.000Z',
      'location': faker.address.streetAddress(),
      'societyId': 1,
      'ticketType': [{
        name: 'Test Ticket Type1',
        price: 200,
        quantity: 10,
      }, {
        name: 'Test Ticket Type2',
        // MISSING PRICE HERE
        quantity: 10,
      }],
    };
    const response = await request(app)
        .post('/events/create')
        .set('Authorization', 'Bearer ' + token)
        .send(event);
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Missing Ticket Type Details');
  });
  test('Create event with missing ticket type field(quantity)', async () => {
    // Create a json object with the event details
    const event = {
      'name': 'Test Event',
      'description': 'This is a test event',
      'date': '2023-12-02T00:10:00.000Z',
      'location': faker.address.streetAddress(),
      'societyId': 1,
      'ticketType': [{
        name: 'Test Ticket Type1',
        price: 200,
        quantity: 10,
      }, {
        name: 'Test Ticket Type2',
        price: 100,
        // MISSING QUANTITY HERE
      }],
    };
    const response = await request(app)
        .post('/events/create')
        .set('Authorization', 'Bearer ' + token)
        .send(event);
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Missing Ticket Type Details');
  });
  test('Create event with valid ticket type field (quantity,1)', async () => {
    // Create a json object with the event details
    const event = {
      'name': 'Test Event',
      'description': 'This is a test event',
      'date': '2023-12-02T00:10:00.000Z',
      'location': faker.address.streetAddress(),
      'societyId': 1,
      'ticketType': [{
        name: 'Test Ticket Type1',
        price: 200,
        quantity: 10,
      }, {
        name: 'Test Ticket Type2',
        price: 100,
        quantity: 1, // VALID HERE
      }],
    };
    const response = await request(app)
        .post('/events/create')
        .set('Authorization', 'Bearer ' + token)
        .send(event);
    expect(response.body.ticket_types[1].quantity).toBe(1);
    // Delete ticket types
    for (let i = 0; i< Object.keys(response.body.ticket_types).length; i++) {
      await prisma.ticketType.delete({
        where: {
          id: response.body.ticket_types[i].id,
        },
      });
    }
    // Delete the event
    await prisma.event.delete({
      where: {
        id: response.body.event.id,
      },
    });
  });
  test('Create event with invalid ticket type field (quantity,0)', async () => {
    // Create a json object with the event details
    const event = {
      'name': 'Test Event',
      'description': 'This is a test event',
      'date': '2023-12-02T00:10:00.000Z',
      'location': faker.address.streetAddress(),
      'societyId': 1,
      'ticketType': [{
        name: 'Test Ticket Type1',
        price: 200,
        quantity: 10,
      }, {
        name: 'Test Ticket Type2',
        price: 100,
        quantity: 0, // INVALID HERE
      }],
    };
    const response = await request(app)
        .post('/events/create')
        .set('Authorization', 'Bearer ' + token)
        .send(event);
    expect(response.statusCode).toBe(422);
    expect(response.body.error).toBe('Invalid Quantity');
  });
  test('Create event with valid ticket type field (price,1)', async () => {
    // Create a json object with the event details
    const event = {
      'name': 'Test Event',
      'description': 'This is a test event',
      'date': '2023-12-02T00:10:00.000Z',
      'location': faker.address.streetAddress(),
      'societyId': 1,
      'ticketType': [{
        name: 'Test Ticket Type1',
        price: 200,
        quantity: 10,
      }, {
        name: 'Test Ticket Type2',
        price: 1, // VALID HERE
        quantity: 10,
      }],
    };
    const response = await request(app)
        .post('/events/create')
        .set('Authorization', 'Bearer ' + token)
        .send(event);
    expect(response.body.ticket_types[1].price).toBe(1);
    // Delete ticket types
    for (let i = 0; i< Object.keys(response.body.ticket_types).length; i++) {
      await prisma.ticketType.delete({
        where: {
          id: response.body.ticket_types[i].id,
        },
      });
    }
    // Delete the event
    await prisma.event.delete({
      where: {
        id: response.body.event.id,
      },
    });
  });
  test('Create event with invalid ticket type field (price,0)', async () => {
    // Create a json object with the event details
    const event = {
      'name': 'Test Event',
      'description': 'This is a test event',
      'date': '2023-12-02T00:10:00.000Z',
      'location': faker.address.streetAddress(),
      'societyId': 1,
      'ticketType': [{
        name: 'Test Ticket Type1',
        price: 200,
        quantity: 10,
      }, {
        name: 'Test Ticket Type2',
        price: 0, // INVALID HERE
        quantity: 10,
      }],
    };
    const response = await request(app)
        .post('/events/create')
        .set('Authorization', 'Bearer ' + token)
        .send(event);
    expect(response.statusCode).toBe(422);
    expect(response.body.error).toBe('Invalid Price');
  });
  // This is a POST request
  test('Create event as non committee member', async () => {
    // Check if the user is a committee member from the database
    const isCommittee = await prisma.committee.findFirst({
      where: {
        userId: 2,
        societyId: 1,
      },
    });
    if (isCommittee) {
      await prisma.committee.delete({
        where: {
          userId_societyId: {
            userId: 2,
            societyId: 1,
          },
        },
      });
    }

    // Login as a non committee member
    const response = await request(app).post('/user/login').send({
      email: 'student@kcl.ac.uk',
      password: 'student',
    });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
    token = response.body.token;

    // Create a json object with the event details
    const event = {
      'name': 'Test Event',
      'description': 'This is a test event',
      'date': '2023-12-02T00:10:00.000Z',
      'location': faker.address.streetAddress(),
      'societyId': 1,
      'ticketType': [{
        name: 'Test Ticket Type1',
        price: 200,
        quantity: 10,
      }, {
        name: 'Test Ticket Type2',
        price: 100,
        quantity: 10,
      }],
    };
    const response2 = await request(app)
        .post('/events/create')
        .set('Authorization', 'Bearer ' + token)
        .send(event);
    expect(response2.statusCode).toBe(401);
    expect(response2.body).toHaveProperty('error');
    // Expect the event to not be created
    expect(response2.body.error).toBe('Unauthorized');
  });
  // This is a POST request
  test('Create event with invalid societyId', async () => {
    // Create a json object with the event details
    const event = {
      'name': 'Test Event',
      'description': 'This is a test event',
      'date': '2023-12-02T00:10:00.000Z',
      'location': faker.address.streetAddress(),
      'societyId': -1,
      'ticketType': [{
        name: 'Test Ticket Type1',
        price: 200,
        quantity: 10,
      }, {
        name: 'Test Ticket Type2',
        price: 100,
        quantity: 10,
      }],
    };
    const response = await request(app)
        .post('/events/create')
        .set('Authorization', 'Bearer ' + token)
        .send(event);
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error');
    // Expect the event to not be created
    expect(response.body.error).toBe('Invalid societyId');
  });
  test('Create event with date in the past', async () => {
    // Create a json object with the event details
    const event = {
      'name': 'Test Event',
      'description': 'This is a test event',
      'date': '2019-02-02T00:10:00.000Z',
      'location': faker.address.streetAddress(),
      'societyId': 1,
      'ticketType': [{
        name: 'Test Ticket Type1',
        price: 200,
        quantity: 10,
      }, {
        name: 'Test Ticket Type2',
        price: 100,
        quantity: 10,
      }],
    };
    const response = await request(app)
        .post('/events/create')
        .set('Authorization', 'Bearer ' + token)
        .send(event);
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error');
    // Expect the event to not be created
    expect(response.body.error).toBe('Invalid Date');
  });

  // This is a POST request
  test('Create event with invalid date', async () => {
    // Create a json object with the event details

    const event = {
      'name': 'Test Event',
      'description': 'This is a test event',
      'date': '2023-02-02T00:00:00.000Z',
      // What makes this date invalid is the time
      'location': faker.address.streetAddress(),
      'societyId': 1,
      'ticketType': [{
        name: 'Test Ticket Type1',
        price: 200,
        quantity: 10,
      }, {
        name: 'Test Ticket Type2',
        price: 100,
        quantity: 10,
      }],
    };
    const response = await request(app)
        .post('/events/create')
        .set('Authorization', 'Bearer ' + token)
        .send(event);
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error');
    // Expect the event to not be created
    expect(response.body.error).toBe('Invalid Date');
  });
});

describe('Update Event', () => {
  // This is a POST request
  test('Update event with invalid token', async () => {
    const response = await request(app)
        .post('/events/update')
        .set('Authorization', 'Bearer ' + 'invalid token');
    expect(response.statusCode).toBe(401);
    expect(response.body.error).toBe('Unauthorized');
    expect(response.body.token).toBe(null);
  });

  // This is a POST request
  test('Update event as committee member', async () => {
    // Create a json object with the event details
    const event = {
      'name': 'Test Event',
      'description': 'This is a test event',
      'date': '2023-12-02T00:10:00.000Z',
      'location': faker.address.streetAddress(),
      'societyId': 1,
      'ticketType': [{
        name: 'Test Ticket Type1',
        price: 200,
        quantity: 10,
      }, {
        name: 'Test Ticket Type2',
        price: 100,
        quantity: 10,
      }],
    };

    const response = await request(app)
        .post('/events/create')
        .set('Authorization', 'Bearer ' + token)
        .send(event);
    expect(response.statusCode).toBe(200);

    const updateEvent = {
      eventId: response.body.event.id,
      name: 'Event 1 Updated',
      description: 'This is a test event updated',
      date: '2023-12-02T00:10:00.000Z',
    };

    const response2 = await request(app)
        .post('/events/update')
        .set('Authorization', 'Bearer ' + token)
        .send(updateEvent);
    expect(response2.statusCode).toBe(200);
    expect(response2.body).toHaveProperty('event');
    // Expect the event to be updated
    expect(response2.body.event.name).toBe('Event 1 Updated');
    expect(response2.body.event.description).toBe(
        'This is a test event updated',
    );
    expect(response2.body.event.date).toBe('2023-12-02T00:10:00.000Z');
    expect(response2.body.event.societyId).toBe(1);

    // delete the ticket types
    for (let i = 0; i< Object.keys(response.body.ticket_types).length; i++) {
      await prisma.ticketType.delete({
        where: {
          id: response.body.ticket_types[i].id,
        },
      });
    }
    // Delete the event
    await prisma.event.delete({
      where: {
        id: response.body.event.id,
      },
    });
  });
  // This is a POST request
  test('Update event as non committee member', async () => {
    // Check if the user is a committee member from the database
    const isCommittee = await prisma.committee.findFirst({
      where: {
        userId: 2,
        societyId: 1,
      },
    });
    if (isCommittee) {
      await prisma.committee.delete({
        where: {
          userId_societyId: {
            userId: 2,
            societyId: 1,
          },
        },
      });
    }
    // Login as a non committee member
    const response = await request(app).post('/user/login').send({
      email: 'student@kcl.ac.uk',
      password: 'student',
    });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
    token = response.body.token;

    // Create a json object with the event details
    const updateEvent = {
      eventId: 1,
      name: 'Event 1 Updated',
      description: 'This is a test event updated',
      date: '2023-02-02T00:10:00.000Z',
    };
    const response2 = await request(app)
        .post('/events/update')
        .set('Authorization', 'Bearer ' + token)
        .send(updateEvent);
    expect(response2.statusCode).toBe(401);
    expect(response2.body).toHaveProperty('error');
    // Expect the event to not be updated
    expect(response2.body.error).toBe('Unauthorized');
  });

  // This is a POST request
  test('Update event as committee member', async () => {
    // There is already an event in the database, with id 1
    // Create a json object with the event details
    const updateEvent = {
      eventId: 1,
      name: 'Event 1 Updated',
      description: 'This is a test event updated',
      date: '2023-12-02T00:10:00.000Z',
    };
    const response = await request(app)
        .post('/events/update')
        .set('Authorization', 'Bearer ' + token)
        .send(updateEvent);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('event');
    // Expect the event to be updated
    expect(response.body.event.name).toBe('Event 1 Updated');
    expect(response.body.event.description).toBe(
        'This is a test event updated',
    );
    expect(response.body.event.date).toBe('2023-12-02T00:10:00.000Z');
    expect(response.body.event.societyId).toBe(1);
  });
  // This is a POST request
  test('Update event with invalid date', async () => {
    // Create a json object with the event details
    const updateEvent = {
      eventId: 1,
      name: 'Event 1 Updated',
      date: '2023-02-02T00:00:00.000Z',
      // What makes this date invalid is the time
    };
    const response = await request(app)
        .post('/events/update')
        .set('Authorization', 'Bearer ' + token)
        .send(updateEvent);
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error');
    // Expect the event to not be updated
    expect(response.body.error).toBe('Invalid Date');
  });
  // This is a POST request
  test('Update event with invalid date', async () => {
    // Create a json object with the event details
    const updateEvent = {
      eventId: 1,
      name: 'Event 1 Updated',
      date: '2023-02-02T00:00:00.000Z',
      // What makes this date invalid is the time
    };
    const response = await request(app)
        .post('/events/update')
        .set('Authorization', 'Bearer ' + token)
        .send(updateEvent);
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error');
    // Expect the event to not be updated
    expect(response.body.error).toBe('Invalid Date');
  });

  // This is a POST request
  test('Update event with invalid event id', async () => {
    const updateEvent = {
      eventId: -1,
      societyId: 1,
      name: 'Event 1 Updated',
    };
    const response = await request(app)
        .post('/events/update')
        .set('Authorization', 'Bearer ' + token)
        .send(updateEvent);
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error');
    // Expect the event to not be updated
    expect(response.body.error).toBe('Invalid eventId');
  });

  // This is a POST request
  test('Update event with no event id', async () => {
    const updateEvent = {
      name: 'Event 1 Updated',
      description: 'This is a test event updated',
      date: '2023-12-02T00:10:00.000Z',
    };
    const response = await request(app)
        .post('/events/update')
        .set('Authorization', 'Bearer ' + token)
        .send(updateEvent);
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error');
    // Expect the event to not be updated
    expect(response.body.error).toBe('Missing Event Details');
  });

  // This is a POST request
  test('Update event with no other fields', async () => {
    const updateEvent = {
      eventId: 1,
    };
    const response = await request(app)
        .post('/events/update')
        .set('Authorization', 'Bearer ' + token)
        .send(updateEvent);
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error');
    // Expect the event to not be updated
    expect(response.body.error).toBe('Missing Event Details');
  });
});

describe('Delete Event', () => {
  // This is a POST request
  test('Update event with invalid token', async () => {
    const response = await request(app)
        .post('/events/delete')
        .set('Authorization', 'Bearer ' + 'invalid token');
    expect(response.statusCode).toBe(401);
    expect(response.body.error).toBe('Unauthorized');
    expect(response.body.token).toBe(null);
  });
  // This is a POST request
  test('Delete event as committee member', async () => {
    // create event
    const event = {
      'name': 'Test Event',
      'description': 'This is a test event',
      'date': '2023-12-02T00:10:00.000Z',
      'location': faker.address.streetAddress(),
      'societyId': 1,
      'ticketType': [{
        name: 'Test Ticket Type1',
        price: 200,
        quantity: 10,
      }, {
        name: 'Test Ticket Type2',
        price: 100,
        quantity: 10,
      }],
    };
    const response = await request(app)
        .post('/events/create')
        .set('Authorization', 'Bearer ' + token)
        .send(event);
    expect(response.statusCode).toBe(200);
    const response2 = await request(app)
        .post('/events/delete')
        .set('Authorization', 'Bearer ' + token)
        .send({
          eventId: response.body.event.id,
        });
    expect(response2.statusCode).toBe(200);
    expect(response2.body).toHaveProperty('message');
    // Expect the event to be deleted
    expect(response2.body.message).toBe('Event Archived');

    // Check that the event has been archived in prisma
    const eventArchived = await prisma.event.findUnique({
      where: {
        id: response.body.event.id,
      },
    });
    expect(eventArchived).toHaveProperty('isArchived');
    expect(eventArchived.isArchived).toBe(true);
    for (let i = 0; i< Object.keys(response.body.ticket_types).length; i++) {
      await prisma.ticketType.delete({
        where: {
          id: response.body.ticket_types[i].id,
        },
      });
    }
    // Delete the event
    await prisma.event.delete({
      where: {
        id: response.body.event.id,
      },
    });
  });

  // This is a POST request
  test('Delete event as non committee member', async () => {
    // Login as a non committee member
    // response is non committee login
    // response2 is create event
    // response3 is deleting event
    tokenAdmin = token;
    const response = await request(app).post('/user/login').send({
      email: 'student@kcl.ac.uk',
      password: 'student',
    });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
    token = response.body.token;
    // create event
    const event = {
      'name': 'Test Event',
      'description': 'This is a test event',
      'date': '2023-12-02T00:10:00.000Z',
      'location': faker.address.streetAddress(),
      'societyId': 1,
      'ticketType': [{
        name: 'Test Ticket Type1',
        price: 200,
        quantity: 10,
      }, {
        name: 'Test Ticket Type2',
        price: 100,
        quantity: 10,
      }],
    };
    const response2 = await request(app)
        .post('/events/create')
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .send(event);
    expect(response2.statusCode).toBe(200);
    const response3 = await request(app)
        .post('/events/delete')
        .set('Authorization', 'Bearer ' + token)
        .send({
          eventId: response2.body.event.id,
        });
    expect(response3.statusCode).toBe(401);
    expect(response3.body).toHaveProperty('error');
    // Expect the event to not be deleted
    expect(response3.body.error).toBe('Unauthorized');
    for (let i = 0; i< Object.keys(response2.body.ticket_types).length; i++) {
      await prisma.ticketType.delete({
        where: {
          id: response2.body.ticket_types[i].id,
        },
      });
    }
    // Delete the event
    await prisma.event.delete({
      where: {
        id: response2.body.event.id,
      },
    });
  });
  // This is a POST request
  test('Delete event with invalid eventId', async () => {
    const response = await request(app)
        .post('/events/delete')
        .set('Authorization', 'Bearer ' + token)
        .send({
          eventId: -1,
        });
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error');
    // Expect the event to not be deleted
    expect(response.body.error).toBe('Invalid eventId');
  });
  // This is a POST request
  test('Delete event with no eventId', async () => {
    const response = await request(app)
        .post('/events/delete')
        .set('Authorization', 'Bearer ' + token)
        .send({

        });
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error');
    // Expect the event to not be deleted
    expect(response.body.error).toBe('Missing Event Details');
  });
});
describe('search events', () => {
  test('Search events', async () => {
    // create event
    // response is create events
    // response2 is search events
    const event = {
      'name': 'Test Event',
      'description': 'This is a test event',
      'date': '2023-12-02T00:10:00.000Z',
      'location': faker.address.streetAddress(),
      'societyId': 1,
      'ticketType': [{
        name: 'Test Ticket Type1',
        price: 200,
        quantity: 10,
      }, {
        name: 'Test Ticket Type2',
        price: 100,
        quantity: 10,
      }],
    };

    const response = await request(app)
        .post('/events/create')
        .set('Authorization', 'Bearer ' + token)
        .send(event);
    expect(response.statusCode).toBe(200);

    const search = {
      name: response.body.event.name,
    };

    const response2 = await request(app)
        .post('/events/search')
        .set('Authorization', 'Bearer ' + token)
        .send(search);
    expect(response2.statusCode).toBe(200);
    for (let i = 0; i< Object.keys(response.body.ticket_types).length; i++) {
      await prisma.ticketType.delete({
        where: {
          id: response.body.ticket_types[i].id,
        },
      });
    }
    // Delete the event
    await prisma.event.delete({
      where: {
        id: response.body.event.id,
      },
    });
  });
  test('Search event with name as undefined', async () => {
    const response = await request(app)
        .post('/events/search')
        .set('Authorization', 'Bearer ' + token)
        .send(); // default of name is undefined
    // get amount of events in database
    const eventCount = await prisma.event.count();
    expect(response.statusCode).toBe(200);
    expect(Object.keys(response.body.event).length).toBe(eventCount);
  });
});
describe('check privileges', () =>{
  // This is a POST request
  test('check privileges with invalid token', async () => {
    const response = await request(app)
        .post('/events/auth')
        .set('Authorization', 'Bearer ' + 'invalid token');
    expect(response.statusCode).toBe(401);
    expect(response.body.error).toBe('Unauthorized');
    expect(response.body.token).toBe(null);
  });
  test('check privileges as committee member', async () => {
    const response = await request(app)
        .post('/events/auth')
        .set('Authorization', 'Bearer ' + token);
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Authorized');
  });
  test('check privileges as non committee member', async () => {
    const response = await request(app).post('/user/login').send({
      email: 'student@kcl.ac.uk',
      password: 'student',
    });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
    token = response.body.token;
    const response2 = await request(app)
        .post('/events/auth')
        .set('Authorization', 'Bearer ' + token);
    expect(response2.statusCode).toBe(401);
    expect(response2.body.error).toBe('Unauthorized');
  });
});

