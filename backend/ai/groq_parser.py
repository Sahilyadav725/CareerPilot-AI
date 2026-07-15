import os
import json
import re
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)


def ai_parse_resume(resume_text):

    prompt = f"""
You are an expert ATS Resume Parser.

Read the resume carefully.

Return ONLY valid JSON.

Required Format:

{{
    "full_name":"",
    "email":"",
    "phone":"",
    "education":[],
    "skills":[],
    "projects":[],
    "certifications":[],
    "experience_level":"",
    "job_roles":[]
}}

Rules:

- Detect education properly.
- Extract every technical & non technical skill.
- Suggest 10 best job roles according to complete resume.
- Job roles should be real hiring roles.
- No explanation.
- JSON only.

Resume:

{resume_text}

"""

    response = client.chat.completions.create(

        model="llama-3.3-70b-versatile",

        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],

        temperature=0.2,
    )

    answer = response.choices[0].message.content
    
    print("Groq Response:\n", answer)

    # Remove markdown
    answer = answer.replace("```json", "")
    answer = answer.replace("```", "")
    answer = answer.strip()

    # Extract JSON only
    match = re.search(r"\{.*\}", answer, re.DOTALL)

    if match:
        answer = match.group(0)
    return json.loads(answer)