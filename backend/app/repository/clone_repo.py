from git import Repo
from pathlib import Path
import os
import uuid

CLONE_DIRECTORY = Path(__file__).resolve().parents[2].parent / "repositories"


def clone_repository(repo_url: str, github_token: str | None = None):

    os.makedirs(CLONE_DIRECTORY, exist_ok=True)

    repo_name = repo_url.rstrip("/").split("/")[-1]

    local_path = CLONE_DIRECTORY / f"{repo_name}_{uuid.uuid4().hex[:8]}"

    clone_url = repo_url

    if github_token:

        clone_url = repo_url.replace(
            "https://",
            f"https://oauth2:{github_token}@"
        )

    Repo.clone_from(
        clone_url,
        str(local_path)
    )

    return str(local_path)