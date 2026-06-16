// Shared vocabulary used by the dataset, the prediction engine, and the API.
// Keeping these in one place means the frontend dropdowns and backend
// validation never drift out of sync — both read from GET /api/meta.

const CATEGORIES = ["General", "EWS", "OBC-NCL", "SC", "ST"];

// Core exam types used as the examType field in cutoff documents.
// JEE_MAIN uses CRL rank (lower = better).
// JEE_MAIN_PERCENTILE uses NTA percentile (0-100, higher = better) —
//   used by private colleges like LNMIIT that do their own counselling.
// BITSAT, VITEEE, etc. are score-based (higher = better).
const EXAM_TYPES = [
  "JEE_ADVANCED",
  "JEE_MAIN",
  "JEE_MAIN_PERCENTILE",
  "BITSAT",
  "VITEEE",
  "SRMJEEE",
  "COMEDK",
  "MET",
  "KCET",
  "UPSEE",
  "REAP"
];

// Metadata for each "other" exam shown in the frontend dropdown.
// scoreField: the key sent in the POST body (and stored in predictionEngine mapping)
// maxScore / minScore: used for frontend input validation label & backend range check
const OTHER_EXAMS = [
  { id: "VITEEE",  label: "VITEEE",             scoreField: "viteeeScore",  maxScore: 125, minScore: 0,  unit: "marks (out of 125)" },
  { id: "SRMJEEE", label: "SRMJEEE",             scoreField: "srmjeeeScore", maxScore: 100, minScore: 0,  unit: "percentile / score (0–100)" },
  { id: "COMEDK",  label: "COMEDK UGET",         scoreField: "comedkScore",  maxScore: 180, minScore: 0,  unit: "marks (out of 180)" },
  { id: "MET",     label: "MET (Manipal)",        scoreField: "metScore",     maxScore: 100, minScore: 0,  unit: "percentile / score (0–100)" },
  { id: "KCET",    label: "KCET",                 scoreField: "kcetScore",    maxScore: 180, minScore: 0,  unit: "marks (out of 180)" },
  { id: "UPSEE",   label: "UPSEE / AKTU CET",    scoreField: "upseeScore",   maxScore: 600, minScore: 0,  unit: "marks (out of 600)" },
  { id: "REAP",    label: "REAP (Rajasthan)",     scoreField: "reapScore",    maxScore: 120, minScore: 0,  unit: "marks (out of 120)" }
];

const QUOTAS = ["AI", "HS", "OS"]; // All-India / Home-State / Other-State

const COLLEGE_TYPES = ["IIT", "NIT", "IIIT", "GFTI", "BITS", "Private", "State"];

// States used as "home state" options. Only states that host one of the
// NITs in the sample dataset actually affect Home-State quota matching —
// the rest are included so the dropdown feels complete.
const STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh",
  "Jammu & Kashmir", "Jharkhand", "Karnataka", "Kerala",
  "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim",
  "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand",
  "West Bengal", "Other"
];

// Branch filter options exposed to the frontend's "branch preference" picker.
const BRANCHES = [
  "Computer Science & Engineering",
  "Electronics & Communication Engineering",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Information Technology",
  "Chemical Engineering",
  "Biotechnology",
  "Data Science & Artificial Intelligence"
];

// Illustrative relaxation multipliers applied to the General/Open closing
// rank to derive other categories' closing ranks. These are loosely shaped
// like real reservation patterns (reserved categories generally close at a
// numerically higher/looser rank) but are NOT official figures.
const CATEGORY_MULTIPLIER = {
  General: 1.0,
  EWS: 1.05,
  "OBC-NCL": 1.25,
  SC: 2.2,
  ST: 2.8,
  ALL: 1.0
};

// Illustrative Home-State relaxation for NITs (50% of NIT seats are
// reserved for home-state candidates, who compete in a smaller pool).
const HOME_STATE_MULTIPLIER = 1.4;

// How far beyond a closing rank/score a student is still shown as a
// stretch ("Ambitious") option, vs. excluded entirely.
const REACH_MARGIN = 0.10;

// Margin thresholds (as a fraction of the cutoff) used to label a result.
const SAFE_MARGIN = 0.15;

module.exports = {
  CATEGORIES,
  EXAM_TYPES,
  OTHER_EXAMS,
  QUOTAS,
  COLLEGE_TYPES,
  STATES,
  BRANCHES,
  CATEGORY_MULTIPLIER,
  HOME_STATE_MULTIPLIER,
  REACH_MARGIN,
  SAFE_MARGIN
};
