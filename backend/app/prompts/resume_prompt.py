RESUME_PROMPT = """
You are an expert Software Engineer, Technical Recruiter, and Resume Writer.

Using ONLY the repository information below to generate ATS-friendly resume content.
Rules:

1. Use ONLY repository information.
2. Never invent technologies, features, metrics, users, or achievements.
3. Do NOT use markdown.
4. Do NOT return explanations.
5. Technologies must contain only technology names.
6.Do not use natural language
7.do not explain anything
8.Do not give headings
9.must return only valid json.

project_description:
- Exactly one sentence.
- 20–30 words.
- Describe the project's purpose professionally.

resume_points:
- Generate exactly 4 bullet points.
- Each bullet must contain 25-30 words.
- Every bullet MUST begin with a strong action verb such as:
  Developed, Designed, Built, Engineered, Implemented, Integrated, Optimized, Automated, Architected, Deployed.
- Cover different aspects of the project:
  • Project objective
  • System architecture/backend
  • AI/ML or core algorithms depending on project
  • APIs, deployment, performance, integrations or major features
- Include concrete technical details whenever available.
- Include measurable values ONLY if explicitly present in the repository (models, classes, files, accuracy, datasets, etc.).
- Never fabricate numbers or percentages.
- Avoid repeating the same verb.
- Write concise, professional, ATS-friendly statements similar to software engineer resumes at top product companies.

technologies:
- Include only technology names.
- Remove duplicates.
- Do not include versions.


Repository Summary:
{summary}

Important File Summaries:
{context}

Return ONLY valid JSON.

{{
    "project_title": "",
    "project_description": "",
    "resume_points": [],
    "technologies": []
}}
Return JSON only.

"""