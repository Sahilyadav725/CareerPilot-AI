import { useNavigate } from "react-router-dom";

function WelcomeCard({ userName }) {

  const navigate = useNavigate();

  return (

    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg p-8 text-white">

      <h1 className="text-4xl font-bold">

        Welcome, {userName || "User"} 👋

      </h1>

      <p className="mt-3 text-blue-100 text-lg">

        Ready to accelerate your career today?

      </p>

      <div className="mt-6 flex flex-wrap gap-4">

        <button
          onClick={() => navigate("/resume")}
          className="bg-white text-blue-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
        >

          📄 Upload Resume

        </button>

        <button
          onClick={() => navigate("/jobs")}
          className="bg-blue-500 px-6 py-3 rounded-xl font-semibold hover:bg-blue-400 transition"
        >

          💼 Find Jobs

        </button>

      </div>

    </div>

  );

}

export default WelcomeCard;