import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import aiRoutes from "./routes/ai.js";

dotenv.config();

const app = express();

app.use(cors()); // CORS fix
app.use(express.json());

app.get("/", (req, res) => res.send("Backend is running"));

app.use("/api", aiRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
