const Replicate = require("replicate");
require("dotenv").config();

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN
});

async function reframeVideo(prompt, videoUrl, aspectRatio = "9:16") {
  try {
    const prediction = await replicate.predictions.create({
      model: "luma/reframe-video",
      input: {
        prompt,
        video_url: videoUrl,
        aspect_ratio: aspectRatio
      }
    });

    console.log("Prediction started:", prediction.id);

    let status = prediction.status;
    let output = null;

    while (status !== "succeeded" && status !== "failed") {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const updated = await replicate.predictions.get(prediction.id);
      status = updated.status;
      output = updated.output;
      console.log("Current status:", status);
    }

    if (status === "succeeded") {
      if (Array.isArray(output)) {
        return output[0];
      }
      return output;
    } else {
      throw new Error("Video generation failed");
    }

  } catch (err) {
    console.error("Replicate error:", err);
    throw err;
  }
}

module.exports = { reframeVideo };
