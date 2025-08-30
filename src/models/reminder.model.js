const Sequilize = require("sequelize");
const config = require("../config/db.config");

const Reminder = config.define(
  "reminders",
  {
    id: {
      type: Sequilize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    patientNumber: {
      type: Sequilize.STRING(100),
      allowNull: false,
    },
    patientName: {
      type: Sequilize.STRING(100),
      allowNull: false,
    },
    Age: {
      type: Sequilize.INTEGER,
      allowNull: false,
    },
    address: {
      type: Sequilize.STRING(100),
      allowNull: false,
    },
    disease: {
      type: Sequilize.STRING(100),
      allowNull: false,
    },
    fromWhere: {
      type: Sequilize.ENUM("clinic", "kims"),
      allowNull: false,
    },
    reason: {
      type: Sequilize.ENUM("operation", "opd", "revisit"),
      allowNull: false,
      defaultValue: "revisit",
    },
    nextVisit: {
      type: Sequilize.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "reminders",
    timestamps: true,
  }
);

module.exports = Reminder;
