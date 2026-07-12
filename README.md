# RepoVision – AI-Powered GitHub Repository Coach

RepoVision is an AI-powered developer assistant that analyzes GitHub repositories and helps users understand, explain, and prepare to discuss their projects during interviews.

Instead of manually reading hundreds of files, users simply provide a GitHub repository URL. RepoVision indexes the repository, builds a Retrieval-Augmented Generation (RAG) pipeline, and generates project insights, interview questions, resume bullet points, and an AI-powered Git assistant.

---

## Features

### Repository Analysis
- Clone and analyze any public GitHub repository
- Scan source files while ignoring unnecessary directories
- Generate AI summaries for individual files
- Produce a structured project dashboard including:
  - Project objective
  - Programming languages
  - Frameworks & libraries
  - Major features
  - APIs
  - Database
  - Authentication
  - Deployment
  - Overall architecture

---

### Git Assistant (RAG Chat)

- Ask natural language questions about the repository
- Uses Retrieval-Augmented Generation (RAG)
- Retrieves only relevant code before sending context to the LLM
- Provides repository-aware answers instead of generic AI responses

Example:

> How does authentication work?

> Explain the vector store implementation.

> Which file creates embeddings?

---

### Interview Guide

Automatically generates interview questions based on repository domains such as:

- Backend
- Frontend
- Machine Learning
- Deep Learning
- NLP
- Database
- API Development
- DevOps
- Computer Vision
- Data Structures & Algorithms

Each domain includes:

- Technical interview questions
- Ideal answers
- Follow-up questions
- Common mistakes
- Related repository files

---

### Resume Builder

Generates ATS-friendly resume content directly from the repository.

Includes:

- Project description
- Professional resume bullet points
- Technologies used

The generated content is based entirely on the repository without inventing unsupported technologies or features.

---

## Tech Stack

### Backend

- FastAPI
- Python
- LangChain
- ChromaDB
- GitPython
- Pydantic

### AI

- Groq API
- Llama 3.3 70B Versatile
- HuggingFace Embeddings
- Sentence Transformers

### Frontend

- HTML
- CSS
- JavaScript

---

## Project Architecture

```
GitHub Repository
        │
        ▼
Clone Repository
        │
        ▼
Repository Scanner
        │
        ▼
File Reader
        │
        ▼
AI File Summaries
        │
        ▼
Project Summary
        │
        ▼
Chunk Generation
        │
        ▼
Embeddings
        │
        ▼
Chroma Vector Store
        │
        ▼
MMR Retriever
        │
        ▼
──────────────────────────────────────
│ Dashboard
│ Git Assistant
│ Interview Guide
│ Resume Builder
──────────────────────────────────────
```

---

## Folder Structure

```
backend/
│
├── api/
├── core/
├── database/
├── models/
├── prompts/
├── rag/
├── repository/
├── schemas/
├── services/
│
frontend/
│
├── app.html
├── app.css
└── app.js
```

---

## Installation

### Clone the repository

```bash
git clone https://github.com/yourusername/RepoVision.git
```

---

### Backend

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt
```

Create a `.env` file:

```
GROQ_API_KEY=YOUR_GROQ_API_KEY
```

Run the backend

```bash
uvicorn app.main:app --reload
```

Backend runs at

```
http://localhost:8000
```

---

### Frontend

Open the frontend directory.

Run

```bash
python -m http.server 5174
```

Open

```
http://localhost:5174/app.html
```

---

## How It Works

1. User enters a GitHub repository URL.
2. Repository is cloned locally.
3. Source files are scanned and read.
4. Files are summarized using an LLM.
5. Documents are split into chunks.
6. Chunks are converted into embeddings.
7. Embeddings are stored in ChromaDB.
8. An MMR retriever retrieves relevant context.
9. AI features use repository-aware context to answer questions and generate outputs.

---

## Future Improvements

- GitHub authentication for private repositories
- PDF resume export
- Multi-repository support
- Repository architecture visualization
- Commit history analysis
- Code quality insights
- Pull request summarization
- Team collaboration support

---

## Author

**Dhanashree Chandekar**

NIT Rourkela  
Artificial Intelligence Undergraduate

GitHub: https://github.com/dhana07shree

---

## License

This project is licensed under the MIT License.