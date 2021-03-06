const { DataTypes, NOW } = require("sequelize");
const { sequelize } = require("../../../config/database.js");

const Flight = sequelize.define(
  "Flight",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    origin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    destination: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    takeOff: {
      type: DataTypes.DATE,
      validate: {
        isAfter: NOW,
      },
    },
    duration: {
      type: DataTypes.INTEGER,
    },
    landing: {
      type: DataTypes.DATE,
      validate: {
        isAfter: NOW,
      },
    },
    rows: {
      type: DataTypes.INTEGER,
      defaultValue: 30,
    },
    seats: {
      type: DataTypes.INTEGER,
      defaultValue: 6,
    },
  },
  {}
);

async function setAssociations() {
  const { Ticket } = require("../ticket/ticket.js");
  Flight.hasMany(Ticket);
  Ticket.belongsTo(Flight);
}

setTimeout(setAssociations, 200);

exports.Flight = Flight;
