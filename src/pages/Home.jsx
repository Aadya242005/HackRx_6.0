import React, { useState } from "react";
import ClauseList from "../components/ClauseList";
import QueryInput from "../components/QueryInput";
import ResultCard from "../components/ResultCard";
import Chatbot from "../components/Chatbot";

const dummyClauses = [
  "The claim must be submitted within 30 days of treatment.",
  "Policy covers hospitalization expenses.",
  "Pre-existing conditions are excluded for the first 2 years.",
];

const Home = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    const mockResult = {
      decision: "Approved",
      amount: "₹25,000",
      justification: [
        "Policy covers hospitalization expenses.",
        "Claim submitted within allowed time window.",
      ],
    };
    setResult(mockResult);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-blue-700">
          🏥 Claimlyzer: Insurance Analyzer
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Enter details of a medical claim to check eligibility and matched
          clauses.
        </p>
      </header>

      <div className="w-full px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32 2xl:px-48">
  <QueryInput query={query} setQuery={setQuery} onSubmit={handleSubmit} />
</div>

      {result && (
        <div>
          <ResultCard result={result} />
        </div>
      )}

      <section>
        <h2 className="text-lg font-semibold text-blue-700 mb-2">
          📘 Matching Clauses
        </h2>
        <ClauseList clauses={dummyClauses} />
      </section>

      <section>
        <h2 className="text-lg font-semibold text-blue-700 mb-2">
          💬 Ask a Question
          {/* ✅ Add SVG Illustration */}
      <img
        src="/images/upload4.svg"
        alt="Resume Scanner Illustration"
        className="w-64 mx-auto mb-6"
      />
        </h2>
        <Chatbot apiUrl="https://your-backend-api.com/query" />
      </section>
    </div>
  );
};

export default Home;
