# embedding.py
# Metinleri vektöre (embedding) dönüştüren modül

from sentence_transformers import SentenceTransformer
from config import EMBEDDING_MODEL

# Embedding modeli sadece BİR KERE yüklenir
model = SentenceTransformer(EMBEDDING_MODEL)

def embed_texts(texts: list[str]) -> list[list[float]]:
    """
    Verilen metin listesini embedding vektörlerine çevirir
    """
    return model.encode(texts).tolist()

