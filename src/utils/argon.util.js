const argon2 = require('argon2');

/**
 * Hashes a plain text password using Argon2.
 *
 * @param {string} plain - The plain text password to hash.
 * @returns {Promise<string>} The hashed password.
 * @throws Will throw an error if hashing fails.
 */
exports.hashing = async (plain) => {
  return await argon2.hash(plain);
};


/**
 * Verifies a plain text password against a hashed password.
 *
 * @param {string} hashed - The hashed password stored in the database.
 * @param {string} plain - The plain text password to verify.
 * @returns {Promise<boolean>} True if the password matches, false otherwise.
 * @throws Will throw an error if verification fails.
 */
exports.verifyHash = async (hashed, plain) => {
  return await argon2.verify(hashed, plain);
};
