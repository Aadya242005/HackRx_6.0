import React from "react";

export default function Dashboard() {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">📊 Insurance Dashboard</h1>
      <img
        src ="/images/doc.png" 
        alt="Resume Scanner Illustration"
          className="w-[600px] h-500px] border-8 border-black rounded-md"
        
      />
      <p className="text-gray-700 mb-4">
        Welcome to your Insurance Dashboard. From here, you can:
      </p>
      <ul className="list-disc pl-6 space-y-2 text-gray-600">

        <li>💬 Chat with our bot about claims</li>
        <li>📄 Analyze insurance clauses</li>
        <li>📁 Upload policy documents (optional)</li>
        <li>📈 View claim trends or summaries</li>
      </ul>
    </div>
  );
}
