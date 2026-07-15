import os
import shutil
import uuid
from fastapi import HTTPException

from fastapi import APIRouter, UploadFile, File, Depends
from sqlalchemy.orm import Session

from backend.database.db import get_db
from backend.database.crud import (
    create_resume,
    update_resume_analysis,
    create_notification
)

from backend.ai.resume_parser import parse_resume
from backend.ai.ats_analyzer import calculate_ats_score
import json
from backend.ai.ai_resume_generator import generate_ai_resume
from backend.auth.dependencies import get_current_user
from backend.models.user import User
from backend.ai.ai_resume_generator import generate_ai_resume
from pydantic import BaseModel

router = APIRouter(
    prefix="/api/resume",
    tags=["Resume"]
)

class AIResumeRequest(BaseModel):
    resume: dict
    education: list
    experience: list
    projects: list
    skills: list
    certificates: list

@router.post("/upload")
def upload_resume(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    # Create User Folder
    BASE_DIR = os.path.dirname(os.path.dirname(__file__))

    UPLOAD_DIR = os.path.join(
        BASE_DIR,
        "uploads",
        "resume"
    )

    user_folder = os.path.join(
        UPLOAD_DIR,
        str(current_user.id)
    )

    os.makedirs(
        user_folder,
        exist_ok=True
    )

    print("Saving Resume To :", user_folder)

    # File Path
    allowed_extensions = [".pdf", ".doc", ".docx"]

    extension = os.path.splitext(file.filename)[1].lower()

    if extension not in allowed_extensions:
        raise HTTPException(
            status_code=400,
            detail="Only PDF, DOC and DOCX files are allowed."
        )

    unique_filename = f"{uuid.uuid4().hex}{extension}"

    file_path = os.path.join(
        user_folder,
        unique_filename
    )

    # Save Resume
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(
            file.file,
            buffer
        )

    # Parse Resume
    parsed_data = parse_resume(file_path)

    # Save Resume to Database
    resume = create_resume(
        db=db,
        user_id=current_user.id,
        file_name=file.filename,
        file_path=file_path,
        parsed_data=parsed_data
    )

    # Calculate ATS Score
    analysis = calculate_ats_score(parsed_data)

    # Save ATS Result
    update_resume_analysis(
        db=db,
        resume_id=resume.id,
        ats_score=analysis["ats_score"],
        suggestions=", ".join(analysis["suggestions"])
        
    )

    # ==============================
    # CREATE NOTIFICATIONS
    # ==============================

    create_notification(
        db=db,
        user_id=current_user.id,
        title="Resume Uploaded",
        message=f"{resume.file_name} uploaded successfully.",
        type="resume"
    )

    create_notification(
        db=db,
        user_id=current_user.id,
        title="ATS Score Updated",
        message=f"Your ATS Score is {analysis['ats_score']}%",
        type="ats"
    )

    return {
        "success": True,

        "resume_id": resume.id,

        "user_id": current_user.id,

        "file_name": resume.file_name,

        "parsed_data": {
            "full_name": parsed_data.get("full_name"),
            "email": parsed_data.get("email"),
            "phone": parsed_data.get("phone"),
            "skills": parsed_data.get("skills"),
            "education": parsed_data.get("education"),
            "experience": parsed_data.get("experience")
        },

        "ats_score": analysis["ats_score"],

        "suggestions": analysis["suggestions"],

        "section_score": analysis["section_score"],
    }

@router.post("/generate-ai")
def generate_resume_ai(
    data: AIResumeRequest,
    current_user: User = Depends(get_current_user)
):

    improved_resume = generate_ai_resume(
        resume=data.resume,
        education=data.education,
        experience=data.experience,
        projects=data.projects,
        skills=data.skills,
        certificates=data.certificates
    )

    return {
        "success": True,
        "resume": improved_resume
    }

@router.post("/generate-ai")
def generate_resume_ai(
    data: AIResumeRequest,
    current_user: User = Depends(get_current_user)
):

    try:

        ai_response = generate_ai_resume({

            "resume": data.resume,

            "education": data.education,

            "experience": data.experience,

            "projects": data.projects,

            "skills": data.skills,

            "certificates": data.certificates

        })

        # Remove Markdown if Groq returns ```json

        ai_response = ai_response.replace("```json", "")
        ai_response = ai_response.replace("```", "")
        ai_response = ai_response.strip()

        result = json.loads(ai_response)

        return {

            "success": True,

            "resume": result

        }

    except Exception as e:

        print(e)

        return {

            "success": False,

            "message": str(e)

        }