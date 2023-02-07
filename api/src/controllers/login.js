// LOGIN CONTROLLER
const prisma = require('../../prisma/prisma.js')
const jwt = require('jsonwebtoken')

const auth = require('../utils/jwt_auth.js')

// This function is used to login a user
async function login(email, password, res) {
    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    })
    if (user) {
        if (user.password === password) {
            const token = await auth.generateToken(user)
            res.status(200).send({token: token, message: 'Login successful'})
        } else {
            res.status(401).send({token: null, message: 'Invalid password'})
        }
    } else {
        res.status(404).send({token: null, message: 'User not found'})
    }
}

// This function is used to logout a user
async function logout(req, res) {
    // const auth_resopnse = 
    // Get the token from the request header
    const token = req.headers['authorization'].split(' ')[1]

    // Try to verify the token using the auth.authenticate function
    try {
        const auth_response = await auth.authenticate(token)
        if (auth_response) {
            res.status(200).send({message: 'Logout successful'})
        }else {
            res.status(401).send({message: 'Unauthorized'})
        }
    } catch (err) {
        res.status(401).send({message: 'Unauthorized'})
    }
}

// This function is used to reset a user's password, the new password is sent in the request body
async function reset(req, res) {
    // Get the token from the request header
    const token = req.headers['authorization'].split(' ')[1]
    const auth_response = null
    try {
        auth_response = await auth.authenticate(token)
    } catch (err) {
        res.status(401).send({message: 'Unauthorized'})
    }
    
    // Verify the JWT token
    if (auth_response) {
        // If the users password is the same as the old password, return an error
        let user = await prisma.user.findUnique({
            where: {
                id: req.userId
            }
        })
        if (user.password === req.body.new_password) {
            return res.status(409).send({token: null, message: 'New password cannot be the same as the old password'})
        }

        // If the new password is empty, return an error
        if (req.body.new_password === '') {
            return res.status(409).send({token: null, message: 'New password cannot be empty'})
        }

        // Update the user's password
        user = await prisma.user.update({
            where: {
                id: req.userId
            },
            data: {
                password: req.body.new_password
            }
        })
        // Create a new JWT token
        const token = await auth.generateToken(user)
        res.status(200).send({token: token})
    } else {
        res.status(401).send({token: null, message: 'Unauthorized'})
    }
}

// This function is used to sign up a new user
async function signup(req, res) {
    // Check that the request body is not empty and contains the correct properties
    if (req.body === undefined || req.body.email === undefined || req.body.password === undefined || req.body.name === undefined) {
        return res.status(409).send({token: null, message: 'Request body cannot be empty'})
    }

    // Check if the user already exists
    let user = await prisma.user.findUnique({
        where: {
            email: req.body.email
        }
    })

    if (user) {
        return res.status(409).send({token: null, message: 'User already exists'})
    }

    // Check that name, email and password are not empty
    if (req.body.name === '' || req.body.email === '' || req.body.password === '') {
        return res.status(409).send({token: null, message: 'Name, email and password cannot be empty'})
    }

    // Create a new user
    user = await prisma.user.create({
        data: {
            email: req.body.email,
            password: req.body.password,
            name: req.body.name,
            type: {
                connect: {
                    id: 1
                },
            },
        }
    })
    // Create a new JWT token
    const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, {
        expiresIn: 86400 // expires in 24 hours
    })
    // Send the JWT token in the response
    res.status(200).send({token: token})



}





module.exports = {
    login,
    logout,
    reset,
    signup
}