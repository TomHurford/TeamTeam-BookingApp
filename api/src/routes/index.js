const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()


var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async(req, res, next) => {
  res.send('Hello World!');
});

module.exports = router;
