import { PDFDownloadLink } from "@react-pdf/renderer";
import ResumeDocument from "./ResumeDocument";

function DownloadResume({

  resume,
  education,
  experience,
  projects,
  skills,
  certificates

}) {

  return (

    <PDFDownloadLink

      document={

        <ResumeDocument

          resume={resume}
          education={education}
          experience={experience}
          projects={projects}
          skills={skills}
          certificates={certificates}

        />

      }

      fileName={`${resume.fullName || "Resume"}.pdf`}

    >

      {({ loading }) => (

        <button

          className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl text-lg font-semibold"

        >

          {loading
            ? "Generating PDF..."
            : "⬇ Download Resume PDF"}

        </button>

      )}

    </PDFDownloadLink>

  );

}

export default DownloadResume;