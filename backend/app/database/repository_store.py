from app.models.repository_model import RepositoryKnowledgeBase


repository_cache = {}


def save_repository(repo_name: str,
                    repository: RepositoryKnowledgeBase):

    repository_cache[repo_name] = repository


def get_repository(repo_name: str):

    return repository_cache.get(repo_name)

def repository_exists(repo_name: str):

    return repo_name in repository_cache


def clear_repository(repo_name: str):

    repository_cache.pop(repo_name, None)