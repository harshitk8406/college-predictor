import React, { useEffect, useState } from "react";
import ExamForm from "./components/ExamForm.jsx";
import ResultsGrid from "./components/ResultsGrid.jsx";
import { fetchMeta, fetchPrediction } from "./api.js";

export default function App() {
  const [meta, setMeta] = useState(null);
  const [metaError, setMetaError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [lastPreferenceMode, setLastPreferenceMode] = useState("college");

  useEffect(() => {
    fetchMeta()
      .then(setMeta)
      .catch(() => setMetaError("Could not reach the API. Is the backend running on port 5000?"));
  }, []);

  async function handleSubmit(form) {
    setFormErrors([]);
    setLoading(true);
    try {
      // ExamForm already injects the correct scoreField key (e.g. viteeeScore)
      // into the form before calling onSubmit, so we just need to clean up the
      // internal UI fields and coerce the fixed numeric fields.
      const {
        selectedOtherExam: _sel,   // internal UI state — do not send
        otherExamScore: _raw,      // internal UI state — do not send
        ...rest
      } = form;

      const payload = {
        ...rest,
        jeeMainRank:       form.jeeMainRank === ""       ? undefined : Number(form.jeeMainRank),
        jeeAdvancedRank:   form.jeeAdvancedRank === ""   ? undefined : Number(form.jeeAdvancedRank),
        jeeMainPercentile: form.jeeMainPercentile === "" ? undefined : Number(form.jeeMainPercentile),
        bitsatScore:       form.bitsatScore === ""       ? undefined : Number(form.bitsatScore),
        classXII:          Number(form.classXII)
      };

      const data = await fetchPrediction(payload);
      setPrediction(data);
      setLastPreferenceMode(form.preferenceMode);
      requestAnimationFrame(() => {
        document.getElementById("results")?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    } catch (err) {
      setFormErrors(err.fieldErrors || [err.message]);
      setPrediction(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app-shell">
      <header className="masthead">
        <p className="eyebrow">Rankwise · Engineering College Predictor</p>
        <h1>Find where your rank actually gets you in.</h1>
        <p>
          Enter your JEE Main, JEE Advanced, BITSAT, or other exam results along with your Class XII
          percentage, category, and home state. We'll match you against a cutoff dataset and shortlist
          10–12 realistic options, sorted the way you prefer.
        </p>
      </header>

      {metaError && <div className="error-banner">{metaError}</div>}

      {meta && (
        <ExamForm meta={meta} onSubmit={handleSubmit} loading={loading} formErrors={formErrors} />
      )}

      <ResultsGrid
        results={prediction?.results}
        note={prediction?.note}
        disclaimer={prediction?.disclaimer}
        preferenceMode={lastPreferenceMode}
      />

      <footer className="app-footer">
        Sample dataset for demonstration purposes — closing ranks/scores are illustrative, not official
        JoSAA, CSAB, or BITSAT figures.
      </footer>
    </div>
  );
}
