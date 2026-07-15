import os
import json
from groq import Groq

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)


def generate_ai_keywords(skills, education="", experience=""):
    """
    Generate job search keywords using AI.
    Returns list[str]
    """

    # Fallback if no skills
    if not skills:
        return []

    prompt = f"""
You are a career advisor.

Student Skills:
{", ".join(skills)}

Education:
{education}

Experience:
{experience}

Generate ONLY a JSON array of 10 job search keywords.

Example:

[
"Python Developer",
"Backend Developer",
"React Developer",
"SOC Analyst"
]

Return ONLY JSON.
"""

    try:

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

        content = response.choices[0].message.content.strip()

        keywords = json.loads(content)

        if isinstance(keywords, list):
            return keywords

    except Exception as e:

        print("AI Keyword Error:", e)

    return []