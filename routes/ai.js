const express = require("express");
const router = express.Router();
const { generateVideo } = require("../services/ai");

router.post("/generate-video", async (req, res) => {
  try {
    const { prompt } = req.body;
    const video = await generateVideo(prompt);
    res.json({ video });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
