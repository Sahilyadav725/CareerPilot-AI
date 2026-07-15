import re
import fitz
from docx import Document
from backend.ai.groq_parser import ai_parse_resume


# ==========================
# Extract Text
# ==========================

def extract_text(file_path):

    if file_path.endswith(".pdf"):

        text = ""

        pdf = fitz.open(file_path)

        for page in pdf:
            text += page.get_text()

        pdf.close()

        return text

    elif file_path.endswith(".docx"):

        doc = Document(file_path)

        return "\n".join(
            para.text for para in doc.paragraphs
        )

    return ""


# ==========================
# Email
# ==========================

def extract_email(text):

    match = re.search(
        r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}",
        text
    )

    if match:
        return match.group()

    return None


# ==========================
# Phone
# ==========================

def extract_phone(text):

    match = re.search(
        r"(\+91[\-\s]?)?[6-9]\d{9}",
        text
    )

    if match:
        return match.group()

    return None


# ==========================
# Name
# ==========================

def extract_name(text):

    lines = text.split("\n")

    ignore = [
        "resume",
        "curriculum vitae",
        "cv",
        "profile",
        "summary",
        "objective"
    ]

    for line in lines:

        line = line.strip()

        if not line:
            continue

        if line.lower() in ignore:
            continue

        if "@" in line:
            continue

        if any(ch.isdigit() for ch in line):
            continue

        words = line.split()

        if 2 <= len(words) <= 4:
            return line

    return None


# ==========================
# Skills
# ==========================

def extract_skills(text):

    skills_db = [

        "Python",
        "Java",
        "C",
        "C++",
        "SQL",
        "HTML",
        "CSS",
        "JavaScript",
        "React",
        "Node.js",
        "FastAPI",
        "Django",
        "Flask",

        "Linux",
        "Git",
        "Docker",
        "AWS",

        "Cyber Security",
        "Cybersecurity",
        "Ethical Hacking",

        "Nmap",
        "Metasploit",
        "Burp Suite",
        "Hydra",
        "Wireshark",
        "Splunk",
        "Wazuh",
        "OWASP",
        "Kali Linux",

        "Networking",
        "TCP/IP",
        "Firewall",
        "SIEM",
        "SOC",
        "TryHackMe",
        "VMware"
    ]

    found = []

    lower = text.lower()

    for skill in skills_db:

        if skill.lower() in lower:
            found.append(skill)

    return sorted(list(set(found)))


# ==========================
# Education
# ==========================

def extract_education(text):

    keywords = [

        "B.Tech",
        "Bachelor of Technology",
        "M.Tech",
        "BCA",
        "MCA",
        "B.Sc",
        "M.Sc",
        "Diploma",
        "Bachelor",
        "Master"

    ]

    lower = text.lower()

    for keyword in keywords:

        if keyword.lower() in lower:
            return keyword

    return None


# ==========================
# Experience
# ==========================

def extract_experience(text):

    lower = text.lower()

    if "internship" in lower:
        return "Internship"

    if "intern" in lower:
        return "Internship"

    if "experience" in lower:
        return "Experienced"

    if "fresher" in lower:
        return "Fresher"

    return "Fresher"

# ==========================
# Projects
# ==========================

def extract_projects(text):

    lower = text.lower()

    keywords = [
        "project",
        "projects",
        "developed",
        "built",
        "implemented",
        "created"
    ]

    for keyword in keywords:

        if keyword in lower:
            return "Available"

    return "Not Mentioned"


# ==========================
# Certifications
# ==========================

def extract_certifications(text):

    lower = text.lower()

    keywords = [
        "certificate",
        "certification",
        "certified",
        "comptia",
        "cisco",
        "aws",
        "google",
        "microsoft",
        "tryhackme",
        "ec council"
    ]

    found = []

    for item in keywords:

        if item in lower:

            found.append(item.title())

    return found


# ==========================
# LinkedIn
# ==========================

def extract_linkedin(text):

    match = re.search(

        r"(https?:\/\/)?(www\.)?linkedin\.com\/[^\s]+",

        text,

        re.IGNORECASE

    )

    if match:

        return match.group()

    return None


# ==========================
# GitHub
# ==========================

def extract_github(text):

    match = re.search(

        r"(https?:\/\/)?(www\.)?github\.com\/[^\s]+",

        text,

        re.IGNORECASE

    )

    if match:

        return match.group()

    return None


# ==========================
# Resume Parser
# ==========================

def parse_resume(file_path):

    text = extract_text(file_path)

    try:

        ai_result = ai_parse_resume(text)

        ai_result["raw_text"] = text

        return ai_result

    except Exception as e:

        print("Groq Error :", e)

        return {

            "full_name": extract_name(text),

            "email": extract_email(text),

            "phone": extract_phone(text),

            "skills": extract_skills(text),

            "education": extract_education(text),

            "experience": extract_experience(text),

            "projects": extract_projects(text),

            "certifications": extract_certifications(text),

            "github": extract_github(text),

            "linkedin": extract_linkedin(text),

            "job_roles": []

        }