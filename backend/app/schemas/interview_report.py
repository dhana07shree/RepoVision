from pydantic import BaseModel
from typing import List


class InterviewReportResponse(BaseModel):

    overall_score: float

    technical_accuracy: float

    communication: float

    confidence: float

    completeness: float

    strengths: list[str]

    weaknesses: list[str]

    improvements: list[str]

    hiring_recommendation: str

    final_feedback: str