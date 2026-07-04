from pydantic import BaseModel


class ResumeRequest(BaseModel):

    repository: str


class ResumeResponse(BaseModel):

    project_title: str

    project_description: str

    resume_points: list[str]

    technologies: list[str]