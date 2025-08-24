// controllers/transcriptionController.js
const { transcribeAudio } = require("../utils/transcriptionModel");

const handleTranscription = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No audio file uploaded" });
    }

    const transcript = await transcribeAudio(req.file.path);

    res.json({ transcript });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { handleTranscription };
