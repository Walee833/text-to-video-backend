import Replicate from "replicate";
import dotenv from "dotenv";
dotenv.config();

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN
});

export async function reframeVideo(prompt, videoUrl, aspectRatio = "9:16") {
  try {
    const output = await replicate.run("luma/reframe-video", {
      input: {
        prompt,
        video_url: videoUrl,
        aspect_ratio: aspectRatio
      }
    });
    return output; // URL of output video
  } catch (err) {
    console.error("Replicate Error:", err);
    throw err;
  }
}
