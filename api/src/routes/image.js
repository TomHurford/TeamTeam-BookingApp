const express = require('express');
/* eslint-disable-next-line */
const router = express.Router();
const imageController = require('../controllers/image.js');


router.post('/upload', (req, res) => {
  try {
    upload.single('file')(req, res, (err) => {
      if (err) {
        console.log(err);
        res.status(400).send('File upload failed');
      } else {
        console.log('File uploaded successfully');
        res.status(200).send('File uploaded successfully');
      }
    });
  } catch (err) {
    console.log(err);
    res.status(400).send('File upload failed');
  }
});

router.post('/delete', (req, res) => {
  imageController.delete(req, res);
});

router.post('/get', (req, res) => {
  imageController.get(req, res);
});

module.exports = router;
