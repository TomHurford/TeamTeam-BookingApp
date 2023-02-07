const request = require('supertest')
const prisma = require('../../prisma/prisma.js')
const app = require('../server.js')
const {faker} = require('@faker-js/faker')

let token = null

beforeAll(async () => {
    console.log('MAKE SURE BEFORE YOU RUN THESE TESTS THAT YOU HAVE RUN: npx prisma migrate reset')
})

beforeEach(async () => {
    const response = await request(app)
        .post('/login')
        .send({
            email: 'admin@admin.com',
            password: 'admin'
        })
    token = response.body.token
})

/*
Here I want to test all routes that are created in the events controller

I want to test the following routes:
Create event
Get all events
    - Can be done by any user
Get event by id
    - Can be done by any user
Get events by society_id
    - Can be done by any user
Get events by date range
    - Can be done by any user
    - Can be done by society_id
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
            .set('Authorization', 'Bearer ' + token)
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('events')
    })

    // This is a POST request
    test('Get event by id', async () => {
        // Create a json object with the event_id
        const event_id = {
            event_id: 1
        }
        const response = await request(app)
            .get('/events')
            .set('Authorization', 'Bearer ' + token)
            .send(event_id)
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('event')
    })

    // This is a POST request
    test('Get events by society_id', async () => {
        // Create a json object with the society_id
        const society_id = {
            society_id: 1
        }
        const response = await request(app)
            .post('/events/society')
            .set('Authorization', 'Bearer ' + token)
            .send(society_id)
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('events')
        // Expect the events to be from the society with id 1
        expect(response.body.events[0].society_id).toBe(1)
    })

    // This is a POST request
    test('Get events by date range', async () => {
        // Create a json object with the date range
        const dateRange = {
            start: '2023-01-01',
            end: '2023-12-31'
        }
        const response = await request(app)
            .post('/events/date')
            .set('Authorization', 'Bearer ' + token)
            .send(dateRange)
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('events')
        // Expect the events to be from the date range
        expect(response.body.events[0].date).toBe('2023-02-02T00:10:00.000Z')
    })

    // This is a POST request
    test('Get events by date range and society_id', async () => {
        // Create a json object with the date range and society_id
        const dateRange = {
            start_date: '2023-01-01',
            end_date: '2023-12-31',
            society_id: 1
        }
        const response = await request(app)
            .post('/events/date/society')
            .set('Authorization', 'Bearer ' + token)
            .send(dateRange)
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('events')
        // Expect the events to be from the date range and society_id
        expect(response.body.events[0].date).toBe('2023-02-02T00:10:00.000Z')
        expect(response.body.events[0].society_id).toBe(1)
    })

    test('Get events by open ended date range (Start only)', async () => {
        // Create a json object with the date range
        const dateRange = {
            start_date: '2023-01-01'
        }
        const response = await request(app)
            .post('/events/date')
            .set('Authorization', 'Bearer ' + token)
            .send(dateRange)
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('events')
        // Expect the events to be from the date range
        expect(response.body.events[0].date).toBe('2023-02-02T00:10:00.000Z')
    })

    test('Get events by open ended date range (End only)', async () => {
        // Create a json object with the date range
        const dateRange = {
            end_date: '2023-12-31'
        }
        const response = await request(app)
            .post('/events/date')
            .set('Authorization', 'Bearer ' + token)
            .send(dateRange)
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('events')
        // Expect the events to be from the date range
        expect(response.body.events[0].date).toBe('2023-02-02T00:10:00.000Z')
    })

    test('Get events by open ended date range (Start only) and society_id', async () => {
        // Create a json object with the date range
        const dateRange = {
            start_date: '2023-01-01',
            society_id: 1
        }
        const response = await request(app)
            .post('/events/date/society')
            .set('Authorization', 'Bearer ' + token)
            .send(dateRange)
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('events')
        // Expect the events to be from the date range
        expect(response.body.events[0].date).toBe('2023-02-02T00:10:00.000Z')
        expect(response.body.events[0].society_id).toBe(1)
    })

    test('Get events by open ended date range (End only) and society_id', async () => {
        // Create a json object with the date range
        const dateRange = {
            end_date: '2023-12-31',
            society_id: 1
        }
        const response = await request(app)
            .post('/events/date/society')
            .set('Authorization', 'Bearer ' + token)
            .send(dateRange)
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('events')
        // Expect the events to be from the date range
        expect(response.body.events[0].date).toBe('2023-02-02T00:10:00.000Z')
        expect(response.body.events[0].society_id).toBe(1)
    })
})

describe('Create Event', () => {
    // This is a POST request
    test('Create event as committee member', async () => {
        // Create a json object with the event details
        const event = {
            name: 'Test Event',
            description: 'This is a test event',
            date: '2023-02-02T00:10:00.000Z',
            location: faker.address.streetAddress(),
            society_id: 1
        }
        const response = await request(app)
            .post('/events/create')
            .set('Authorization', 'Bearer ' + token)
            .send(event)
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('event')
        // Expect the event to be created
        expect(response.body.event.name).toBe('Test Event')
        expect(response.body.event.description).toBe('This is a test event')
        expect(response.body.event.date).toBe('2023-02-02T00:10:00.000Z')
        expect(response.body.event.society_id).toBe(1)
    })

    // This is a POST request
    test('Create event as non committee member', async () => {
        // Login as a non committee member
        const response = await request(app)
            .post('/login')
            .send({
                email: 'student@kcl.ac.uk',
                password: 'student'
            })
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('token')
        token = response.body.token

        // Create a json object with the event details
        const event = {
            name: 'Test Event',
            description: 'This is a test event',
            date: '2023-02-02T00:10:00.000Z',
            location: faker.address.streetAddress(),
            society_id: 1
        }
        const response2 = await request(app)
            .post('/events/create')
            .set('Authorization', 'Bearer ' + token)
            .send(event)
        expect(response2.statusCode).toBe(401)
        expect(response2.body).toHaveProperty('error')
        // Expect the event to not be created
        expect(response2.body.error).toBe('Unauthorized')
    })

    // This is a POST request
    test('Create event with missing details', async () => {
        // Create a json object with the event details
        const event = {
            name: 'Test Event',
            description: 'This is a test event',
            society_id: 1
        }
        const response = await request(app)
            .post('/events/create')
            .set('Authorization', 'Bearer ' + token)
            .send(event)
        expect(response.statusCode).toBe(400)
        expect(response.body).toHaveProperty('error')
        // Expect the event to not be created
        expect(response.body.error).toBe('Missing event details')
    })

    test('Create event with date in the past', async () => {
        // Create a json object with the event details
        const event = {
            name: 'Test Event',
            description: 'This is a test event',
            date: '2019-02-02T00:10:00.000Z',
            location: faker.address.streetAddress(),
            society_id: 1
        }
        const response = await request(app)
            .post('/events/create')
            .set('Authorization', 'Bearer ' + token)
            .send(event)
        expect(response.statusCode).toBe(400)
        expect(response.body).toHaveProperty('error')
        // Expect the event to not be created
        expect(response.body.error).toBe('Invalid date')
    })

    // This is a POST request
    test('Create event with invalid date', async () => {
        // Create a json object with the event details
        const event = {
            name: 'Test Event',
            description: 'This is a test event',
            date: '2023-02-02T00:00:00.000Z',
            // What makes this date invalid is the time
            location: faker.address.streetAddress(),
            society_id: 1
        }
        const response = await request(app)
            .post('/events/create')
            .set('Authorization', 'Bearer ' + token)
            .send(event)
        expect(response.statusCode).toBe(400)
        expect(response.body).toHaveProperty('error')
        // Expect the event to not be created
        expect(response.body.error).toBe('Invalid date')
    })

    // This is a POST request
    test('Create event with invalid society_id', async () => {
        // Create a json object with the event details
        const event = {
            name: 'Test Event',
            description: 'This is a test event',
            date: '2023-02-02T00:10:00.000Z',
            location: faker.address.streetAddress(),
            society_id: 100000000000000
        }
        const response = await request(app)
            .post('/events/create')
            .set('Authorization', 'Bearer ' + token)
            .send(event)
        expect(response.statusCode).toBe(400)
        expect(response.body).toHaveProperty('error')
        // Expect the event to not be created
        expect(response.body.error).toBe('Invalid society_id')
    })
})

describe('Update Event', () => {
    // This is a PUT request
    test('Update event as committee member', async () => {
        // There is already an event in the database, with id 1
        // Create a json object with the event details
        const event = {
            id: 1,
            name: 'Event 1 Updated',
            description: 'This is a test event updated',
            date: '2023-02-02T00:10:00.000Z',
        }
        const response = await request(app)
            .put('/events/update')
            .set('Authorization', 'Bearer ' + token)
            .send(event)
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('event')
        // Expect the event to be updated
        expect(response.body.event.name).toBe('Event 1 Updated')
        expect(response.body.event.description).toBe('This is a test event')
        expect(response.body.event.date).toBe('2023-02-02T00:10:00.000Z')
        expect(response.body.event.society_id).toBe(1)
    })

    // This is a PUT request
    test('Update event as non committee member', async () => {
        // Login as a non committee member
        const response = await request(app)
            .post('/login')
            .send({
                email: 'student@kcl.ac.uk',
                password: 'student'
            })
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('token')
        token = response.body.token

        // Create a json object with the event details
        const event = {
            id: 1,
            name: 'Event 1 Updated',
            description: 'This is a test event updated',
            date: '2023-02-02T00:10:00.000Z',
        }
        const response2 = await request(app)
            .put('/events/update')
            .set('Authorization', 'Bearer ' + token)
            .send(event)
        expect(response2.statusCode).toBe(403)
        expect(response2.body).toHaveProperty('error')
        // Expect the event to not be updated
        expect(response2.body.error).toBe('User is not a committee member')
    })

    // This is a PUT request
    test('Update event with invalid date', async () => {
        // Create a json object with the event details
        const event = {
            id: 1,
            name: 'Event 1 Updated',
            date: '2023-02-02T00:00:00.000Z',
            // What makes this date invalid is the time
        }
        const response = await request(app)
            .put('/events/update')
            .set('Authorization', 'Bearer ' + token)
            .send(event)
        expect(response.statusCode).toBe(400)
        expect(response.body).toHaveProperty('error')
        // Expect the event to not be updated
        expect(response.body.error).toBe('Invalid date')
    })

    // This is a PUT request
    test('Update event with invalid society_id', async () => {
        const event = {
            id: 1,
            society_id: 100000000000000
        }
        const response = await request(app)
            .put('/events/update')
            .set('Authorization', 'Bearer ' + token)
            .send(event)
        expect(response.statusCode).toBe(400)
        expect(response.body).toHaveProperty('error')
        // Expect the event to not be updated
        expect(response.body.error).toBe('No event with that society_id')
    })

    // This is a PUT request
    test('Update event with invalid event id', async () => {
        const event = {
            id: 100000000000000,
            society_id: 1
        }
        const response = await request(app)
            .put('/events/update')
            .set('Authorization', 'Bearer ' + token)
            .send(event)
        expect(response.statusCode).toBe(400)
        expect(response.body).toHaveProperty('error')
        // Expect the event to not be updated
        expect(response.body.error).toBe('No event with that id')
    })
})

describe('Delete Event', () => {
    // This is a POST request
    test('Delete event as committee member', async () => {
        const response = await request(app)
            .post('/events/delete')
            .set('Authorization', 'Bearer ' + token)
            .send({
                id: 1
            })
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('message')
        // Expect the event to be deleted
        expect(response.body.message).toBe('Event deleted')

        // Check that the event has been deleted using prisma
        const event = await prisma.event.findUnique({
            where: {
                id: 1
            }
        })
        expect(event).toBeNull()

        // Recreate the event
        await prisma.event.create({
            data: {
                id: 1,
                name: 'Event 1',
                description: 'This is a test event',
                date: '2023-02-02T00:10:00.000Z',
                location: faker.address.streetAddress(),
                society_id: 1
            }
        })
        // Check that the event has been recreated using prisma
        const event2 = await prisma.event.findUnique({
            where: {
                id: 1
            }
        })
        expect(event2).not.toBeNull()
    })

    // This is a POST request
    test('Delete event as non committee member', async () => {
        // Login as a non committee member
        const response = await request(app)
            .post('/login')
            .send({
                email: 'student@kcl.ac.uk',
                password: 'student'
            })
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('token')
        token = response.body.token

        const response2 = await request(app)
            .post('/events/delete')
            .set('Authorization', 'Bearer ' + token)
            .send({
                id: 1
            })
        expect(response2.statusCode).toBe(403)
        expect(response2.body).toHaveProperty('error')
        // Expect the event to not be deleted
        expect(response2.body.error).toBe('User is not a committee member')
    })

    // This is a POST request
    test('Delete event with invalid id', async () => {
        const response = await request(app)
            .post('/events/delete')
            .set('Authorization', 'Bearer ' + token)
            .send({
                id: 100000000000000
            })
        expect(response.statusCode).toBe(400)
        expect(response.body).toHaveProperty('error')
        // Expect the event to not be deleted
        expect(response.body.error).toBe('No event with that id')
    })
})
