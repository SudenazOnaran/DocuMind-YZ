# chroma_client.py
# ChromaDB bağlantısını ve koleksiyon erişimini yönetir

import chromadb
from chromadb.config import Settings
from config import CHROMA_PERSIST_DIR, COLLECTION_NAME

# ChromaDB client oluşturulur
client = chromadb.Client(
    Settings(
        persist_directory=CHROMA_PERSIST_DIR,
        anonymized_telemetry=False
    )
)

# Koleksiyon yoksa oluşturur, varsa getirir
collection = client.get_or_create_collection(
    name=COLLECTION_NAME
)
