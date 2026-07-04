from git import Repo
from pathlib import Path
import os
import uuid

CLONE_DIRECTORY = Path(__file__).resolve().parents[2].parent / "repositories"


def clone_repository(repo_url: str):

    os.makedirs(CLONE_DIRECTORY, exist_ok=True)

    repo_name = repo_url.split("/")[-1]

    local_path = CLONE_DIRECTORY / f"{repo_name}_{uuid.uuid4().hex[:8]}"

    Repo.clone_from(
        repo_url,
        str(local_path)
    )

    return str(local_path)