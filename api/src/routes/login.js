// LOGIN ROUTE
const express = require('express')
const router = express.Router()
const loginController = require('../controllers/login.js')

// The login function from the login controller is called when a POST request is made to the /login route, that function returns a response, with a JWT token if the login is successful

router.post('/', (req, res) => {
    loginController.login(req.body.email, req.body.password, res)
})

module.exports = router