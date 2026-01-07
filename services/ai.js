const fetch = require('node-fetch'); // make sure node-fetch installed ho
require('dotenv').config();

const HF_API_KEY = process.env.HF_API_KEY;

async function generateVideo(prompt, videoUrl, aspectRatio = "9:16") {
  try {
    console.log("HF request start...");
    console.log("Prompt:", prompt);

    const response = await fetch(
      "https://router.huggingface.co/models/damo-vilab/text-to-video-ms-1.7b",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${HF_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            aspect_ratio: aspectRatio,
            video: videoUrl
          }
        })
      }
    );

    if (!response.ok) {
      const err = await response.json();
      console.error("HF ERROR:", err);
      throw new Error("HF request failed");
    }

    const data = await response.json();
    console.log("HF response:", data);

    if (data && data.output && data.output.length > 0) {
      return { video: data.output[0] };
    } else {
      throw new Error("Video creation failed");
    }

  } catch (error) {
    console.error("AI SERVICE ERROR:", error);
    return { error: error.message };
  }
}

module.exports = { generateVideo };
