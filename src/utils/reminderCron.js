const cron = require("node-cron");
const Reminder = require("../models/reminder.model");
const { sendSMS } = require("./twoFactor");
const { Op } = require("sequelize");

// Runs daily at 7:00 AM
cron.schedule("43 22 * * *", async () => {
  console.log("⏰ Checking reminders for tomorrow...");

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowDate = tomorrow.toISOString().split("T")[0]; // YYYY-MM-DD

  try {
    const reminders = await Reminder.findAll({
      where: {
        nextVisit: {
          [Op.between]: [
            `${tomorrowDate} 00:00:00`,
            `${tomorrowDate} 23:59:59`,
          ],
        },
      },
    });

    for (const reminder of reminders) {
      const visitDate = reminder.nextVisit.toISOString().split("T")[0];
      const message = `Your Revisit is on ${visitDate} at ${reminder.nextVisitTime} from ${reminder.fromWhere}`;
      await sendSMS(reminder.patientNumber, message);
    }
  } catch (err) {
    console.error("❌ Error fetching reminders:", err.message);
  }
});
