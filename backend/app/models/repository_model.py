from dataclasses import dataclass
from typing import List, Any

from langchain_core.documents import Document

from app.schemas.summary import RepositorySummary


@dataclass
class RepositoryKnowledgeBase:

    documents: List[Document]

    chunks: List[Document]

    retriever: Any

    file_summaries: str
    
    summary: RepositorySummary

    def summary_as_text(self):

        return f"""
Project Title:
{self.summary.project_title}

Project Objective:
{self.summary.project_objective}

Programming Languages:
{", ".join(self.summary.programming_languages)}

Frameworks:
{", ".join(self.summary.frameworks)}

Libraries:
{", ".join(self.summary.libraries)}

Major Features:
{", ".join(self.summary.major_features)}

Overall Architecture:
{self.summary.overall_architecture}
"""