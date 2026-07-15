import random
from datetime import datetime, timedelta

otp_store = {}


def generate_otp():
    return str(random.randint(100000, 999999))


def save_otp(email: str):

    otp = generate_otp()

    otp_store[email] = {
        "otp": otp,
        "expires": datetime.utcnow() + timedelta(minutes=10)
    }

    return otp


def verify_otp(email: str, entered_otp: str):

    if email not in otp_store:
        return False

    data = otp_store[email]

    if datetime.utcnow() > data["expires"]:
        del otp_store[email]
        return False

    if data["otp"] != entered_otp:
        return False

    del otp_store[email]

    return True