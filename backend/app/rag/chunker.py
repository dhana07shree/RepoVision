from langchain_text_splitters import RecursiveCharacterTextSplitter

from app.core.config import (
    CHUNK_SIZE,
    CHUNK_OVERLAP
)

def create_chunks(documents):

    text_splitter = RecursiveCharacterTextSplitter(

        chunk_size=CHUNK_SIZE,
        chunk_overlap=CHUNK_OVERLAP,

        separators=[
            "\n\n",
            "\n",
            " ",
            ""
        ]
    )

    chunks = text_splitter.split_documents(documents)

    for index, chunk in enumerate(chunks):

        chunk.metadata["chunk_id"] = index

    return chunks