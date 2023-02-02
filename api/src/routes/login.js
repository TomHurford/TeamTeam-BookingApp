// LOGIN ROUTE
const express = require('express')
const router = express.Router()
const loginController = require('../controllers/login.js')

// The login function from the login controller is called when a POST request is made to the /login route, that function returns a response, with a JWT token if the login is successful

// This route is used to login a user
router.post('/login', (req, res) => {
    loginController.login(req.body.email, req.body.password, res)
})

// This route is used to verify a JWT token
router.post('/verify', (req, res) => {
    loginController.verify(req.body.token, res)
})

// This route is used to logout a user
router.post('/logout', (req, res) => {
    loginController.logout(req.body.token, res)
})

// This route is used to reset a user's password
router.post('/reset', (req, res) => {
    loginController.reset(req, res)
})

// This route is used to sign up a new user
router.post('/signup', (req, res) => {
    loginController.signup(req, res)
})



module.exports = router