const express = require('express');
/* eslint-disable-next-line */
const router = express.Router();

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
