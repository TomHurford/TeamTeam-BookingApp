const request = require('supertest');
const prisma = require('../../prisma/prisma.js');
const app = require('../server.js');
const {faker} = require('@faker-js/faker');

let token = null;

beforeAll(async () => {
  console.log(
      'MAKE SURE BEFORE YOU RUN THESE TESTS THAT YOU HAVE RUN:\n'+
    'npx prisma migrate reset',
  );
});

beforeEach(async () => {
  const response = await request(app).post('/user/login').send({
    email: 'admin@admin.com',
    password: 'admin',
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
});

describe('Create Event', () => {
  // This is a POST request
  test('Create event as committee member', async () => {
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

    // Delete the event
    await prisma.event.delete({
      where: {
        id: response.body.event.id,
      },
    });
  });

  // This is a POST request
  test('Create event as non committee member', async () => {
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
      name: 'Test Event',
      description: 'This is a test event',
      date: '2023-12-02T00:10:00.000Z',
      location: faker.address.streetAddress(),
      societyId: 1,
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
  test('Create event with missing details', async () => {
    // Create a json object with the event details
    const event = {
      name: 'Test Event',
      description: 'This is a test event',
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

  test('Create event with date in the past', async () => {
    // Create a json object with the event details
    const event = {
      name: 'Test Event',
      description: 'This is a test event',
      date: '2019-02-02T00:10:00.000Z',
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
    expect(response.body.error).toBe('Invalid Date');
  });

  // This is a POST request
  test('Create event with invalid date', async () => {
    // Create a json object with the event details
    const event = {
      name: 'Test Event',
      description: 'This is a test event',
      date: '2023-02-02T00:00:00.000Z',
      // What makes this date invalid is the time
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
    expect(response.body.error).toBe('Invalid Date');
  });

  // This is a POST request
  test('Create event with invalid societyId', async () => {
    // Create a json object with the event details
    const event = {
      name: 'Test Event',
      description: 'This is a test event',
      date: '2023-02-02T00:10:00.000Z',
      location: faker.address.streetAddress(),
      societyId: -1,
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
});

describe('Update Event', () => {
  // This is a POST request
  test('Update event as committee member', async () => {
    // There is already an event in the database, with id 1
    // Create a json object with the event details
    const event = {
      eventId: 1,
      name: 'Event 1 Updated',
      description: 'This is a test event updated',
      date: '2023-12-02T00:10:00.000Z',
    };
    const response = await request(app)
        .post('/events/update')
        .set('Authorization', 'Bearer ' + token)
        .send(event);
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
  test('Update event as non committee member', async () => {
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
      eventId: 1,
      name: 'Event 1 Updated',
      description: 'This is a test event updated',
      date: '2023-02-02T00:10:00.000Z',
    };
    const response2 = await request(app)
        .post('/events/update')
        .set('Authorization', 'Bearer ' + token)
        .send(event);
    expect(response2.statusCode).toBe(401);
    expect(response2.body).toHaveProperty('error');
    // Expect the event to not be updated
    expect(response2.body.error).toBe('Unauthorized');
  });

  // This is a POST request
  test('Update event with invalid date', async () => {
    // Create a json object with the event details
    const event = {
      eventId: 1,
      name: 'Event 1 Updated',
      date: '2023-02-02T00:00:00.000Z',
      // What makes this date invalid is the time
    };
    const response = await request(app)
        .post('/events/update')
        .set('Authorization', 'Bearer ' + token)
        .send(event);
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error');
    // Expect the event to not be updated
    expect(response.body.error).toBe('Invalid Date');
  });

  // This is a POST request
  test('Update event with invalid event id', async () => {
    const event = {
      eventId: -1,
      societyId: 1,
      name: 'Event 1 Updated',
    };
    const response = await request(app)
        .post('/events/update')
        .set('Authorization', 'Bearer ' + token)
        .send(event);
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error');
    // Expect the event to not be updated
    expect(response.body.error).toBe('Invalid eventId');
  });
});

describe('Delete Event', () => {
  // This is a POST request
  test('Delete event as committee member', async () => {
    const response = await request(app)
        .post('/events/delete')
        .set('Authorization', 'Bearer ' + token)
        .send({
          eventId: 1,
        });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message');
    // Expect the event to be deleted
    expect(response.body.message).toBe('Event Archived');

    // Check that the event has been archived in prisma
    const event = await prisma.event.findUnique({
      where: {
        id: 1,
      },
    });

    expect(event).toHaveProperty('isArchived');
    expect(event.isArchived).toBe(true);
  });

  // This is a POST request
  test('Delete event as non committee member', async () => {
    // Login as a non committee member
    const response = await request(app).post('/user/login').send({
      email: 'student@kcl.ac.uk',
      password: 'student',
    });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
    token = response.body.token;

    const response2 = await request(app)
        .post('/events/delete')
        .set('Authorization', 'Bearer ' + token)
        .send({
          eventId: 1,
        });
    expect(response2.statusCode).toBe(401);
    expect(response2.body).toHaveProperty('error');
    // Expect the event to not be deleted
    expect(response2.body.error).toBe('Unauthorized');
  });

  // This is a POST request
  test('Delete event with invalid id', async () => {
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
});
