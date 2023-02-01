// LOGIN CONTROLLER
const prisma = require('../../prisma/prisma.js')
const jwt = require('jsonwebtoken')

async function login(email, password, res) {
    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    })
    if (user) {
        if (user.password === password) {
            const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, {
                expiresIn: 86400 // expires in 24 hours
            })
            res.status(200).send({token: token })
        } else {
            res.status(401).send({token: null, message: 'Invalid password'})
        }
    } else {
        res.status(404).send({token: null, message: 'User not found'})
    }
}

module.exports = {
    login
}