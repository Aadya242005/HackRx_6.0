from flask import Flask, request, jsonify
from flask_cors import CORS
from query_engine import process_query

app = Flask(__name__)
CORS(app)
@app.route('/')
def home():
    return "Flask Backend is Running!"


@app.route("/query", methods=["POST"])
def handle_query():
    try:
        data = request.get_json()
        print("📥 Raw request:", data)

        user_query = data.get("query", "")
        print("🔍 User query:", user_query)

        if not user_query:
            return jsonify({"response": "⚠️ No query provided."}), 400

        # Process the query (your logic)
        result = process_query(user_query)
        matched_clauses = result.get("results", [])

        combined_text = " ".join([r["clause"].lower() for r in matched_clauses])

        yes_keywords = ["covered", "eligible", "included", "admissible"]
        no_keywords = ["not covered", "excluded", "not admissible", "waiting period"]

        if any(k in combined_text for k in yes_keywords):
            decision = "✅ Yes, based on your policy documents, this appears to be covered."
        elif any(k in combined_text for k in no_keywords):
            decision = "❌ No, this seems to be excluded or restricted by your policy."
        else:
            decision = "🤔 I couldn't confirm if it's covered. Please review the matched clauses."

        clause_snippets = "\n\n".join([
            f"📄 {i+1}. {r['clause']} (📁 {r['source']})"
            for i, r in enumerate(matched_clauses[:3])
        ])

        full_response = f"{decision}\n\n🔎 Relevant clauses found:\n\n{clause_snippets}"

        return jsonify({"response": full_response})

    except Exception as e:
        print("❌ SERVER ERROR:", str(e))
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    print("✅ Backend running on http://localhost:5000")
    app.run(debug=True)
