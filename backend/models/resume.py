from sqlalchemy import Column, Integer, String, ForeignKey, Text
from backend.database.db import Base


class Resume(Base):

    __tablename__ = "resumes"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"))

    file_name = Column(String)

    file_path = Column(String)

    # Parsed Resume

    full_name = Column(String)

    email = Column(String)

    phone = Column(String)

    skills = Column(Text)

    education = Column(Text)

    experience = Column(Text)

    # ATS

    ats_score = Column(Integer, default=0)

    suggestions = Column(Text)

    # ==========================
    # AI Generated Data
    # ==========================

    ai_primary_role = Column(String)

    ai_keywords = Column(Text)

    ai_industry = Column(String)

    ai_summary = Column(Text)

    ai_experience_level = Column(String)

    ai_education_level = Column(String)

    # Future Proof

    ai_raw_response = Column(Text)