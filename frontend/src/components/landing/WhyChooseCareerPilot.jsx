import {
  FaShieldAlt,
  FaRobot,
  FaFilePdf,
  FaBriefcase,
  FaClock,
  FaLaptopCode
} from "react-icons/fa";

function WhyChooseCareerPilot() {

  const benefits = [

    {
      icon: <FaRobot size={26} />,
      title: "AI Powered",
      desc: "Smart AI helps you build resumes and improve them with intelligent suggestions."
    },

    {
      icon: <FaShieldAlt size={26} />,
      title: "ATS Friendly",
      desc: "Create resumes optimized for Applicant Tracking Systems used by top companies."
    },

    {
      icon: <FaFilePdf size={26} />,
      title: "One Click PDF",
      desc: "Download beautiful professional resumes instantly in PDF format."
    },

    {
      icon: <FaBriefcase size={26} />,
      title: "Job Search",
      desc: "Search jobs from multiple trusted sources in one platform."
    },

    {
      icon: <FaClock size={26} />,
      title: "Application Tracker",
      desc: "Track every application from Applied to Interview in one dashboard."
    },

    {
      icon: <FaLaptopCode size={26} />,
      title: "Modern Platform",
      desc: "Fast, responsive and built using the latest technologies."
    }

  ];

  return (

    <section className="py-24 bg-white"
        data-aos="zoom-in"
        >

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">

          <span className="inline-block bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold">

            WHY CAREERPILOT

          </span>

          <h2 className="text-5xl font-bold mt-6 text-slate-800">

            Why Thousands Choose
            <br />
            CareerPilot

          </h2>

          <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">

            Everything you need to build a strong resume,
            discover opportunities and manage your career
            from one platform.

          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">

          {benefits.map((item, index) => (

            <div
              key={index}
              className="group border border-slate-200 rounded-3xl p-8 hover:shadow-xl hover:-translate-y-2 transition duration-300"
            >

              <div className="w-16 h-16 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition">

                {item.icon}

              </div>

              <h3 className="text-2xl font-bold mt-8">

                {item.title}

              </h3>

              <p className="mt-4 text-gray-600 leading-7">

                {item.desc}

              </p>

            </div>

          ))}

        </div>

      </div>

    </section>

  );

}

export default WhyChooseCareerPilot;