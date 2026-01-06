import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import aiRoutes from "./routes/ai.js";

dotenv.config();

const app = express();

// 🔥 Allow ALL origins (frontend + local + railway)
app.use(cors());
app.use(express.json());

// health check
app.get("/", (req, res) => {
  res.status(200).send("Backend running on Railway");
});

// API
app.use("/api", aiRoutes);

// 🚨 VERY IMPORTANT — Railway PORT
const PORT = process.env.PORT;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port", PORT);
});
