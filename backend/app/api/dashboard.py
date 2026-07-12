from fastapi import APIRouter, HTTPException
from app.database.repository_store import get_repository
from app.services.repository_analysis.dashboard_service import generate_dashboard
router = APIRouter()

@router.get("/dashboard/{repo_name}")
def dashboard(repo_name: str):

    repository = get_repository(repo_name)

    if repository is None:

        raise HTTPException(
            
            status_code=404,

            detail="Repository not found."

        )
    return generate_dashboard(repository)