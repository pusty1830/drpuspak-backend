const Sequlize = require("sequelize");
require("dotenv").config();

const database = new Sequlize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    pool: {
      min: 0,
      max: 5,
      idle: 10000,
    },
  }
);
module.exports = database;
