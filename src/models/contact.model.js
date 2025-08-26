const Sequilize = require("sequelize");
const config = require("../config/db.config");

const Contact = config.define(
  "contacts",
  {
    id: {
      type: Sequilize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: Sequilize.STRING(100),
      allowNull: false,
    },
    email: {
      type: Sequilize.STRING(100),
      allowNull: false,
    },
    phoneNumber: {
      type: Sequilize.STRING(100),
      allowNull: false,
    },
    subject: {
      type: Sequilize.STRING(100),
      allowNull: false,
    },
    message: {
      type: Sequilize.STRING(100),
      allowNull: false,
    },
  },
  {
    tableName: "contacts",
    timestamps: true,
  }
);

module.exports = Contact;
