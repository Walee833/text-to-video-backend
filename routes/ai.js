import express from "express";
import { reframeVideo } from "../services/ai.js"; // services folder me ai.js hona chahiye

const router = express.Router();

// POST route to generate video
router.post("/generate-video", async (req, res) => {
  try {
    const { prompt, videoUrl, aspectRatio } = req.body;

    if (!prompt || !videoUrl) {
      return res.status(400).json({ message: "prompt and videoUrl are required" });
    }

    const output = await reframeVideo(prompt, videoUrl, aspectRatio || "9:16");

    res.json({ message: "Video processed", output });
  } catch (err) {
    console.error("AI Error:", err);
    res.status(500).json({ message: "AI error", error: err.message });
  }
});

export default router;
