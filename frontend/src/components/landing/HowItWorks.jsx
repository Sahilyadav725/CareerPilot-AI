import {
  FaUserPlus,
  FaFileAlt,
  FaRobot,
  FaBriefcase,
  FaTasks,
  FaCheckCircle,
} from "react-icons/fa";

function HowItWorks() {
  const steps = [
    {
      icon: <FaUserPlus size={28} />,
      title: "Create Your Account",
      desc: "Sign up in seconds and set up your CareerPilot profile."
    },
    {
      icon: <FaFileAlt size={28} />,
      title: "Build Your Resume",
      desc: "Create a professional ATS-friendly resume using our smart builder."
    },
    {
      icon: <FaRobot size={28} />,
      title: "Get AI Suggestions",
      desc: "Receive AI-powered recommendations to improve your resume."
    },
    {
      icon: <FaBriefcase size={28} />,
      title: "Find Matching Jobs",
      desc: "Discover jobs that match your skills and career goals."
    },
    {
      icon: <FaTasks size={28} />,
      title: "Track Applications",
      desc: "Manage all your job applications from one dashboard."
    },
    {
      icon: <FaCheckCircle size={28} />,
      title: "Land Your Dream Job",
      desc: "Prepare confidently and take the next step in your career."
    }
  ];

  return (
    <section
      id="how"
      className="py-24 bg-white"
      data-aos="fade-left"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">

          <span className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">

            HOW IT WORKS

          </span>

          <h2 className="text-5xl font-bold mt-6 text-slate-800">

            Start Your Career Journey
            <br />
            In 6 Simple Steps

          </h2>

          <p className="mt-6 text-gray-600 text-lg max-w-3xl mx-auto">

            CareerPilot guides you from resume creation to job applications
            with AI-powered tools designed to help you succeed.

          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">

          {steps.map((step, index) => (

            <div
              key={index}
              className="relative bg-slate-50 rounded-3xl border border-slate-200 p-8 hover:shadow-xl hover:-translate-y-2 transition duration-300"
            >

              <div className="absolute -top-5 left-8 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">

                {index + 1}

              </div>

              <div className="mt-6 w-16 h-16 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">

                {step.icon}

              </div>

              <h3 className="text-2xl font-bold mt-8">

                {step.title}

              </h3>

              <p className="mt-4 text-gray-600 leading-7">

                {step.desc}

              </p>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default HowItWorks;