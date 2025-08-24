const axios = require("axios");

async function sendSMS(phoneNumber, message) {
  try {
    const apiKey = process.env.TWO_FACTOR_API_KEY; // Keep in .env

    // Direct SMS API
    await axios.get(
      `https://2factor.in/API/V1/${apiKey}/SMS/${phoneNumber}/${encodeURIComponent(
        message
      )}`
    );

    console.log(`✅ SMS sent to ${phoneNumber}: ${message}`);
  } catch (error) {
    console.error(`❌ Failed to send SMS to ${phoneNumber}: ${error}`);
  }
}

module.exports = { sendSMS };
