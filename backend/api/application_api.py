from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session

from backend.database.db import get_db
from backend.database.crud import (
    create_application,
    get_user_applications,
    update_application_status,
    delete_application,
    get_resume,
    create_notification
)

from backend.auth.dependencies import get_current_user
from backend.models.user import User


router = APIRouter(
    prefix="/api/application",
    tags=["Applications"]
)


class ApplyRequest(BaseModel):
    job_title: str
    company: str
    location: str
    job_url: str


class StatusRequest(BaseModel):
    status: str


@router.post("/apply")
def apply_job(
    data: ApplyRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    resume = get_resume(
        db,
        current_user.id
    )

    if not resume:
        return {
            "success": False,
            "message": "Upload resume first"
        }

    application = create_application(
        db=db,
        user_id=current_user.id,
        resume_id=resume.id,
        job_title=data.job_title,
        company=data.company,
        location=data.location,
        job_url=data.job_url
    )

    if application is None:
        return {
            "success": False,
            "message": "You have already applied for this job."
        }

    # ==========================
    # CREATE NOTIFICATION
    # ==========================

    create_notification(
        db=db,
        user_id=current_user.id,
        title="Job Applied",
        message=f"You applied for {data.job_title} at {data.company}.",
        type="application"
    )

    return {
        "success": True,
        "application_id": application.id,
        "message": "Job marked as applied successfully."
    }


@router.get("/my")
def my_applications(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    applications = get_user_applications(
        db,
        current_user.id
    )

    return {
        "success": True,
        "count": len(applications),
        "applications": [
            {
                "id": app.id,
                "job_title": app.job_title,
                "company": app.company,
                "location": app.location,
                "job_url": app.job_url,
                "status": app.status,
                "applied_date": app.applied_date,
                "notes": app.notes
            }
            for app in applications
        ]
    }


@router.put("/status/{application_id}")
def change_status(
    application_id: int,
    data: StatusRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    application = update_application_status(
        db=db,
        user_id=current_user.id,
        application_id=application_id,
        status=data.status
    )

    if not application:
        return {
            "success": False,
            "message": "Application not found"
        }

    return {
        "success": True,
        "message": "Application status updated"
    }


@router.delete("/{application_id}")
def remove_application(
    application_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    success = delete_application(
        db=db,
        user_id=current_user.id,
        application_id=application_id
    )

    if not success:
        return {
            "success": False,
            "message": "Application not found"
        }

    return {
        "success": True,
        "message": "Application deleted successfully"
    }