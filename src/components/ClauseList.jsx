import React from "react";
import { FileText } from "lucide-react";

const ClauseList = ({ clauses = [] }) => {
  if (!clauses.length) {
    return <p className="text-gray-500 italic text-sm">No clauses found.</p>;
  }

  return (
    <div className="grid gap-4" aria-label="List of justification clauses">
      {clauses.map((clause, idx) => (
        <div
          key={idx}
          className="flex items-start gap-3 p-4 rounded-lg shadow bg-white border-l-4 border-blue-500 hover:bg-blue-50 transition"
        >
          <FileText className="text-blue-500 mt-1 flex-shrink-0" size={20} aria-hidden="true" />
          <p className="text-sm text-gray-800 break-words">{clause}</p>
        </div>
      ))}
    </div>
  );
};

export default ClauseList;
