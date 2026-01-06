import express from "express";
import { reframeVideo } from "../services/ai.js";

const router = express.Router();

router.post("/generate-video", async (req, res) => {
  try {
    const { prompt, videoUrl, aspectRatio } = req.body;
    if (!prompt || !videoUrl) return res.status(400).json({ error: "prompt & videoUrl required" });

    const output = await reframeVideo(prompt, videoUrl, aspectRatio || "9:16");
    res.json({ success: true, videoUrl: output });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

export default router;
