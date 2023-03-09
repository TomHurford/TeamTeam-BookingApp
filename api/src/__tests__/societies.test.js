// This is going to be a test suite for the societies route
// We will be using the supertest library to test the API
// We will also be using the jest library to run the tests

// Import the supertest library
const request = require('supertest');
// Import the app
const app = require('../server.js');

// I want to test these routes:
// GET /societies
// POST /societies
//   - with valid data
//   - with invalid data
// POST /societies/update
//   - with valid data
//   - with invalid data
// POST /societies/delete
//   - with valid data
//   - with invalid data

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
        password: 'admin',
      });
  token = res.body.token;
});

describe('Create Societies', () => {
  test('Signup societies with normal values', async () => {
    console.log('sending request to /societies/signup');
    const response = await request(app)
        .get('/societies/signup')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Team Team Society',
          userId: 1,
        });

    expect(response.statusCode).toBe(200);
  });
});

// This is the test suite for the societies route
describe('Get societies', () => {
  // This is the test for the GET /societies route
  test('Get societies', async () => {
    // Make the request to the API
    const res = await request(app)
        .get('/societies')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
    // Check the response
    expect(res.body).not.toBeNull();
    expect(res.body.length).toBe(4);
    expect(res.body[0].name).toBe('Society 1');
  });

  test('Get societies with invalid token', async () => {
    // Make the request to the API
    const res = await request(app)
        .get('/societies')
        .set('Authorization', `Bearer ${token}1`)
        .expect(401);
    // Check the response
    expect(res.body).not.toBeNull();
    expect(res.body.message).toBe('Invalid token');
  });

  // This is the test for the POST /societies route
  test('Get society with id', async () => {
    // Make the request to the API
    const res = await request(app)
        .post('/societies')
        .set('Authorization', `Bearer ${token}`)
        .send({
          id: 1,
        })
        .expect(200);
    // Check the response
    expect(res.body).not.toBeNull();
    expect(res.body.name).toBe('Society 1');
  });

  test('Get society with invalid id', async () => {
    // Make the request to the API
    const res = await request(app)
        .post('/societies')
        .set('Authorization', `Bearer ${token}`)
        .send({
          id: -1,
        })
        .expect(404);
    // Check the response
    expect(res.body).not.toBeNull();
    expect(res.body.message).toBe('Society not found');
  });

  test('Get society with invalid token', async () => {
    // Make the request to the API
    const res = await request(app)
        .post('/societies')
        .set('Authorization', `Bearer ${token}1`)
        .send({
          id: 1,
        })
        .expect(401);
    // Check the response
    expect(res.body).not.toBeNull();
    expect(res.body.message).toBe('Invalid token');
  });
});

// These are the tests for the societies/update route
describe('Update society', () => {
  test('Update society with valid data', async () => {
    // Make the request to the API
    const res = await request(app)
        .post('/societies/update')
        .set('Authorization', `Bearer ${token}`)
        .send({
          id: 1,
          name: 'Society 1 updated',
          description: 'Society 1 description updated',
        })
        .expect(200);
    // Check the response
    expect(res.body).not.toBeNull();
    expect(res.body.name).toBe('Society 1 updated');
    expect(res.body.description).toBe('Society 1 description updated');
  });

  test('Update society with invalid data', async () => {
    // Make the request to the API
    const res = await request(app)
        .post('/societies/update')
        .set('Authorization', `Bearer ${token}`)
        .send({
          id: 1,
          name: '',
          description: '',
        })
        .expect(400);
    // Check the response
    expect(res.body).not.toBeNull();
    expect(res.body.message).toBe('Invalid data');
  });

  test('Update society with invalid token', async () => {
    // Make the request to the API
    const res = await request(app)
        .post('/societies/update')
        .set('Authorization', `Bearer ${token}1`)
        .send({
          id: 1,
          name: 'Society 1 updated',
          description: 'Society 1 description updated',
        })
        .expect(401);
    // Check the response
    expect(res.body).not.toBeNull();
    expect(res.body.message).toBe('Invalid token');
  });

  test('Update society with invalid id', async () => {
    // Make the request to the API
    const res = await request(app)
        .post('/societies/update')
        .set('Authorization', `Bearer ${token}`)
        .send({
          id: -1,
          name: 'Society 1 updated',
          description: 'Society 1 description updated',
        })
        .expect(404);
    // Check the response
    expect(res.body).not.toBeNull();
    expect(res.body.message).toBe('Society not found');
  });

  test('Update society with invalid id and invalid data', async () => {
    // Make the request to the API
    const res = await request(app)
        .post('/societies/update')
        .set('Authorization', `Bearer ${token}`)
        .send({
          id: -1,
          name: '',
          description: '',
        })
        .expect(400);
    // Check the response
    expect(res.body).not.toBeNull();
    expect(res.body.message).toBe('Invalid data');
  });

  test('Update society with invalid id and invalid token', async () => {
    // Make the request to the API
    const res = await request(app)
        .post('/societies/update')
        .set('Authorization', `Bearer ${token}1`)
        .send({
          id: -1,
          name: 'Society 1 updated',
          description: 'Society 1 description updated',
        })
        .expect(401);
    // Check the response
    expect(res.body).not.toBeNull();
    expect(res.body.message).toBe('Invalid token');
  });

  test('Update society with invalid id and invalid data and invalid token',
      async () => {
      // Make the request to the API
        const res = await request(app)
            .post('/societies/update')
            .set('Authorization', `Bearer ${token}1`)
            .send({
              id: -1,
              name: '',
              description: '',
            })
            .expect(400);
        // Check the response
        expect(res.body).not.toBeNull();
        expect(res.body.message).toBe('Invalid data');
      });

  test('Update society as a user with no permission', async () => {
    // Login as a user with no permission
    const res = await request(app)
        .post('/users/login')
        .send({
          email: 'student@kcl.ac.uk',
          password: 'student',
        })
        .expect(200);
    // Make the request to the API
    const res2 = await request(app)
        .post('/societies/update')
        .set('Authorization', `Bearer ${res.body.token}`)
        .send({
          id: 1,
          name: 'Society 1 updated',
          description: 'Society 1 description updated',
        })
        .expect(403);
    // Check the response
    expect(res2.body).not.toBeNull();
    expect(res2.body.message).toBe(
        'You do not have permission to perform this action',
    );
  });
});

// The societies are not actually deleted from the database, they are just
// marked as archived
describe('Delete society', () => {
  test('Delete society with valid id', async () => {
    // Make the request to the API
    const res = await request(app)
        .post('/societies/delete')
        .set('Authorization', `Bearer ${token}`)
        .send({
          id: 1,
        })
        .expect(200);
    // Check the response
    expect(res.body).not.toBeNull();
    expect(res.body.message).toBe('Society deleted');
  });

  test('Delete society with invalid id', async () => {
    // Make the request to the API
    const res = await request(app)
        .post('/societies/delete')
        .set('Authorization', `Bearer ${token}`)
        .send({
          id: -1,
        })
        .expect(404);
    // Check the response
    expect(res.body).not.toBeNull();
    expect(res.body.message).toBe('Society not found');
  });

  test('Delete society with invalid token', async () => {
    // Make the request to the API
    const res = await request(app)
        .post('/societies/delete')
        .set('Authorization', `Bearer ${token}1`)
        .send({
          id: 1,
        })
        .expect(401);
    // Check the response
    expect(res.body).not.toBeNull();
    expect(res.body.message).toBe('Invalid token');
  });

  test('Delete society with invalid id and invalid token', async () => {
    // Make the request to the API
    const res = await request(app)
        .post('/societies/delete')
        .set('Authorization', `Bearer ${token}1`)
        .send({
          id: -1,
        })
        .expect(401);
    // Check the response
    expect(res.body).not.toBeNull();
    expect(res.body.message).toBe('Invalid token');
  });

  test('Delete society as a user with no permission', async () => {
    // Login as a user with no permission
    const res = await request(app)
        .post('/users/login')
        .send({
          email: 'student@kcl.ac.uk',
          password: 'student',
        })
        .expect(200);
    // Make the request to the API
    const res2 = await request(app)
        .post('/societies/delete')
        .set('Authorization', `Bearer ${res.body.token}`)
        .send({
          id: 1,
        })
        .expect(403);
    // Check the response
    expect(res2.body).not.toBeNull();
    expect(res2.body.message).toBe(
        'You do not have permission to perform this action',
    );
  });
});
