const express = require('express');
/* eslint-disable-next-line */
const router = express.Router();

/* GET home page. */
router.get('/', async (req, res, next) => {
  res.send('Hello!');
});


module.exports = router;
