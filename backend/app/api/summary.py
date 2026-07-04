from fastapi import APIRouter

from app.database.repository_store import get_repository

from backend.app.services.repository_analysis.summary_service import generate_summary

router = APIRouter(
    prefix="/summary",
    tags=["Summary"]
)


@router.get("/{repository_name}")

def repository_summary(repository_name: str):

    repository = get_repository(repository_name)

    if repository is None:

        return {

            "error": "Repository not found"

        }

    summary = generate_summary(

        repository.retriever

    )

    return summary