import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";  // ✅ Make sure this matches your actual App file

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
