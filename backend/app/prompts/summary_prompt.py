
SUMMARY_PROMPT = """
You are an expert Software Architect.

Your task is to extract repository information.

The following context contains summaries of important files from the repository.

Infer the overall architecture from these summaries.
Repository File Summaries

{context}

Return ONLY one valid JSON object.

Do NOT write:

- explanations
- observations
- recommendations
- markdown
- code blocks
- introductory text
- concluding text

Return ONLY this JSON object.

{{
    "project_title":"",
    "project_objective":"",
    "programming_languages":[],
    "frameworks":[],
    "libraries":[],
    "folder_structure":"",
    "major_features":[],
    "specialized_components":[],
    "apis":[],
    "database":"",
    "authentication":"",
    "deployment":"",
    "overall_architecture":""
}}

Rules:

- Do not add any keys.
- Do not remove any keys.
- String fields must contain strings.
- List fields must contain arrays.
- If unknown:
  - string -> "Not Found"
  - list -> []

Your response must start with {{
and end with }}.
"""