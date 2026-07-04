from pydantic import BaseModel


class InterviewStartRequest(BaseModel):

    repository: str

    number_of_questions: int


class InterviewAnswerRequest(BaseModel):

    session_id: str

    answer: str


class InterviewStopRequest(BaseModel):

    session_id: str


class InterviewReportResponse(BaseModel):

    overall_score: float

    strengths: list[str]

    weaknesses: list[str]

    improvements: list[str]

    summary: str



class InterviewQuestionResponse(BaseModel):

    category: str

    difficulty: str

    question: str


class InterviewEvaluationResponse(BaseModel):

    overall_score: float

    technical_accuracy: int

    communication: int

    confidence: int

    completeness: int

    strengths: list[str]

    weaknesses: list[str]

    suggestions: list[str]