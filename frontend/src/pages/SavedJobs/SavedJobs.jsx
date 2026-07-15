import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import {
  getSavedJobs,
  removeSavedJob,
} from "../../api/savedJobsApi";
import toast from "react-hot-toast";

function SavedJobs() {

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    loadSavedJobs();

  }, []);

  const loadSavedJobs = async () => {

    try {

      const data = await getSavedJobs();

      if (data.success) {

        setJobs(data.jobs);

      }

    } catch (error) {

      console.log(error);

      toast.error("Failed to load saved jobs.");

    } finally {

      setLoading(false);

    }

  };

  const handleRemove = async (id) => {

    try {

      const data = await removeSavedJob(id);

      if (data.success) {

        toast.success("Job removed.");

        setJobs(jobs.filter(job => job.id !== id));

      }

    } catch (error) {

      console.log(error);

      toast.error("Unable to remove job.");

    }

  };

  return (

    <MainLayout>

      <div className="mb-8">

        <h1 className="text-4xl font-bold">

          Saved Jobs

        </h1>

        <p className="text-gray-500 mt-2">

          Jobs you've bookmarked for later.

        </p>

      </div>

      {loading ? (

        <div className="text-center">

          Loading...

        </div>

      ) : jobs.length === 0 ? (

        <div className="bg-white rounded-2xl shadow-md p-12 text-center">

          <div className="text-6xl">

            🔖

          </div>

          <h2 className="text-2xl font-bold mt-4">

            No Saved Jobs

          </h2>

          <p className="text-gray-500 mt-2">

            Save interesting jobs to access them later.

          </p>

        </div>

      ) : (

        <div className="grid gap-5">

          {jobs.map((job) => (

            <div
              key={job.id}
              className="bg-white rounded-2xl shadow-md p-6"
            >

              <h2 className="text-2xl font-bold text-blue-700">

                {job.job_title}

              </h2>

              <p className="mt-2">

                <strong>Company:</strong> {job.company}

              </p>

              <p>

                <strong>Location:</strong> {job.location}

              </p>

              <div className="flex gap-4 mt-6">

                <a
                  href={job.job_url}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
                >

                  Open Job

                </a>

                <button
                  onClick={() => handleRemove(job.id)}
                  className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700"
                >

                  Remove

                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </MainLayout>

  );

}

export default SavedJobs;