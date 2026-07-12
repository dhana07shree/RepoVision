from langchain_core.prompts import ChatPromptTemplate
from app.core.llm import llm
from app.repository.ignore import SUPPORTED_EXTENSIONS
from app.prompts.file_summary_prompt import FILE_SUMMARY_PROMPT

prompt = ChatPromptTemplate.from_template(FILE_SUMMARY_PROMPT)
chain = prompt | llm

def summarize_document(document):

    extension = document.metadata["extension"]

    if extension not in SUPPORTED_EXTENSIONS:
        return ""

    response = chain.invoke(
        {
          "context": document.page_content
        }
    )
    return response.content