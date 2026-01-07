const express = require("express");
const router = express.Router();

const { reframeVideo } = require("../services/ai");

router.post("/generate-video", async (req, res) => {
  try {
    const { prompt, videoUrl, aspectRatio } = req.body;

    const video = await reframeVideo(prompt, videoUrl, aspectRatio);

    res.json({ video });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Video generation failed" });
  }
});

module.exports = router;
