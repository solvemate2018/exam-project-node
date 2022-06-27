const { DataTypes } = require("sequelize");
const { sequelize } = require("../../../config/database.js");

const Passenger = sequelize.define(
  "Passenger",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    documentType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    documentId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {}
);

async function setAssociations() {
  const { Ticket } = require("../ticket/ticket.js");
  Ticket.hasOne(Passenger);
  Passenger.belongsTo(Ticket);
}

setTimeout(setAssociations, 200);

exports.Passenger = Passenger;
