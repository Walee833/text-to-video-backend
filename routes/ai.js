const express = require("express");
const router = express.Router();
const { reframeVideo } = require("../services/ai");

router.post("/generate-video", async (req, res) => {
  try {
    const { prompt, videoUrl, aspectRatio } = req.body;

    if (!prompt || !videoUrl) {
      return res.status(400).json({ message: "Missing data" });
    }

    const video = await reframeVideo(prompt, videoUrl, aspectRatio);

    res.json({ video });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "AI error", error: err.message });
  }
});

module.exports = router;
