// routes/transcriptionRoutes.js
const express = require("express");
const multer = require("multer");
const { handleTranscription } = require("../controllers/transcriptionController");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// POST /api/transcribe
router.post("/transcribe", upload.single("audio"), handleTranscription);

module.exports = router;
