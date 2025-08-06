import React, { useState, useEffect } from "react";
import { Search, Loader2, Moon, Sun } from "lucide-react";

const QueryInput = ({ query, setQuery, onSubmit }) => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("queryHistory") || "[]");
    setHistory(savedHistory);

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      if (newMode) document.documentElement.classList.add("dark");
      else document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", newMode ? "dark" : "light");
      return newMode;
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setUploadedFile(file);

    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleSearch = async () => {
    if (!query.trim()) {
      setError("Please enter a query.");
      setResults(null);
      return;
    }
    setError("");
    setLoading(true);
    setResults(null);

    try {
      await new Promise((r) => setTimeout(r, 1500)); // Simulated delay

      const fakeResults = [
        "Result 1: Insurance claim related info...",
        "Result 2: Relevant policy details...",
      ];
      setResults(fakeResults);

      if (!history.includes(query)) {
        const newHistory = [query, ...history].slice(0, 10);
        setHistory(newHistory);
        localStorage.setItem("queryHistory", JSON.stringify(newHistory));
      }
    } catch {
      setResults(["Error: Failed to fetch results."]);
    } finally {
      setLoading(false);
    }
  };

  const handleHistoryClick = (item) => {
    setQuery(item);
    setError("");
    setResults(null);
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 p-8 rounded-xl shadow mb-6 max-w-6xl mx-auto text-gray-900 dark:text-gray-100">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-semibold text-blue-700 dark:text-blue-400">
          🔍 Enter Insurance Query
        </h2>
        <button
          onClick={toggleDarkMode}
          aria-label="Toggle Dark Mode"
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      {/* File Upload */}
      <label
        htmlFor="file-upload"
        className="block cursor-pointer bg-blue-600 hover:bg-blue-700 text-white text-center py-2 rounded mb-4"
      >
        Upload Insurance Document
      </label>
      <input
        id="file-upload"
        type="file"
        accept="image/*,.pdf,.svg"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Preview */}
      {previewUrl && (
        <div className="mb-4 border rounded p-2 max-h-64 overflow-auto bg-white dark:bg-gray-700">
          {uploadedFile.type.startsWith("image") ? (
            <img
              src={previewUrl}
              alt="Uploaded Preview"
              className="max-w-full max-h-60 object-contain mx-auto"
            />
          ) : (
            <p className="text-center text-gray-600 dark:text-gray-300">
              Preview not available for this file type.
            </p>
          )}
        </div>
      )}

      {/* Query Input */}
      <div className="flex gap-4 items-start mb-2">
        <textarea
          className="flex-grow p-6 rounded-2xl border border-gray-300 shadow-md focus:outline-none focus:ring-4 focus:ring-blue-500 hover:ring-2 hover:ring-blue-300 resize-none text-lg transition dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
          rows={6}
          placeholder="e.g., 45-year-old woman, Mumbai, knee replacement, policy active for 6 months..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Insurance query input"
          disabled={loading}
        />
        <button
          onClick={handleSearch}
          className="flex-shrink-0 flex items-center gap-3 px-6 py-4 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition disabled:opacity-50 text-lg"
          disabled={!query.trim() || loading}
        >
          {loading ? <Loader2 className="animate-spin" size={24} /> : <Search size={24} />}
          {loading ? "Loading..." : "Search"}
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <p className="mb-2 text-red-600 dark:text-red-400 font-medium" role="alert">
          {error}
        </p>
      )}

      {/* History */}
      {history.length > 0 && (
        <div className="mb-4">
          <h3 className="font-semibold mb-1">Query History:</h3>
          <ul className="flex flex-wrap gap-2">
            {history.map((item, i) => (
              <li key={i}>
                <button
                  onClick={() => handleHistoryClick(item)}
                  className="bg-gray-200 dark:bg-gray-600 px-3 py-1 rounded hover:bg-gray-300 dark:hover:bg-gray-500 text-sm"
                  aria-label={`Repeat query: ${item}`}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Results */}
      {results && (
        <div className="mt-4 bg-white dark:bg-gray-800 p-4 rounded shadow max-h-80 overflow-auto text-gray-900 dark:text-gray-100">
          <h3 className="text-lg font-semibold mb-2 text-blue-700 dark:text-blue-400">Results:</h3>
          <ul className="list-disc list-inside space-y-1">
            {results.map((res, idx) => (
              <li key={idx}>{res}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default QueryInput;
