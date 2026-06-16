const BASE_ROWS = require("./baseData");
const { CATEGORY_MULTIPLIER, HOME_STATE_MULTIPLIER } = require("../utils/constants");

// Exams that don't carry caste-based reservation in this dataset.
// Private-university exams admit on score/rank alone — no caste quotas.
const CATEGORY_AGNOSTIC_EXAMS = new Set([
  "BITSAT",
  "JEE_MAIN_PERCENTILE",  // private colleges using NTA percentile (e.g. LNMIIT)
  "VITEEE",
  "SRMJEEE",
  "COMEDK",
  "MET",
  "KCET",
  "UPSEE",
  "REAP"
]);

// Only NITs in this dataset apply a Home-State / Other-State split.
// Private colleges using JEE_MAIN (e.g. LNMIIT, Thapar) do their own
// admissions with AI quota only — they are not in the HS/OS set.
const HOME_STATE_QUOTA_TYPES = new Set(["NIT"]);

/**
 * Expands the hand-curated base rows into the full set of
 * category x quota cutoff documents the prediction engine queries against.
 *
 * Kept as a pure function (no DB access) so it can be reused both by the
 * Mongo seed script and by quick local tests of the prediction engine.
 */
function expandCutoffs(baseRows = BASE_ROWS) {
  const docs = [];

  for (const row of baseRows) {
    const categoryAgnostic = CATEGORY_AGNOSTIC_EXAMS.has(row.examType);
    const categories = categoryAgnostic ? ["ALL"] : Object.keys(CATEGORY_MULTIPLIER).filter(c => c !== "ALL");
    const usesHomeState = HOME_STATE_QUOTA_TYPES.has(row.type);
    const quotas = usesHomeState ? ["HS", "OS"] : ["AI"];

    for (const category of categories) {
      const categoryMult = CATEGORY_MULTIPLIER[category] ?? 1;
      for (const quota of quotas) {
        const quotaMult = quota === "HS" ? HOME_STATE_MULTIPLIER : 1;
        const cutoffValue = Math.round(row.base * categoryMult * quotaMult);

        docs.push({
          college: row.college,
          type: row.type,
          state: row.state,
          examType: row.examType,
          branch: row.branch,
          tier: row.tier,
          metric: row.metric,
          category,
          quota,
          cutoffValue,
          minClassXII: row.minClassXII
        });
      }
    }
  }

  return docs;
}

module.exports = expandCutoffs;
