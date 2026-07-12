from pydantic import BaseModel
from typing import List

class ResumeRequest(BaseModel):

    repository: str


class ResumeResponse(BaseModel):

    project_title: str

    project_description: str

    resume_points: List[str]

    technologies: List[str]