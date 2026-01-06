const express = require("express");
const router = express.Router();
const { reframeVideo } = require("../services/ai");

// POST /api/generate-video
router.post("/generate-video", async (req, res) => {
  try {
    const { prompt, videoUrl } = req.body;

    if (!prompt || !videoUrl) {
      return res.status(400).json({
        message: "prompt aur videoUrl required hai",
      });
    }

    const output = await reframeVideo(prompt, videoUrl);

    res.json({
      message: "Video processed",
      output: output,
    });

  } catch (err) {
    res.status(500).json({
      message: "AI call error",
      error: err.message,
    });
  }
});

module.exports = router;
