from app.rag.vector_store import create_vector_store


def create_retriever(chunks,repository_name):

    vector_store = create_vector_store(chunks,repository_name)

    retriever = vector_store.as_retriever(

        search_type="mmr",

        search_kwargs={

            "k": 8,

            "fetch_k": 20,
            "lambda_mult": 0.5

        }

    )

    return retriever