from pydantic import BaseModel
from typing import List


class InterviewGuideRequest(BaseModel):

    repository: str

    domain: str


class InterviewQuestion(BaseModel):

    question: str

    ideal_answer: str

    follow_up_questions: List[str]

    common_mistakes: List[str]

    related_files: List[str]

    difficulty: str


class InterviewGuideResponse(BaseModel):

    category: str

    questions: List[InterviewQuestion]