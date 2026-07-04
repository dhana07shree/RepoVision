REPOSITORY_KEYWORDS = {

    "project",

    "feature",

    "features",

    "architecture",

    "overview",

    "summary",

    "workflow",

    "tech stack",

    "framework",

    "library",

    "libraries",

    "deployment"

}


def classify_question(question: str):

    question = question.lower()

    for keyword in REPOSITORY_KEYWORDS:

        if keyword in question:

            return "repository"

    return "code"