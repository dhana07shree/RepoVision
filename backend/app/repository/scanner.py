from pathlib import Path

from app.repository.ignore import (
    IGNORE_DIRECTORIES,
    SUPPORTED_EXTENSIONS,
)
IMPORTANT_FILES = {
    "README.md",
    "requirements.txt",
    "package.json",
    "pyproject.toml",
    "Dockerfile",
    "docker-compose.yml"
}

def scan_repository(repository_path: str):

    repository_path = Path(repository_path)

    files = []

    for file in repository_path.rglob("*"):

        if not file.is_file():
            continue

        # Skip ignored folders
        if any(part in IGNORE_DIRECTORIES for part in file.parts):
            continue

        # Keep only supported file types
        if (file.suffix.lower() not in SUPPORTED_EXTENSIONS and file.name not in IMPORTANT_FILES):
            continue

        files.append(file)

    return files