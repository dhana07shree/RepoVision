import json

from langchain_core.prompts import ChatPromptTemplate

from app.prompts.interview_report_prompt import (
    INTERVIEW_REPORT_PROMPT
)

from app.schemas.interview_report import (
    InterviewReportResponse
)

from app.core.llm import llm


prompt = ChatPromptTemplate.from_template(
    INTERVIEW_REPORT_PROMPT
)

chain = prompt | llm


def generate_report(repository, session):

    response = chain.invoke(

        {

            "summary": repository.summary_as_text(),

            "file_summaries": repository.file_summaries,

            "questions": "\n".join(session["questions"]),

            "answers": "\n".join(session["answers"]),

            "evaluations": "\n".join(
                str(e)
                for e in session["evaluations"]
            )

        }

    )

    try:

        data = json.loads(response.content)

        report = InterviewReportResponse.model_validate(
            data
        )

        return report

    except Exception as e:

        raise ValueError(
            f"Failed to parse LLM response:\n{response.content}"
        ) from e