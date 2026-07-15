import {
  FaRobot,
  FaBriefcase,
  FaChartLine,
  FaFileAlt,
  FaTasks,
  FaLightbulb,
} from "react-icons/fa";

function Features() {
  const features = [
    {
      icon: <FaRobot size={34} />,
      title: "AI Resume Builder",
      desc: "Create professional ATS-friendly resumes with live preview, AI suggestions, and one-click PDF download."
    },
    {
      icon: <FaBriefcase size={34} />,
      title: "Smart Job Recommendations",
      desc: "Discover relevant jobs based on your skills, experience, and career goals."
    },
    {
      icon: <FaChartLine size={34} />,
      title: "ATS Resume Score",
      desc: "Analyze your resume and receive intelligent suggestions to improve interview chances."
    },
    {
      icon: <FaFileAlt size={34} />,
      title: "AI Cover Letter",
      desc: "Generate personalized cover letters in seconds tailored to every job application."
    },
    {
      icon: <FaTasks size={34} />,
      title: "Application Tracker",
      desc: "Track every applied, saved, and shortlisted job from a single dashboard."
    },
    {
      icon: <FaLightbulb size={34} />,
      title: "Career Insights",
      desc: "Receive AI-powered career guidance, skill recommendations, and learning paths."
    },
  ];

  return (
    <section
      id="features"
      className="py-24 bg-gradient-to-b from-white to-slate-100"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">

          <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">

            OUR FEATURES

          </span>

          <h2 className="text-5xl font-bold mt-6 text-slate-800">

            Everything You Need
            <br />
            To Build Your Career

          </h2>

          <p className="text-gray-600 text-lg mt-6 max-w-3xl mx-auto">

            CareerPilot combines AI-powered resume building,
            smart job recommendations, application tracking,
            and career guidance into one powerful platform.

          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">

          {features.map((feature, index) => (

            <div
              key={index}
              className="group bg-white rounded-3xl border border-slate-200 p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition duration-300"
            >

              <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition">

                {feature.icon}

              </div>

              <h3 className="text-2xl font-bold mt-8 text-slate-800">

                {feature.title}

              </h3>

              <p className="text-gray-600 mt-4 leading-7">

                {feature.desc}

              </p>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default Features;