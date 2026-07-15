import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import {
  getApplications,
  updateApplicationStatus,
  deleteApplication,
} from "../../api/applicationsApi";
import toast from "react-hot-toast";

function Applications() {

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {

    try {

      const data = await getApplications();

      if (data.success) {
        setApplications(data.applications);
      }

    } catch (error) {

      console.log(error);

      toast.error("Failed to load applications.");

    } finally {

      setLoading(false);

    }

  };

  const handleStatusChange = async (id, status) => {

    try {

      const data = await updateApplicationStatus(id, status);

      if (data.success) {

        toast.success("Status Updated");

        setApplications((prev) =>
          prev.map((app) =>
            app.id === id
              ? { ...app, status }
              : app
          )
        );

      }

    } catch (error) {

      console.log(error);

      toast.error("Unable to update status.");

    }

  };

  const handleDelete = async (id) => {

    if (!window.confirm("Delete this application?")) return;

    try {

      const data = await deleteApplication(id);

      if (data.success) {

        toast.success("Application Deleted");

        setApplications((prev) =>
          prev.filter((app) => app.id !== id)
        );

      }

    } catch (error) {

      console.log(error);

      toast.error("Delete Failed");

    }

  };

  const getBadgeColor = (status) => {

    switch (status) {

      case "Interview":
        return "bg-yellow-100 text-yellow-700";

      case "Offer":
        return "bg-green-100 text-green-700";

      case "Rejected":
        return "bg-red-100 text-red-700";

      default:
        return "bg-blue-100 text-blue-700";

    }

  };

  return (

    <MainLayout>

      <div className="mb-8">

        <h1 className="text-4xl font-bold">

          My Applications

        </h1>

        <p className="text-gray-500 mt-2">

          Track every job you've applied for.

        </p>

      </div>

      {loading ? (

        <div className="text-center text-lg">

          Loading...

        </div>

      ) : applications.length === 0 ? (

        <div className="bg-white rounded-2xl shadow-md p-12 text-center">

          <div className="text-6xl">

            📨

          </div>

          <h2 className="text-2xl font-bold mt-4">

            No Applications Yet

          </h2>

          <p className="text-gray-500 mt-2">

            Apply for jobs to track them here.

          </p>

        </div>

      ) : (

        <div className="grid gap-5">

          {applications.map((app) => (

            <div
              key={app.id}
              className="bg-white rounded-2xl shadow-md p-6"
            >

              <h2 className="text-2xl font-bold text-blue-700">

                {app.job_title}

              </h2>

              <p className="mt-2">

                <strong>Company:</strong> {app.company}

              </p>

              <p>

                <strong>Location:</strong> {app.location}

              </p>

              <p>

                <strong>Applied Date:</strong>{" "}

                {new Date(app.applied_date).toLocaleDateString()}

              </p>

              <div className="mt-4 flex items-center gap-3">

                <span className="font-semibold">

                  Status

                </span>

                <select

                  value={app.status}

                  onChange={(e) =>
                    handleStatusChange(
                      app.id,
                      e.target.value
                    )
                  }

                  className={`px-3 py-2 rounded-lg border ${getBadgeColor(app.status)}`}

                >

                  <option value="Applied">
                    Applied
                  </option>

                  <option value="Interview">
                    Interview
                  </option>

                  <option value="Offer">
                    Offer
                  </option>

                  <option value="Rejected">
                    Rejected
                  </option>

                </select>

              </div>

              <div className="flex gap-4 mt-6">

                <a

                  href={app.job_url}

                  target="_blank"

                  rel="noreferrer"

                  className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"

                >

                  Open Job

                </a>

                <button

                  onClick={() => handleDelete(app.id)}

                  className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700"

                >

                  Delete

                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </MainLayout>

  );

}

export default Applications;