const { Sequelize, Op, Model, DataTypes } = require("sequelize");
const { sequelize } = require("../../../config/database.js");

const Passager = sequelize.define(
  "Passager",
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

exports.Passager = Passager;
