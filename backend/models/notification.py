from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from datetime import datetime

from backend.database.db import Base


class Notification(Base):
    __tablename__ = "notifications"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"))

    title = Column(String)

    message = Column(String)

    type = Column(String)

    is_read = Column(Integer, default=0)

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )