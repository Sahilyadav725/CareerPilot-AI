from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from backend.models.user import User
from backend.models.resume import Resume
from backend.api.resume_api import router as resume_router
from backend.database.db import Base, engine
from backend.api.auth_api import router as auth_router
from backend.api.jobs_api import router as jobs_router
from backend.models.application import Application
from backend.api.application_api import router as application_router
from backend.models.saved_job import SavedJob
from backend.api.saved_job_api import router as saved_job_router
from backend.api.dashboard_api import router as dashboard_router
from backend.api.notification_api import router as notification_router
from backend.api import profile_api



Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="CareerPilot API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(resume_router)
app.include_router(jobs_router)
app.include_router(application_router)
app.include_router(saved_job_router)
app.include_router(dashboard_router)
app.include_router(notification_router)
app.include_router(profile_api.router)

@app.get("/")
def home():
    return {
        "message": "CareerPilot Backend Running 🚀"
    }


if __name__ == "__main__":
    uvicorn.run(
        "run:app",
        host="127.0.0.1",
        port=8000,
        reload=True
    )