import React from "react";

const EXAM_LABELS = {
  JEE_MAIN: "JEE Main",
  JEE_ADVANCED: "JEE Advanced",
  BITSAT: "BITSAT",
  OTHER: "Other Exam"
};

const QUOTA_LABELS = {
  AI: "All India",
  HS: "Home State",
  OS: "Other State"
};

export default function ResultCard({ result }) {
  const cutoffLabel = result.metric === "rank" ? "Closing rank" : "Closing score";
  const yourValueLabel = result.metric === "rank" ? "Margin vs. rank" : "Margin vs. score";

  return (
    <article className="result-card">
      <span className={`stamp ${result.classification}`}>{result.classification}</span>
      <p className="college-type">{result.type} · {result.state}</p>
      <h3>{result.college}</h3>
      <p className="branch-name">{result.branch}</p>
      <dl>
        <dt>Exam</dt>
        <dd>{EXAM_LABELS[result.examType] || result.examType}</dd>

        <dt>{cutoffLabel}</dt>
        <dd>{result.cutoffValue}</dd>

        <dt>Category / Quota</dt>
        <dd>{result.category === "ALL" ? "Open to all" : result.category} · {QUOTA_LABELS[result.quota]}</dd>

        <dt>{yourValueLabel}</dt>
        <dd>{result.margin >= 0 ? "+" : ""}{Math.round(result.margin * 100)}%</dd>
      </dl>
    </article>
  );
}
