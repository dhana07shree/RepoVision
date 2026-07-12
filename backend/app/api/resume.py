from fastapi import APIRouter, HTTPException
from app.database.repository_store import get_repository
from app.schemas.resume import ResumeRequest
from app.services.resume.resume_builder import build_resume
router = APIRouter()

@router.post("/resume")
def resume(request: ResumeRequest):
    repository = get_repository(request.repository)

    if repository is None:
        raise HTTPException( status_code=404, detail="Repository not found." )
    return build_resume( repository)
    