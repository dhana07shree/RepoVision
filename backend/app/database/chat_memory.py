from langchain_core.messages import HumanMessage, AIMessage

chat_memory = {}


def get_chat_history(repository_name):

    if repository_name not in chat_memory:

        chat_memory[repository_name] = []

    return chat_memory[repository_name]