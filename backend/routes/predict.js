const express = require("express");
const router = express.Router();
const Cutoff = require("../models/Cutoff");
const { getRecommendations } = require("../utils/predictionEngine");
const { CATEGORIES, STATES, BRANCHES, OTHER_EXAMS } = require("../utils/constants");

function isFiniteNumber(v) {
  return v !== undefined && v !== null && v !== "" && Number.isFinite(Number(v));
}

// Build a lookup map from scoreField -> exam metadata for easy validation
const OTHER_EXAM_MAP = Object.fromEntries(OTHER_EXAMS.map(e => [e.scoreField, e]));
const OTHER_EXAM_SCORE_FIELDS = OTHER_EXAMS.map(e => e.scoreField);
// Map scoreField -> examType id for building relevantExamTypes
const SCORE_FIELD_TO_EXAM_TYPE = Object.fromEntries(OTHER_EXAMS.map(e => [e.scoreField, e.id]));

function validate(body) {
  const errors = [];

  const hasJeeMain        = isFiniteNumber(body.jeeMainRank);
  const hasJeeAdvanced    = isFiniteNumber(body.jeeAdvancedRank);
  const hasJeePercentile  = isFiniteNumber(body.jeeMainPercentile);
  const hasBitsat         = isFiniteNumber(body.bitsatScore);
  const hasOtherExam      = OTHER_EXAM_SCORE_FIELDS.some(f => isFiniteNumber(body[f]));

  if (!hasJeeMain && !hasJeeAdvanced && !hasJeePercentile && !hasBitsat && !hasOtherExam) {
    errors.push("Provide at least one exam score: JEE Main rank, JEE Main percentile, JEE Advanced rank, BITSAT score, or select another exam.");
  }

  if (!isFiniteNumber(body.classXII) || body.classXII < 0 || body.classXII > 100) {
    errors.push("Class XII percentage must be a number between 0 and 100.");
  }

  if (!CATEGORIES.includes(body.category)) {
    errors.push(`Category must be one of: ${CATEGORIES.join(", ")}.`);
  }

  if (!STATES.includes(body.homeState)) {
    errors.push("Please select a valid home state.");
  }

  if (!["college", "branch"].includes(body.preferenceMode)) {
    errors.push('preferenceMode must be either "college" or "branch".');
  }

  if (body.preferenceMode === "branch") {
    if (!Array.isArray(body.preferredBranches) || body.preferredBranches.length === 0) {
      errors.push("Select at least one preferred branch when branch preference is chosen.");
    } else if (!body.preferredBranches.every(b => BRANCHES.includes(b))) {
      errors.push("One or more preferred branches are not recognised.");
    }
  }

  // Rank-based validations
  for (const [field, label] of [
    ["jeeMainRank", "JEE Main rank"],
    ["jeeAdvancedRank", "JEE Advanced rank"]
  ]) {
    if (isFiniteNumber(body[field]) && Number(body[field]) <= 0) {
      errors.push(`${label} must be a positive number.`);
    }
  }

  if (isFiniteNumber(body.bitsatScore) && (body.bitsatScore < 0 || body.bitsatScore > 390)) {
    errors.push("BITSAT score must be between 0 and 390.");
  }

  if (isFiniteNumber(body.jeeMainPercentile) && (Number(body.jeeMainPercentile) < 0 || Number(body.jeeMainPercentile) > 100)) {
    errors.push("JEE Main percentile must be between 0 and 100.");
  }

  // Validate each named exam score against its configured range
  for (const scoreField of OTHER_EXAM_SCORE_FIELDS) {
    if (isFiniteNumber(body[scoreField])) {
      const exam = OTHER_EXAM_MAP[scoreField];
      const val = Number(body[scoreField]);
      if (val < exam.minScore || val > exam.maxScore) {
        errors.push(`${exam.label} score must be between ${exam.minScore} and ${exam.maxScore}.`);
      }
    }
  }

  return errors;
}

// POST /api/predict
router.post("/", async (req, res) => {
  try {
    const errors = validate(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    // Build the student object with all possible score fields
    const student = {
      jeeMainRank:        isFiniteNumber(req.body.jeeMainRank)        ? Number(req.body.jeeMainRank)        : undefined,
      jeeAdvancedRank:    isFiniteNumber(req.body.jeeAdvancedRank)    ? Number(req.body.jeeAdvancedRank)    : undefined,
      jeeMainPercentile:  isFiniteNumber(req.body.jeeMainPercentile)  ? Number(req.body.jeeMainPercentile)  : undefined,
      bitsatScore:        isFiniteNumber(req.body.bitsatScore)        ? Number(req.body.bitsatScore)        : undefined,
      classXII:           Number(req.body.classXII),
      category:           req.body.category,
      homeState:          req.body.homeState,
      preferenceMode:     req.body.preferenceMode,
      preferredBranches:  req.body.preferredBranches || []
    };

    // Attach all named other exam scores that were provided
    for (const scoreField of OTHER_EXAM_SCORE_FIELDS) {
      if (isFiniteNumber(req.body[scoreField])) {
        student[scoreField] = Number(req.body[scoreField]);
      }
    }

    // Build the list of relevant exam types to query
    const relevantExamTypes = [];
    if (student.jeeMainRank !== undefined)       relevantExamTypes.push("JEE_MAIN");
    if (student.jeeAdvancedRank !== undefined)   relevantExamTypes.push("JEE_ADVANCED");
    if (student.jeeMainPercentile !== undefined) relevantExamTypes.push("JEE_MAIN_PERCENTILE");
    if (student.bitsatScore !== undefined)       relevantExamTypes.push("BITSAT");
    for (const scoreField of OTHER_EXAM_SCORE_FIELDS) {
      if (student[scoreField] !== undefined) {
        relevantExamTypes.push(SCORE_FIELD_TO_EXAM_TYPE[scoreField]);
      }
    }

    // Only fetch cutoff rows for exam types the student actually reported.
    // For category-agnostic exams the category filter is irrelevant, but
    // using $in with "ALL" handles that correctly.
    const cutoffDocs = await Cutoff.find({
      examType: { $in: relevantExamTypes },
      category: { $in: [student.category, "ALL"] }
    }).lean();

    const { results, note } = getRecommendations(student, cutoffDocs);

    res.json({
      count: results.length,
      results,
      note,
      disclaimer:
        "Cutoffs in this demo are illustrative sample data, not official JoSAA/CSAB/BITSAT figures. Verify with official sources before making admission decisions."
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: ["Something went wrong while generating predictions."] });
  }
});

module.exports = router;
