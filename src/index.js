const express = require("express");
const app = express();
require("dotenv").config();
const Sequlize = require("./config/db.config");
const cors = require("cors");
require("./utils/reminderCron");

// middlewares
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: false }));

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    // "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
    "*"
  );
  next();
});

// databases
Sequlize.authenticate()
  .then(() => {
    console.log("Database Connected Successfully");
    Sequlize.sync({ alter: true, force: false })
      .then(() => {
        console.log("Database Sync Successfully");
      })
      .catch((err) => {
        console.log("Database sync error", err);
      });
  })
  .catch((err) => {
    console.log("Database connection  error", err);
  });
// routes
app.use("/api", require("./routes"));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("server connected Successfully", port);
});
