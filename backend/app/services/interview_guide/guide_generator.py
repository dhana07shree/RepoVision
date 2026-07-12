from langchain_core.prompts import ChatPromptTemplate
from app.core.llm import llm
from app.prompts.interview_guide_prompt import INTERVIEW_GUIDE_PROMPT

prompt = ChatPromptTemplate.from_template(INTERVIEW_GUIDE_PROMPT)
chain = prompt | llm

def generate_category( repository, category):
    summary = repository.summary_as_text()

    file_summaries = repository.file_summaries
    
    docs = repository.retriever.invoke(

    f"""
    {category}

    implementation

    source code

    design decisions

    architecture
    """
    )
    
    context = "\n\n".join(
    doc.page_content
    for doc in docs
    )
    
    response = chain.invoke(
    {
    "summary": summary,
    "file_summaries": file_summaries,
    "context": context,
    "category": category
    }
    )
    
    print(response.content)