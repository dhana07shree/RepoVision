import uuid


interview_sessions = {}


def create_session(
    repository_name: str,
    total_questions: int
):

    session_id = str(uuid.uuid4())

    interview_sessions[session_id] = {

    "repository": repository_name,

    "status": "ACTIVE",

    "total_questions": total_questions,

    "current_question": 0,

    "questions": [],

    "answers": [],

    "evaluations": [],

    "asked_categories": [],

    "difficulty": "Medium",

    "total_score": 0,

    "report": None

    }

    return session_id


def get_session(session_id: str):

    return interview_sessions.get(session_id)


def save_session(
    session_id: str,
    session
):

    interview_sessions[session_id] = session


def delete_session(session_id: str):

    if session_id in interview_sessions:

        del interview_sessions[session_id]