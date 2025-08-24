const { createClient } = require("@deepgram/sdk");
const fs = require("fs");

const deepgram = createClient(process.env.DEEPGRAM_API_KEY);

const transcribeAudio = async (filePath) => {
  try {
    const audioStream = fs.createReadStream(filePath);

    const { result, error } = await deepgram.listen.prerecorded.transcribeFile(
      audioStream,
      {
        model: "nova-3",
        smart_format: true,
        language: "en-IN",
      }
    );

    if (error) throw error;

    console.log(
      "Deepgram transcription result:",
      JSON.stringify(result, null, 2)
    );

    if (!result?.channels?.[0]?.alternatives?.transcript) {
      throw new Error("Transcript not found in Deepgram response");
    }

    return result.channels.alternatives.transcript;
  } catch (error) {
    console.error("Deepgram Error:", error);
    throw error;
  }
};

module.exports = { transcribeAudio };
