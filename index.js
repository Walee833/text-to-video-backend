import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import aiRoutes from "./routes/ai.js";

dotenv.config();

const app = express();

/**
 * 🔥 CORS FIX — SAB ORIGINS ALLOWED
 */
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("Backend is running OK");
});

// AI route
app.use("/api", aiRoutes);

// Railway PORT
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
