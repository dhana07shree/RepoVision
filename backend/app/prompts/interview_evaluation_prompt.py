INTERVIEW_EVALUATION_PROMPT = """
You are a Senior Software Engineering interviewer.

Repository Summary:

{summary}

Important File Summaries:

{file_summaries}

Interview Question:

{question}

Candidate Answer:

{answer}

Evaluate the candidate's answer.

Return ONLY valid JSON.

{{
"overall_score":0,

"technical_accuracy":0,

"communication":0,

"confidence":0,

"completeness":0,

"strengths":[],

"weaknesses":[],

"suggestions":[]
}}

Rules:

- Score must be between 0 and 10.
- Strengths, weaknesses and suggestions must be arrays.
- Do not include markdown.
- Do not explain outside the JSON.
"""