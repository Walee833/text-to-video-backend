import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import aiRoutes from "./routes/ai.js";

dotenv.config();
const app = express();

// 👇 CORS for all origins
app.use(cors({
    origin: "*"  // ye sab frontend urls allow karega
}));

app.use(express.json());

// test route
app.get("/", (req, res) => {
    res.send("Backend is running");
});

// AI routes
app.use("/api", aiRoutes);

const PORT = process.env.PORT || 8080; // Railway ke liye 8080
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
