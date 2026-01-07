const express = require("express");
const router = express.Router();
const { generateVideo } = require("../services/ai");

router.post("/generate-video", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const videoBuffer = await generateVideo(prompt);

    res.set({
      "Content-Type": "video/mp4"
    });

    res.send(videoBuffer);
  } catch (err) {
    console.error("ROUTE ERROR:", err);
    res.status(500).json({ error: "Video generation failed" });
  }
});

module.exports = router;
