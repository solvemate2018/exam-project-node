const { User } = require("./user.js");
const {
  hashPassword,
  comparePasswords,
} = require("../../security/encryptor.js");

async function userExists(userId) {
  const user = await User.findByPk(userId);
  if (user == null) return false;
  return true;
}

async function register(email, password) {
  let user = await User.findOne({ where: { email: email } });
  if (user != null) {
    throw new Error("There is already a user with the same email!");
  }
  return await User.create({
    email: email,
    password: await hashPassword(password),
  });
}

async function login(email, password) {
  let dbUser = await User.findOne({ where: { email: email } });
  if (!dbUser) {
    throw new Error("There is no user with such Email");
  }
  if (comparePasswords(password, dbUser.password)) {
    return dbUser;
  } else throw new Error("Incorrect password");
}

exports.userExists = userExists;
exports.register = register;
exports.login = login;
