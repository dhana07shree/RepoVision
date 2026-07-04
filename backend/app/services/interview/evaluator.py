
import json
from langchain_core.prompts import ChatPromptTemplate

from app.schemas.interview import InterviewEvaluationResponse

from app.prompts.interview_evaluation_prompt import (
    INTERVIEW_EVALUATION_PROMPT
)

from app.core.llm import llm


prompt = ChatPromptTemplate.from_template(
    INTERVIEW_EVALUATION_PROMPT
)

chain = prompt | llm


def evaluate_answer(
    repository,
    question,
    answer
):


    response = chain.invoke(
    {
         "summary": repository.summary_as_text(),

         "file_summaries": repository.file_summaries,

         "question": question,

         "answer": answer
    }
    )

    try:
        data = json.loads(response.content)

        evaluation = InterviewEvaluationResponse.model_validate(data)

        return evaluation

    except Exception as e:

        raise ValueError(
            f"Failed to parse LLM response:\n{response.content}"
        ) from e