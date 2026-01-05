from sentence_transformers import SentenceTransformer
from config import EMBEDDING_MODEL

model = SentenceTransformer(EMBEDDING_MODEL)

def embed_texts(texts: list[str]) -> list[list[float]]:
    return model.encode(texts, convert_to_list=True)
