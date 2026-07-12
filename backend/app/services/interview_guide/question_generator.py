import json
from langchain_core.prompts import ChatPromptTemplate
from app.core.llm import llm
from app.core.domain_queries import DOMAIN_QUERIES
from app.prompts.interview_guide_prompt import (INTERVIEW_GUIDE_PROMPT)
from app.schemas.interview_guide import ( InterviewGuideResponse)

prompt = ChatPromptTemplate.from_template( INTERVIEW_GUIDE_PROMPT)
chain = prompt | llm

def generate_questions(repository, domain):

    # ---------- Cache ----------
    if repository.interview_cache.get(domain) is not None:
     return repository.interview_cache[domain]

    # ---------- Retrieve relevant code ----------
    query = f"""
    {DOMAIN_QUERIES.get(domain, domain)}

    implementation

    source code

    design decisions

    important classes

    important functions

    workflow
    """

    docs = repository.retriever.invoke(query)[:8]

    context = ""

    seen = set()

    for doc in docs:

      path = doc.metadata.get("path", "")

      if path in seen:
        continue

      seen.add(path)

      context += f"""

      FILE:
      {doc.metadata.get("filename")}

      PATH:
      {path}

      SOURCE CODE:
      {doc.page_content}

      {'-'*80}
      """

    response = chain.invoke(
        {
            "summary": repository.summary_as_text(),
            "file_summaries": repository.file_summaries,
            "context": context,
            "domain": domain
        }
    )

    try:

        content = response.content.strip()

        start = content.find("{")
        end = content.rfind("}")

        if start == -1 or end == -1:
           raise ValueError(content)

        content = content[start:end + 1]

        data = json.loads(content)

        guide = InterviewGuideResponse.model_validate(data)

        repository.interview_cache[domain] = guide

        return guide

    except Exception as e:

        raise ValueError(
            f"Failed to parse LLM response:\n{response.content}"
        ) from e