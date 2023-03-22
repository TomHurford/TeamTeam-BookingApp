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
    //line 36 testing requires breaking prisma bd rules to get invalid user id
  });
});
describe("Create Tickets",() =>{
  test('Create tickets with invalid token', async () => {
    const response = await request(app)
        .post('/tickets/create')
        .set('Authorization', 'Bearer ' + 'invalid token')
        .send();
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe('Unauthorised');
  });
  // {
  //   "ticketData": 'sdgsgbsfgbsumfin',
  //   "status": 'UNUSED',
  //   "userId": 1,
  //   "eventId": 1,
  //   "ticketTypeId": 1,
  //   "purchaseId": 1,
  //   "isArchived": false
  // }

  test("Create Tickets with valid values", async() =>{
    // const event = {
    //   name: 'Test Event',
    //   description: 'This is a test event',
    //   date: '2023-12-02T00:10:00.000Z',
    //   location: faker.address.streetAddress(),
    //   societyId: 1,
    //   "ticketType":[{
    //     name:"Test Ticket Type1",
    //     price:200,
    //     quantity:10,
    //   },{
    //     name:"Test Ticket Type2",
    //     price:100,
    //     quantity:10,
    //   }],
    // };
    // const response = await request(app)
    //     .post('/events/create')
    //     .set('Authorization', 'Bearer ' + token)
    //     .send(event);
    const response = await request(app)
      .post("/tickets/create")
      .set('Authorization', 'Bearer ' + token)
      .send({
        ticketData: "sdgsgbsfgbsumfin",
        userId: 1,
        eventId: 1,
        ticketTypeId: 1,
        purchaseId: 1,
        isArchived: false
      });
    console.log("response from /tickets/create\n" + response.body);
    expect(response.statusCode).toBe(200);
  });
  /*
  test("Create Tickets with invalid ticketTypeId(undefined)", async() =>{
    const response = await request(app)
      .post("/tickets/create")
      .set('Authorization', 'Bearer ' + token)
      .send({
        ticketTypeId:undefined,
        quantity:1
      });
    console.log("response from /tickets/create\n" + response.body);
    expect(response.statusCode).toBe(400);
    expect(response.message).toBe("Missing Body");
  });
  test("Create Tickets with invalid quatity (0)", async() =>{
    const response = await request(app)
      .post("/tickets/create")
      .set('Authorization', 'Bearer ' + token)
      .send({
        ticketTypeId:1,
        quantity:0
      });
    console.log("response from /tickets/create\n" + response.body);
    expect(response.statusCode).toBe(400);
    expect(response.message).toBe("Invalid Quantity");
  });
  test("Create Tickets with invalid quatity (-1000)", async() =>{
    const response = await request(app)
      .post("/tickets/create")
      .set('Authorization', 'Bearer ' + token)
      .send({
        ticketTypeId:1,
        quantity:-1000
      });
    console.log("response from /tickets/create\n" + response.body);
    expect(response.statusCode).toBe(400);
    expect(response.message).toBe("Invalid Quantity");
  });
  test("Create Tickets with unknown ticket type", async() =>{
    const response = await request(app)
      .post("/tickets/create")
      .set('Authorization', 'Bearer ' + token)
      .send({
        ticketTypeId:-1,
        quantity:10
      });
    console.log("response from /tickets/create\n" + response.body);
    expect(response.statusCode).toBe(400);
    expect(response.message).toBe("Invalid Ticket Type");

  });
  */
});
describe("Use Tickets",() =>{
  test('Use tickets with invalid token', async () => {
    const response = await request(app)
        .get('/tickets/use')
        .set('Authorization', 'Bearer ' + "invalid token");
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe('Unauthorised');
  });
  test("Use Ticket", async() =>{
    const response = await request(app)
      .post("/tickets/use")
      .set('Authorization', 'Bearer ' + token)
      .send({
        ticketTypeId:1,
        quantity:10
      });
    console.log("response from /tickets/use\n" + response.body);
    expect(response.statusCode).toBe(400);
    expect(response.message).toBe("Invalid Ticket Type");
  });
});