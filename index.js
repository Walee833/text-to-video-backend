import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import aiRoutes from "./routes/ai.js"; // routes/ai.js file zaroor hona chahiye

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Test route to check server
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// AI routes
app.use("/api", aiRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
