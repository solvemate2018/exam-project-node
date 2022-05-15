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

async function setAssociations() {
  const { Passager } = require("../passager/passager.js");
  const { User } = require("../user/user.js");
  const { Flight } = require("../flight/flight.js");
  Flight.hasMany(Ticket);
  Ticket.belongsTo(Flight);

  Ticket.hasOne(Passager);
  Ticket.belongsTo(Passager);
  Passager.hasOne(Ticket);
  Passager.belongsTo(Ticket);

  User.hasMany(Ticket);
  Ticket.belongsTo(User);
}

setTimeout(setAssociations, 100);

exports.Ticket = Ticket;
