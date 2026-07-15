from fastapi import APIRouter, Depends, BackgroundTasks
from fastapi.security import OAuth2PasswordRequestForm
from pydantic import BaseModel
from sqlalchemy.orm import Session

from backend.database.db import get_db
from backend.auth.auth import signup, login, reset_password
from backend.auth.otp import save_otp, verify_otp
from backend.auth.email_service import send_otp_email

router = APIRouter(
    prefix="/api/auth",
    tags=["Authentication"]
)


# -----------------------------
# Request Models
# -----------------------------

class SignupRequest(BaseModel):
    name: str
    email: str
    password: str


class OTPRequest(BaseModel):
    email: str


class VerifyOTPRequest(BaseModel):
    email: str
    otp: str

class ResetPasswordRequest(BaseModel):

    email: str

    password: str


# -----------------------------
# Send OTP
# -----------------------------

@router.post("/send-otp")
async def send_otp(
    data: OTPRequest,
    background_tasks: BackgroundTasks
):

    otp = save_otp(data.email)

    background_tasks.add_task(
        send_otp_email,
        data.email,
        otp
    )

    return {
        "success": True,
        "message": "OTP Sent Successfully"
    }


# -----------------------------
# Verify OTP
# -----------------------------

from fastapi import HTTPException

@router.post("/verify-otp")
def verify_email(data: VerifyOTPRequest):

    valid = verify_otp(
        data.email,
        data.otp
    )

    if not valid:
        raise HTTPException(
            status_code=400,
            detail="Invalid or Expired OTP"
        )

    return {
        "success": True,
        "message": "Email Verified Successfully"
    }


# -----------------------------
# Signup
# -----------------------------

@router.post("/signup")
def signup_user(
    data: SignupRequest,
    db: Session = Depends(get_db)
):

    return signup(
        db,
        data.name,
        data.email,
        data.password
    )


# -----------------------------
# Login
# -----------------------------

@router.post("/login")
def login_user(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):

    return login(
        db,
        form_data.username,
        form_data.password
    )

@router.post("/reset-password")
def reset_user_password(

    data: ResetPasswordRequest,

    db: Session = Depends(get_db)

):

    return reset_password(

        db,

        data.email,

        data.password

    )