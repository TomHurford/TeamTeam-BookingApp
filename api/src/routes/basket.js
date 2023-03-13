const express = require('express');
/* eslint-disable-next-line */
const router = express.Router();

/* GET Events listing. */
router.get('/', function(req, res, next) {
  res.send('respond with events');
});

module.exports = router;
