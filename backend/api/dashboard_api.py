from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from backend.database.db import get_db
from backend.auth.dependencies import get_current_user
from backend.models.user import User
from backend.database.crud import get_dashboard_stats

from backend.database.crud import (
    get_resume,
    get_saved_jobs,
    get_user_applications,
    get_dashboard_stats
)

router = APIRouter(
    prefix="/api/dashboard",
    tags=["Dashboard"]
)




@router.get("/")
def dashboard(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    resume = get_resume(
        db,
        current_user.id
    )

    saved_jobs = get_saved_jobs(
        db,
        current_user.id
    )

    applications = get_user_applications(
        db,
        current_user.id
    )

    stats = get_dashboard_stats(
    db,
    current_user.id
    )

    return {
        "success": True,

        "user": {
            "id": current_user.id,
            "name": current_user.name,
            "email": current_user.email
        },

        "resume": {
            "full_name": resume.full_name if resume else None,
            "email": resume.email if resume else None,
            "phone": resume.phone if resume else None,
            "ats_score": resume.ats_score if resume else 0
        },

        "stats": stats,

        "latest_saved_jobs": [
            {
                "id": job.id,
                "job_title": job.job_title,
                "company": job.company
            }
            for job in saved_jobs[:5]
        ],

        "latest_applications": [
            {
                "id": app.id,
                "job_title": app.job_title,
                "company": app.company,
                "status": app.status
            }
            for app in applications[:5]
        ]
    }