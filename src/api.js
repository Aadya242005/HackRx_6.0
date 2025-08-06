const BASE_URL = process.env.REACT_APP_BASE_URL;


// ✅ Send chat message to Flask backend
export async function sendChatQuery(query) {
  const response = await fetch(`${BASE_URL}/query`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    throw new Error("Failed to get response from backend");
  }

  const data = await response.json();
  return data; // expected to return { response: "..." }
}

// 🔁 Optional: Query an LLM-style backend if used separately
export async function queryLLM(data) {
  const response = await fetch(`${BASE_URL}/query`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("LLM query failed");
  }

  return await response.json();
}

// ❤️ Health check to confirm backend is running
export async function healthCheck() {
  const response = await fetch(`${BASE_URL}/health`);
  if (!response.ok) {
    throw new Error("Health check failed");
  }
  return await response.json(); // { status: "ok" }
}

// 🏥 Analyze insurance clause
export async function analyzeClause(clause) {
  const response = await fetch(`${BASE_URL}/analyze`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ clause }),
  });

  if (!response.ok) {
    throw new Error("Clause analysis failed");
  }

  return await response.json(); // { analysis: "..." }
}
