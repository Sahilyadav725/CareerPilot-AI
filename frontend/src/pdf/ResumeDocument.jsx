import {
  Document,
  Page,
  Text,
  View
} from "@react-pdf/renderer";

import styles from "./ResumeStyles";

const ResumeDocument = ({
  resume,
  education,
  experience,
  projects,
  skills,
  certificates
}) => (

<Document>

<Page size="A4" style={styles.page}>

<View style={styles.header}>

<Text style={styles.name}>

{resume.fullName || "Your Name"}

</Text>

{resume.email ? (
<Text style={styles.info}>{resume.email}</Text>
) : null}

{resume.phone ? (
<Text style={styles.info}>{resume.phone}</Text>
) : null}

{resume.linkedin ? (
<Text style={styles.info}>{resume.linkedin}</Text>
) : null}

{resume.github ? (
<Text style={styles.info}>{resume.github}</Text>
) : null}

</View>

<Text style={styles.heading}>
Professional Summary
</Text>

<Text style={styles.text}>
{resume.summary || "-"}
</Text>

{
education.some(e=>e.degree || e.college) && (

<View style={styles.section}>

<Text style={styles.heading}>
Education
</Text>

{
education.map((edu,index)=>(

<View
key={index}
style={styles.item}
>

<Text>

{edu.degree}

</Text>

<Text>

{edu.college}

</Text>

<Text>

{edu.year}

{edu.cgpa ? ` • ${edu.cgpa}` : ""}

</Text>

</View>

))
}

</View>

)
}

{
experience.some(e=>e.role || e.company) && (

<View style={styles.section}>

<Text style={styles.heading}>
Experience
</Text>

{
experience.map((exp,index)=>(

<View
key={index}
style={styles.item}
>

<Text>

{exp.role}

</Text>

<Text>

{exp.company}

</Text>

<Text>

{exp.startDate}

{" - "}

{exp.current ? "Present" : exp.endDate}

</Text>

<Text>

{exp.description}

</Text>

</View>

))
}

</View>

)
}

{
projects.some(p=>p.title) && (

<View style={styles.section}>

<Text style={styles.heading}>
Projects
</Text>

{
projects.map((project,index)=>(

<View
key={index}
style={styles.item}
>

<Text>

{project.title}

</Text>

<Text>

{project.techStack}

</Text>

<Text>

{project.description}

</Text>

</View>

))
}

</View>

)
}

{
skills.length>0 && (

<View style={styles.section}>

<Text style={styles.heading}>
Skills
</Text>

<Text>

{skills.join(" • ")}

</Text>

</View>

)
}

{
certificates.some(c=>c.name) && (

<View style={styles.section}>

<Text style={styles.heading}>
Certifications
</Text>

{
certificates.map((certificate,index)=>(

<View
key={index}
style={styles.item}
>

<Text>

{certificate.name}

</Text>

<Text>

{certificate.organization}

</Text>

<Text>

{certificate.issueDate}

</Text>

</View>

))
}

</View>

)
}

</Page>

</Document>

);

export default ResumeDocument;