const mongoose = require("mongoose");
const { CATEGORIES, EXAM_TYPES, QUOTAS, COLLEGE_TYPES } = require("../utils/constants");

const cutoffSchema = new mongoose.Schema(
  {
    college: { type: String, required: true, index: true },
    type: { type: String, enum: COLLEGE_TYPES, required: true },
    state: { type: String, required: true },
    examType: { type: String, enum: EXAM_TYPES, required: true, index: true },
    branch: { type: String, required: true },
    tier: { type: Number, required: true }, // 1 = most selective, used as a tie-breaker
    metric: { type: String, enum: ["rank", "score"], required: true },
    category: { type: String, enum: [...CATEGORIES, "ALL"], required: true, index: true },
    quota: { type: String, enum: QUOTAS, required: true },
    cutoffValue: { type: Number, required: true }, // closing rank OR closing score
    minClassXII: { type: Number, required: true }
  },
  { timestamps: true }
);

cutoffSchema.index({ examType: 1, category: 1, quota: 1 });

module.exports = mongoose.model("Cutoff", cutoffSchema);
