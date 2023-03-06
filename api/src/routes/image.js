const express = require('express');
/* eslint-disable-next-line */
const router = express.Router();

const {uploadFileToS3, getImageURL} = require('../utils/image');

router.post('/upload', async (req, res) => {
  try {
    const file = req.files.file;
    const result = await uploadFileToS3(file);
    res.send(getImageURL(result.Key));
  } catch (err) {
    res.status(500).send(err);
  }
});
