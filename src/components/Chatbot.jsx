import React, { useState, useEffect, useRef } from "react";
import { sendChatQuery } from "../api"; // 👈 Import the API function

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { from: "bot", text: "🤖 Hi! Ask me anything about your insurance claim." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage() {
    if (!input.trim() || loading) return;

    const userMessage = { from: "user", text: input };
    setMessages((msgs) => [...msgs, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const data = await sendChatQuery(input);
      console.log("📦 Backend response:", data); // Optional for debugging

      let botText;

      if (typeof data.response === "string") {
        botText = data.response;
      } else if (data.response?.results?.length) {
        botText = data.response.results.map(
          (item, i) =>
            `📄 ${i + 1}. ${item.clause}\n📁 Source: ${item.source}`
        ).join("\n\n");
      } else {
        botText = "❌ Sorry, I couldn't find any matching clauses.";
      }

      const botMessage = {
        from: "bot",
        text: botText,
      };

      setMessages((msgs) => [...msgs, botMessage]);
    } catch (error) {
      console.error("❌ Error:", error);
      setMessages((msgs) => [
        ...msgs,
        { from: "bot", text: "⚠️ Oops! Something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-[500px] max-w-md mx-auto border rounded shadow p-4 bg-white dark:bg-gray-800">
      <div
        className="flex-grow overflow-y-auto mb-4 space-y-3"
        aria-live="polite"
        role="log"
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-3 rounded max-w-[80%] ${
              msg.from === "bot"
                ? "bg-gray-200 dark:bg-gray-700 self-start"
                : "bg-blue-600 text-white self-end"
            }`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}
        className="flex gap-2"
        aria-label="Chat input form"
      >
        <input
          type="text"
          placeholder={loading ? "Waiting for response..." : "Type your question..."}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
          className="flex-grow border rounded px-3 py-2 dark:bg-gray-700 dark:text-white"
          aria-label="Chat input"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );
}

