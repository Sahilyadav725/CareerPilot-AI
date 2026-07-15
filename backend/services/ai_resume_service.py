import json
import os

from groq import Groq

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)


def generate_job_profile(parsed_resume):

    prompt = f"""
You are an expert HR Recruiter and Career Advisor.

Analyze the following resume.

Return ONLY valid JSON.

Resume:

{json.dumps(parsed_resume, indent=2)}

Return in this format:

{{
    "primary_role": "",
    "alternate_roles": [],
    "search_keywords": [],
    "industry": "",
    "experience_level": "",
    "education_level": "",
    "summary": ""
}}

Rules:

- search_keywords should contain 10-15 relevant job titles.
- Return JSON only.
"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.3
    )

    text = response.choices[0].message.content.strip()

    return json.loads(text)


# =====================================================
# AI JOB KEYWORD GENERATOR
# =====================================================

def generate_ai_keywords(skills, education=None, experience=None):

    try:

        prompt = f"""
You are a Senior Technical Recruiter working for Google, Microsoft, Amazon, Deloitte, Infosys and TCS.

Your task is to generate job search keywords that are commonly used on job portals like:

- LinkedIn
- Indeed
- Adzuna
- Naukri
- Foundit
- ArbeitNow

Candidate Skills:
{skills}

Education:
{education}

Experience:
{experience}

IMPORTANT RULES:

1. Return ONLY JSON.

2. Use COMMON job titles.

3. Avoid words like:
- Junior
- Entry Level
- Fresher
- Associate
- Graduate
- Trainee

4. Prefer generic searchable titles like:

Cyber Security
Security Analyst
SOC Analyst
Penetration Tester
Ethical Hacker
Network Security
Linux Administrator
System Administrator
Python Developer
Backend Developer
Software Engineer
React Developer
Frontend Developer
DevOps Engineer
Cloud Engineer
Data Analyst
Machine Learning Engineer

5. Maximum 15 keywords.

6. Do NOT explain anything.

Return format:

{
    "keywords":[
        "Cyber Security",
        "Security Analyst",
        "SOC Analyst",
        "Penetration Tester",
        "Python Developer"
    ]
}
"""

        response = client.chat.completions.create(

            model="llama-3.3-70b-versatile",

            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],

            temperature=0.2

        )

        text = response.choices[0].message.content.strip()

        # Remove markdown if present
        text = text.replace("```json", "").replace("```", "").strip()

        data = json.loads(text)

        return data.get("keywords", [])

    except Exception as e:

        print("Groq Keyword Error :", e)

        return []