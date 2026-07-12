from pathlib import Path
from app.repository.scanner import IMPORTANT_FILES
from langchain_core.documents import Document

def read_file(file_path: str):

    file_path = Path(file_path)

    try:

        text = file_path.read_text(
            encoding="utf-8",
            errors="ignore"
        )

        document = Document(

            page_content=text,

            metadata={

                "filename": file_path.name,

                "extension": file_path.suffix,

                "path": str(file_path),

                "folder": str(file_path.parent),

                "importance": 10 if file_path.name in IMPORTANT_FILES else 1

            }

        )

        return document

    except Exception :
       
        return None