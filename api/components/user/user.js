const { Sequelize, Op, Model, DataTypes } = require("sequelize");
const { sequelize } = require("../../../config/database.js");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "GUEST",
    },
  },
  {}
);

async function setAssociations() {
  const { Ticket } = require("../ticket/ticket.js");
  User.hasMany(Ticket);
  Ticket.belongsTo(User);
}

setTimeout(setAssociations, 200);

exports.User = User;
