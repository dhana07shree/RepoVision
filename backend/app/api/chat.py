from fastapi import APIRouter, HTTPException
from app.schemas.chat import ChatRequest
from app.database.repository_store import get_repository
from app.services.chat.chat_service import ask_repository
from fastapi import Depends, Request
from app.auth.authentication import require_login

router = APIRouter()

@router.post("/chat")
def chat(request: ChatRequest, http_request: Request,user=Depends(require_login)):

    repository = get_repository( request.repository)

    if repository is None:

        raise HTTPException(status_code=404,detail="Repository not found.")

    answer = ask_repository( request.repository, repository, request.question)

    return {"answer": answer}