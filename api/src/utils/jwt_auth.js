// This is the util that is used to Authenticate a user using a JWT token

const jwt = require('jsonwebtoken');

/**
 * Authenticate a user using a JWT token
 * @param {Request} req The request object
 * @return {Promise} Promise
 */
async function authenticate(req) {
  // Decode the JWT token
  // The JWT token is sent in the Authorization header, it is prefixed with
  // 'Bearer '
  if (!req.headers.authorization) {
    return new Promise((resolve, reject) => {
      reject(new Error('Unauthorized'));
    });
  }
  const token = req.headers.authorization.split(' ')[1];

  // try to decode the token if error return false
  let decoded = null;
  try {
    decoded = jwt.verify(token, process.env.TOKEN_SECRET);
  } catch (e) {
    decoded = false;
  }
  return new Promise((resolve, reject) => {
    // If the token is valid, resolve the promise and return the decoded token
    if (decoded) {
      resolve(decoded);
    } else {
      reject(new Error('Unauthorized'));
    }
  });
}

/**
 * Generate a JWT token
 * @param {User} user User object
 * @return {Promise} Promise
 */
async function generateToken(user) {
  return new Promise((resolve, reject) => {
    // If user type is 1, the user is an admin and the admin flag is set to true
    const admin = user.userType === 1;
    const token = jwt.sign(
        {
          id: user.id,
          admin: admin,
        },
        process.env.TOKEN_SECRET,
        {
          expiresIn: 86400, // expires in 24 hours
        },
    );
    resolve(token);
  });
}

module.exports = {
  authenticate,
  generateToken,
};
