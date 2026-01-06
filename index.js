import express from "express";
import cors from "cors";          // 👈 CORS import
import dotenv from "dotenv";
import aiRoutes from "./routes/ai.js";

dotenv.config();
const app = express();

// 👇 CORS enable
app.use(cors({
    origin: "*"  // sab origins allow
}));

app.use(express.json()); // body parser

// test route
app.get("/", (req, res) => {
    res.send("Backend is running");
});

// AI routes
app.use("/api", aiRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
