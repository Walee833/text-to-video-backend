const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const aiRoutes = require("./routes/ai");

dotenv.config();

const app = express();

/**
 * 🔥 CORS FIX (IMPORTANT)
 * allow all origins + preflight
 */
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// preflight explicitly handle
app.options("*", cors());

app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("Backend is running OK");
});

// AI routes
app.use("/api", aiRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
