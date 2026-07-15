import {
  FaRobot,
  FaFilePdf,
  FaShieldAlt,
  FaLaptopCode,
  FaSearch,
  FaUserCheck,
} from "react-icons/fa";

function PlatformStats() {
  const stats = [
    {
      icon: <FaRobot size={34} />,
      title: "AI Powered",
      desc: "Smart career tools powered by AI.",
    },
    {
      icon: <FaFilePdf size={34} />,
      title: "PDF Resume",
      desc: "Professional one-click PDF export.",
    },
    {
      icon: <FaShieldAlt size={34} />,
      title: "Secure",
      desc: "User data is securely managed.",
    },
    {
      icon: <FaSearch size={34} />,
      title: "Job Search",
      desc: "Multiple job sources in one place.",
    },
    {
      icon: <FaUserCheck size={34} />,
      title: "ATS Friendly",
      desc: "Optimized resumes for recruiters.",
    },
    {
      icon: <FaLaptopCode size={34} />,
      title: "Modern UI",
      desc: "Fast, responsive and user-friendly.",
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">

          <span className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">

            PLATFORM HIGHLIGHTS

          </span>

          <h2 className="text-5xl font-bold mt-6 text-slate-800">

            Built For Modern Job Seekers

          </h2>

          <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">

            CareerPilot combines AI, resume building,
            job search and career management into one platform.

          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">

          {stats.map((item, index) => (

            <div
              key={index}
              className="rounded-3xl bg-slate-50 border border-slate-200 p-8 hover:shadow-xl hover:-translate-y-2 transition duration-300"
            >

              <div className="w-16 h-16 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center">

                {item.icon}

              </div>

              <h3 className="text-2xl font-bold mt-8">

                {item.title}

              </h3>

              <p className="text-gray-600 mt-4 leading-7">

                {item.desc}

              </p>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default PlatformStats;