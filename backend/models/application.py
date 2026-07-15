from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from datetime import datetime

from backend.database.db import Base


class Application(Base):
    __tablename__ = "applications"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id")
    )

    resume_id = Column(
        Integer,
        ForeignKey("resumes.id")
    )

    job_title = Column(String)

    company = Column(String)

    location = Column(String)

    job_url = Column(String)

    status = Column(
        String,
        default="Applied"
    )

    notes = Column(
        String,
        default=""
    )

    applied_date = Column(
        DateTime,
        default=datetime.utcnow
    )

    interview_date = Column(
        DateTime,
        nullable=True
    )

    reply_date = Column(
        DateTime,
        nullable=True
    )