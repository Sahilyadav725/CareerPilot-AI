import { Link } from "react-router-dom";

function Sidebar() {

  return (

    <aside className="w-64 bg-white shadow-md min-h-screen p-6">

      <h2 className="text-xl font-bold text-blue-600 mb-8">
        Menu
      </h2>

      <nav className="flex flex-col gap-3">

        <Link
          to="/dashboard"
          className="p-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition"
        >
          🏠 Dashboard
        </Link>

        <Link
          to="/resume"
          className="p-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition"
        >
          📄 Resume
        </Link>

        <Link
          to="/resume-builder"
          className="p-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition"
        >
         ✨ AI Resume Builder
        </Link>

        <Link
          to="/jobs"
          className="p-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition"
        >
          💼 Jobs
        </Link>

        <Link
          to="/saved-jobs"
          className="p-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition"
        >
          🔖 Saved Jobs
        </Link>

        <Link
          to="/applications"
          className="p-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition"
        >
          📨 Applications
        </Link>

        <Link
            to="/notifications"
            className="p-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition"
        >
            🔔 Notifications
        </Link>

        <Link
          to="/profile"
          className="p-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition"
        >
          👤 Profile
        </Link>

      </nav>

    </aside>

  );

}

export default Sidebar;