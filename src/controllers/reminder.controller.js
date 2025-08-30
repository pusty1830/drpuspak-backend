// controllers/reminder.controller.js
const Reminder = require("../models/reminder.model");
const { sendWhatsApp } = require("../utils/twoFactor");
const httpResponseCodes = require("../utils/http");
const { prepareResponse } = require("../utils/response");

/**
 * ✅ Bulk sender – send reminders to multiple IDs
 */
exports.sendBulkReminders = async (req, res) => {
  try {
    const { ids } = req.body;
    console.log("Received IDs:", ids);

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(httpResponseCodes.BAD_REQUEST).json(
        prepareResponse("BAD_REQUEST", "No IDs provided", null, {
          ids: req.body.ids,
        })
      );
    }

    const reminders = await Reminder.findAll({ where: { id: ids } });

    if (!reminders.length) {
      return res
        .status(httpResponseCodes.NOT_FOUND)
        .json(
          prepareResponse("NOT_FOUND", "No reminders found", null, { ids })
        );
    }

    const results = [];

    for (const reminder of reminders) {
      try {
        const visitDate = reminder.nextVisit.toISOString().split("T")[0];
        let clinicName =
          reminder.fromWhere?.toLowerCase() === "clinic"
            ? "Clinic Dr Puspak Samal (Orthspine Care)"
            : "KIMS Hospital";

        const message = `Your revisit is on ${visitDate} from ${clinicName}\n\n— Dr Puspak Samal | Orthopedics`;

        const result = await sendWhatsApp(reminder.patientNumber, message);

        results.push({
          id: reminder.id,
          phone: reminder.patientNumber,
          status: result ? "sent" : "failed",
        });
      } catch (err) {
        console.error(`❌ Failed to send reminder ID ${reminder.id}:`, err);
        results.push({
          id: reminder.id,
          phone: reminder.patientNumber,
          status: "failed",
          error: err.message,
        });
      }
    }

    return res.status(httpResponseCodes.OK).json(
      prepareResponse(
        "SUCCESS",
        "Bulk reminders processed",
        {
          total: reminders.length,
          sent: results.filter((r) => r.status === "sent").length,
          failed: results.filter((r) => r.status === "failed").length,
          results,
        },
        null
      )
    );
  } catch (err) {
    console.error("❌ Error in sendBulkReminders:", err.message);
    res
      .status(httpResponseCodes.SERVER_ERROR)
      .json(
        prepareResponse(
          "SERVER_ERROR",
          "Internal server error",
          null,
          err.message
        )
      );
  }
};
