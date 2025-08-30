// routes/reminder.routes.js
const express = require("express");
const router = express.Router();
const {
  sendReminderById,
  sendBulkReminders,
} = require("../controllers/reminder.controller");
const { prepareBody } = require("../utils/response");
const { asyncHandler } = require("../middleware/asyncHandler");

// Example: POST /reminders/send/5

router.route("/send/:id").post(prepareBody, asyncHandler("", sendReminderById));

router
  .route("/send-bulk")
  .post(prepareBody, asyncHandler("", sendBulkReminders));

module.exports = router;
