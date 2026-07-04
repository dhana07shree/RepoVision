from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.repository import router as repository_router
from app.api.dashboard import router as dashboard_router
from app.api.chat import router as chat_router
from app.api.interview import router as interview_router
from app.api.resume import router as resume_router

app = FastAPI(
    title="RepoPrep AI"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(repository_router)
app.include_router(dashboard_router)
app.include_router(chat_router)
app.include_router(interview_router)
app.include_router(resume_router)

@app.get("/")
def root():
    return {
        "message": "Welcome to RepoPrep AI 🚀"
    }