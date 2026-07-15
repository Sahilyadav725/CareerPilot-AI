import { Link } from "react-router-dom";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-slate-900 text-white"
      data-aos="fade-up"
      >

      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Logo */}

          <div>

            <h2 className="text-3xl font-bold text-blue-400">

              CareerPilot

            </h2>

            <p className="mt-5 text-slate-300 leading-7">

              Build ATS-friendly resumes, discover jobs,
              and manage your career journey with AI-powered tools.

            </p>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="font-bold text-xl">

              Quick Links

            </h3>

            <div className="mt-5 flex flex-col gap-3">

              <Link to="/" className="hover:text-blue-400">

                Home

              </Link>

              <Link to="/login" className="hover:text-blue-400">

                Login

              </Link>

              <Link to="/register" className="hover:text-blue-400">

                Register

              </Link>

            </div>

          </div>

          {/* Features */}

          <div>

            <h3 className="font-bold text-xl">

              Features

            </h3>

            <div className="mt-5 flex flex-col gap-3 text-slate-300">

              <p>AI Resume Builder</p>

              <p>ATS Resume</p>

              <p>Job Search</p>

              <p>Application Tracker</p>

            </div>

          </div>

          {/* Contact */}

          <div>

            <h3 className="font-bold text-xl">

              Connect

            </h3>

            <div className="flex gap-5 mt-5 text-2xl">

              <a href="#">

                <FaGithub />

              </a>

              <a href="#">

                <FaLinkedin />

              </a>

              <a href="mailto:careerpilot.team@gmail.com">

                <FaEnvelope />

              </a>

            </div>

            <p className="mt-6 text-slate-300">

              careerpilot.team@gmail.com

            </p>

          </div>

        </div>

        <hr className="border-slate-700 my-10" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-slate-400">

            © 2026 CareerPilot. All Rights Reserved.

          </p>

          <div className="flex gap-6 text-slate-400">

            <a href="#">

              Privacy Policy

            </a>

            <a href="#">

              Terms of Service

            </a>

          </div>

        </div>

      </div>

    </footer>
  );
}

export default Footer;