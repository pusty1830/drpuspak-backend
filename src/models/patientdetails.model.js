const Sequilize = require("sequelize");
const config = require("../config/db.config");

const PatientDetails = config.define(
  "patientdetails",
  {
    id: {
      type: Sequilize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userId: {
      type: Sequilize.INTEGER,
      allowNull: false,
    },
    guirdianName: {
      type: Sequilize.STRING(100),
      allowNull: false,
    },
    dob: {
      type: Sequilize.STRING(100),
      allowNull: false,
    },
    age: {
      type: Sequilize.STRING(100),
      allowNull: false,
    },
    bloodgroup: {
      type: Sequilize.STRING(20),
      allowNull: true,
    },
    adress: {
      allowNull: false,
      type: Sequilize.STRING(100),
    },
    gender: {
      allowNull: false,
      type: Sequilize.STRING(100),
    },
  },
  {
    tableName: "patientdetails",
    timestamps: true,
  }
);

module.exports = PatientDetails;
