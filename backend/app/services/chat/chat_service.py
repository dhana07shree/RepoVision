from langchain_core.prompts import ChatPromptTemplate
from app.services.repository_analysis.summary_service import generate_summary
from app.services.chat.question_classifier import classify_question

from app.core.llm import llm

from app.prompts.chat_prompt import CHAT_PROMPT

from langchain_core.messages import HumanMessage, AIMessage

from app.database.chat_memory import get_chat_history

from app.core.config import MAX_CHAT_HISTORY


prompt = ChatPromptTemplate.from_template(

    CHAT_PROMPT

)


chain = prompt | llm


def ask_repository(repository_name ,repository, question):

    summary = repository.summary
    
    summary_text = repository.summary_as_text()

    chat_history = get_chat_history(
    repository_name
    )
    question_type = classify_question(question)
    if question_type == "repository":

      context = f"""

      Repository Summary

      {repository.summary_as_text()}

      Important File Summaries

      {repository.file_summaries}

      """

    else:

      documents = repository.retriever.invoke(question)
 
      retrieved_chunks = "\n\n".join(

        document.page_content

        for document in documents

      )

      context = f"""
 
       Repository Summary

       {repository.summary_as_text()}

       Important File Summaries

       {repository.file_summaries}

       Relevant Code

       {retrieved_chunks}

    """
    response = chain.invoke(

        {   
            "history": chat_history,

            "summary": summary_text,

            "context": context,

            "question": question

        }

    )

    chat_history.append(
    HumanMessage(
        content=question
    )
    )

    chat_history.append(
    AIMessage(
        content=response.content
    )
    )


    

    if len(chat_history) > MAX_CHAT_HISTORY:

       chat_history[:] = chat_history[-MAX_CHAT_HISTORY:]


    return response.content