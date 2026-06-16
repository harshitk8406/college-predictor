require("dotenv").config();
const mongoose = require("mongoose");
const Cutoff = require("../models/Cutoff");
const expandCutoffs = require("./expandCutoffs");

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/college_predictor";

async function seed() {
  console.log(`Connecting to ${MONGO_URI} ...`);
  await mongoose.connect(MONGO_URI);

  const docs = expandCutoffs();
  console.log(`Generated ${docs.length} cutoff records from the base dataset.`);

  await Cutoff.deleteMany({});
  await Cutoff.insertMany(docs);

  console.log(`Seeded ${docs.length} records into the "cutoffs" collection.`);
  console.log("Reminder: this is illustrative sample data, not official cutoffs.");

  await mongoose.disconnect();
}

seed().catch(err => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
