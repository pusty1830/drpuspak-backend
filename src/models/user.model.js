const Sequilize = require("sequelize");
const config = require("../config/db.config");

const User = config.define(
  "users",
  {
    id: {
      type: Sequilize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userName: {
      type: Sequilize.STRING(50),
      allowNull: false,
    },
    email: {
      type: Sequilize.STRING(100),
      allowNull: true,
    },
    password: {
      type: Sequilize.STRING(100),
      allowNull: false,
      defaultValue: "123456",
    },
    role: {
      type: Sequilize.ENUM("User", "Doctor", "Admin","Receptionist"),
      allowNull: false,
      defaultValue: "User",
    },
    phoneNumber: {
      type: Sequilize.STRING(20),
      allowNull: false,
    },
    isVerified: {
      allowNull: false,
      type: Sequilize.BOOLEAN,
      defaultValue: false,
    },
    token: {
      type: Sequilize.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "users",
    timestamps: true,
  }
);

module.exports = User;
