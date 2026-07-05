# 🚀 RepoPrep AI

> **An AI Interview Coach that understands your GitHub projects better than you do.**

RepoPrep AI is an AI-powered platform that analyzes any public GitHub repository and helps developers prepare for technical interviews based on their own projects. Instead of generic interview preparation, it generates repository-specific summaries, answers project-related questions, conducts mock interviews, and assists in creating impactful resume descriptions.

---

# ✨ Features

### 📂 Repository Analysis

* Clone any public GitHub repository.
* Scan and process the project structure.
* Extract relevant source code while ignoring unnecessary files.
* Build a semantic knowledge base using vector embeddings.

### 📝 AI Repository Summary

* Generate concise project overviews.
* Explain architecture, technologies, and workflows.
* Highlight key functionalities automatically.

### 💬 Ask Anything About Your Repository

* Chat with your project using Retrieval-Augmented Generation (RAG).
* Ask implementation-related questions.
* Understand complex codebases quickly.
* Get context-aware answers grounded in repository content.

### 🎤 AI Interviewer

* Conduct mock technical interviews based on your uploaded project.
* Generate repository-specific interview questions.
* Evaluate answers and provide constructive feedback.

### 📄 Resume Assistant

* Generate ATS-friendly resume bullet points.
* Highlight impactful project achievements.
* Suggest measurable improvements for resume descriptions.

---

# 🛠 Tech Stack

## Frontend

* React (Vite)
* JavaScript
* HTML5
* CSS3

## Backend

* FastAPI
* Python

## AI & Machine Learning

* LangChain
* Groq LLM (Llama 3.3 70B Versatile)
* HuggingFace Embeddings
* Chroma Vector Database

## Other Tools

* GitPython
* Recursive Character Text Splitter
* CORS Middleware

---

# ⚙️ How It Works

1. User submits a GitHub repository URL.
2. Backend clones the repository locally.
3. Source files are scanned while excluding unnecessary directories.
4. Files are converted into LangChain documents.
5. Documents are split into semantic chunks.
6. HuggingFace Embeddings generate vector representations.
7. Chroma stores the embeddings.
8. A Retrieval-Augmented Generation (RAG) pipeline answers user queries using the repository context.
9. Groq LLM generates summaries, interview questions, and resume suggestions.

---

# 📁 Project Structure

```
RepoPrep-AI
│
├── backend
│   ├── app
│   │   ├── api
│   │   ├── core
│   │   ├── repository
│   │   ├── rag
│   │   ├── prompts
│   │   ├── schemas
│   │   └── main.py
│   │
│   ├── chroma_db
│   └── requirements.txt
│
├── frontend
│   ├── src
│   ├── public
│   └── package.json
│
└── README.md
```

---

# 🚀 Installation

## Clone the repository

```bash
git clone https://github.com/yourusername/repoprep-ai.git
cd repoprep-ai
```

## Backend Setup

```bash
cd backend

python -m venv venv

# Windows
venv\Scripts\activate

# Linux/Mac
source venv/bin/activate

pip install -r requirements.txt
```

Create a `.env` file inside the backend directory:

```env
GROQ_API_KEY=your_groq_api_key
```

Run the backend:

```bash
uvicorn app.main:app --reload
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

# 📸 Workflow

```
GitHub Repository
        │
        ▼
Repository Cloning
        │
        ▼
Code Scanner
        │
        ▼
Document Loader
        │
        ▼
Text Chunking
        │
        ▼
Embeddings
        │
        ▼
Chroma Vector Store
        │
        ▼
Retriever (MMR)
        │
        ▼
Groq LLM
        │
        ▼
Summary • Q&A • Interview • Resume Assistant
```

---

# 💡 Future Improvements

* Support private GitHub repositories.
* Multi-repository knowledge base.
* Voice-based mock interviews.
* PDF interview reports.
* Repository comparison.
* Team collaboration dashboard.
* Conversation history.
* Code visualization and dependency graphs.

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository.
2. Create a new feature branch.
3. Commit your changes.
4. Push to your branch.
5. Open a Pull Request.

---

# 📜 License

This project is licensed under the MIT License.

---

# 👩‍💻 Author

**Dhanashree Chandekar**

If you found this project useful, consider giving it a ⭐ on GitHub!
