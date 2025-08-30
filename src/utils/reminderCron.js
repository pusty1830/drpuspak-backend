const cron = require("node-cron");
const Reminder = require("../models/reminder.model");
const { sendWhatsApp } = require("./twoFactor");
const { Op } = require("sequelize");

// Runs daily at 7:00 AM
cron.schedule("08 19 * * *", async () => {
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
      let clinicName =
        reminder.fromWhere === "clinic"
          ? "Clinic Dr Puspak Samal (Orthspine Care)"
          : "KIMS Hospital";

      const message = `Your revisit is on ${visitDate} from ${clinicName}\n\n— Dr Puspak Samal | Orthopedics`;

      await sendWhatsApp(reminder.patientNumber, message);
    }
  } catch (err) {
    console.error("❌ Error fetching reminders:", err.message);
  }
});
