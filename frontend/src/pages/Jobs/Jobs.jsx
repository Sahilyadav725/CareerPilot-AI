import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import {
  getJobs,
  saveJob,
  visitJob,
  markJobApplied
} from "../../api/jobsApi";
import toast from "react-hot-toast";

function Jobs() {

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {

    try {

      const data = await getJobs();
      if (data.success) {
        const updatedJobs = data.jobs.map((job) => ({

  ...job,

  match_label:

    job.match_score >= 90
      ? "Excellent"

    : job.match_score >= 80
      ? "Very Good"

    : job.match_score >= 70
      ? "Good"

    : "Low"

}));

setJobs(updatedJobs);

      } else {
        toast.error(data.message);
      }

    } catch (error) {

      console.log(error);
      toast.error("Failed to load jobs.");

    } finally {

      setLoading(false);

    }

  };

// ==========================
// SAVE JOB
// ==========================

const handleSave = async (index) => {

  try {

    const response = await saveJob(jobs[index]);

    if (!response.success) {

      toast.error(response.message);

      return;

    }

    const updatedJobs = [...jobs];

    updatedJobs[index].saved = true;

    setJobs(updatedJobs);

    toast.success("Job saved successfully.");

  } catch (error) {

    console.error(error);

    toast.error("Unable to save job.");

  }

};  

  // ==========================
// VISIT JOB
// ==========================

const handleVisit = async (index) => {

  try {

    await visitJob(jobs[index]);

    const updatedJobs = [...jobs];

    updatedJobs[index].application_status = "visited";

    setJobs(updatedJobs);

    if (jobs[index].redirect_url) {
      window.open(jobs[index].redirect_url, "_blank");
    }

  } catch (error) {

    console.log(error);

    toast.error("Unable to open job.");

  }

};


// ==========================
// MARK AS APPLIED
// ==========================

const handleMarkApplied = async (index) => {

  try {

    const response = await markJobApplied(jobs[index]);

    if (!response.success) {

      toast.error(response.message);

      return;

    }

    const updatedJobs = [...jobs];

    updatedJobs[index].application_status = "applied";

    setJobs(updatedJobs);

    toast.success("Job marked as applied.");

  } catch (error) {

    console.log(error);

    toast.error("Unable to update.");

  }

};

  return (

    <MainLayout>

      <div className="mb-8">

        <h1 className="text-4xl font-bold text-slate-800">
          AI Recommended Jobs
        </h1>

        <p className="text-slate-500 mt-2">
          Jobs matched according to your resume skills.
        </p>

      </div>

      {loading ? (

        <div className="text-center text-lg font-semibold">
          Loading Jobs...
        </div>

      ) : jobs.length === 0 ? (

        <div className="bg-white rounded-xl shadow p-8 text-center">
          No jobs found.
        </div>

      ) : (

        <div className="grid gap-6">

          {jobs.map((job, index) => (

            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >

              <div className="flex justify-between items-center">

  <h2 className="text-2xl font-bold text-slate-800">

    {job.title}

  </h2>

  <span
    className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${
      job.match_score >= 90
        ? "bg-green-600"
        : job.match_score >= 80
        ? "bg-blue-600"
        : job.match_score >= 70
        ? "bg-yellow-500"
        : "bg-red-500"
    }`}
  >
    {job.match_score}%
  </span>

</div>

              <p className="mt-3">
                <strong>Company:</strong> {job.company}
              </p>

              <p>
                <strong>Location:</strong> {job.location}
              </p>

              {(job.salary_min || job.salary_max) && (

                <p>
                  <strong>Salary:</strong>{" "}
                  ₹ {job.salary_min?.toLocaleString() || "N/A"} -
                  ₹ {job.salary_max?.toLocaleString() || "N/A"}
                </p>

              )}

              {/* AI Match Score */}

<div className="mt-5">

  <div className="flex justify-between items-center mb-2">

    <span className="font-semibold text-gray-700">
      AI Match Score
    </span>

    <span
      className={`font-bold ${
        job.match_score >= 90
          ? "text-green-600"
          : job.match_score >= 80
          ? "text-blue-600"
          : job.match_score >= 70
          ? "text-yellow-600"
          : "text-red-600"
      }`}
    >
      {job.match_score}% • {job.match_label}
    </span>

  </div>

  {/* Matched Skills */}

{job.matched_skills && job.matched_skills.length > 0 && (

  <div className="mt-5">

    <h3 className="font-semibold text-gray-700 mb-2">

      Matched Skills

    </h3>

    <div className="flex flex-wrap gap-2">

      {job.matched_skills.map((skill, i) => (

        <span
          key={i}
          className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium"
        >
          ✓ {skill}
        </span>

      ))}

    </div>

  </div>

)}

  <div className="w-full bg-gray-200 rounded-full h-3">

    <div
      className={`h-3 rounded-full transition-all duration-700 ${
        job.match_score >= 90
          ? "bg-green-500"
          : job.match_score >= 80
          ? "bg-blue-500"
          : job.match_score >= 70
          ? "bg-yellow-500"
          : "bg-red-500"
      }`}
      style={{
        width: `${job.match_score}%`
      }}
    />

  </div>

</div>

              <div className="flex flex-wrap gap-4 mt-8">

                <button
                  onClick={() => handleSave(index)}
                  disabled={job.saved}
                  className={`px-5 py-2 rounded-lg font-medium transition ${
                    job.saved
                      ? "bg-gray-400 text-white cursor-not-allowed"
                      : "bg-emerald-600 hover:bg-emerald-700 text-white"
                  }`}
                >

                  {job.saved ? "✓ Saved" : "Save Job"}

                </button>

                {job.application_status === "applied" ? (

                  <button
                    disabled
                    className="px-5 py-2 rounded-lg bg-green-600 text-white cursor-not-allowed"
                  >
                    ✅ Applied
                  </button>

                ) : job.application_status === "visited" ? (

                  <button
                    onClick={() => handleMarkApplied(index)}
                    className="px-5 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white"
                  >
                    ✔ Mark as Applied
                  </button>

                ) : (

                  <button
                    onClick={() => handleVisit(index)}
                    className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    🚀 Apply Now
                  </button>

                )}

              </div>

            </div>

          ))}

        </div>

      )}

    </MainLayout>

  );

}

export default Jobs;