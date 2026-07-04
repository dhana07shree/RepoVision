from fastapi import APIRouter, HTTPException

from app.database.repository_store import get_repository

from app.database.interview_session import (
    create_session,
    get_session,
    save_session
)

from app.schemas.interview import InterviewStartRequest
from app.schemas.interview import InterviewAnswerRequest

from app.services.interview.question_generator import generate_question
from app.services.interview.report_generator import generate_report
from app.services.interview.evaluator import evaluate_answer

from app.core.interview_categories import ALL_CATEGORIES
router = APIRouter()


@router.post("/interview/start")
def start_interview(request: InterviewStartRequest):

    repository = get_repository(
        request.repository
    )

    if repository is None:

        raise HTTPException(
            status_code=404,
            detail="Repository not found."
        )

    session_id = create_session(
        request.repository,
        request.number_of_questions
    )

    session = get_session(session_id)

    remaining_categories = ALL_CATEGORIES.copy()

    next_question = generate_question(

    repository,

    session["questions"],

    session["asked_categories"],

    remaining_categories,

    session["difficulty"]

    )

    session["questions"].append(

    next_question.question

    )

    session["asked_categories"].append(

    next_question.category

    )

    session["current_question"] = 1

    save_session(
        session_id,
        session
    )

    return {

        "session_id": session_id,

        "question": next_question,

        "current_question": 1,

        "total_questions": session["total_questions"]

    }





@router.post("/interview/answer")
def answer_question(
    request: InterviewAnswerRequest
):
    
    session = get_session(
    request.session_id
    )
    if session is None:
        raise HTTPException(
        status_code=404,
        detail="Interview session not found."
        )
    
    question = session["questions"][-1]
    
    repository = get_repository(
    session["repository"]
    )

    if repository is None:
        raise HTTPException(
        status_code=404,
        detail="Repository not found."
        )
    
    evaluation = evaluate_answer(

    repository,

    question,

    request.answer

    )
    score = evaluation.overall_score

    if score >= 8:

     session["difficulty"] = "Hard"

    elif score <= 4:

     session["difficulty"] = "Easy"

    else:

     session["difficulty"] = "Medium"


    session["answers"].append(

    request.answer

    )

    session["evaluations"].append(

    evaluation
    )

    session["total_score"] += evaluation.overall_score

    # average_score = (
    # session["total_score"]/len(session["evaluations"])
    # )
    
    remaining_categories = [

    category

    for category in ALL_CATEGORIES

    if category not in session["asked_categories"]

    ]

    if session["current_question"] >= session["total_questions"]:
        report = generate_report(

         repository,

         session

        )

        session["report"] = report

        session["status"] = "COMPLETED"

        save_session(
          request.session_id,
          session
        )

        return {

         "completed": True,

         "report": report

        }
    else:
        

     remaining_categories = [

        category

        for category in ALL_CATEGORIES

        if category not in session["asked_categories"]

    ]

    if not remaining_categories:

        remaining_categories = ALL_CATEGORIES.copy()

    next_question = generate_question(

        repository,

        session["questions"],

        session["asked_categories"],

        remaining_categories,

        session["difficulty"]

    )

    session["questions"].append(
        next_question.question
    )

    session["asked_categories"].append(
        next_question.category
    )

    session["current_question"] += 1

    save_session(
        request.session_id,
        session
    )

    return {

        "completed": False,

        "evaluation": evaluation,

        "next_question": next_question,

        "current_question": session["current_question"],

        "total_questions": session["total_questions"]

    }
    

@router.post("/interview/stop")
def stop_interview(session_id: str):

    session = get_session(
        session_id
    )

    if session is None:

        raise HTTPException(

            status_code=404,

            detail="Interview session not found."

        )

    repository = get_repository(
        session["repository"]
    )

    report = generate_report(

        repository,

        session

    )

    session["status"] = "COMPLETED"

    session["report"] = report

    save_session(

        session_id,

        session

    )

    return {

        "completed": True,

        "report": report

    }