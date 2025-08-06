import React from "react";
import { CheckCircle, AlertTriangle } from "lucide-react";

const ResultCard = ({ result }) => {
  const isApproved = result?.decision === "Approved";
  const justification = result?.justification || [];

  return (
    <div
      className={`p-6 bg-white border rounded-xl shadow-md ${
        isApproved ? "border-green-200" : "border-red-200"
      }`}
      role="region"
      aria-live="polite"
      aria-label={`Claim decision: ${result?.decision}`}
    >
      <div className="flex items-center gap-3 mb-3">
        {isApproved ? (
          <CheckCircle
            className="text-green-500"
            size={24}
            aria-label="Approved"
            role="img"
          />
        ) : (
          <AlertTriangle
            className="text-red-500"
            size={24}
            aria-label="Denied"
            role="img"
          />
        )}
        <h2
          className={`text-lg font-bold ${
            isApproved ? "text-green-600" : "text-red-600"
          }`}
        >
          Decision: {result?.decision || "N/A"}
        </h2>
      </div>

      {result?.amount && (
        <p className="text-gray-800 mb-4 text-sm">
          💰 <span className="font-medium">Payout:</span> {result.amount}
        </p>
      )}

      <div>
        <h3 className="font-semibold mb-2 text-sm text-gray-600">
          📄 Justification Clauses:
        </h3>

        {justification.length > 0 ? (
          <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
            {justification.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic text-sm">No justification provided.</p>
        )}
      </div>
    </div>
  );
};

export default ResultCard;
