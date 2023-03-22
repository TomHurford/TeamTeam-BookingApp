const request = require('supertest');
const prisma = require('../../prisma/prisma.js');
const app = require('../server.js');
const bcrypt = require('../utils/bcrypt.js');
// const seed = require('../../prisma/seed.js')
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

// // Here I am testing the login function from the login controller
describe('Login', () => {
  test('Login with valid credentials', async () => {
    const response = await request(app).post('/user/login').send({
      email: 'admin@admin.com',
      password: 'admin123',
    });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  test('Login with invalid credentials', async () => {
    const response = await request(app).post('/user/login').send({
      email: 'admin@admin.com',
      password: 'wrongpassword',
    });
    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('message');
    expect(response.body.token).toBe(null);
  });

  test('Login with invalid email', async () => {
    const response = await request(app).post('/user/login').send({
      email: 'admin@admin',
      password: 'admin',
    });
    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('message');
    expect(response.body.token).toBe(null);
  });
});

// // Here I am testing the logout function from the login controller
describe('Logout', () => {
  test('Logout with valid token', async () => {
    // Put the token in the header of the request under Authorization and Bearer
    const logoutResponse = await request(app)
        .post('/user/logout')
        .set('Authorization', 'Bearer ' + token);
    // console.log(logoutResponse.body)
    expect(logoutResponse.statusCode).toBe(200);
    expect(logoutResponse.body).toHaveProperty('message');
    expect(logoutResponse.body.message).toBe('Logout successful');
  });

  test('Logout with invalid token', async () => {
    const response = await request(app)
        .post('/user/logout')
        .set('Authorization', 'Bearer ' + 'invalidtoken');
    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Unauthorized');
  });
});

// // Here I am testing the reset function from the login controller
describe('Reset', () => {
  test('Reset with valid Code', async () => {
    await prisma.verifications.create({
      data: {
        verificationType: 'forgotPassword',
        verificationCode: 'verificationCode',
        userId: 1,
      },
    });

    const resetResponse = await request(app).post('/user/reset').send({
      verificationType: 'forgotPassword',
      verificationCode: 'verificationCode',
      userId: 1,
      new_password: 'newpassword',
    });
    expect(resetResponse.statusCode).toBe(200);
    expect(resetResponse.body).toHaveProperty('token');
    await prisma.user.update({
      where: {
        email: 'admin@admin.com',
      },
      data: {
        password: bcrypt.hashPassword('admin123'),
      },
    });
  });

  test('Reset with invalid Code', async () => {
    await prisma.verifications.create({
      data: {
        verificationType: 'forgotPassword',
        verificationCode: 'verificationCode',
        userId: 1,
      },
    });
    const response = await request(app).post('/user/reset').send({
      verificationType: 'forgotPassword',
      verificationCode: 'invalidCode',
      userId: 1,
      new_password: 'newpassword',
    });
    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('message');
    expect(response.body.token).toBe(null);
  });

  test('Reset with invalid password (same as previous)', async () => {
    await prisma.verifications.create({
      data: {
        verificationType: 'forgotPassword',
        verificationCode: 'verificationCode',
        userId: 1,
      },
    });

    const resetResponse = await request(app).post('/user/reset').send({
      verificationType: 'forgotPassword',
      verificationCode: 'verificationCode',
      userId: 1,
      new_password: 'admin123',
    });
    expect(resetResponse.statusCode).toBe(409);
    expect(resetResponse.body).toHaveProperty('message');
    expect(resetResponse.body.token).toBe(null);
    expect(resetResponse.body.message).toBe(
        'New password cannot be the same as the old password',
    );
  });

  test('Reset with invalid password (empty)', async () => {
    await prisma.verifications.create({
      data: {
        verificationType: 'forgotPassword',
        verificationCode: 'verificationCode',
        userId: 1,
      },
    });

    const resetResponse = await request(app).post('/user/reset').send({
      verificationType: 'forgotPassword',
      verificationCode: 'verificationCode',
      userId: 1,
      new_password: '',
    });
    expect(resetResponse.statusCode).toBe(409);
    expect(resetResponse.body).toHaveProperty('message');
    expect(resetResponse.body.token).toBe(null);
    expect(resetResponse.body.message).toBe('New password cannot be empty');
  });
});

// Here I am testing the signup function from the login controller
describe('Signup', () => {
  test('Signup with valid credentials', async () => {
    const response = await request(app).post('/user/signup').send({
      name: 'admin1',
      email: 'admin1@admin.com',
      password: 'admin123',
    });
    expect(response.statusCode).toBe(200);

    const user = await prisma.user.findUnique({
      where: {
        email: 'admin1@admin.com',
      },
    });
    // Expect the user to not be null
    expect(user).not.toBeNull();
    expect(user).toHaveProperty('name');
    expect(user).toHaveProperty('email');
    expect(user).toHaveProperty('password');

    await prisma.verifications.deleteMany({
      where: {
        user: user,
      },
    });

    await prisma.user.delete({
      where: {
        email: 'admin1@admin.com',
      },
    });

    expect(response.statusCode).toBe(200);
  });

  test('Signup with invalid credentials (empty email)', async () => {
    const response = await request(app).post('/user/signup').send({
      email: '',
      password: 'admin1',
    });
    expect(response.statusCode).toBe(409);
    expect(response.body).toHaveProperty('message');
    expect(response.body.token).toBe(null);
  });

  test('Signup with invalid credentials (empty password)', async () => {
    const response = await request(app).post('/user/signup').send({
      email: 'admin2@admin.com',
      password: '',
    });
    expect(response.statusCode).toBe(409);
    expect(response.body).toHaveProperty('message');
    expect(response.body.token).toBe(null);
  });

  test('Sign up with an email that already exists', async () => {
    const response = await request(app).post('/user/signup').send({
      email: 'admin@admin.com',
      password: 'admin',
    });
    expect(response.statusCode).toBe(409);
    expect(response.body).toHaveProperty('message');
    expect(response.body.token).toBe(null);
  });
});

// Here I am testing the signup function from the login controller
describe('Verify', () => {
  test('Verify A User Account', async () => {
    await prisma.verifications.create({
      data: {
        verificationType: 'newUser',
        verificationCode: 'verificationCode',
        userId: 1,
      },
    });

    const response = await request(app).post('/user/verify').send({
      verificationType: 'newUser',
      verificationCode: 'verificationCode',
      userId: 1,
    });
    expect(response.statusCode).toBe(200);
  });

  test('Verify A User Account with bad code', async () => {
    await prisma.verifications.create({
      data: {
        verificationType: 'newUser',
        verificationCode: 'verificationCode',
        userId: 1,
      },
    });

    const response = await request(app).post('/user/verify').send({
      verificationType: 'newUser',
      verificationCode: 'invalidCode',
      userId: 1,
    });
    expect(response.statusCode).toBe(404);
  });

  test('Verify A User Account with no valid code', async () => {
    const response = await request(app).post('/user/verify').send({
      verificationType: 'newUser',
      verificationCode: 'invalidCode',
      userId: 1,
    });
    expect(response.statusCode).toBe(404);
  });
});

describe('ForgotPassword', () => {
  test('Submit a forgot password', async () => {
    const response = await request(app).post('/user/forgotPassword').send({
      email: 'admin@admin.com',
    });
    expect(response.statusCode).toBe(200);
  });

  test('Submit a fp with bad email', async () => {
    const response = await request(app).post('/user/forgotPassword').send({
      email: 'admin@adsfds.com',
    });
    expect(response.statusCode).toBe(404);
  });

  test('Submit a fp with empty email', async () => {
    const response = await request(app).post('/user/forgotPassword').send({
      email: '',
    });
    expect(response.statusCode).toBe(409);
  });
});
