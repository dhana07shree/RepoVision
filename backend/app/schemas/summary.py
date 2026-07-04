from pydantic import BaseModel
from typing import List


class RepositorySummary(BaseModel):

    project_title: str

    project_objective: str

    programming_languages: List[str]

    frameworks: List[str]

    libraries: List[str]

    folder_structure: str

    major_features: List[str]

    specialized_components: List[str]

    apis: List[str]

    database: str

    authentication: str

    deployment: str

    overall_architecture: str