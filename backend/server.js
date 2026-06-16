require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const predictRoute = require("./routes/predict");
const metaRoute = require("./routes/meta");
const Cutoff = require("./models/Cutoff");
const expandCutoffs = require("./seed/expandCutoffs");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/college_predictor";

// Startup diagnostic
console.log("[startup] NODE_ENV:", process.env.NODE_ENV);
console.log("[startup] MONGO_URI set:", !!process.env.MONGO_URI);
console.log("[startup] MONGO_URI starts with:", (process.env.MONGO_URI || "").slice(0, 25) || "(fallback — localhost)");

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

/**
 * Auto-seed: if the cutoffs collection is empty, populate it.
 * Runs once per cold start — safe to leave in permanently.
 */
async function autoSeedIfEmpty() {
  const count = await Cutoff.countDocuments();
  if (count === 0) {
    console.log("[seed] Collection is empty — seeding now...");
    const docs = expandCutoffs();
    await Cutoff.insertMany(docs);
    console.log(`[seed] Inserted ${docs.length} cutoff records.`);
  } else {
    console.log(`[seed] Collection already has ${count} records — skipping seed.`);
  }
}

mongoose
  .connect(MONGO_URI)
  .then(async () => {
    console.log("Connected to MongoDB");
    await autoSeedIfEmpty();
    app.listen(PORT, () => console.log(`API listening on port ${PORT}`));
  })
  .catch(err => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });
