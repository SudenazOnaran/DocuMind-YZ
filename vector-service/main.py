from fastapi import FastAPI
from pydantic import BaseModel
from dotenv import load_dotenv
import os

# Hugging Face Kütüphaneleri
from transformers import pipeline

# Yerel modüller (Senin proje dosyaların)
from chroma_client import collection
from embedding import embed_texts

# -------------------------------------------------
# MODELİ YÜKLE (Uygulama açılırken 1 kere yükler)
# -------------------------------------------------
print("Özetleme modeli yükleniyor (Bu ilk seferde biraz sürebilir)...")

# 'summarization' görevi için facebook/bart-large-cnn modelini indiriyoruz.
# Bu model yaklaşık 1.5 GB boyutundadır, ilk çalıştırmada indirir.
summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

print("Model hazır!")

app = FastAPI()

# -------------------------------------------------
# YARDIMCI FONKSİYONLAR
# -------------------------------------------------

def chunk_text(text: str, chunk_size=500, overlap=50):
    chunks = []
    start = 0
    while start < len(text):
        end = start + chunk_size
        chunks.append(text[start:end])
        start = end - overlap
    return chunks

def generate_summary_local(text):
    """
    Hugging Face modeli ile yerel özetleme yapar.
    """
    try:
        # BART modelinin sınırı genelde 1024 tokendir (~3000-4000 karakter).
        # Eğer metin çok uzunsa kırpmamız gerekir, yoksa hata verir.
        max_input_length = 3000
        if len(text) > max_input_length:
            text = text[:max_input_length]

        # Özetleme yap
        # max_length: Özetin en fazla ne kadar olacağı
        # min_length: Özetin en az ne kadar olacağı
        summary_result = summarizer(text, max_length=150, min_length=40, do_sample=False)
        
        return summary_result[0]['summary_text']

    except Exception as e:
        print(f"Özetleme Hatası: {e}")
        return "Özet oluşturulurken bir hata oluştu."

# -------------------------------------------------
# REQUEST MODELLERİ
# -------------------------------------------------

class DocumentRequest(BaseModel):
    document_id: str
    content: str

class SummaryRequest(BaseModel):
    document_id: str
    summary_type: str  # "short" | "long" (Şimdilik tek tip kullanıyoruz)

# -------------------------------------------------
# API ENDPOINTLERİ
# -------------------------------------------------

@app.get("/")
def root():
    return {"status": "vector-service running with HuggingFace"}

@app.post("/add-document")
def add_document(req: DocumentRequest):
    chunks = chunk_text(req.content)
    embeddings = embed_texts(chunks)
    ids = [f"{req.document_id}_{i}" for i in range(len(chunks))]

    collection.add(
        documents=chunks,
        embeddings=embeddings,
        ids=ids,
        metadatas=[{"document_id": req.document_id}] * len(chunks)
    )

    return {
        "message": "Document embedded and stored successfully",
        "chunks": len(chunks)
    }

@app.post("/summarize-document")
def summarize_document(req: SummaryRequest):
    # ChromaDB'den ilgili parçaları çek
    results = collection.query(
        query_texts=["Bu dokümanı özetle"],
        n_results=3, 
        where={"document_id": req.document_id}
    )

    documents = results.get("documents")

    if not documents or not documents[0]:
        print("UYARI: Veritabanında özetlenecek metin bulunamadı!")
        return {"error": "Özet oluşturulacak içerik bulunamadı"}

    # Gelen parçaları birleştir
    combined_text = " ".join(documents[0])
    
    print(f"--- Özetleme Başlıyor ({len(combined_text)} karakter) ---")

    # Hugging Face ile özetle
    summary = generate_summary_local(combined_text)
    
    # !!! İŞTE BURASI: Özeti terminale yazdırıyoruz !!!
    print("\n" + "="*30)
    print("OLUŞTURULAN ÖZET:")
    print(summary)
    print("="*30 + "\n")

    return {
        "document_id": req.document_id,
        "summary": summary,
        "source": "Hugging Face (Local)"
    }