const twilio = require("twilio");

/**
 * Send WhatsApp message using Twilio API
 * @param {string} phoneNumber - Indian phone number (10 digits or with +91 prefix)
 * @param {string} message - Message text to send
 */
async function sendWhatsApp(phoneNumber, message) {
  try {
    if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) {
      throw new Error("Missing Twilio credentials in environment variables");
    }

    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    // Ensure number starts with +91
    let formattedNumber = phoneNumber.toString();
    if (!formattedNumber.startsWith("91")) {
      formattedNumber = `91${formattedNumber}`;
    }

    const resp = await client.messages.create({
      from: "whatsapp:+14155238886", // Twilio sandbox or your WhatsApp-enabled number
      to: `whatsapp:+${formattedNumber}`,
      body: message,
    });

    console.log(`✅ WhatsApp sent via Twilio to ${formattedNumber}:`, resp.sid);
    return resp;
  } catch (error) {
    console.error(
      `❌ Failed to send WhatsApp via Twilio to ${phoneNumber}:`,
      error.message
    );
    return null;
  }
}

module.exports = { sendWhatsApp };

// Example usage
// (async () => {
//   await sendWhatsApp("9876543210", "Hello from Twilio 🚀");
//   await sendWhatsApp("919876543210", "Tomorrow is your revisit reminder 🏥");
// })();
