import React from "react";

export default function PreferenceToggle({ mode, onModeChange, branches, selectedBranches, onBranchToggle }) {
  return (
    <>
      <div className="toggle-row" role="radiogroup" aria-label="What matters more, college or branch">
        <div
          className={`toggle-card ${mode === "college" ? "active" : ""}`}
          role="radio"
          aria-checked={mode === "college"}
          tabIndex={0}
          onClick={() => onModeChange("college")}
          onKeyDown={e => (e.key === "Enter" || e.key === " ") && onModeChange("college")}
        >
          <h3><span className="radio-dot" />College on priority</h3>
          <p>Show the best-ranked institutes you can realistically get into, in whichever branch fits best at each one.</p>
        </div>

        <div
          className={`toggle-card ${mode === "branch" ? "active" : ""}`}
          role="radio"
          aria-checked={mode === "branch"}
          tabIndex={0}
          onClick={() => onModeChange("branch")}
          onKeyDown={e => (e.key === "Enter" || e.key === " ") && onModeChange("branch")}
        >
          <h3><span className="radio-dot" />Branch on priority</h3>
          <p>Show the best matches for specific branches you want, across all eligible colleges.</p>
        </div>
      </div>

      {mode === "branch" && (
        <div className="branch-picker">
          {branches.map(b => (
            <button
              type="button"
              key={b}
              className={`branch-chip ${selectedBranches.includes(b) ? "active" : ""}`}
              onClick={() => onBranchToggle(b)}
            >
              {b}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
