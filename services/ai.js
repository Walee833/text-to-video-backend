const fetch = require("node-fetch");

const API_KEY = process.env.JSON2VIDEO_API_KEY;

async function generateVideo(prompt) {
  try {
    const response = await fetch("https://api.json2video.com/v2/movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY
      },
      body: JSON.stringify({
        resolution: "1080p",
        scenes: [
          {
            elements: [
              {
                type: "text",
                text: prompt,
                style: {
                  fontSize: 48
                }
              }
            ]
          }
        ]
      })
    });

    const data = await response.json();

    if (!data || !data.movieId) {
      throw new Error("Video creation failed");
    }

    return `https://json2video.com/watch/${data.movieId}`;

  } catch (err) {
    console.error("JSON2VIDEO ERROR:", err);
    throw err;
  }
}

module.exports = { generateVideo };
