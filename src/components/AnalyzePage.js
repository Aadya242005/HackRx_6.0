import React, { useState } from "react";
import { analyzeClause } from "../api";

export default function AnalyzePage() {
  const [clause, setClause] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!clause.trim()) return;

    setLoading(true);
    try {
      const response = await analyzeClause(clause);
      setResult(response.analysis);
    } catch (error) {
      setResult("⚠️ Error analyzing clause. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-white white:bg-gray-900 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">📊 Insurance Clause Analyzer</h2>
      <textarea
        value={clause}
        onChange={(e) => setClause(e.target.value)}
        rows={5}
        placeholder="Paste your insurance clause here..."
        className="w-full p-3 border rounded mb-4 dark:bg-gray-700 dark:text-white"
      />
      <button
        onClick={handleAnalyze}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      {result && (
        <div className="mt-6 p-4 border rounded bg-gray-100 dark:bg-gray-800">
          <h3 className="font-semibold">Result:</h3>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}
