from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.sql import func

from backend.database.db import Base


class SavedJob(Base):

    __tablename__ = "saved_jobs"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id")
    )

    job_title = Column(String)

    company = Column(String)

    location = Column(String)

    job_url = Column(String)

    # NEW
    application_status = Column(
        String,
        default="not_applied"
    )

    # NEW
    applied_date = Column(
        DateTime,
        nullable=True
    )

    saved_date = Column(
        DateTime,
        server_default=func.now()
    )