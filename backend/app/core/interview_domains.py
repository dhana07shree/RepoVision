COMMON_DOMAINS = [

    "Project Overview",

    "System Architecture",

    "Core Implementation",

    "Design Decisions",

    "API Design",

    "Performance and Optimization",

    "Security and Error Handling",

    "Testing and Debugging",

    "Scalability and Future Improvements",

    "Resume Discussion"

]


def build_interview_domains(repository):

    domains = COMMON_DOMAINS.copy()

    for component in repository.summary.specialized_components:

        component = component.strip()

        if not component:
            continue

        if component.lower() in [d.lower() for d in domains]:
            continue

        domains.append(component)

    return sorted(domains)