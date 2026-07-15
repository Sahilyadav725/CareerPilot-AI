from sqlalchemy.orm import Session

from backend.models.user import User
from backend.models.resume import Resume
from backend.models.notification import Notification
from backend.models.saved_job import SavedJob


def mark_job_visited(
    db,
    user_id,
    title,
    company,
    redirect_url=""
):

    job = db.query(SavedJob).filter(
        SavedJob.user_id == user_id,
        SavedJob.title == title,
        SavedJob.company == company
    ).first()

    if job:

        if job.application_status == "not_applied":
            job.application_status = "visited"

    else:

        job = SavedJob(

            user_id=user_id,

            title=title,

            company=company,

            redirect_url=redirect_url,

            application_status="visited"

        )

        db.add(job)

    db.commit()

    return job

from datetime import datetime

def mark_job_applied(
    db,
    user_id,
    title,
    company
):

    job = db.query(SavedJob).filter(
        SavedJob.user_id == user_id,
        SavedJob.job_title == title,
        SavedJob.company == company
    ).first()

    if not job:
        return None

    job.application_status = "applied"
    job.applied_date = datetime.utcnow()

    db.commit()
    db.refresh(job)

    return job


# ==========================
# USER FUNCTIONS
# ==========================

def create_user(db: Session, name: str, email: str, password: str):
    user = User(
        name=name,
        email=email,
        password=password
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return user


def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()


def get_user_by_id(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()

def update_user_password(
    db: Session,
    email: str,
    new_password: str
):

    user = (
        db.query(User)
        .filter(User.email == email)
        .first()
    )

    if not user:
        return None

    user.password = new_password

    db.commit()

    db.refresh(user)

    return user


# ==========================
# RESUME FUNCTIONS
# ==========================

def create_resume(
    db: Session,
    user_id: int,
    file_name: str,
    file_path: str,
    parsed_data: dict
):
    resume = Resume(
        user_id=user_id,
        file_name=file_name,
        file_path=file_path,
        full_name=parsed_data.get("full_name"),
        email=parsed_data.get("email"),
        phone=parsed_data.get("phone"),
        skills=", ".join(parsed_data.get("skills", [])),
        education=", ".join(
            parsed_data.get("education", [])
        ),
        experience=parsed_data.get("experience")
    )

    db.add(resume)
    db.commit()
    db.refresh(resume)

    return resume


def get_resume(db: Session, user_id: int):
    return (
        db.query(Resume)
        .filter(Resume.user_id == user_id)
        .order_by(Resume.id.desc())
        .first()
    )




def update_resume_analysis(
    db,
    resume_id,
    ats_score,
    suggestions
):
    resume = db.query(Resume).filter(
        Resume.id == resume_id
    ).first()

    if not resume:
        return None

    resume.ats_score = ats_score
    resume.suggestions = suggestions

    db.commit()
    db.refresh(resume)

    return resume


# ==========================
# APPLICATION FUNCTIONS
# ==========================

from backend.models.application import Application


def create_application(
    db,
    user_id,
    resume_id,
    job_title,
    company,
    location,
    job_url
):
    # Duplicate Apply Check
    existing = (
        db.query(Application)
        .filter(
            Application.user_id == user_id,
            Application.job_url == job_url
        )
        .first()
    )

    if existing:
        return None

    # Remove from Saved Jobs (Pending)
    saved_job = (
        db.query(SavedJob)
        .filter(
            SavedJob.user_id == user_id,
            SavedJob.job_url == job_url
        )
        .first()
    )

    if saved_job:
        db.delete(saved_job)
        db.commit()

    application = Application(
        user_id=user_id,
        resume_id=resume_id,
        job_title=job_title,
        company=company,
        location=location,
        job_url=job_url,
        status="Applied",
        notes=""
    )

    db.add(application)
    db.commit()
    db.refresh(application)

    return application


def get_user_applications(
    db,
    user_id
):
    return (
        db.query(Application)
        .filter(Application.user_id == user_id)
        .order_by(Application.applied_date.desc())
        .all()
    )


def update_application_status(
    db,
    user_id,
    application_id,
    status
):

    application = (
        db.query(Application)
        .filter(
            Application.id == application_id,
            Application.user_id == user_id
        )
        .first()
    )

    if not application:
        return None

    application.status = status

    db.commit()
    db.refresh(application)

    # -------------------------
    # Auto Notification
    # -------------------------

    if status == "Interview":

        create_notification(
            db=db,
            user_id=user_id,
            title="Interview Scheduled",
            message=f"{application.company} scheduled your interview.",
            notification_type="Interview"
        )

    elif status == "Rejected":

        create_notification(
            db=db,
            user_id=user_id,
            title="Application Rejected",
            message=f"{application.company} rejected your application.",
            notification_type="Rejected"
        )

    elif status == "Offer":

        create_notification(
            db=db,
            user_id=user_id,
            title="Offer Letter",
            message=f"{application.company} sent you an offer.",
            notification_type="Offer"
        )

    elif status == "Shortlisted":

        create_notification(
            db=db,
            user_id=user_id,
            title="Shortlisted",
            message=f"You have been shortlisted by {application.company}.",
            notification_type="Shortlisted"
        )

    return application


def delete_application(
    db,
    user_id,
    application_id
):
    application = (
        db.query(Application)
        .filter(
            Application.id == application_id,
            Application.user_id == user_id
        )
        .first()
    )

    if not application:
        return False

    db.delete(application)
    db.commit()

    return True


# ==========================
# SAVED JOB FUNCTIONS
# ==========================

from backend.models.saved_job import SavedJob


def save_job(
    db,
    user_id,
    job_title,
    company,
    location,
    job_url
):
    existing = (
        db.query(SavedJob)
        .filter(
            SavedJob.user_id == user_id,
            SavedJob.job_url == job_url
        )
        .first()
    )

    if existing:
        return None

    job = SavedJob(
        user_id=user_id,
        job_title=job_title,
        company=company,
        location=location,
        job_url=job_url
    )

    db.add(job)
    db.commit()
    db.refresh(job)

    return job


def get_saved_jobs(
    db,
    user_id
):
    return (
        db.query(SavedJob)
        .filter(SavedJob.user_id == user_id)
        .all()
    )


def delete_saved_job(
    db,
    user_id,
    saved_job_id
):

    job = (
        db.query(SavedJob)
        .filter(
            SavedJob.id == saved_job_id,
            SavedJob.user_id == user_id
        )
        .first()
    )

    if not job:
        return False

    db.delete(job)
    db.commit()

    return True

def update_profile(
    db,
    user_id,
    name,
    phone,
    education,
    experience,
    skills
):

    user = (
        db.query(User)
        .filter(User.id == user_id)
        .first()
    )

    resume = (
        db.query(Resume)
        .filter(Resume.user_id == user_id)
        .order_by(Resume.id.desc())
        .first()
    )

    if not user:
        return None

    user.name = name

    if resume:
        resume.phone = phone
        resume.education = education
        resume.experience = experience
        resume.skills = ", ".join(skills)

    db.commit()

    db.refresh(user)

    if resume:
        db.refresh(resume)

    return user

# ==========================
# NOTIFICATION FUNCTIONS
# ==========================

from backend.models.notification import Notification


def create_notification(
    db,
    user_id,
    title,
    message,
    notification_type
):
    notification = Notification(
        user_id=user_id,
        title=title,
        message=message,
        type=notification_type
    )

    db.add(notification)
    db.commit()
    db.refresh(notification)

    return notification


def get_notifications(
    db,
    user_id
):
    return (
        db.query(Notification)
        .filter(Notification.user_id == user_id)
        .order_by(Notification.created_at.desc())
        .all()
    )


def mark_notification_read(
    db,
    notification_id,
    user_id
):

    notification = (
        db.query(Notification)
        .filter(
            Notification.id == notification_id,
            Notification.user_id == user_id
        )
        .first()
    )

    if not notification:
        return None

    notification.is_read = 1

    db.commit()
    db.refresh(notification)

    return notification


from backend.models.notification import Notification
from backend.models.saved_job import SavedJob
from backend.models.application import Application


def get_dashboard_stats(db, user_id):

    saved = (
        db.query(SavedJob)
        .filter(SavedJob.user_id == user_id)
        .count()
    )

    applied = (
        db.query(Application)
        .filter(Application.user_id == user_id)
        .count()
    )

    interviews = (
        db.query(Application)
        .filter(
            Application.user_id == user_id,
            Application.status == "Interview"
        )
        .count()
    )

    offers = (
        db.query(Application)
        .filter(
            Application.user_id == user_id,
            Application.status == "Offer"
        )
        .count()
    )

    rejected = (
        db.query(Application)
        .filter(
            Application.user_id == user_id,
            Application.status == "Rejected"
        )
        .count()
    )

    unread_notifications = (
        db.query(Notification)
        .filter(
            Notification.user_id == user_id,
            Notification.is_read == 0
        )
        .count()
    )

    return {
        "saved_jobs": saved,
        "applied_jobs": applied,
        "interviews": interviews,
        "offers": offers,
        "rejected": rejected,
        "unread_notifications": unread_notifications
    }

def is_job_saved(db, user_id, job_title, company):
    return (
        db.query(SavedJob)
        .filter(
            SavedJob.user_id == user_id,
            SavedJob.job_title == job_title,
            SavedJob.company == company
        )
        .first()
        is not None
    )


def is_job_applied(db, user_id, job_title, company):
    return (
        db.query(Application)
        .filter(
            Application.user_id == user_id,
            Application.job_title == job_title,
            Application.company == company
        )
        .first()
        is not None
    )


def update_profile(
    db,
    user_id,
    name,
    phone
):

    user = (
        db.query(User)
        .filter(User.id == user_id)
        .first()
    )

    resume = (
        db.query(Resume)
        .filter(Resume.user_id == user_id)
        .order_by(Resume.id.desc())
        .first()
    )

    if not user:
        return None

    user.name = name

    if resume:
        resume.phone = phone

    db.commit()

    db.refresh(user)

    if resume:
        db.refresh(resume)

    return user

# ==========================================
# NOTIFICATIONS
# ==========================================

from backend.models.notification import Notification


def create_notification(
    db: Session,
    user_id: int,
    title: str,
    message: str,
    type: str = "info"
):

    notification = Notification(
        user_id=user_id,
        title=title,
        message=message,
        type=type,
        is_read=0
    )

    db.add(notification)
    db.commit()
    db.refresh(notification)

    return notification


def get_notifications(
    db: Session,
    user_id: int
):

    return (
        db.query(Notification)
        .filter(Notification.user_id == user_id)
        .order_by(Notification.created_at.desc())
        .all()
    )


def mark_notification_read(
    db: Session,
    notification_id: int,
    user_id: int
):

    notification = (
        db.query(Notification)
        .filter(
            Notification.id == notification_id,
            Notification.user_id == user_id
        )
        .first()
    )

    if notification is None:
        return None

    notification.is_read = 1

    db.commit()
    db.refresh(notification)

    return notification


def mark_all_notifications_read(
    db: Session,
    user_id: int
):

    notifications = (
        db.query(Notification)
        .filter(
            Notification.user_id == user_id,
            Notification.is_read == 0
        )
        .all()
    )

    for notification in notifications:
        notification.is_read = 1

    db.commit()

    return True