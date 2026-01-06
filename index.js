import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import aiRoutes from "./routes/ai.js";

dotenv.config();

const app = express();

// ✅ Enable CORS globally
app.use(cors()); 

// ✅ Parse JSON
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.status(200).send("Backend running OK");
});

// API routes
app.use("/api", aiRoutes);

// Railway PORT
const PORT = process.env.PORT || 8080;
app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port", PORT);
});
