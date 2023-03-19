const express = require('express');
/* eslint-disable-next-line */
const router = express.Router();
const imageController = require('../controllers/image.js');
const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg'];
  if (!allowedTypes.includes(file.mimetype)) {
    const error = new Error('Wrong file type');
    error.code = 'LIMIT_FILE_TYPES';
    return cb(error, false);
  }
  cb(null, true);
};

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_S3_BUCKET,
    acl: 'public-read',
    key: function(req, file, cb) {
      cb(null, {fieldName: req.userId + '/' + file.originalname});
    },
    metadata: function(req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
  }),
  limits: {fileSize: 1000000},
  fileFilter: fileFilter,
});

router.post('/upload', upload.single('file'), (req, res) => {
  console.log('recieved image');
  res.status(200).send({message: 'Image uploaded successfully'});
});

router.post('/delete', (req, res) => {
  imageController.delete(req, res);
});

router.post('/get', (req, res) => {
  imageController.get(req, res);
});

module.exports = router;
