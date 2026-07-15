import os
import requests
from dotenv import load_dotenv

load_dotenv()

ADZUNA_APP_ID = os.getenv("ADZUNA_APP_ID")
ADZUNA_APP_KEY = os.getenv("ADZUNA_APP_KEY")

print("APP_ID =", ADZUNA_APP_ID)
print("APP_KEY =", ADZUNA_APP_KEY)

BASE_URL = "https://api.adzuna.com/v1/api/jobs/in/search/1"


def search_adzuna(keyword, location="India", results=10):
    """
    Search jobs from Adzuna API.
    Returns standardized job list.
    """

    params = {
        "app_id": ADZUNA_APP_ID,
        "app_key": ADZUNA_APP_KEY,
        "results_per_page": results,
        "what": keyword,
        "where": location,
        "content-type": "application/json",
    }

    try:

        response = requests.get(
            BASE_URL,
            params=params,
            timeout=15,
        )

        response.raise_for_status()

        data = response.json()

        jobs = []

        for job in data.get("results", []):

            jobs.append({

                "title": job.get("title"),

                "company": (
                    job.get("company", {})
                    .get("display_name", "Unknown Company")
                ),

                "location": (
                    job.get("location", {})
                    .get("display_name", location)
                ),

                "salary_min": job.get("salary_min"),

                "salary_max": job.get("salary_max"),

                "description": job.get("description"),

                "redirect_url": job.get("redirect_url"),

                "source": "Adzuna"

            })

        return jobs

    except Exception as e:

        print("Adzuna Error:", e)

        return []