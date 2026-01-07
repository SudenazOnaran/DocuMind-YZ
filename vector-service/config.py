# config.py
# Uygulama genelinde kullanılacak sabit ayarlar burada tutulur

# ChromaDB verilerinin diskte tutulacağı klasör
CHROMA_PERSIST_DIR = "./chroma_db"

# ChromaDB içinde kullanılacak koleksiyon adı
COLLECTION_NAME = "documents"

# Kullanılacak embedding modeli
EMBEDDING_MODEL = "sentence-transformers/all-MiniLM-L6-v2"

# Özetleme için kullanılacak Gemini modeli
GEMINI_MODEL = "gemini-2.5-flash-lite"
