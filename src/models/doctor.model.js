const Sequilize = require("sequelize");
const config = require("../config/db.config");

const DoctorDetails = config.define(
  "doctordetails",
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
    dept: {
      type: Sequilize.STRING(100),
      allowNull: false,
    },
    timing: {
      type: Sequilize.STRING(100),
      allowNull: false,
    },
    doctImg: {
      type: Sequilize.STRING(100),
      allowNull: false,
    },
    gender: {
      allowNull: false,
      type: Sequilize.STRING(100),
    },
  },
  {
    tableName: "doctordetails",
    timestamps: true,
  }
);

module.exports = DoctorDetails;
