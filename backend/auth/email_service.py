from fastapi_mail import FastMail, MessageSchema, MessageType

from backend.config.mail_config import conf


async def send_otp_email(email: str, otp: str):

    message = MessageSchema(

        subject="CareerPilot Email Verification",

        recipients=[email],

        body=f"""

        <h2>CareerPilot Email Verification</h2>

        <p>Your OTP is:</p>

        <h1>{otp}</h1>

        <p>This OTP will expire in 10 minutes.</p>

        <p>If you did not request this, please ignore this email.</p>

        """,

        subtype=MessageType.html

    )

    fm = FastMail(conf)

    await fm.send_message(message)