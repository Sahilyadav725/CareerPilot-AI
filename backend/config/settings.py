import os

# JWT Settings
SECRET_KEY = os.getenv(
    "SECRET_KEY",
    "careerpilot_super_secret_key_change_later"
)

ALGORITHM = "HS256"

# Adzuna API Settings
ADZUNA_APP_ID = os.getenv(
    "ADZUNA_APP_ID",
    "3480887c"
)

ADZUNA_APP_KEY = os.getenv(
    "ADZUNA_APP_KEY",
    "81f726cff827963d94fd2e0fd14f345e"
)