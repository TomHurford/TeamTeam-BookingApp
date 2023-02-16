// SOCIETIES ROUTE
const express = require('express')
const router = express.Router()
const societyController = require('../controllers/societies.js')

// This route is used to create a society
router.post('/signup', (req, res) => {
    societyController.signup(req, res)
})


module.exports = router