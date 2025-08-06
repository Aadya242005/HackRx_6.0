import React, { useState } from "react";

const AnalyzePage = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("http://localhost:5000/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();
      setResult(data.response);
    } catch (err) {
      console.error("Error:", err);
      alert("Backend error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>🧠 Analyze Policy Query</h2>
      <textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        rows={4}
        placeholder="e.g. 46M, knee surgery, Pune, 3-month-old policy"
        style={{ width: "100%", padding: "10px", fontSize: "16px" }}
      />
      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{ marginTop: "10px", padding: "10px 20px" }}
      >
        {loading ? "Analyzing..." : "Submit Query"}
      </button>

      {result && (
  <div style={{ marginTop: "30px" }}>
    <h3>📄 Matched Clauses:</h3>
    {result.results.map((item, index) => (
      <div key={index} style={{ marginBottom: "15px", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}>
        <p><strong>📄 Clause:</strong> {item.clause}</p>
        <p><strong>📁 Source:</strong> {item.source}</p>
      </div>
    ))}
  </div>
)}
      {result && result.error && (
        <div style={{ color: "red", marginTop: "20px" }}>
          <strong>Error:</strong> {result.error}
        </div>
      )}
    </div>
  );
};

export default AnalyzePage;

