const Replicate = require("replicate");
require("dotenv").config();

// Initialize Replicate with your API token from .env
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN
});

/**
 * Reframe video using luma/reframe-video model
 * @param {string} prompt - Text prompt for AI
 * @param {string} videoUrl - URL of input video
 * @param {string} aspectRatio - Optional aspect ratio (default "9:16")
 * @returns {string} - Output video URL
 */
async function reframeVideo(prompt, videoUrl, aspectRatio = "9:16") {
  try {
    // Start prediction
    const prediction = await replicate.predictions.create({
      model: "luma/reframe-video",
      input: {
        prompt,
        video_url: videoUrl,
        aspect_ratio: aspectRatio
      }
    });

    console.log("Prediction started:", prediction.id);

    // Polling until video is ready
    let status = prediction.status;
    while (status !== "succeeded" && status !== "failed") {
      await new Promise(r => setTimeout(r, 2000)); // Wait 2 sec
      const updated = await replicate.predictions.get(prediction.id);
      status = updated.status;
      prediction.output = updated.output;
      console.log("Current status:", status);
    }

    // Parse output safely
    let result = null;
    if (status === "succeeded") {
      console.log("Raw prediction output:", prediction.output);
      if (Array.isArray(prediction.output) && prediction.output.length > 0) {
        result = prediction.output[0];
      } else if (typeof prediction.output === "string") {
        result = prediction.output;
      } else {
        result = JSON.stringify(prediction.output);
      }
      console.log("Video ready:", result);
    } else {
      throw new Error("Video generation failed");
    }

    return result;

  } catch (err) {
    console.error("Replicate AI Error:", err);
    throw err;
  }
}

module.exports = { reframeVideo };
