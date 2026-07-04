from langchain_core.prompts import ChatPromptTemplate

from app.core.llm import llm

FILE_SUMMARY_PROMPT = """
You are an expert software engineer.

Summarize this source code or project file.

Explain

1. Purpose

2. Main Functions

3. Technologies Used

4. Important Logic

5. Dependencies

Keep the summary under 150 words.
If some sections are not applicable, omit them.


Context:

{context}
"""

prompt = ChatPromptTemplate.from_template(

    FILE_SUMMARY_PROMPT

)

chain = prompt | llm

SUPPORTED_EXTENSIONS = {
    ".py",
    ".js",
    ".ts",
    ".tsx",
    ".jsx",
    ".java",
    ".cpp",
    ".c",
    ".cs",
    ".go",
    ".rs",
    ".php",
    ".html",
    ".css",
    ".md",
    ".txt",
    ".json",
    ".yaml",
    ".yml",
    ".toml",
    ".xml",
    ".sql",
    ".env.example",
    ".ini",
    ".cfg",
    ".sh",
    ".bat"
}

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