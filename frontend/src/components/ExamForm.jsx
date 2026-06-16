import React, { useState } from "react";
import PreferenceToggle from "./PreferenceToggle.jsx";

function buildInitialState() {
  return {
    jeeMainRank: "",
    jeeMainPercentile: "",
    jeeAdvancedRank: "",
    bitsatScore: "",
    // Other exam: track selected exam id + its score separately
    selectedOtherExam: "",   // e.g. "VITEEE"
    otherExamScore: "",      // the score value for the selected exam
    classXII: "",
    category: "",
    homeState: "",
    preferenceMode: "college",
    preferredBranches: []
  };
}

export default function ExamForm({ meta, onSubmit, loading, formErrors }) {
  const [form, setForm] = useState(buildInitialState());

  function update(field, value) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  function handleOtherExamChange(examId) {
    setForm(prev => ({ ...prev, selectedOtherExam: examId, otherExamScore: "" }));
  }

  function toggleBranch(branch) {
    setForm(prev => ({
      ...prev,
      preferredBranches: prev.preferredBranches.includes(branch)
        ? prev.preferredBranches.filter(b => b !== branch)
        : [...prev.preferredBranches, branch]
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Build the payload: if an other exam is selected, include its score
    // under the correct scoreField key (e.g. viteeeScore, reapScore, etc.)
    const otherExamMeta = meta.otherExams?.find(ex => ex.id === form.selectedOtherExam);
    const otherExamPayload = otherExamMeta && form.otherExamScore !== ""
      ? { [otherExamMeta.scoreField]: form.otherExamScore }
      : {};

    onSubmit({ ...form, ...otherExamPayload });
  }

  const selectedExamMeta = meta.otherExams?.find(ex => ex.id === form.selectedOtherExam);

  return (
    <form onSubmit={handleSubmit}>
      <section className="form-section">
        <div className="section-eyebrow">
          <span className="section-number">01</span>
          <h2 className="section-title">Exam scores</h2>
        </div>
        <p className="section-hint">Fill in whichever you have — at least one is required. Leave the rest blank.</p>
        <div className="field-grid">
          <div className="field">
            <label htmlFor="jeeMainRank">JEE Main rank (CRL)<span className="optional-tag">optional</span></label>
            <input id="jeeMainRank" type="number" min="1" placeholder="e.g. 8500"
              value={form.jeeMainRank} onChange={e => update("jeeMainRank", e.target.value)} />
          </div>
          <div className="field">
            <label htmlFor="jeeMainPercentile">
              JEE Main percentile
              <span className="optional-tag">optional</span>
              <span className="field-sub-hint">for colleges like LNMIIT</span>
            </label>
            <input id="jeeMainPercentile" type="number" min="0" max="100" step="0.01"
              placeholder="e.g. 97.32"
              value={form.jeeMainPercentile} onChange={e => update("jeeMainPercentile", e.target.value)} />
          </div>
          <div className="field">
            <label htmlFor="jeeAdvancedRank">JEE Advanced rank<span className="optional-tag">optional</span></label>
            <input id="jeeAdvancedRank" type="number" min="1" placeholder="e.g. 2400"
              value={form.jeeAdvancedRank} onChange={e => update("jeeAdvancedRank", e.target.value)} />
          </div>
          <div className="field">
            <label htmlFor="bitsatScore">BITSAT score (out of 390)<span className="optional-tag">optional</span></label>
            <input id="bitsatScore" type="number" min="0" max="390" placeholder="e.g. 310"
              value={form.bitsatScore} onChange={e => update("bitsatScore", e.target.value)} />
          </div>
        </div>

        {/* ── Other exam section ────────────────────────────────── */}
        <div className="other-exam-group">
          <div className="other-exam-header">
            <span className="other-exam-label">Other exam<span className="optional-tag">optional</span></span>
            <span className="other-exam-hint">Select an exam and enter your score</span>
          </div>
          <div className="other-exam-row">
            <div className="field other-exam-select">
              <label htmlFor="selectedOtherExam" className="sr-only">Select exam</label>
              <select
                id="selectedOtherExam"
                value={form.selectedOtherExam}
                onChange={e => handleOtherExamChange(e.target.value)}
              >
                <option value="">— select an exam —</option>
                {meta.otherExams?.map(ex => (
                  <option key={ex.id} value={ex.id}>{ex.label}</option>
                ))}
              </select>
            </div>

            {selectedExamMeta && (
              <div className="field other-exam-score">
                <label htmlFor="otherExamScore" className="sr-only">
                  {selectedExamMeta.label} score
                </label>
                <input
                  id="otherExamScore"
                  type="number"
                  min={selectedExamMeta.minScore}
                  max={selectedExamMeta.maxScore}
                  placeholder={`Score — ${selectedExamMeta.unit}`}
                  value={form.otherExamScore}
                  onChange={e => update("otherExamScore", e.target.value)}
                />
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="form-section">
        <div className="section-eyebrow">
          <span className="section-number">02</span>
          <h2 className="section-title">Academics</h2>
        </div>
        <div className="field-grid">
          <div className="field">
            <label htmlFor="classXII">Class XII percentage</label>
            <input id="classXII" type="number" min="0" max="100" step="0.01" placeholder="e.g. 88.4"
              value={form.classXII} onChange={e => update("classXII", e.target.value)} required />
          </div>
        </div>
      </section>

      <section className="form-section">
        <div className="section-eyebrow">
          <span className="section-number">03</span>
          <h2 className="section-title">Category &amp; state</h2>
        </div>
        <p className="section-hint">Used to apply the right category cutoff and home-state quota at NITs.</p>
        <div className="field-grid">
          <div className="field">
            <label htmlFor="category">Category</label>
            <select id="category" value={form.category} onChange={e => update("category", e.target.value)} required>
              <option value="" disabled>Select category</option>
              {meta.categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="field">
            <label htmlFor="homeState">Home state</label>
            <select id="homeState" value={form.homeState} onChange={e => update("homeState", e.target.value)} required>
              <option value="" disabled>Select state</option>
              {meta.states.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
      </section>

      <section className="form-section">
        <div className="section-eyebrow">
          <span className="section-number">04</span>
          <h2 className="section-title">What matters more?</h2>
        </div>
        <p className="section-hint">This decides how your shortlist gets sorted.</p>
        <PreferenceToggle
          mode={form.preferenceMode}
          onModeChange={m => update("preferenceMode", m)}
          branches={meta.branches}
          selectedBranches={form.preferredBranches}
          onBranchToggle={toggleBranch}
        />
      </section>

      {formErrors && formErrors.length > 0 && (
        <div className="error-banner">
          <strong>Please fix the following:</strong>
          <ul>{formErrors.map((e, i) => <li key={i}>{e}</li>)}</ul>
        </div>
      )}

      <div className="submit-row">
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? "Predicting…" : "Predict my colleges"}
        </button>
        {loading && (
          <span className="loading-row"><span className="spinner" /> Matching against the cutoff dataset…</span>
        )}
      </div>
    </form>
  );
}
