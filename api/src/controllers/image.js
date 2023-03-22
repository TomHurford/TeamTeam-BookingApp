const multer = require('multer');
const multerS3 = require('multer-s3');
const {S3Client} = require('@aws-sdk/client-s3');

const s3 = new S3Client();

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (!allowedTypes.includes(file.mimetype)) {
    const error = new Error('Invalid file type');
    error.code = 'LIMIT_FILE_TYPES';
    return cb(error, false);
  }
  cb(null, true);
};

const uploadToS3 = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'ticketopia',
    location: 'https://ticketopia.s3.eu-west-2.amazonaws.com/photos/',
    key: function(req, file, cb) {
      cb(null, Date.now().toString() + '-' + file.originalname);
    },
    metadata: function(req, file, cb) {
      console.log(req);
      cb(null, {fieldName: file.fieldname});
    },
  }),
  fileFilter: fileFilter,
});

/**
 * Uploads a file to S3, and adds the file name to the database
 * @param {Request} req The request object
 * @param {Response} res The response object
 */
async function uploadImageToS3(req, res) {
  res.status(200).send('File uploaded successfully');
}

module.exports = {
  uploadImageToS3,
};
