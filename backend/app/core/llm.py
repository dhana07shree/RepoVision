from langchain_groq import ChatGroq
# from langchain_google_genai import ChatGoogleGenerativeAI

# from app.core.config import GOOGLE_API_KEY


from dotenv import load_dotenv

import os

load_dotenv(dotenv_path=".env")

from app.core.config import (
    GROQ_API_KEY,
    LLM_MODEL
)

llm = ChatGroq(

    model=LLM_MODEL,
    api_key=GROQ_API_KEY

)

# llm = ChatGoogleGenerativeAI(

#     model="gemini-2.5-flash",

#     google_api_key=GOOGLE_API_KEY,

#     temperature=0

# )