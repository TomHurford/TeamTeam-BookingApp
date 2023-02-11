
// Create routers for the past events page for a user to display on the past events page for a user on the front end
// Path: api/src/routes/past.js
const express = require("express");
const router = express.Router();
const { getPastEvents } = require("../controllers/past");

router.get("/", getPastEvents);

module.exports = router;


