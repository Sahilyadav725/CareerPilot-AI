from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from sqlalchemy.orm import Session

from backend.database.db import get_db
from backend.database.crud import get_user_by_id
from backend.config.settings import SECRET_KEY, ALGORITHM

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/api/auth/login"
)


def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Invalid authentication credentials"
    )

    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        print("========== JWT DEBUG ==========")
        print("TOKEN:", token)
        print("PAYLOAD:", payload)

        user_id = payload.get("user_id")

        if user_id is None:
            raise credentials_exception

    except JWTError as e:
        print("JWT ERROR:", str(e))
        raise credentials_exception

    user = get_user_by_id(db, user_id)

    print("USER:", user)
    print("===============================")

    if user is None:
        raise credentials_exception

    return user