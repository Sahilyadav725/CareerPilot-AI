from fastapi import APIRouter, Depends, Body
from sqlalchemy.orm import Session

from backend.database.db import get_db
from backend.auth.dependencies import get_current_user
from backend.models.user import User

from backend.services.job_matcher import recommend_jobs
from backend.database.crud import save_job
from backend.database.crud import (
    get_resume,
    mark_job_visited,
    mark_job_applied,
    is_job_saved,
    is_job_applied,
)

router = APIRouter(
    prefix="/api/jobs",
    tags=["Jobs"]
)


@router.get("/search")
def get_jobs(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    resume = get_resume(db, current_user.id)

    if resume is None:
        return {
            "success": False,
            "message": "Please upload your resume first."
        }

    skills = []

    if resume.skills:
        skills = [
            skill.strip()
            for skill in resume.skills.split(",")
        ]

    education = getattr(resume, "education", "")

    experience = getattr(resume, "experience", "")

    jobs = recommend_jobs(
        skills=skills,
        education=education,
        experience=experience,
    )

    for job in jobs:

        job["saved"] = is_job_saved(
            db,
            current_user.id,
            job["title"],
            job["company"]
        )

        job["applied"] = is_job_applied(
            db,
            current_user.id,
            job["title"],
            job["company"]
        )

    return {

        "success": True,

        "skills_detected": skills,

        "ai_roles": (
            resume.ai_keywords.split(",")
            if getattr(resume, "ai_keywords", None)
            else []
        ),

        "count": len(jobs),

        "jobs": jobs

    }


@router.post("/visit")
def visit_job(
    data: dict = Body(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    mark_job_visited(

        db=db,

        user_id=current_user.id,

        title=data["title"],

        company=data["company"],

        location=data.get("location", ""),

        url=data.get("job_url", "")

    )

    return {

        "success": True,

        "message": "Job marked as visited."

    }

@router.post("/save")
def save_job_api(
    data: dict = Body(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    job = save_job(

        db=db,

        user_id=current_user.id,

        job_title=data["title"],

        company=data["company"],

        location=data.get("location", ""),

        job_url=data.get("job_url", "")

    )

    if job is None:

        return {

            "success": False,

            "message": "Job already saved."

        }

    return {

        "success": True,

        "message": "Job saved successfully."

    }


@router.post("/mark-applied")
def apply_job(
    data: dict = Body(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    job = mark_job_applied(

        db=db,

        user_id=current_user.id,

        title=data["title"],

        company=data["company"]

    )

    if not job:

        return {

            "success": False,

            "message": "Job not found."

        }

    return {

        "success": True,

        "message": "Job marked as applied."

    }