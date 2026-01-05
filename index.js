const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const videoRoutes = require("./routes/video");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/video", videoRoutes);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
