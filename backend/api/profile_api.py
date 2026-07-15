from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from pydantic import BaseModel

from backend.database.db import get_db
from backend.database.crud import (
    get_resume,
    get_user_by_id,
    update_profile
)


from backend.auth.dependencies import get_current_user
from backend.models.user import User

router = APIRouter(
    prefix="/api/profile",
    tags=["Profile"]
)


@router.get("/")
def get_profile(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    user = get_user_by_id(
        db,
        current_user.id
    )

    resume = get_resume(
        db,
        current_user.id
    )

    if resume:
        skills = []

        if resume.skills:
            skills = [
                skill.strip()
                for skill in resume.skills.split(",")
            ]

        resume_data = {
            "full_name": resume.full_name,
            "email": resume.email,
            "phone": resume.phone,
            "education": resume.education,
            "experience": resume.experience,
            "skills": skills,
            "ats_score": resume.ats_score
        }

    else:
        resume_data = None

    return {
        "success": True,
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email
        },
        "resume": resume_data
    }


class UpdateProfileRequest(BaseModel):

    name: str

    phone: str

@router.put("/")
def edit_profile(

    data: UpdateProfileRequest,

    db: Session = Depends(get_db),

    current_user: User = Depends(get_current_user)

):

    user = update_profile(

        db=db,

        user_id=current_user.id,

        name=data.name,

        phone=data.phone,


    )

    if not user:

        return {
            "success": False,
            "message": "User not found"
        }

    return {
        "success": True,
        "message": "Profile updated successfully"
    }

 