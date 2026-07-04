from pydantic import BaseModel


class ChatRequest(BaseModel):

    repository: str

    question: str