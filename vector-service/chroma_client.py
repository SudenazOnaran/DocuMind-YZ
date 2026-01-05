import chromadb
from chromadb.config import Settings
from config import CHROMA_PERSIST_DIR, COLLECTION_NAME

client = chromadb.Client(
    Settings(
        persist_directory=CHROMA_PERSIST_DIR,
        anonymized_telemetry=False
    )
)

collection = client.get_or_create_collection(
    name=COLLECTION_NAME
)
