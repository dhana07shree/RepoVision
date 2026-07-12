import json
from langchain_core.prompts import ChatPromptTemplate
from app.prompts.resume_prompt import RESUME_PROMPT
from app.core.llm import llm
from app.schemas.resume import ResumeResponse

prompt = ChatPromptTemplate.from_template(RESUME_PROMPT)
chain = prompt | llm

def build_resume(repository):

    summary_text = repository.summary_as_text()

    context = repository.file_summaries[:12000]

    response = chain.invoke(
    {
    "summary": summary_text,
    "context": context
    }
    )

    try:
       content = response.content.strip()

       if content.startswith("```json"):
         content = content.replace("```json", "", 1)

       if content.startswith("```"):
         content = content.replace("```", "", 1)

       if content.endswith("```"):
         content = content[:-3]

       content = content.strip()

       data = json.loads(content)
       resume = ResumeResponse.model_validate(data)

       return resume

    except Exception as e:

       raise ValueError(
          f"Failed to parse LLM response:\n{response.content}"
       ) from e