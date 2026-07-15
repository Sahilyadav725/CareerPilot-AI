from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from datetime import datetime

from .db import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    full_name = Column(String, nullable=False)

    email = Column(String, unique=True, index=True, nullable=False)

    password = Column(String, nullable=False)

    city = Column(String)

    state = Column(String)

    country = Column(String)

    created_at = Column(DateTime, default=datetime.utcnow)

    resumes = relationship("Resume", back_populates="user")

    applications = relationship("Application", back_populates="user")

    notifications = relationship("Notification", back_populates="user")


class Resume(Base):
    __tablename__ = "resumes"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"))

    file_name = Column(String)

    file_path = Column(String)

    extracted_text = Column(Text)

    skills = Column(Text)

    experience = Column(Text)

    education = Column(Text)

    location = Column(String)

    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="resumes")

    jobs = relationship("Job", back_populates="resume")


from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Text, Boolean
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship


class Job(Base):
    __tablename__ = "jobs"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"))

    title = Column(String(255))
    company = Column(String(255))
    location = Column(String(255))

    experience = Column(String(100))
    salary = Column(String(100))

    apply_url = Column(Text)

    match_score = Column(Integer)

    status = Column(String(50), default="Pending")
    # Pending
    # Applied
    # Need Verification
    # Rejected

    source = Column(String(100))

    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User")