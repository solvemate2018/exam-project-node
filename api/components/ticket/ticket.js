const { Sequelize, Op, Model, DataTypes } = require("sequelize");
const { sequelize } = require("../../../config/database.js");

const Ticket = sequelize.define(
  "Ticket",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    ticket_row: {
      type: DataTypes.INTEGER,
    },
    ticket_seat: {
      type: DataTypes.INTEGER,
    },
  },
  {}
);

exports.Ticket = Ticket;
