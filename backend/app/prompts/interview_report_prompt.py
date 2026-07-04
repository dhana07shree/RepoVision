INTERVIEW_REPORT_PROMPT = """
You are a Senior Software Engineering Interviewer.

Repository Summary:

{summary}

Important File Summaries:

{file_summaries}

Interview Questions:

{questions}

Candidate Answers:

{answers}

Evaluations:

{evaluations}

Generate the final interview report.

Return ONLY valid JSON.

{{

"overall_score":0,

"technical_accuracy":0,

"communication":0,

"confidence":0,

"completeness":0,

"strengths":[],

"weaknesses":[],

"improvements":[],

"hiring_recommendation":"",

"final_feedback":""


}}

Rules:

- overall_score must be between 0 and 10.
- strengths, weaknesses and improvements must be arrays.
- final_feedback should be 3-5 concise sentences.
- Do not write markdown.
- Do not explain outside the JSON.
"""