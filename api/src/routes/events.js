const express = require('express')
const router = express.Router()
const eventsController = require('../controllers/events.js')


// This route is used to get all events
router.get('/', (req, res) => {
    eventsController.getEvents(req, res)
})

// When a POST request is made to /events, it should include a JSON object with the following properties:
// { "id": [event_id] }
router.post('/', (req, res) => {
    eventsController.getEventById(req, res)
})

// When a POST request is made to the /events/create, it should include a JSON object with the following properties:
// { "name": [event_name] }
// { "description": [event_description] }
// { "date": [event_date] }
// { "society": [society_id] }
router.post('/create', (req, res) => {
    eventsController.createEvent(req, res)
})

// When a POST request is made to the /events/update, it should include a JSON object with the following properties:
// { "id": [event_id] }
// { "name": [event_name] }
// { "description": [event_description] }
// { "date": [event_date] }
// { "location": [event_location] }"}
// { "society": [society_id] }
router.post('/update', (req, res) => {
    eventsController.updateEvent(req, res)
})

// When a POST request is made to the /events/delete, it should include a JSON object with the following properties:
// { "id": [event_id] }
router.post('/delete', (req, res) => {
    eventsController.deleteEvent(req, res)
})

module.exports = router
