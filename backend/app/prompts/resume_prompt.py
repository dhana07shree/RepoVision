RESUME_PROMPT = """
You are an expert Software Engineer, Staff Engineer, Technical Recruiter and Resume Writer from Google, Meta and Microsoft.

Your task is to generate HIGH-QUALITY SOFTWARE ENGINEERING RESUME CONTENT from the given GitHub repository.

The output should look similar to resume bullet points written by experienced software engineers at top product companies.

=========================================================
STRICT RULES
=========================================================

Use ONLY information that can be derived from the repository.

Never invent

• users
• revenue
• downloads
• latency improvements
• accuracy improvements
• benchmark scores
• percentages
• business impact

However, you MAY use repository-derived engineering metrics such as

• number of source files
• number of modules
• number of REST APIs
• number of workflows
• number of datasets
• number of classes
• number of supported features
• number of technologies
• model architecture
• deployment platform
• repository pipeline
• supported components

If exact values are available, use them.

If counts can be determined from the repository structure, use them.

Do not fabricate values that cannot be inferred.

=========================================================
PROJECT DESCRIPTION
=========================================================

Generate ONE sentence.

20-30 words.

Describe

• project purpose

• engineering objective

• overall implementation

=========================================================
RESUME BULLETS
=========================================================

Generate EXACTLY FOUR bullet points.

Each bullet must contain approximately 30–40 words.

Each bullet MUST start with a different strong action verb.

Examples

Developed

Engineered

Implemented

Designed

Architected

Integrated

Built

Optimized

Automated

Deployed

=========================================================
STYLE
=========================================================

The bullet points should resemble this style:

Developed an AI-powered data analytics platform leveraging NLP and LLMs to convert natural language queries into SQL, enabling self-service analysis of structured datasets.

Engineered automated schema inference and relationship detection across multiple database tables supporting complex analytical workflows.

Built a scalable FastAPI backend integrating LangChain orchestration, Groq-hosted LLMs and persistent storage for end-to-end AI-assisted query generation.

Implemented modular AI pipelines with reusable services, semantic retrieval and production-ready architecture following software engineering best practices.

=========================================================
EACH BULLET SHOULD COVER A DIFFERENT AREA
=========================================================

Bullet 1

Overall project objective

Main engineering problem solved

Core technologies

Bullet 2

Architecture

Backend

Modules

Pipeline

Engineering design

Bullet 3

Core AI / ML / Algorithms

Retrieval

Inference

Optimization

Prompt engineering

Data processing

Bullet 4

Deployment

REST APIs

Integrations

Scalability

Production readiness

Reusable architecture

=========================================================
IMPORTANT
=========================================================

Every bullet should include implementation details instead of generic statements.

Mention important technologies naturally.

Avoid repeating technologies in multiple bullets.

Avoid buzzwords.

Avoid generic phrases like

"Built a web application"

"Developed backend"

"Implemented AI"

Instead explain WHAT was engineered.

=========================================================
TECHNOLOGIES
=========================================================

Return only technology names.

Remove duplicates.

No explanations.

=========================================================
Repository Summary

{summary}

Important File Summaries

{context}

Return ONLY valid JSON.

{{
    "project_title":"",
    "project_description":"",
    "resume_points":[],
    "technologies":[]
}}
"""