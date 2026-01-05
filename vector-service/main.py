from fastapi import FastAPI
from pydantic import BaseModel
import chromadb
from sentence_transformers import SentenceTransformer
from google import genai
import os
from dotenv import load_dotenv

load_dotenv("../.env.local")

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

app = FastAPI()

# Embedding modeli
model = SentenceTransformer("all-MiniLM-L6-v2")

# ChromaDB client
chroma_client = chromadb.Client(
    chromadb.Settings(
        persist_directory="./chroma_db"
    )
)

collection = chroma_client.get_or_create_collection(
    name="documents"
)

def chunk_text(text: str, chunk_size=500, overlap=50):
    chunks = []
    start = 0
    while start < len(text):
        end = start + chunk_size
        chunk = text[start:end]
        chunks.append(chunk)
        start = end - overlap
    return chunks

class DocumentRequest(BaseModel):
    document_id: str
    content: str

class SummaryRequest(BaseModel):
    document_id: str
    summary_type: str  # "short" | "long"


@app.post("/add-document")
def add_document(req: DocumentRequest):
    chunks = chunk_text(req.content)
    embeddings = model.encode(chunks).tolist()
    ids = [f"{req.document_id}_{i}" for i in range(len(chunks))]

    collection.add(
        documents=chunks,
        embeddings=embeddings,
        ids=ids,
        metadatas=[{"document_id": req.document_id}] * len(chunks)
    )

    return {
        "message": "Document embedded and stored",
        "chunks": len(chunks)
    }

@app.get("/")
def root():
    return {"status": "vector-service running"}

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/summarize-document")
def summarize_document(req: SummaryRequest):
    print("➡️ summarize-document called")
    print("document_id:", req.document_id)
    print("summary_type:", req.summary_type)

    # 1️⃣ En alakalı chunk’ları vektör sorgusu ile al (RAG)
    results = collection.query(
        #query_texts=["document summary"],
        #n_results=5,
        where={"document_id": req.document_id}
    )

    print("vector query results:", results)
    
    if not results["documents"] or len(results["documents"]) == 0:
        print("❌ No documents found in ChromaDB")
        return {"error": "Document not found in vector DB"}

     # 🔥 TÜM METNİ BİRLEŞTİR
    full_text = "\n".join(results["documents"])
    print("📄 Full text length:", len(full_text))

    if req.summary_type == "short":
        instruction = "kısa, net, akademik bir özet üret (5-6 cümle)"
    else:
        instruction = "detaylı, başlıklandırılmış ve açıklayıcı bir özet üret"

    prompt = f"""
    Aşağıdaki dokümanı okuyarak {instruction}.

    Doküman:
    {full_text}

    Özet:
    """

    print("🚀 Gemini çağrılıyor...")

    response = client.models.generate_content(
        model="gemini-1.5-flash",
        contents=prompt
    )

    print("✅ Gemini response geldi")

    return {
        "document_id": req.document_id,
        "summary_type": req.summary_type,
        "summary": response.text
    }