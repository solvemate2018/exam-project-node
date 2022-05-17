const { compare, hash } = require("bcrypt");
const saltRounds = 12;

async function comparePasswords(normalPassword, hashedPassword) {
  return compare(normalPassword, hashedPassword);
}

async function hashPassword(password) {
  let hashedPassword = await hash(password, saltRounds);
  return hashedPassword;
}

exports.comparePasswords = comparePasswords;
exports.hashPassword = hashPassword;
