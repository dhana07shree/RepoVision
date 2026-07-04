from langchain_core.prompts import ChatPromptTemplate

from app.prompts.interview_question_prompt import INTERVIEW_QUESTION_PROMPT
from app.core.llm import llm
import json

from app.schemas.interview import InterviewQuestionResponse

prompt = ChatPromptTemplate.from_template(
    INTERVIEW_QUESTION_PROMPT
)

chain = prompt | llm


def generate_question(repository,

previous_questions,

asked_categories,

remaining_categories,

difficulty):

   

    response = chain.invoke(
        {
            "summary": repository.summary_as_text(),

            "file_summaries": repository.file_summaries,

            "previous_questions": "\n".join(previous_questions),

            "difficulty": difficulty,

            "asked_categories": ", ".join(asked_categories),

            "remaining_categories":", ".join(remaining_categories)
        }
    )

    try:
     data = json.loads(response.content)
     question = InterviewQuestionResponse.model_validate(data)
     return question

    except Exception as e:
     raise ValueError(
        f"Failed to parse LLM response:\n{response.content}"
    ) from e