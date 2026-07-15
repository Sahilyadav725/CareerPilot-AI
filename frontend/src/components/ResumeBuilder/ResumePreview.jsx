import { forwardRef } from "react";

const ResumePreview = forwardRef(
(
{
resume,
education,
experience,
projects,
skills,
certificates,
},
ref
) => {

const hasEducation = education.some(
(edu) =>
edu.degree ||
edu.college ||
edu.year ||
edu.cgpa
);

const hasExperience = experience.some(
(exp) =>
exp.role ||
exp.company ||
exp.description
);

const hasProjects = projects.some(
(project) =>
project.title ||
project.description ||
project.techStack
);

const hasSkills = skills.some(
(skill) => skill.trim() !== ""
);

const hasCertificates = certificates.some(
(cert) =>
cert.name ||
cert.organization ||
cert.issueDate
);

return (

<div
ref={ref}
className="bg-white shadow-2xl rounded-lg p-10 w-full max-w-[800px] mx-auto min-h-[1123px] border border-gray-200"
>

<h1 className="text-4xl font-bold text-center text-slate-800">
{resume.fullName || "Your Name"}
</h1>

<div className="text-center mt-3 text-gray-600 space-y-1">

{resume.email && <p>{resume.email}</p>}

{resume.phone && <p>{resume.phone}</p>}

{resume.linkedin && <p>{resume.linkedin}</p>}

{resume.github && <p>{resume.github}</p>}

{resume.portfolio && <p>{resume.portfolio}</p>}

{resume.address && <p>{resume.address}</p>}

</div>

<hr className="my-6"/>

<h2 className="text-xl font-bold uppercase tracking-wide text-blue-700">
Professional Summary
</h2>

<p className="mt-3 whitespace-pre-wrap text-gray-700">
{
resume.summary ||
"Your professional summary will appear here."
}
</p>

{
hasEducation && (
<>

<hr className="my-6"/>

<h2 className="text-xl font-bold uppercase tracking-wide text-blue-700">
Education
</h2>

{
education.map((edu,index)=>(

(edu.degree || edu.college) && (

<div
key={index}
className="mt-5"
>

<h3 className="font-bold">

{edu.degree}

</h3>

<p>

{edu.college}

</p>

<p className="text-gray-500">

{edu.year}

{edu.cgpa && ` • ${edu.cgpa}`}

</p>

</div>

)

))
}

</>
)
}

{
hasExperience && (
<>

<hr className="my-6"/>

<h2 className="text-xl font-bold uppercase tracking-wide text-blue-700">
Experience
</h2>

{
experience.map((exp,index)=>(

(exp.role || exp.company || exp.description) && (

<div
key={index}
className="mt-5"
>

<h3 className="font-bold">

{exp.role}

</h3>

<p>

{exp.company}

</p>

{
(exp.startDate || exp.endDate) && (

<p className="text-gray-500">

{exp.startDate}

{exp.startDate && " - "}

{exp.current ? "Present" : exp.endDate}

</p>

)
}

{
exp.description && (

<p className="mt-2 whitespace-pre-wrap">

{exp.description}

</p>

)
}

</div>

)

))
}

</>

)
}
{
hasProjects && (
<>

<hr className="my-6"/>

<h2 className="text-xl font-bold uppercase tracking-wide text-blue-700">
Projects
</h2>

{
projects.map((project,index)=>(

(project.title || project.description || project.techStack) && (

<div
key={index}
className="mt-5"
>

<h3 className="font-bold">

{project.title}

</h3>

{
project.techStack && (

<p>

{project.techStack}

</p>

)
}

{
project.github && (

<p className="text-blue-600 break-all">

{project.github}

</p>

)
}

{
project.liveDemo && (

<p className="text-blue-600 break-all">

{project.liveDemo}

</p>

)
}

{
project.description && (

<p className="mt-2 whitespace-pre-wrap">

{project.description}

</p>

)
}

</div>

)

))
}

</>

)
}

{
hasSkills && (
<>

<hr className="my-6"/>

<h2 className="text-xl font-bold uppercase tracking-wide text-blue-700">
Skills
</h2>

<div className="flex flex-wrap gap-2 mt-4">

{
skills.map((skill,index)=>(

skill.trim() && (

<span
key={index}
className="bg-blue-100 text-blue-800 px-3 py-1 rounded-md text-sm"
>

{skill}

</span>

)

))
}

</div>

</>

)
}

{
hasCertificates && (
<>

<hr className="my-6"/>

<h2 className="text-xl font-bold uppercase tracking-wide text-blue-700">
Certifications
</h2>

{
certificates.map((certificate,index)=>(

(certificate.name || certificate.organization) && (

<div
key={index}
className="mt-5"
>

<h3 className="font-bold">

{certificate.name}

</h3>

{
certificate.organization && (

<p>

{certificate.organization}

</p>

)
}

{
certificate.issueDate && (

<p className="text-gray-500">

Issued :
{" "}
{certificate.issueDate}

</p>

)
}

{
certificate.credentialId && (

<p>

Credential ID :
{" "}
{certificate.credentialId}

</p>

)
}

{
certificate.credentialUrl && (

<p className="text-blue-600 break-all">

{certificate.credentialUrl}

</p>

)
}

</div>

)

))
}

</>

)
}
</div>

);

}
);

export default ResumePreview;