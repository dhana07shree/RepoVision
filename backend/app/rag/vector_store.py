from pathlib import Path
from langchain_chroma import Chroma

from app.core.embeddings import embedding_model

from app.core.config import CHROMA_DIRECTORY

def create_vector_store(chunks , repository_name):

    persist_directory = Path(CHROMA_DIRECTORY) / repository_name

    vector_store = Chroma.from_documents(

        documents=chunks,

        embedding=embedding_model,

        persist_directory=str(persist_directory)
    )
    return vector_store