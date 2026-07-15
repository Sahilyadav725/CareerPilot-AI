from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session

from backend.database.db import get_db

from backend.database.crud import (
    save_job,
    get_saved_jobs,
    delete_saved_job,
    create_notification
)

from backend.auth.dependencies import get_current_user
from backend.models.user import User


router = APIRouter(
    prefix="/api/jobs",
    tags=["Saved Jobs"]
)


class SaveJobRequest(BaseModel):
    job_title: str
    company: str
    location: str
    job_url: str


@router.post("/save")
def save_job_api(
    data: SaveJobRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    job = save_job(
        db=db,
        user_id=current_user.id,
        job_title=data.job_title,
        company=data.company,
        location=data.location,
        job_url=data.job_url
    )

    if job is None:
        return {
            "success": False,
            "message": "Job already saved."
        }

    # ==========================
    # CREATE NOTIFICATION
    # ==========================

    create_notification(
        db=db,
        user_id=current_user.id,
        title="Job Saved",
        message=f"{data.job_title} at {data.company} has been saved.",
        type="saved_job"
    )

    return {
        "success": True,
        "saved_job_id": job.id,
        "message": "Job saved successfully."
    }


@router.get("/saved")
def get_saved_jobs_api(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    jobs = get_saved_jobs(
        db,
        current_user.id
    )

    return {
        "success": True,
        "count": len(jobs),
        "jobs": [
            {
                "id": job.id,
                "job_title": job.job_title,
                "company": job.company,
                "location": job.location,
                "job_url": job.job_url,
                "saved_date": job.saved_date
            }
            for job in jobs
        ]
    }


@router.delete("/saved/{saved_job_id}")
def delete_saved_job_api(
    saved_job_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    success = delete_saved_job(
        db=db,
        user_id=current_user.id,
        saved_job_id=saved_job_id
    )

    if not success:
        return {
            "success": False,
            "message": "Saved Job not found."
        }

    return {
        "success": True,
        "message": "Saved Job removed successfully."
    }