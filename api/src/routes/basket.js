const express = require("express");
const router = express.Router();

/* GET Events listing. */
router.get("/", function (req, res, next) {
  res.send("respond with events");
});

module.exports = router;
