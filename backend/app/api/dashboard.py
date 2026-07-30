from fastapi import APIRouter, HTTPException
from app.database.repository_store import get_repository
from app.services.repository_analysis.dashboard_service import generate_dashboard
from fastapi import Depends, Request
from app.auth.authentication import require_login

router = APIRouter()

@router.get("/dashboard/{repo_name}")
def dashboard(repo_name: str,  request: Request,user=Depends(require_login)):

    repository = get_repository(repo_name)

    if repository is None:

        raise HTTPException(
            
            status_code=404,

            detail="Repository not found."

        )
    return generate_dashboard(repository)