import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN
});

export async function reframeVideo(prompt, videoUrl, aspectRatio) {
  const output = await replicate.run("luma/reframe-video", {
    input: {
      prompt,
      video_url: videoUrl,
      aspect_ratio: aspectRatio
    }
  });

  return {
    video: output.url()
  };
}
