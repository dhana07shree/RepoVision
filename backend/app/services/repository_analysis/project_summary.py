from app.services.repository_analysis.file_summary import summarize_document
from app.repository.ignore import SUPPORTED_EXTENSIONS

IMPORTANT_FILES = {
    "README.md",
    "requirements.txt",
    "package.json",
    "pyproject.toml",
    "Dockerfile",
    "docker-compose.yml"
}
def summarize_repository(documents):
    
    summaries = []
    
    for document in documents:
    
        extension = document.metadata["extension"]
  
        filename = document.metadata["filename"]

        if (
            extension in SUPPORTED_EXTENSIONS
            or filename in IMPORTANT_FILES
        ):

            summary = summarize_document(document)

            if summary.strip():

                summaries.append(
                                 f"""
                                 File:

                                 {document.metadata["filename"]}

                                 Summary:

                                 {summary}
                                 """
                                )

    return "\n\n".join(summaries)