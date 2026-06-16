require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const predictRoute = require("./routes/predict");
const metaRoute = require("./routes/meta");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/college_predictor";

app.use(cors());
app.use(express.json());

// API routes
app.get("/api/health", (req, res) => res.json({ status: "ok" }));
app.use("/api/meta", metaRoute);
app.use("/api/predict", predictRoute);

// Serve the Vite build in production
const distPath = path.join(__dirname, "../frontend/dist");
if (process.env.NODE_ENV === "production") {
  app.use(express.static(distPath));
  // SPA fallback — any non-API route returns index.html
  app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`API listening on http://localhost:${PORT}`));
  })
  .catch(err => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });
