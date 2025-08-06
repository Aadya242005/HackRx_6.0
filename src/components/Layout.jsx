import React from "react";
import { Link, useLocation } from "react-router-dom";

function Header() {
  return (
    <header className="bg-blue-400 text-white py-4 shadow w-full">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-3xl font-bold">🏥 Insurance Clause Analyzer</h1>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-6 mt-auto w-full">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">
          © {new Date().getFullYear()} Bajaj Finserv Hackathon. All rights reserved.
        </p>
        <div className="flex space-x-4 mt-3 md:mt-0">
          <a
            href="https://bajajfinserv.in"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Bajaj Finserv
          </a>
          <a
            href="https://github.com/your-repo"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            GitHub
          </a>
          <a href="mailto:contact@yourdomain.com" className="hover:underline">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function Layout({ children }) {
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white p-6 flex flex-col space-y-4">
        <h2 className="text-xl font-semibold mb-4">🔍 Navigation</h2>
        <Link
          to="/"
          className={`hover:bg-blue-700 px-4 py-2 rounded ${
            location.pathname === "/" ? "bg-blue-700" : ""
          }`}
        >
          Home
        </Link>
        <Link
          to="/analyze"
          className={`hover:bg-blue-700 px-4 py-2 rounded ${
            location.pathname === "/analyze" ? "bg-blue-700" : ""
          }`}
        >
          Analyze
        </Link>
        <Link
          to="/dashboard"
          className={`hover:bg-blue-700 px-4 py-2 rounded ${
            location.pathname === "/dashboard" ? "bg-blue-700" : ""
          }`}
        >
          Dashboard
        </Link>
        <Link
          to="/chatbot"
          className={`hover:bg-blue-700 px-4 py-2 rounded ${
            location.pathname === "/chatbot" ? "bg-blue-700" : ""
          }`}
        >
          Chatbot
        </Link>
      </aside>

      {/* Main content area */}
      <div className="flex flex-col flex-grow">
        <Header />
        <main className="flex-grow max-w-7xl mx-auto px-6 py-8">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
