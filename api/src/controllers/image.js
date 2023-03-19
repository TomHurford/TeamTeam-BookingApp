const imageUtil = require('../utils/imageS3');
const auth = require('../utils/jwt_auth');

/**
 * Upload an image
 * @param {File} file The request object
 * @param {Request} req The request object
 * @param {Response} res The response object
 * @return {Response} The response object
 */
async function upload(file, req, res) {
  let decoded = null;

  if (req.headers.authorization) {
    try {
      decoded = await auth.authenticate(req);
    } catch (err) {
      return res.status(401).send({token: null, message: 'Unauthorized'});
    }
  }

  if (!decoded.id) {
    return res.status(401).send({token: null, message: 'Unauthorized'});
  };

  const image = await imageUtil.uploadImageToS3(file, decoded.id);

  console.log(image);

  if (image instanceof Error) {
    return res.status(400).send({message: image.message});
  }

  return res.status(200).send({message: 'Image uploaded successfully'});
}

module.exports = {
  upload,
};
