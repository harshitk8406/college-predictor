import React from "react";
import ResultCard from "./ResultCard.jsx";

export default function ResultsGrid({ results, note, disclaimer, preferenceMode }) {
  if (!results || results.length === 0) {
    return (
      <section className="results-section">
        <div className="empty-state">
          {note || "No matches yet — fill in the form above and predict your colleges."}
        </div>
      </section>
    );
  }

  return (
    <section className="results-section" id="results">
      <div className="results-heading">
        <h2>Your shortlist</h2>
        <span className="results-meta">
          {results.length} matches · sorted by {preferenceMode === "college" ? "college first" : "branch fit first"}
        </span>
      </div>

      {note && <div className="disclaimer-banner" style={{ marginBottom: 18 }}>{note}</div>}

      <div className="results-grid">
        {results.map((r, i) => (
          <ResultCard key={`${r.college}-${r.branch}-${r.quota}-${i}`} result={r} />
        ))}
      </div>

      {disclaimer && <div className="disclaimer-banner" style={{ marginTop: 24 }}>{disclaimer}</div>}
    </section>
  );
}
