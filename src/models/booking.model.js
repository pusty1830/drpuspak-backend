const Sequilize = require("sequelize");
const config = require("../config/db.config");

const Booking = config.define(
  "bookings",
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
    bookingDate: {
      type: Sequilize.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "bookings",
    timestamps: true,
  }
);

module.exports = Booking;
