import express from "express";
import { reframeVideo } from "../services/ai.js";

const router = express.Router();

router.post("/generate-video", async (req, res) => {
  try {
    const { prompt, videoUrl, aspectRatio } = req.body;

    if (!prompt || !videoUrl) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const result = await reframeVideo(
      prompt,
      videoUrl,
      aspectRatio || "9:16"
    );

    res.json({ status: "success", video: result });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI error" });
  }
});

export default router;
