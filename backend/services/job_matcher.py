from backend.services.ai_keyword_service import generate_ai_keywords
from backend.services.adzuna_service import search_adzuna
from backend.services.arbeitnow_service import search_arbeitnow


def remove_duplicates(jobs):
    """
    Remove duplicate jobs using title + company.
    """

    unique = {}

    for job in jobs:

        key = (
            job["title"].lower().strip(),
            job["company"].lower().strip()
        )

        if key not in unique:
            unique[key] = job

    return list(unique.values())


def calculate_match_score(job, skills):
    """
    Simple keyword matching.
    Returns score out of 100.
    """

    text = (
        job.get("title", "") +
        " " +
        job.get("description", "")
    ).lower()

    score = 0

    for skill in skills:

        if skill.lower() in text:
            score += 15

    return min(score, 100)


def recommend_jobs(
    skills,
    education="",
    experience="",
    location="India"
):

    keywords = generate_ai_keywords(
        skills,
        education,
        experience
    )

    if not keywords:
        keywords = skills

    all_jobs = []

    for keyword in keywords:

        all_jobs.extend(
            search_adzuna(
                keyword,
                location
            )
        )

        all_jobs.extend(
            search_arbeitnow(
                keyword
            )
        )

    all_jobs = remove_duplicates(all_jobs)

    for job in all_jobs:

        job["match_score"] = calculate_match_score(
            job,
            skills
        )

    all_jobs.sort(
        key=lambda x: x["match_score"],
        reverse=True
    )

    return all_jobs[:50]