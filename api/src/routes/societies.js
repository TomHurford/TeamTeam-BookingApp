// SOCIETIES ROUTE
const express = require('express')
const router = express.Router()
const societyController = require('../controllers/societies.js')

// This route is used to create a society
router.post('/signup', (req, res) => {
    societyController.signup(req, res)
}) 

router.get('/getSocieties', (req, res) => {
    societyController.getSocieties(req, res)
})

router.post('/getSociety', (req, res) => {
    societyController.getSocietyById(req, res)
})

router.post('/updateSociety', (req, res) => {
    societyController.updateSociety(req, res)
})

router.post('/deleteSociety', (req,res) => {
    societyController.deleteSociety(req, res)
})

module.exports = router