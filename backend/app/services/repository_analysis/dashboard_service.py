from app.services.repository_analysis.summary_service import generate_summary


def generate_dashboard(repository):

    summary = repository.summary

    dashboard = {

       "statistics": {

            "files": len(repository.documents),

            "documents": len(repository.documents),

            "chunks": len(repository.chunks),

            "languages_detected": len(summary.programming_languages),

            "frameworks_detected": len(summary.frameworks)

        },

        "analysis": summary

    }

    return dashboard