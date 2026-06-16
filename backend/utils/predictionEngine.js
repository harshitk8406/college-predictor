const { REACH_MARGIN, SAFE_MARGIN } = require("./constants");

const EXAM_TO_SCORE_FIELD = {
  JEE_ADVANCED:        "jeeAdvancedRank",
  JEE_MAIN:            "jeeMainRank",
  JEE_MAIN_PERCENTILE: "jeeMainPercentile",
  BITSAT:              "bitsatScore",
  VITEEE:              "viteeeScore",
  SRMJEEE:             "srmjeeeScore",
  COMEDK:              "comedkScore",
  MET:                 "metScore",
  KCET:                "kcetScore",
  UPSEE:               "upseeScore",
  REAP:                "reapScore"
};

// Default branch ordering used as a tie-breaker when nothing else
// distinguishes two results (mirrors typical branch popularity).
const BRANCH_PRIORITY = [
  "Computer Science & Engineering",
  "Electronics & Communication Engineering",
  "Civil Engineering",
  "Mechanical Engineering"
];

const CLASSIFICATION_RANK = { Safe: 0, Moderate: 1, Ambitious: 2 };

function classify(margin) {
  if (margin >= SAFE_MARGIN) return "Safe";
  if (margin >= 0) return "Moderate";
  return "Ambitious";
}

/**
 * @param {object} student
 *   jeeMainRank, jeeAdvancedRank, bitsatScore, otherExamScore: number | undefined
 *   classXII: number (required)
 *   category: one of CATEGORIES (required)
 *   homeState: string (required)
 *   preferenceMode: "college" | "branch"
 *   preferredBranches: string[] (only used when preferenceMode === "branch")
 * @param {object[]} cutoffDocs  expanded cutoff records (from DB or expandCutoffs())
 * @param {object} [opts]
 *   limit: max results to return (default 12)
 *   minResults: floor to aim for before giving up and relaxing (default 10)
 */
function getRecommendations(student, cutoffDocs, opts = {}) {
  const limit = opts.limit ?? 12;
  const minResults = opts.minResults ?? 10;

  const candidates = [];

  for (const doc of cutoffDocs) {
    const scoreField = EXAM_TO_SCORE_FIELD[doc.examType];
    const studentValue = student[scoreField];
    if (studentValue === undefined || studentValue === null || studentValue === "") continue;

    // Category match (BITSAT / Other are category-agnostic -> category "ALL")
    if (doc.category !== "ALL" && doc.category !== student.category) continue;

    // Home-State vs Other-State quota match for NITs
    if (doc.quota === "HS" || doc.quota === "OS") {
      const isHome = doc.state === student.homeState;
      const effectiveQuota = isHome ? "HS" : "OS";
      if (doc.quota !== effectiveQuota) continue;
    }

    // Class XII eligibility floor
    if (Number(student.classXII) < doc.minClassXII) continue;

    // Eligibility + margin, depending on whether lower-is-better (rank)
    // or higher-is-better (score)
    let margin;
    if (doc.metric === "rank") {
      margin = (doc.cutoffValue - Number(studentValue)) / doc.cutoffValue;
    } else {
      margin = (Number(studentValue) - doc.cutoffValue) / doc.cutoffValue;
    }
    if (margin < -REACH_MARGIN) continue; // out of realistic reach, drop it

    candidates.push({
      college: doc.college,
      type: doc.type,
      state: doc.state,
      examType: doc.examType,
      branch: doc.branch,
      category: doc.category,
      quota: doc.quota,
      metric: doc.metric,
      cutoffValue: doc.cutoffValue,
      tier: doc.tier,
      margin,
      classification: classify(margin)
    });
  }

  if (candidates.length === 0) {
    return { results: [], note: "No matching colleges found for the scores and filters provided. Try double-checking ranks/scores, or widen your category/state inputs." };
  }

  let pool = candidates;

  if (student.preferenceMode === "branch" && Array.isArray(student.preferredBranches) && student.preferredBranches.length > 0) {
    const preferredSet = new Set(student.preferredBranches);
    const preferred = candidates.filter(c => preferredSet.has(c.branch));
    const rest = candidates.filter(c => !preferredSet.has(c.branch));
    // Keep preferred branches first; only dip into "rest" if we're short of minResults
    pool = preferred.length >= minResults ? preferred : [...preferred, ...rest];
  }

  const sortFn = (a, b) => {
    if (student.preferenceMode === "college") {
      if (a.tier !== b.tier) return a.tier - b.tier;
      if (CLASSIFICATION_RANK[a.classification] !== CLASSIFICATION_RANK[b.classification]) {
        return CLASSIFICATION_RANK[a.classification] - CLASSIFICATION_RANK[b.classification];
      }
      return b.margin - a.margin;
    }
    // branch mode: best-fit safety first, then tier, then margin
    if (CLASSIFICATION_RANK[a.classification] !== CLASSIFICATION_RANK[b.classification]) {
      return CLASSIFICATION_RANK[a.classification] - CLASSIFICATION_RANK[b.classification];
    }
    if (a.tier !== b.tier) return a.tier - b.tier;
    return b.margin - a.margin;
  };

  pool = [...pool].sort(sortFn);

  let selected;
  if (student.preferenceMode === "college") {
    // One best branch per college first, to maximise the number of distinct
    // colleges shown, then fill remaining slots with second-best branches.
    const seenColleges = new Set();
    const firstPass = [];
    const leftovers = [];
    for (const c of pool) {
      if (!seenColleges.has(c.college)) {
        seenColleges.add(c.college);
        firstPass.push(c);
      } else {
        leftovers.push(c);
      }
    }
    selected = balanceSpread([...firstPass, ...leftovers], limit);
  } else {
    selected = balanceSpread(pool, limit);
  }

  const note = selected.length < minResults
    ? `Only ${selected.length} eligible matches were found in the sample dataset for these inputs.`
    : null;

  return { results: selected, note };
}

// Tries to avoid an all-Safe or all-Ambitious list by capping how many of
// each classification can appear, while still respecting the existing
// sort order (best-fit first within each bucket).
function balanceSpread(sortedPool, limit) {
  const caps = { Safe: Math.ceil(limit * 0.4), Moderate: Math.ceil(limit * 0.5), Ambitious: Math.ceil(limit * 0.3) };
  const counts = { Safe: 0, Moderate: 0, Ambitious: 0 };
  const picked = [];
  const skipped = [];

  for (const c of sortedPool) {
    if (picked.length >= limit) break;
    if (counts[c.classification] < caps[c.classification]) {
      picked.push(c);
      counts[c.classification]++;
    } else {
      skipped.push(c);
    }
  }
  // Fill any remaining slots from skipped items, in their original order
  for (const c of skipped) {
    if (picked.length >= limit) break;
    picked.push(c);
  }
  return picked;
}

module.exports = { getRecommendations, classify, BRANCH_PRIORITY };
