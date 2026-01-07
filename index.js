const express = require("express");
const cors = require("cors");
require("dotenv").config();

const aiRoutes = require("./routes/ai");

const app = express();

app.use(cors());
app.use(express.json());

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
