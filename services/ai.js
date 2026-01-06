import Replicate from "replicate";
import dotenv from "dotenv";

dotenv.config();

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN
});

// 👇 NAMED EXPORT (IMPORTANT)
export async function reframeVideo(prompt, videoUrl, aspectRatio = "9:16") {
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

    let result = prediction;

    while (result.status !== "succeeded" && result.status !== "failed") {
      await new Promise(r => setTimeout(r, 2000));
      result = await replicate.predictions.get(prediction.id);
      console.log("Current status:", result.status);
    }

    if (result.status === "failed") {
      throw new Error("Video generation failed");
    }

    if (Array.isArray(result.output)) {
      return result.output[0];
    }

    return result.output;

  } catch (error) {
    console.error("Replicate error:", error);
    throw error;
  }
}
