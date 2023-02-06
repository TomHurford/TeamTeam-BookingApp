var express = require('express');
var router = express.Router();

/* GET Events listing. */
router.get('/', function(req, res, next) {
  res.send('respond with events');
} );

module.exports = router;