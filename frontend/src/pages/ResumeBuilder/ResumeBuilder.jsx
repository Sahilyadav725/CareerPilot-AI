import DownloadResume from "../../pdf/DownloadResume";
import { useState } from "react";

import MainLayout from "../../layouts/MainLayout";

import PersonalForm from "../../components/ResumeBuilder/PersonalForm";
import EducationForm from "../../components/ResumeBuilder/EducationForm";
import ExperienceForm from "../../components/ResumeBuilder/ExperienceForm";
import ProjectForm from "../../components/ResumeBuilder/ProjectForm";
import SkillsForm from "../../components/ResumeBuilder/SkillsForm";
import CertificateForm from "../../components/ResumeBuilder/CertificateForm";
import ResumePreview from "../../components/ResumeBuilder/ResumePreview";
import { generateAIResume } from "../../api/resumeApi";
import toast from "react-hot-toast";
function ResumeBuilder() {

  const [resume, setResume] = useState({

    fullName: "",

    email: "",

    phone: "",

    linkedin: "",

    github: "",

    portfolio: "",

    address: "",

    summary: ""

  });

  const [education, setEducation] = useState([

    {

      degree: "",

      college: "",

      year: "",

      cgpa: ""

    }

  ]);

  const [experience, setExperience] = useState([

    {

      company: "",

      role: "",

      startDate: "",

      endDate: "",

      current: false,

      description: ""

    }

  ]);

  const [projects, setProjects] = useState([

    {

      title: "",

      techStack: "",

      github: "",

      liveDemo: "",

      description: ""

    }

  ]);

  const [skills, setSkills] = useState([]);

  const [certificates, setCertificates] = useState([

    {

      name: "",

      organization: "",

      issueDate: "",

      credentialId: "",

      credentialUrl: ""

    }

  ]);


  const handleChange = (e) => {

    setResume({

      ...resume,

      [e.target.name]: e.target.value

    });

  };

  const downloadResume = async () => {

  if (!resumeRef.current) return;

  const dataUrl = await toPng(resumeRef.current, {

    cacheBust: true,

    pixelRatio: 2

  });

  const pdf = new jsPDF("p", "mm", "a4");

  const imgWidth = 210;

  const imgHeight = 297;

  pdf.addImage(

    dataUrl,

    "PNG",

    0,

    0,

    imgWidth,

    imgHeight

  );

  pdf.save(

    `${resume.fullName || "Resume"}.pdf`

  );

};

const [loadingAI, setLoadingAI] = useState(false);

const handleGenerateAI = async () => {

  console.log("Sending Request...");

  const response = await generateAIResume({
    

    resume,
    education,
    experience,
    projects,
    skills,
    certificates

  });

  console.log(response);

  if (!response.success) {

    toast.error(response.message);

    return;

  }

  setResume(response.resume.resume || response.resume);

  if (response.resume.education)
    setEducation(response.resume.education);

  if (response.resume.experience)
    setExperience(response.resume.experience);

  if (response.resume.projects)
    setProjects(response.resume.projects);

  if (response.resume.skills)
    setSkills(response.resume.skills);

  if (response.resume.certificates)
    setCertificates(response.resume.certificates);

  toast.success("AI Resume Generated Successfully");

};

    return (

    <MainLayout>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 bg-slate-100 p-8 rounded-2xl">

        {/* LEFT SIDE */}

        <div className="space-y-8">

          <PersonalForm

            resume={resume}

            handleChange={handleChange}

          />

          <EducationForm

            education={education}

            setEducation={setEducation}

          />

          <ExperienceForm

            experience={experience}

            setExperience={setExperience}

          />

          <ProjectForm

            projects={projects}

            setProjects={setProjects}

          />

          <SkillsForm

            skills={skills}

            setSkills={setSkills}

          />

          <CertificateForm

            certificates={certificates}

            setCertificates={setCertificates}

          />

          <button
            onClick={handleGenerateAI}
            disabled={loadingAI}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl text-lg font-semibold disabled:bg-gray-400"
          >

            {loadingAI
              ? "Generating..."
              : "✨ Generate AI Resume"}

          </button>

        </div>

        {/* RIGHT SIDE */}

        <div>

        <ResumePreview

        resume={resume}
        education={education}
        experience={experience}
        projects={projects}
        skills={skills}
        certificates={certificates}

        />

       <DownloadResume

        resume={resume}
        education={education}
        experience={experience}
        projects={projects}
        skills={skills}
        certificates={certificates}

        />

        </div>

      </div>

    </MainLayout>

  );

}

export default ResumeBuilder;