import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import aiRoutes from "./routes/ai.js";

dotenv.config();

const app = express();

// 🔥 CORS FIX (ALLOW ALL ORIGINS)
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// API routes
app.use("/api", aiRoutes);

// Railway / local port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
