from fastapi import APIRouter
import traceback
from app.schemas.repository import RepositoryRequest
from app.repository.clone_repo import clone_repository
from app.repository.indexer import build_repository
from app.database.repository_store import save_repository
from fastapi import Depends, Request
from app.auth.authentication import require_login

router = APIRouter()


@router.post("/upload")
def upload_repository(request: RepositoryRequest,  http_request: Request, user=Depends(require_login)):
    try:

        if "github.com" not in request.github_url:

         raise HTTPException(
         status_code=400,
         detail="Please enter a valid GitHub repository URL."
         )
        print("STEP 1")
        github_token = http_request.session.get("github_token")

        path = clone_repository(
        request.github_url,
        github_token
        )

        print("STEP 2")
        repository = build_repository(path)

        print("STEP 3")
        repo_name = request.github_url.rstrip("/").split("/")[-1]

        save_repository(repo_name, repository)

        print("STEP 4")

        return {
            "message": "Repository uploaded successfully",
            "repository": repo_name
        }

    except Exception as e:
        traceback.print_exc()
        raise e