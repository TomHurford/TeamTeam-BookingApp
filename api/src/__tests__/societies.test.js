/* eslint-disable */
const request = require('supertest');
const app = require('../server.js');
const prisma = require('../../prisma/prisma.js');
const {faker} = require('@faker-js/faker');


let token = null;

beforeAll(async () => {
  console.log(
      'MAKE SURE BEFORE YOU RUN THESE TESTS THAT YOU HAVE RUN:\n' +
    ' npx prisma migrate reset',
  );
});

beforeEach(async () => {
  const res = await request(app)
      .post('/user/login')
      .send({
        email: 'admin@admin.com',
        password: 'admin123',
      });
  token = res.body.token;
});

describe('Create Societies', () => {
  test('Signup Society with invalid token', async () => {
    const response = await request(app)
        .post('/societies/signup')
        .set('Authorization', 'Bearer ' + 'invalid token');
    expect(response.statusCode).toBe(401);
    expect(response.body.error).toBe('Unauthorized');
    expect(response.body.token).toBe(null);
  });

  test('Signup societies with normal values', async () => {
    const response = await request(app)
        .post('/societies/signup')
        .set('Authorization', 'Bearer ' + token)
        .send({
          'name': 'Soc Signup Test',
          'email': 'testSoc@testSoc.com',
          'description': 'test',
          'category': 'Other',
          'links': {
            instagram: 'https://www.instagram.com/',
            facebook: 'https://www.facebook.com/',
            twitter: 'https://twitter.com/',
            website: 'https://www.google.com/',
            banner: 'https://www.google.com/',
            logo: 'https://www.google.com/',
          },
        });
    expect(response.statusCode).toBe(200);
    expect(response.body).not.toBeNull();
    expect(response.body.society.name).toBe('Soc Signup Test');
    // Delete the society we just created
    await prisma.committee.delete({
      where: {
        userId_societyId: {
          userId: 1,
          societyId: response.body.society.id,
        },
      },
    });
    await prisma.societyLinks.delete({
      where: {
        societyId: response.body.society.id,
      },
    });
    await prisma.society.delete({
      where: {
        id: response.body.society.id,
      },
    });
  });

  test('Signup societies with no values (email)', async () => {
    const response = await request(app)
        .post('/societies/signup')
        .set('Authorization', 'Bearer ' + token)
        .send({
          'name': 'Soc Signup Test',
          'description': 'text',
          'category': 'Society Category',
          'links': {
            instagram: 'https://www.instagram.com/',
            facebook: 'https://www.facebook.com/',
            twitter: 'https://twitter.com/',
            website: 'https://www.google.com/',
            banner: 'https://www.google.com/',
            logo: 'https://www.google.com/',
          },
        });
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Missing Society Details');
  });

  test('Signup societies with no values (name)', async () => {
    const response = await request(app)
        .post('/societies/signup')
        .set('Authorization', 'Bearer ' + token)
        .send({
          'email': 'testSoc@testSoc.com',
          'description': 'text',
          'category': 'Society Category',
          'links': {
            instagram: 'https://www.instagram.com/',
            facebook: 'https://www.facebook.com/',
            twitter: 'https://twitter.com/',
            website: 'https://www.google.com/',
            banner: 'https://www.google.com/',
            logo: 'https://www.google.com/',
          },
        });
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Missing Society Details');
  });

  test('Signup societies with no values (description)', async () => {
    const response = await request(app)
        .post('/societies/signup')
        .set('Authorization', 'Bearer ' + token)
        .send({
          'name': 'Soc Signup Test',
          'email': 'testSoc@testSoc.com',
          'category': 'Other',
          'links': {
            instagram: 'https://www.instagram.com/',
            facebook: 'https://www.facebook.com/',
            twitter: 'https://twitter.com/',
            website: 'https://www.google.com/',
            banner: 'https://www.google.com/',
            logo: 'https://www.google.com/',
          },
        });
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Missing Society Details');
  });

  test('Signup societies with repeated values (email)', async () => {
    // make first soc with email
    const response = await request(app)
        .post('/societies/signup')
        .set('Authorization', `Bearer ${token}`)
        .send({
          'name': 'Soc Signup Test',
          'description': 'text',
          'email': 'testSoc@testSoc.com',
          'category': 'Other',
          'links': {
            instagram: 'https://www.instagram.com/',
            facebook: 'https://www.facebook.com/',
            twitter: 'https://twitter.com/',
            website: 'https://www.google.com/',
            banner: 'https://www.google.com/',
            logo: 'https://www.google.com/',
          },
        });
    expect(response.statusCode).toBe(200);
    // repeat but with different soc info and same email
    const response2 = await request(app)
        .post('/societies/signup')
        .set('Authorization', `Bearer ${token}`)
        .send({
          'name': 'Soc Signup Test2',
          'description': 'text2',
          'email': 'testSoc@testSoc.com',
          'category': 'Other',
          'links': {
            instagram: 'https://www.instagram.com/2/',
            facebook: 'https://www.facebook.com/2/',
            twitter: 'https://twitter.com/2/',
            website: 'https://www.google.com/2/',
            banner: 'https://www.google.com/2/',
            logo: 'https://www.google.com/2/',
          },
        });
    expect(response2.statusCode).toBe(409);
    expect(response2.body.token).toBeNull();
    expect(response2.body.message)
        .toBe('Society already exists with that email');
    // Delete the society we just created
    await prisma.committee.delete({
      where: {
        userId_societyId: {
          userId: 1,
          societyId: response.body.society.id,
        },
      },
    });
    await prisma.societyLinks.delete({
      where: {
        societyId: response.body.society.id,
      },
    });
    await prisma.society.delete({
      where: {
        id: response.body.society.id,
      },
    });
  });

  test('Signup societies with repeated values (name)', async () => {
    // make first soc
    const response = await request(app)
        .post('/societies/signup')
        .set('Authorization', `Bearer ${token}`)
        .send({
          'name': 'Soc Signup Test',
          'description': 'text',
          'email': 'testSoc@testSoc.com',
          'category': 'Other',
          'links': {
            instagram: 'https://www.instagram.com/',
            facebook: 'https://www.facebook.com/',
            twitter: 'https://twitter.com/',
            website: 'https://www.google.com/',
            banner: 'https://www.google.com/',
            logo: 'https://www.google.com/',
          },
        });
    expect(response.statusCode).toBe(200);
    const response2 = await request(app)
        .post('/societies/signup')
        .set('Authorization', `Bearer ${token}`)
        .send({
          'name': 'Soc Signup Test',
          'description': 'text2',
          'email': 'test2Soc@testSoc.com',
          'category': 'Other',
          'links': {
            instagram: 'https://www.instagram.com/2/',
            facebook: 'https://www.facebook.com/2/',
            twitter: 'https://twitter.com/2/',
            website: 'https://www.google.com/2/',
            banner: 'https://www.google.com/2/',
            logo: 'https://www.google.com/2/',
          },
        });
    expect(response2.statusCode).toBe(409);
    expect(response2.body.token).toBeNull();
    expect(response2.body.message)
        .toBe('Society already exists with that name');
    // delete initial soc created
    await prisma.committee.delete({
      where: {
        userId_societyId: {
          userId: 1,
          societyId: response.body.society.id,
        },
      },
    });
    await prisma.societyLinks.delete({
      where: {
        societyId: response.body.society.id,
      },
    });
    await prisma.society.delete({
      where: {
        id: response.body.society.id,
      },
    });
  });

  test('Signup societies with invalid email (no prefix)', async () => {
    const response = await request(app)
        .post('/societies/signup')
        .set('Authorization', `Bearer ${token}`)
        .send({
          'name': 'Soc Signup Test',
          'email': '@testSoc.com',
          'description': 'text',
          'category': 'Society Category',
          'links': {
            instagram: 'https://www.instagram.com/',
            facebook: 'https://www.facebook.com/',
            twitter: 'https://twitter.com/',
            website: 'https://www.google.com/',
            banner: 'https://www.google.com/',
            logo: 'https://www.google.com/',
          },
        });
    expect(response.statusCode).toBe(409);
    expect(response.body.token).toBeNull();
    expect(response.body.message)
        .toBe('Email inputed doesnt have a valid regex');
  });
  test('Signup societies with invalid email (double @)', async () => {
    const response = await request(app)
        .post('/societies/signup')
        .set('Authorization', `Bearer ${token}`)
        .send({
          'name': 'Soc Signup Test',
          'email': 'testSoc@@testSoc.com',
          'description': 'text',
          'category': 'Society Category',
          'links': {
            instagram: 'https://www.instagram.com/',
            facebook: 'https://www.facebook.com/',
            twitter: 'https://twitter.com/',
            website: 'https://www.google.com/',
            banner: 'https://www.google.com/',
            logo: 'https://www.google.com/',
          },
        });
    expect(response.statusCode).toBe(409);
    expect(response.body.token).toBeNull();
    expect(response.body.message)
        .toBe('Email inputed doesnt have a valid regex');
  });

  test('Signup societies with invalid email (postfix)', async () => {
    const response = await request(app)
        .post('/societies/signup')
        .set('Authorization', `Bearer ${token}`)
        .send({
          'name': 'Soc Signup Test',
          'email': 'testSoc@.com',
          'description': 'text',
          'category': 'Society Category',
          'links': {
            instagram: 'https://www.instagram.com/',
            facebook: 'https://www.facebook.com/',
            twitter: 'https://twitter.com/',
            website: 'https://www.google.com/',
            banner: 'https://www.google.com/',
            logo: 'https://www.google.com/',
          },
        });
    expect(response.statusCode).toBe(409);
    expect(response.body.token).toBeNull();
    expect(response.body.message)
        .toBe('Email inputed doesnt have a valid regex');
  });
});

describe('Get societies', () => {
  // This is the test for the GET /societies route
  test('Get societies', async () => {
    // Make the request to the API
    const res = await request(app)
        .get('/societies/getSocieties')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
    // Check the response
    const societiesNonArchived = await prisma.society.findMany({
      where: {
        isArchived: false,
      },
    });
    societiesCount = societiesNonArchived.length;
    // expect(res.body.society).toBe(societiesCount);
    expect(res.body).not.toBeNull();
    // Expect the response to be an array
    expect(Array.isArray(res.body)).toBeTruthy();
  });
});

describe('Get societiesId', () => {
  // This is the test for the POST /societies route
  test('Get society with id', async () => {
    const res = await request(app)
        .post('/societies/signup')
        .set('Authorization', 'Bearer ' + token)
        .send({
          'name': 'Soc Signup Test',
          'email': 'testSoc@testSoc.com',
          'description': 'test',
          'category': 'Other',
          'links': {
            instagram: 'https://www.instagram.com/',
            facebook: 'https://www.facebook.com/',
            twitter: 'https://twitter.com/',
            website: 'https://www.google.com/',
            banner: 'https://www.google.com/',
            logo: 'https://www.google.com/',
          },
        });
    expect(res.statusCode).toBe(200);
    // Make the request to the API
    const res2 = await request(app)
        .post('/societies/getSociety')
        .set('Authorization', `Bearer ${token}`)
        .send({
          societyId: res.body.society.id,
        });
    expect(res2.statusCode).toBe(200);
    expect(res2.body).not.toBeNull();
    expect(res2.body.society.name).toBe('Soc Signup Test');
    // delete soc
    await prisma.committee.delete({
      where: {
        userId_societyId: {
          userId: 1,
          societyId: res.body.society.id,
        },
      },
    });
    await prisma.societyLinks.delete({
      where: {
        societyId: res.body.society.id,
      },
    });
    await prisma.society.delete({
      where: {
        id: res.body.society.id,
      },
    });
  });

  test('Get society with user not being in committee', async () => {
    adminToken = token;
    const res = await request(app)
        .post('/user/login')
        .send({
          email: 'student@kcl.ac.uk',
          password: 'student',
        });
    token = res.body.token;
    // Make the request to the API
    const res2 = await request(app)
        .post('/societies/signup')
        .set('Authorization', 'Bearer ' + adminToken)
        .send({
          'name': 'Soc Signup Test',
          'email': 'testSoc@testSoc.com',
          'description': 'test',
          'category': 'Other',
          'links': {
            instagram: 'https://www.instagram.com/',
            facebook: 'https://www.facebook.com/',
            twitter: 'https://twitter.com/',
            website: 'https://www.google.com/',
            banner: 'https://www.google.com/',
            logo: 'https://www.google.com/',
          },
        });
    const res3 = await request(app)
        .post('/societies/getSociety')
        .set('Authorization', `Bearer ${token}`)
        .send({
          societyId: res2.body.society.id,
        });
    // Check the response
    expect(res3.statusCode).toBe(200);
    expect(res3.body).not.toBeNull();
    await prisma.committee.delete({
      where: {
        userId_societyId: {
          userId: 1,
          societyId: res2.body.society.id,
        },
      },
    });
    await prisma.societyLinks.delete({
      where: {
        societyId: res2.body.society.id,
      },
    });
    await prisma.society.delete({
      where: {
        id: res2.body.society.id,
      },
    });
  });
  test('Get society with invalid token', async () => {
    // Make the request to the API
    const res = await request(app)
        .post('/societies/getSociety')
        .set('Authorization', `Bearer ${token}1`)
        .expect(401);
    // Check the response
    expect(res.body).not.toBeNull();
    expect(res.body.error).toBe('Unauthorized');
  });
});

describe('Delete society', () => {
  test('Delete society with invalid token', async () => {
    // Make the request to the API
    const res = await request(app)
        .post('/societies/deleteSociety')
        .set('Authorization', `Bearer ${token}1`)
        .expect(401);
    // Check the response
    expect(res.body).not.toBeNull();
    expect(res.body.error).toBe('Unauthorized');
  });

  test('Delete society with valid id', async () => {
    const res = await request(app)
        .post('/societies/signup')
        .set('Authorization', 'Bearer ' + token)
        .send({
          'name': 'Soc Signup Test',
          'email': 'testSoc@testSoc.com',
          'description': 'test',
          'category': 'Other',
          'links': {
            instagram: 'https://www.instagram.com/',
            facebook: 'https://www.facebook.com/',
            twitter: 'https://twitter.com/',
            website: 'https://www.google.com/',
            banner: 'https://www.google.com/',
            logo: 'https://www.google.com/',
          },
        });
    expect(res.statusCode).toBe(200);
    // Make the request to the API
    const res2 = await request(app)
        .post('/societies/deleteSociety')
        .set('Authorization', `Bearer ${token}`)
        .send({
          societyId: res.body.society.id,
        });

    // Check the response
    expect(res2.statusCode).toBe(200);
    expect(res2.body).not.toBeNull();
    expect(res2.body.message).toBe('Society Updated');
    await prisma.committee.delete({
      where: {
        userId_societyId: {
          userId: 1,
          societyId: res.body.society.id,
        },
      },
    });
    await prisma.societyLinks.delete({
      where: {
        societyId: res.body.society.id,
      },
    });
    await prisma.society.delete({
      where: {
        id: res.body.society.id,
      },
    });
  });

  test('Delete society with invalid id of society', async () => {
    // Make the request to the API
    const res = await request(app)
        .post('/societies/deleteSociety')
        .set('Authorization', `Bearer ${token}`)
        .send({
          societyId: -1,
        })
        .expect(400);
    // Check the response

    expect(res.body).not.toBeNull();
    expect(res.body.error).toBe('Invalid id of society');
  });

  test('Delete society as a user with no permission', async () => {
    // Login as a user with no permission
    adminToken = token;
    const res = await request(app)
        .post('/user/login')
        .send({
          email: 'student@kcl.ac.uk',
          password: 'student',
        })
        .expect(200);
    // Make the request to the API
    const res2 = await request(app)
        .post('/societies/deleteSociety')
        .set('Authorization', `Bearer ${res.body.token}`)
        .send({
          societyId: 1,
        });
    // Check the response
    expect(res2.statusCode).toBe(401);
    expect(res2.body).not.toBeNull();
    expect(res2.body.message).toBe('Unauthorized');
  });
});

describe('Update society', () => {
  test('Update society with valid data', async () => {
    const res = await request(app)
        .post('/societies/updateSociety')
        .set('Authorization', `Bearer ${token}`)
        .send({
          societyId: 1,
          email: faker.internet.email(),
          name: 'Society 1 updated',
          description: 'Society 1 description updated',
        });
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Society Updated');
  });

  test('Update society with invalid token', async () => {
    const res = await request(app)
      .post('/societies/updateSociety')
      .set('Authorization', `Bearer invalidtoken`)
      .send({
        societyId: 1,
        email: 'test@test.com',
        name: 'Society 1 updated',
        description: 'Society 1 description updated',
      })
      .expect(401);
    expect(res.body).not.toBeNull();
    expect(res.body.message).toBe('Unauthorized');
  });

  test('Update society with user not being part of committee', async () => {
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
    const res = await request(app)
        .post('/user/login')
        .send({
          email: 'student@kcl.ac.uk',
          password: 'student',
        })
        .expect(200);
    const res2 = await request(app)
        .post('/societies/updateSociety')
        .set('Authorization', `Bearer ${res.body.token}`)
        .send({
          societyId: 1,
          email: 'test@test.com',
          name: 'Society 1 updated',
          description: 'Society 1 description updated',
        })
        .expect(401);
    // Check the response
    expect(res2.body).not.toBeNull();
    expect(res2.body.message).toBe('Unauthorized');
  });

  test('Update society with invalid society id', async () => {
    const res = await request(app)
        .post('/societies/updateSociety')
        .set('Authorization', `Bearer ${token}`)
        .send({
          societyId: -1,
          email: 'test@test.com',
          name: 'Society 1 updated',
          description: 'Society 1 description updated',
        })
        .expect(400);
    expect(res.body).not.toBeNull();
    expect(res.body.message).toBe('Invalid societyId');
  });

  test('Update society with missing society id', async () => {
    const res = await request(app)
      .post('/societies/updateSociety')
      .set('Authorization', `Bearer ${token}`)
      .send({
        email: 'test@test.com',
        name: 'Society 1 updated',
        description: 'Society 1 description updated',
      })
      .expect(400);
    expect(res.body).not.toBeNull();
    expect(res.body.message).toBe('Missing societyId');
  });

});
