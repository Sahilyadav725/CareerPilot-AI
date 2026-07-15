function RecentApplications({ applications = [] }) {

  return (

    <div className="bg-white rounded-2xl shadow-md p-6">

      <h2 className="text-xl font-bold mb-5">
        Recent Applications
      </h2>

      {applications.length === 0 ? (

        <p className="text-gray-500">
          No applications yet.
        </p>

      ) : (

        <div className="space-y-4">

          {applications.map((application) => (

            <div
              key={application.id}
              className="border rounded-xl p-4 hover:bg-slate-50 transition"
            >

              <h3 className="font-semibold text-lg">
                {application.job_title}
              </h3>

              <p className="text-gray-500">
                {application.company}
              </p>

              <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                {application.status}
              </span>

            </div>

          ))}

        </div>

      )}

    </div>

  );

}

export default RecentApplications;