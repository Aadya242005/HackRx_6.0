import React, { useState } from "react";

export default function UploadSection() {
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    // Optionally filter duplicates or invalid files here
    setFiles((prev) => [...prev, ...selectedFiles]);
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="mb-6">
      <label className="block font-semibold mb-2">Upload Policy Documents (PDF/DOCX)</label>
      <input
        type="file"
        multiple
        accept=".pdf,.docx"
        className="block w-full px-4 py-2 border rounded-lg shadow-sm mb-3"
        onChange={handleFileChange}
      />
      {files.length > 0 && (
        <ul className="border rounded p-3 max-h-40 overflow-y-auto">
          {files.map((file, idx) => (
            <li key={idx} className="flex justify-between items-center mb-1">
              <span className="truncate max-w-xs">{file.name}</span>
              <button
                onClick={() => removeFile(idx)}
                className="text-red-500 hover:text-red-700 font-bold ml-4"
                type="button"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
