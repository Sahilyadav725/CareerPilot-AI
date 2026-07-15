from backend.database.crud import (
    create_user,
    get_user_by_email,
    update_user_password
)

from backend.auth.security import (
    hash_password,
    verify_password
)

from backend.auth.jwt_handler import (
    create_access_token
)


def signup(
    db,
    name,
    email,
    password
):

    existing = get_user_by_email(db, email)

    if existing:
        return {
            "success": False,
            "message": "Email already exists"
        }

    user = create_user(
        db,
        name,
        email,
        hash_password(password)
    )

    access_token = create_access_token(
        {"user_id": user.id}
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }


def login(
    db,
    email,
    password
):

    user = get_user_by_email(db, email)

    if not user:
        return {
            "success": False,
            "message": "Invalid Email"
        }

    if not verify_password(
        password,
        user.password
    ):
        return {
            "success": False,
            "message": "Wrong Password"
        }

    access_token = create_access_token(
        {"user_id": user.id}
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }

def reset_password(
    db,
    email,
    new_password
):

    user = update_user_password(

        db,

        email,

        hash_password(new_password)

    )

    if not user:

        return {

            "success": False,

            "message": "User not found"

        }

    return {

        "success": True,

        "message": "Password Updated Successfully"

    }