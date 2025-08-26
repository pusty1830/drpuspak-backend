const Sequilize = require("sequelize");
const config = require("../config/db.config");

const Prescription = config.define(
  "prescriptions",
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
    doctorId: {
      type: Sequilize.INTEGER,
      allowNull: false,
    },
    condition: {
      type: Sequilize.STRING,
      allowNull: false,
    },
    drug: {
      type: Sequilize.JSON,
      allowNull: false,
    },
    messages: {
      type: Sequilize.STRING,
      allowNull: false,
    },

    advices: {
      type: Sequilize.JSON,
      allowNull: true,
    },
  },
  {
    tableName: "prescriptions",
    timestamps: true,
  }
);

module.exports = Prescription;
