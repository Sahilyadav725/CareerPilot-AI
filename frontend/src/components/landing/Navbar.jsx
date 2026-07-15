import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="w-full border-b border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-5">

        {/* Logo */}

        <Link
          to="/"
          className="text-3xl font-bold text-blue-600"
        >
          CareerPilot
        </Link>

        {/* Menu */}

        <div className="flex items-center gap-8">

          <a
            href="#features"
            className="text-slate-700 hover:text-blue-600 transition"
          >
            Features
          </a>

          <a
            href="#how"
            className="text-slate-700 hover:text-blue-600 transition"
          >
            How it Works
          </a>

        </div>

        {/* Buttons */}

        <div className="flex gap-3">

          <Link
            to="/login"
            className="px-5 py-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50 transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Register
          </Link>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;