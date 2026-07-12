from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.repository import router as repository_router
from app.api.dashboard import router as dashboard_router
from app.api.chat import router as chat_router
from app.api.resume import router as resume_router
from app.api.interview_guide import router as interview_guide_router


app = FastAPI(
    title="RepoVision AI"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5174",
        "http://127.0.0.1:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(repository_router)
app.include_router(dashboard_router)
app.include_router(chat_router)
app.include_router(resume_router)
app.include_router(interview_guide_router)

@app.get("/")
def root():
    return {
        "message": "Welcome to RepoPrep AI 🚀"
    }