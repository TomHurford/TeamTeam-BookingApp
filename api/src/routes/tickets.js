const express = require('express');
const router = express.Router();

const {checkIsLoggedIn} = require('../utils/jwt_auth.js');
const ticketController = require('../controllers/tickets.js');

// GET /tickets
router.get('/', (req, res) => {
  ticketController.getTickets(req, res);
});

router.post('/create', (req, res) => {
  ticketController.createTicketsForUser(req, res);
});

router.post('/use', (req, res) => {
  ticketController.useTicket(req, res);
});

module.exports = router;

// What routes do we need?
