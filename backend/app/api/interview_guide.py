from fastapi import APIRouter, HTTPException

from app.database.repository_store import get_repository

from app.schemas.interview_guide import InterviewGuideRequest

from app.services.interview_guide.question_generator import (
    generate_questions
)

router = APIRouter()

@router.get("/interview/domains/{repository}")
def interview_domains(repository: str):

    repo = get_repository(repository)

    if repo is None:

        raise HTTPException(
            status_code=404,
            detail="Repository not found."
        )

    domains = repo.interview_domains

    return {
        "domains": domains
    }


@router.post("/interview/questions")
def interview_questions(request: InterviewGuideRequest):
    repo = get_repository(request.repository)

    if repo is None:

        raise HTTPException(
            status_code=404,
            detail="Repository not found."
        )
    if request.domain not in repo.interview_domains:

     raise HTTPException(
        status_code=404,
        detail="Interview domain not found."
     )
    return generate_questions(
        repo,
        request.domain
    )