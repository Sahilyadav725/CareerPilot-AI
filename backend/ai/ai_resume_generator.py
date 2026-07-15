from backend.ai.groq_parser import client
import json


def generate_ai_resume(
    resume,
    education,
    experience,
    projects,
    skills,
    certificates,
):

    data = {
        "resume": resume,
        "education": education,
        "experience": experience,
        "projects": projects,
        "skills": skills,
        "certificates": certificates,
    }

    prompt = f"""
You are an expert ATS Resume Writer.

Improve the following resume.

Rules:
- Keep everything truthful.
- Improve grammar.
- Rewrite professional summary.
- Rewrite project descriptions using action verbs.
- Rewrite work experience professionally.
- Optimize skills for ATS.
- Do not invent fake companies or fake experience.
- Keep the same personal information.

Resume Data:

{json.dumps(data, indent=2)}

Return ONLY valid JSON.

Example:

{{
    "summary":"Professional summary...",
    "skills":["Python","React","FastAPI"],
    "experience":[
        {{
            "company":"",
            "role":"",
            "startDate":"",
            "endDate":"",
            "current":false,
            "description":"..."
        }}
    ],
    "projects":[
        {{
            "title":"",
            "techStack":"",
            "github":"",
            "liveDemo":"",
            "description":"..."
        }}
    ]
}}
"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": prompt,
            }
        ],
        temperature=0.3,
    )

    return response.choices[0].message.content