const Sequelize = require("sequelize");
const sequelize = new Sequelize("airexam", "root", "$0rryBate", {
  host: "localhost",
  dialect: "mysql",
});

exports.sequelize = sequelize;
