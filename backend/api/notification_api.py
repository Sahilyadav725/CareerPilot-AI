from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from backend.database.db import get_db
from backend.database.crud import (
    get_notifications,
    mark_notification_read,
    mark_all_notifications_read
)

from backend.auth.dependencies import get_current_user
from backend.models.user import User


router = APIRouter(
    prefix="/api/notification",
    tags=["Notifications"]
)


@router.get("/my")
def my_notifications(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    notifications = get_notifications(
        db,
        current_user.id
    )

    return {
        "success": True,
        "count": len(notifications),
        "notifications": [
            {
                "id": notification.id,
                "title": notification.title,
                "message": notification.message,
                "type": notification.type,
                "is_read": notification.is_read,
                "created_at": notification.created_at
            }
            for notification in notifications
        ]
    }


@router.put("/read/{notification_id}")
def read_notification(
    notification_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    notification = mark_notification_read(
        db=db,
        notification_id=notification_id,
        user_id=current_user.id
    )

    if not notification:
        return {
            "success": False,
            "message": "Notification not found"
        }

    return {
        "success": True,
        "message": "Notification marked as read"
    }

@router.put("/read-all")
def read_all_notifications(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    mark_all_notifications_read(
        db=db,
        user_id=current_user.id
    )

    return {
        "success": True,
        "message": "All notifications marked as read"
    }