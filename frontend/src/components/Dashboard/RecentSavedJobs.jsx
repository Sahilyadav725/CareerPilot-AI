function RecentSavedJobs({ jobs = [] }) {

  return (

    <div className="bg-white rounded-2xl shadow-md p-6">

      <h2 className="text-xl font-bold mb-5">
        Recent Saved Jobs
      </h2>

      {jobs.length === 0 ? (

        <p className="text-gray-500">
          No saved jobs yet.
        </p>

      ) : (

        <div className="space-y-4">

          {jobs.map((job) => (

            <div
              key={job.id}
              className="border rounded-xl p-4 hover:bg-slate-50 transition"
            >

              <h3 className="font-semibold text-lg">
                {job.job_title}
              </h3>

              <p className="text-gray-500">
                {job.company}
              </p>

            </div>

          ))}

        </div>

      )}

    </div>

  );

}

export default RecentSavedJobs;