const express = require("express");
const router = express.Router();
const { reframeVideo } = require("../services/ai");

router.post("/reframe", async (req, res) => {
  const { prompt, videoUrl, aspectRatio } = req.body;
  if (!prompt || !videoUrl) return res.status(400).json({ message: "prompt and videoUrl required" });

  try {
    const output = await reframeVideo(prompt, videoUrl, aspectRatio || "9:16");
    res.json({ message: "Video processed", output });
  } catch (err) {
    res.status(500).json({ message: "AI call error", error: err.toString() });
  }
});

module.exports = router;
