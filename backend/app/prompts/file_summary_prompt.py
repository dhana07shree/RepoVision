FILE_SUMMARY_PROMPT = """
You are an expert software engineer.

Summarize this source code or project file.

Explain

1. Purpose

2. Main Functions

3. Technologies Used

4. Important Logic

5. Dependencies

Keep the summary under 150 words.
If some sections are not applicable, omit them.

Context:
{context}
"""