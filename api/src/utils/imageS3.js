const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

/**
 * Upload an image to S3
 * @param {File} image The image to be uploaded
 * @param {Number} userId The id of the user who is uploading the image
 * @return {Promise} The promise of the upload
 */
async function uploadImageToS3(image, userId) {
  // Check that the image is an image file and is not empty
  console.log(image);
  if (
    image === undefined ||
    image.mimetype === undefined ||
    image.mimetype.split('/')[0] !== 'image'
  ) {
    return new Error('Invalid image');
  }

  console.log(image.data);

  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: `${userId}/${image.name}`,
    Body: image.buffer,
    ACL: 'public-read',
    ContentType: image.mimetype,
  };

  return await s3.upload(params).promise();
}

/**
 * Download an image from S3
 * @param {String} key The key of the image to be downloaded
 * @return {Promise} The promise of the download
 * @return {Error} The error if the image does not exist
 */
async function downloadImageFromS3(key) {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: key,
  };

  return await s3.getObject(params).promise();
}

/**
 * Delete an image from S3
 * @param {String} key The key of the image to be deleted
 * @return {Promise} The promise of the deletion
 * @return {Error} The error if the image does not exist
 */
async function deleteImageFromS3(key) {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: key,
  };

  return await s3.deleteObject(params).promise();
}

module.exports = {
  uploadImageToS3,
  downloadImageFromS3,
  deleteImageFromS3,
};
