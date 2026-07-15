import requests

BASE_URL = "https://www.arbeitnow.com/api/job-board-api"


def search_arbeitnow(keyword="", results=20):
    """
    Fetch jobs from ArbeitNow API.
    Returns standardized job list.
    """

    try:

        response = requests.get(
            BASE_URL,
            timeout=15
        )

        response.raise_for_status()

        data = response.json()

        jobs = []

        for job in data.get("data", []):

            title = job.get("title", "")

            # Filter using keyword
            if keyword:
                if keyword.lower() not in title.lower():
                    continue

            jobs.append({

                "title": title,

                "company": job.get(
                    "company_name",
                    "Unknown Company"
                ),

                "location": job.get(
                    "location",
                    "Remote"
                ),

                "salary_min": None,

                "salary_max": None,

                "description": job.get(
                    "description",
                    ""
                ),

                "redirect_url": job.get(
                    "url",
                    ""
                ),

                "source": "ArbeitNow"

            })

            if len(jobs) >= results:
                break

        return jobs

    except Exception as e:

        print("ArbeitNow Error:", e)

        return []