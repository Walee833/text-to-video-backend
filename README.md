# Text to Video Backend

This is a Node.js backend project that generates videos using AI from text input.

## How it works
User sends text → Backend calls AI → AI returns video URL

## API Endpoint

POST /video/generate

Request body:
{
  "text": "A lion walking in the jungle"
}

Response:
{
  "message": "Video processed",
  "output": "VIDEO_URL"
}

## How to run project

1. Install dependencies
npm install

2. Create .env file
REPLICATE_API_TOKEN=your_api_key_here

3. Start server
node index.js

## Tech Used
Node.js, Express, Replicate AI
