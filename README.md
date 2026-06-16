# Rankwise — Engineering College Predictor

A full-stack predictor for Indian engineering admissions. Students enter
whichever scores they have (JEE Main, JEE Advanced, BITSAT, or another
nationwide exam), their Class XII percentage, category, and home state, pick
whether **college** or **branch** matters more to them, and get a sorted
shortlist of 10–12 realistic options labelled Safe / Moderate / Ambitious.

**Stack:** React (Vite) · Node.js + Express · MongoDB (Mongoose)

---

## ⚠️ About the dataset — read this first

`backend/seed/baseData.js` contains **illustrative, rounded sample cutoffs**,
not official figures. They're shaped roughly like real JoSAA/CSAB/BITSAT
patterns (reserved categories close at a higher rank number, home-state NIT
seats are easier than other-state, etc.) so the engine behaves realistically
end-to-end — but every number is a placeholder for demonstration. Before
anyone uses this for a real admission decision, replace `baseData.js` with
actual closing-rank data for the year in question. The app also displays this
disclaimer in the UI itself.

---

## Project structure

```
college-predictor/
├── backend/
│   ├── models/Cutoff.js          Mongoose schema for one college+branch cutoff
│   ├── seed/baseData.js          Hand-curated base rows (edit this with real data)
│   ├── seed/expandCutoffs.js     Expands base rows into category x quota variants
│   ├── seed/seedData.js          Connects to Mongo, writes the expanded dataset
│   ├── utils/constants.js        Shared enums + the relaxation multipliers
│   ├── utils/predictionEngine.js The matching/scoring/sorting logic (pure function)
│   ├── routes/predict.js         POST /api/predict
│   ├── routes/meta.js            GET /api/meta (dropdown options)
│   └── server.js
└── frontend/
    └── src/
        ├── components/ExamForm.jsx        The four-section input form
        ├── components/PreferenceToggle.jsx College vs. branch priority picker
        ├── components/ResultsGrid.jsx      Results layout + empty/loading states
        ├── components/ResultCard.jsx       Individual "rank card"
        ├── api.js                          fetch wrappers
        └── App.jsx
```

## How the matching logic works

1. **Filter by exam.** Only cutoff rows for exams the student actually
   reported a score for are considered (JEE Main rank → NITs/IIITs/GFTIs,
   JEE Advanced rank → IITs, BITSAT score → BITS campuses, Other → private/
   state-exam colleges).
2. **Filter by category and quota.** Reserved-category cutoffs only match a
   student in that category; at NITs, Home-State vs Other-State quota is
   resolved by comparing the student's state to the college's state.
3. **Filter by Class XII eligibility.** Each row has a minimum percentage
   floor.
4. **Score a margin.** For rank-based exams, margin = (cutoff − student
   rank) / cutoff; for score-based exams it's the mirror image. Anything
   more than 10% beyond the cutoff is dropped as unrealistic; the rest is
   labelled **Safe** (≥15% margin), **Moderate** (0–15%), or **Ambitious**
   (a worthwhile stretch).
5. **Sort and select.**
   - *College priority*: groups results by college (so 10–12 distinct
     institutes show up, not 10 branches of the same one), picks the most
     likely branch at each, ranked by selectivity tier.
   - *Branch priority*: filters to the student's chosen branch(es) first,
     then ranks every eligible college by Safe → Moderate → Ambitious.
   - Either way, the final list is capped per classification so the
     shortlist isn't all "safe" or all "reach" — it's a usable spread.

All of this lives in `utils/predictionEngine.js` as a pure function with no
database dependency, so it can be unit-tested directly (and re-used if you
ever want a serverless or batch version).

## Running it locally

### 1. MongoDB

Use a local MongoDB instance or a free MongoDB Atlas cluster. Either way you
just need a connection string.

### 2. Backend

```bash
cd backend
cp .env.example .env        # edit MONGO_URI if not using the local default
npm install
npm run seed                # loads the sample dataset into MongoDB
npm run dev                 # starts the API on http://localhost:5000
```

### 3. Frontend

```bash
cd frontend
npm install
npm run dev                 # starts the app on http://localhost:5173
```

The Vite dev server proxies `/api/*` to `http://localhost:5000`, so just
open `http://localhost:5173`.

## API reference

**GET /api/meta** — returns `{ categories, states, branches, examTypes }` for
populating dropdowns.

**POST /api/predict** — body:

```json
{
  "jeeMainRank": 8500,
  "jeeAdvancedRank": null,
  "bitsatScore": null,
  "otherExamScore": null,
  "classXII": 88.5,
  "category": "General",
  "homeState": "Maharashtra",
  "preferenceMode": "college",
  "preferredBranches": []
}
```

At least one exam score is required; everything else is required as shown.
Returns `{ count, results, note, disclaimer }`, where each result includes
the college, branch, exam, cutoff value, category/quota, margin, and
Safe/Moderate/Ambitious classification.

## Extending with real data

- Replace the numbers in `backend/seed/baseData.js` with actual closing
  ranks/scores (one row per college + branch + reference category/quota),
  then re-run `npm run seed`. The expansion logic in `expandCutoffs.js`
  will keep working as long as each row has `college, type, state,
  examType, branch, tier, metric, base, minClassXII`.
- If you have full official data broken out by category and quota already
  (rather than wanting it derived from multipliers), skip `expandCutoffs.js`
  and write directly to the `Cutoff` collection instead — the schema is the
  same either way.
- Add more exam types (state CETs, etc.) by extending `EXAM_TYPES` in
  `utils/constants.js` and mapping them to a student input field in
  `predictionEngine.js`'s `EXAM_TO_SCORE_FIELD`.
