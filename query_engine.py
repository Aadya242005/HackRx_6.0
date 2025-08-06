# query_engine.py
import faiss
import pickle
import numpy as np
from sentence_transformers import SentenceTransformer

# === Load local model and FAISS index ===
model = SentenceTransformer("all-MiniLM-L6-v2")
index = faiss.read_index("faiss_index.index")

with open("metadata.pkl", "rb") as f:
    metadata = pickle.load(f)

# === Search top-k similar chunks ===
def search_similar_chunks(query, top_k=5):
    query_embedding = model.encode([query], normalize_embeddings=True)
    scores, indices = index.search(query_embedding.astype("float32"), top_k)

    matched = []
    for idx in indices[0]:
        if 0 <= idx < len(metadata):
            matched.append(metadata[idx]["source"])
    return matched, indices[0]

# === Load text chunks to show content ===
def load_chunks():
    with open("all_chunks.txt", "r", encoding="utf-8") as f:
        return f.readlines()

chunks = load_chunks()

def process_query(query):
    sources, indices = search_similar_chunks(query, top_k=5)
    results = []
    for i in range(len(indices)):
        idx = indices[i]
        if idx < len(chunks):
            results.append({
                "clause": chunks[idx].strip(),
                "source": metadata[idx]["source"]
            })
    return {
        "query": query,
        "results": results
    }

