import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import StatCard from "../../components/Cards/StatCard";
import WelcomeCard from "../../components/Dashboard/WelcomeCard";

import { getDashboard } from "../../api/dashboardApi";

function Dashboard() {

  const navigate = useNavigate();

  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {

    const loadDashboard = async () => {

      try {

        const data = await getDashboard();

        setDashboard(data);

      } catch (error) {

        console.log(error);

      }

    };

    loadDashboard();

  }, []);

  return (

    <MainLayout>

      <WelcomeCard
        userName={dashboard?.user?.name}
      />

      {/* Dashboard Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">

        <StatCard
          title="ATS Score"
          value={dashboard?.resume?.ats_score ?? "--"}
          icon="🎯"
          color="bg-blue-100"
        />

        <div
          onClick={() => navigate("/jobs")}
          className="cursor-pointer"
        >

          <StatCard
            title="Jobs Found"
            value={dashboard?.stats?.recommended_jobs ?? 0}
            icon="💼"
            color="bg-green-100"
          />

        </div>

        <div
          onClick={() => navigate("/saved-jobs")}
          className="cursor-pointer"
        >

          <StatCard
            title="Saved Jobs"
            value={dashboard?.stats?.saved_jobs ?? 0}
            icon="🔖"
            color="bg-pink-100"
          />

        </div>

        <div
          onClick={() => navigate("/applications")}
          className="cursor-pointer"
        >

          <StatCard
            title="Applications"
            value={dashboard?.stats?.applied_jobs ?? 0}
            icon="📨"
            color="bg-yellow-100"
          />

        </div>

      </div>

      {/* AI Recommendation Section */}

      <div className="mt-10 bg-white rounded-2xl shadow-md p-8">

        <div className="flex justify-between items-center mb-8">

          <div>

            <h2 className="text-2xl font-bold">

              AI Job Recommendations

            </h2>

            <p className="text-gray-500 mt-1">

              Discover jobs perfectly matched to your resume.

            </p>

          </div>

          <Link
            to="/jobs"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >

            View All Jobs

          </Link>

        </div>

        <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center">

          <div className="text-6xl mb-5">

            💼

          </div>

          <h3 className="text-2xl font-bold">

            Ready to Explore Jobs?

          </h3>

          <p className="text-gray-500 mt-3 max-w-2xl mx-auto">

            CareerPilot recommends AI-powered jobs based on your
            resume, skills and ATS score. Upload your latest resume
            or browse recommended opportunities.

          </p>

          <div className="flex justify-center gap-4 mt-8">

            <button
              onClick={() => navigate("/resume")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
            >

              Update Resume

            </button>

            <button
              onClick={() => navigate("/jobs")}
              className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg transition"
            >

              Browse Jobs

            </button>

          </div>

        </div>

      </div>

    </MainLayout>

  );

}

export default Dashboard;