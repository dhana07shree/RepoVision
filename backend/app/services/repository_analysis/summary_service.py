import json
from langchain_core.prompts import ChatPromptTemplate
from app.core.llm import llm
from app.prompts.summary_prompt import SUMMARY_PROMPT
from app.schemas.summary import RepositorySummary

prompt = ChatPromptTemplate.from_template(SUMMARY_PROMPT)
chain = prompt | llm

def generate_summary(repository_summary):

    context = repository_summary

    response = chain.invoke(
    {
        "context": context
    }
    )

    try:
        data = json.loads(response.content)

        summary = RepositorySummary.model_validate(data)

        return summary

    except Exception as e:

        raise ValueError(
            f"Failed to parse LLM response:\n{response.content}"
        ) from e