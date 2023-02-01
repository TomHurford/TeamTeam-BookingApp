const request = require('supertest')

const app = require('../server.js')

describe('Login', () => {
    test('Login with valid credentials', async () => {
        const response = await request(app)
            .post('/login')
            .send({
                email: 'admin@admin.com',
                password: 'admin'
            })
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('token')
    })

    test('Login with invalid credentials', async () => {
        const response = await request(app)
            .post('/login')
            .send({
                email: 'admin@admin.com',
                password: 'wrongpassword'
            })
        expect(response.statusCode).toBe(401)
        expect(response.body).toHaveProperty('message')
    })

    test('Login with invalid email', async () => {
        const response = await request(app)
            .post('/login')
            .send({
                email: 'admin@admin',
                password: 'admin'
            })
        expect(response.statusCode).toBe(404)
        expect(response.body).toHaveProperty('message')
    })
})
