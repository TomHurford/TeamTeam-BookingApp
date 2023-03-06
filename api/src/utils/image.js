const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

const uploadFileToS3 = (file) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Body: file.data,
    Key: file.name,
  };

  return s3.upload(params).promise();
};

const getImageURL = (key) => {
  return `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${key}`;
};

const getImageFromS3 = (key) => {
  return new Promise((resolve, reject) => {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
    };

    s3.getObject(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

module.exports = {
  uploadFileToS3,
  getImageFromS3,
  getImageURL,
};
