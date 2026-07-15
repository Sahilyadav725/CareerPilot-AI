function PersonalForm({ resume, handleChange }) {

  return (

    <div className="bg-white rounded-2xl shadow-lg p-8">

      <h2 className="text-2xl font-bold text-blue-700">

        👤 Personal Information

      </h2>

      <p className="text-gray-500 mt-2">

        Enter your basic details.

      </p>

      <div className="mt-8 space-y-5">

        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={resume.fullName}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={resume.email}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={resume.phone}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />

        <input
          type="text"
          name="linkedin"
          placeholder="LinkedIn Profile"
          value={resume.linkedin}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />

        <input
          type="text"
          name="github"
          placeholder="GitHub Profile"
          value={resume.github}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />

        <input
          type="text"
          name="portfolio"
          placeholder="Portfolio Website (Optional)"
          value={resume.portfolio}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={resume.address}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />

        <textarea
          rows="5"
          name="summary"
          placeholder="Professional Summary"
          value={resume.summary}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />

      </div>

    </div>

  );

}

export default PersonalForm;