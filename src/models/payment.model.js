const Sequilize = require("sequelize");
const config = require("../config/db.config");

const Payment = config.define(
  "payments",
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
    paidBy: {
      type: Sequilize.STRING(100),
      allowNull: false,
    },
    ammount: {
      type: Sequilize.STRING(100),
      allowNull: false,
    },
  },
  {
    tableName: "payments",
    timestamps: true,
  }
);

module.exports = Payment;
