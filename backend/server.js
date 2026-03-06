const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

const shopRoutes = require("./routes/shoproutes");
app.use("/api/shops", shopRoutes);
const tokenRoutes = require("./routes/tokenroutes");
const responseRoutes = require("./routes/responseroute");

app.use("/api/responses", responseRoutes);
app.use("/api/tokens", tokenRoutes);
app.get("/", (req, res) => {
  res.send("Token Management API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});