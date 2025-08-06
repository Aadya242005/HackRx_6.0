# embed_documents_local.py
import os
import pickle
import faiss
import numpy as np

from tqdm import tqdm
from pathlib import Path
import pdfplumber
from sklearn.preprocessing import normalize
from sentence_transformers import SentenceTransformer

# === Load sentence transformer model ===
model = SentenceTransformer("all-MiniLM-L6-v2")  # Small & fast

# === Step 1: Load & Extract Text from PDFs ===
pdf_dir = Path("C:/Users/Dell/Desktop/New folder/backend")
pdf_files = ["D1.pdf", "D2.pdf", "D3.pdf", "D4.pdf", "D5.pdf"]

def extract_text(pdf_path):
    with pdfplumber.open(pdf_path) as pdf:
        return "\n".join([page.extract_text() or "" for page in pdf.pages])

all_chunks, metadata = [], []

def chunk_text(text, chunk_size=800, overlap=100):
    chunks = []
    start = 0
    while start < len(text):
        end = min(start + chunk_size, len(text))
        chunks.append(text[start:end])
        start += chunk_size - overlap
    return chunks

for file in pdf_files:
    full_path = pdf_dir / file
    full_text = extract_text(full_path)
    chunks = chunk_text(full_text)
    all_chunks.extend(chunks)
    metadata.extend([{"source": file}] * len(chunks))

# === Step 2: Generate Local Embeddings ===
def embed(texts):
    return model.encode(texts, show_progress_bar=True, convert_to_numpy=True)

print(f"Generating embeddings for {len(all_chunks)} chunks...")
embeddings = embed(all_chunks)
embeddings = normalize(embeddings, axis=1)

# === Step 3: Store in FAISS ===
dimension = len(embeddings[0])
index = faiss.IndexFlatIP(dimension)
index.add(np.array(embeddings).astype("float32"))

faiss.write_index(index, "faiss_index.index")
with open("metadata.pkl", "wb") as f:
    pickle.dump(metadata, f)
with open("all_chunks.txt", "w", encoding="utf-8") as f:
    f.write("\n".join(all_chunks))


print("\n✅ Local embedding completed. Saved faiss_index.index and metadata.pkl.")
