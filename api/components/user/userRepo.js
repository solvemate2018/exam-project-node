const { User } = require("./user.js");

async function userExists(userId) {
  const user = await User.findByPk(userId);
  if (user == null) return false;
  return true;
}

exports.userExists = userExists;
