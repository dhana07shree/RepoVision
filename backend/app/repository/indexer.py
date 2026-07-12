from app.repository.scanner import scan_repository
from app.repository.reader import read_file
from app.rag.chunker import create_chunks
from app.rag.retriever import create_retriever
from app.models.repository_model import RepositoryKnowledgeBase
from app.services.repository_analysis.summary_service import generate_summary
from app.services.repository_analysis.project_summary import summarize_repository
from app.core.interview_domains import build_interview_domains
from pathlib import Path


def build_repository(repository_path: str):

    files = scan_repository(repository_path)
    
    documents = []

    for file in files:

        document = read_file(file)

        if document:

            documents.append(document)

    chunks = create_chunks(documents)
    file_summaries = summarize_repository(documents)
    summary = generate_summary(file_summaries)
    repository_name = Path(repository_path).name
    retriever = create_retriever(chunks, repository_name)

    repository = RepositoryKnowledgeBase(

    documents=documents,

    chunks=chunks,

    retriever=retriever,

    file_summaries=file_summaries,

    summary=summary
    )

    repository.interview_domains = build_interview_domains(repository)
    repository.interview_cache = {}
    for domain in repository.interview_domains:
      repository.interview_cache[domain] = None
    
    return repository




