const request = require('supertest')
const prisma = require('../../prisma/prisma.js')
const app = require('../server.js')
// const seed = require('../../prisma/seed.js')
let token = null

beforeAll(async () => {
    console.log('MAKE SURE BEFORE YOU RUN THESE TESTS THAT YOU HAVE RUN: npx prisma migrate reset')
})

beforeEach(async () => {
    const response = await request(app)
        .post('/user/login')
        .send({
            email: 'admin@admin.com',
            password: 'admin'
        })
    token = response.body.token
})

// Here I am testing the login function from the login controller
describe('Login', () => {
    test('Login with valid credentials', async () => {
        const response = await request(app)
            .post('/user/login')
            .send({
                email: 'admin@admin.com',
                password: 'admin'
            })
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('token')
    })

    test('Login with invalid credentials', async () => {
        const response = await request(app)
            .post('/user/login')
            .send({
                email: 'admin@admin.com',
                password: 'wrongpassword'
            })
        expect(response.statusCode).toBe(401)
        expect(response.body).toHaveProperty('message')
        expect(response.body.token).toBe(null)
    })

    test('Login with invalid email', async () => {
        const response = await request(app)
            .post('/user/login')
            .send({
                email: 'admin@admin',
                password: 'admin'
            })
        expect(response.statusCode).toBe(404)
        expect(response.body).toHaveProperty('message')
        expect(response.body.token).toBe(null)
    })
})

// Here I am testing the logout function from the login controller
describe('Logout', () => {
    test('Logout with valid token', async () => {
        // Put the token in the header of the request under Authorization and Bearer
        const logoutResponse = await request(app)
            .post('/user/logout')
            .set('Authorization', 'Bearer ' + token)
        expect(logoutResponse.statusCode).toBe(200)
        expect(logoutResponse.body).toHaveProperty('token')
        expect(logoutResponse.body.token).toBe(null)
    })

    test('Logout with invalid token', async () => {
        const response = await request(app)
            .post('/user/logout')
            .set('Authorization', 'Bearer ' + 'invalidtoken')
        expect(response.statusCode).toBe(401)
        expect(response.body).toHaveProperty('message')
        expect(response.body.token).toBe(null)
    })
})

// Here I am testing the reset function from the login controller
describe('Reset', () => {
    test('Reset with valid token', async () => {
        const resetResponse = await request(app)
            .post('/user/reset')
            .send({
                token: token,
                new_password: 'newpassword'
            })
        expect(resetResponse.statusCode).toBe(200)
        expect(resetResponse.body).toHaveProperty('token')
        await prisma.user.update({
            where: {
                email: 'admin@admin.com'
            },
            data: {
                password: 'admin'
            }
        })
    })

    test('Reset with invalid token', async () => {
        const response = await request(app)
            .post('/user/reset')
            .send({
                token: 'invalidtoken',
            })
        expect(response.statusCode).toBe(401)
        expect(response.body).toHaveProperty('message')
        expect(response.body.token).toBe(null)
    })

    test('Reset with invalid password (same as previous)', async () => {
        const resetResponse = await request(app)
            .post('/user/reset')
            .send({
                token: token,
                new_password: 'admin'
            })
        expect(resetResponse.statusCode).toBe(409)
        expect(resetResponse.body).toHaveProperty('message')
        expect(resetResponse.body.token).toBe(null)
    })

    test('Reset with invalid password (empty)', async () => {
        const resetResponse = await request(app)
            .post('/user/reset')
            .send({
                token: token,
                new_password: ''
            })
        expect(resetResponse.statusCode).toBe(409)
        expect(resetResponse.body).toHaveProperty('message')
        expect(resetResponse.body.token).toBe(null)
    })
})

// Here I am testing the signup function from the login controller
describe('Signup', () => {
    test('Signup with valid credentials', async () => {
        const response = await request(app)
            .post('/user/signup')
            .send({
                name: 'admin1',
                email: 'admin1@admin.com',
                password: 'admin1'
            })
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('token')

        await prisma.user.delete({
            where: {
                email: 'admin1@admin.com'
            }
        })
    })

    test('Signup with invalid credentials (empty email)', async () => {
        const response = await request(app)
            .post('/user/signup')
            .send({
                email: '',
                password: 'admin1'
            })
        expect(response.statusCode).toBe(409)
        expect(response.body).toHaveProperty('message')
        expect(response.body.token).toBe(null)
    })

    test('Signup with invalid credentials (empty password)', async () => {
        const response = await request(app)
            .post('/user/signup')
            .send({
                email: 'admin2@admin.com',
                password: ''
            })
        expect(response.statusCode).toBe(409)
        expect(response.body).toHaveProperty('message')
        expect(response.body.token).toBe(null)
    })

    test('Sign up with an email that already exists', async () => {
        const response = await request(app)
            .post('/user/signup')
            .send({
                email: 'admin@admin.com',
                password: 'admin'
            })
        expect(response.statusCode).toBe(409)
        expect(response.body).toHaveProperty('message')
        expect(response.body.token).toBe(null)
    })
})



