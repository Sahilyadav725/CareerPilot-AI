import { ArrowRight, Briefcase, FileText, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Hero() {

    const navigate = useNavigate();
  return (
    <section className="bg-slate-50">
      <div className="max-w-7xl mx-auto px-8 py-20 grid lg:grid-cols-2 gap-12 items-center">

        {/* Left Side */}

        <div>

          <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-medium">
            AI Powered Career Platform
          </span>

          <h1 className="mt-6 text-6xl font-bold leading-tight text-slate-900">
            Find Your Dream Job
            <span className="text-blue-600"> Faster.</span>
          </h1>

          <p className="mt-6 text-xl text-slate-600 leading-9">
            Upload your resume, get an ATS score,
            discover matching jobs, save opportunities,
            and track every application from one dashboard.
          </p>

          <div className="flex mt-10">
            <Link
              to="/register"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl flex items-center gap-2 transition"
            >
              Get Started
              <ArrowRight size={20} />
            </Link>
          </div>

        </div>

        {/* Right Side */}

        <div className="grid gap-5">

          <div className="bg-white rounded-2xl shadow-lg p-6">

            <div className="flex items-center gap-3">

              <FileText className="text-blue-600" />

              <div>

                <h3 className="font-semibold">
                  Resume Uploaded
                </h3>

                <p className="text-slate-500">
                  ATS Score : 92%
                </p>

              </div>

            </div>

          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">

            <div className="flex items-center gap-3">

              <Search className="text-green-600" />

              <div>

                <h3 className="font-semibold">
                  Recommended Jobs
                </h3>

                <p className="text-slate-500">
                  24 Jobs Matched
                </p>

              </div>

            </div>

          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">

            <div className="flex items-center gap-3">

              <Briefcase className="text-orange-500" />

              <div>

                <h3 className="font-semibold">
                  Applications
                </h3>

                <p className="text-slate-500">
                  8 Applied
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;