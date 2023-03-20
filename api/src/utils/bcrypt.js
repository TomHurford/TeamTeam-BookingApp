const bcrypt = require('bcryptjs');

const saltRounds = 10;

/**
 * Hash a password
 * @param {String} password The password to be hashed
 * @return {String} The hashed password
 */
const hashPassword = (password) => {
  return bcrypt.hashSync(password, saltRounds);
};

/**
 * Compare a password with a hash
 * @param {String} password The password to be compared
 * @param {String} hash The hash to be compared
 * @return {Boolean} True if the password matches the hash, false otherwise
 */
const comparePassword = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};

/**
 * Export the functions
 */
module.exports = {
  hashPassword,
  comparePassword,
};
