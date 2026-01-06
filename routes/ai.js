import express from "express";
import { reframeVideo } from "../services/ai.js";

const router = express.Router();

router.post("/generate-video", async (req, res) => {
  try {
    const { prompt, videoUrl, aspectRatio } = req.body;

    if (!prompt || !videoUrl) {
      return res.status(400).json({ error: "prompt or videoUrl missing" });
    }

    const result = await reframeVideo(
      prompt,
      videoUrl,
      aspectRatio || "9:16"
    );

    res.status(200).json(result);
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: "AI error" });
  }
});

export default router;
