const express = require("express");
const router = express.Router();
const { CATEGORIES, STATES, BRANCHES, EXAM_TYPES, OTHER_EXAMS } = require("../utils/constants");

// GET /api/meta
// Single source of truth for form dropdown options, so the frontend
// never hardcodes a list that could drift from backend validation.
router.get("/", (req, res) => {
  res.json({
    categories: CATEGORIES,
    states: STATES,
    branches: BRANCHES,
    examTypes: EXAM_TYPES,
    otherExams: OTHER_EXAMS   // list of { id, label, scoreField, maxScore, minScore, unit }
  });
});

module.exports = router;
