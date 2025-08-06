import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Chatbot from "./components/Chatbot";
import Dashboard from "./pages/Dashboard";
import AnalyzePage from "./components/AnalyzePage"; // ✅ This is your correct component

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analyze" element={<AnalyzePage />} /> {/* ✅ Use AnalyzePage here */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/chatbot" element={<Chatbot />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
