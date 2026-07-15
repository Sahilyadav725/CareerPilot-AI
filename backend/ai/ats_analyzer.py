def calculate_ats_score(parsed_data):

    score = 0
    suggestions = []

    # Full Name
    if parsed_data.get("full_name"):
        score += 10
    else:
        suggestions.append("Add Full Name")

    # Email
    if parsed_data.get("email"):
        score += 10
    else:
        suggestions.append("Add Email Address")

    # Phone
    if parsed_data.get("phone"):
        score += 10
    else:
        suggestions.append("Add Phone Number")

    # Skills
    skills = parsed_data.get("skills") or []

    if len(skills) >= 10:
        score += 30
    elif len(skills) >= 7:
        score += 25
    elif len(skills) >= 5:
        score += 20
    elif len(skills) >= 3:
        score += 10
    else:
        suggestions.append("Add More Technical Skills")

    # Education
    education = parsed_data.get("education")

    education = parsed_data.get("education", [])

    if isinstance(education, list):
        education = ", ".join(education)

    if education and education.strip():
        score += 20
    else:
        suggestions.append("Add Education Details")

    # Experience
    experience = parsed_data.get("experience")

        # Projects
    projects = parsed_data.get("projects")

    if projects == "Available":
        score += 10
    else:
        suggestions.append("Add Academic or Personal Projects")

    # Certifications
    certifications = parsed_data.get("certifications") or []

    if len(certifications) >= 3:
        score += 10
    elif len(certifications) >= 1:
        score += 5
    else:
        suggestions.append("Add Industry Certifications")

    # GitHub
    if parsed_data.get("github"):
        score += 5
    else:
        suggestions.append("Add GitHub Profile")

    # LinkedIn
    if parsed_data.get("linkedin"):
        score += 5
    else:
        suggestions.append("Add LinkedIn Profile")

    if experience and experience.strip():
        score += 20
    else:
        suggestions.append("Add Work Experience or Projects")

    # Limit score
    if score > 100:
        score = 100

    return {

    "ats_score": min(score, 100),

    "suggestions": suggestions,

    "section_score": {

        "contact": (
            30
            if parsed_data.get("full_name")
            and parsed_data.get("email")
            and parsed_data.get("phone")
            else 20
        ),

        "skills": min(len(skills) * 3, 30),

        "education": 20 if education else 0,

        "experience": 20 if experience else 0,

        "projects": 10 if projects == "Available" else 0,

        "certifications": min(len(certifications) * 5, 10),

        "github": 5 if parsed_data.get("github") else 0,

        "linkedin": 5 if parsed_data.get("linkedin") else 0,

    }

}