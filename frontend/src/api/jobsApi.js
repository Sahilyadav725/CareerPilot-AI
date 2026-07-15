import api from "./api";

/**
 * Get AI Recommended Jobs
 */
export const getJobs = async () => {
  try {

    const response = await api.get("/jobs/search");

    return response.data;

  } catch (error) {

    console.error("Get Jobs Error:", error);

    return {

      success: false,

      jobs: [],

      count: 0,

      message:
        error.response?.data?.message ||
        "Unable to fetch jobs."

    };

  }
};

/**
 * Save Job
 */
export const saveJob = async (job) => {

  try {

    const response = await api.post("/jobs/save", {

      title: job.title,

      company: job.company,

      location: job.location,

      job_url: job.redirect_url

    });

    return response.data;

  } catch (error) {

    console.error(error);

    return {

      success: false,

      message: "Unable to save job."

    };

  }

};

/**
 * Visit Job
 */
export const visitJob = async (job) => {

  try {

    const response = await api.post("/jobs/visit", {

      title: job.title,

      company: job.company,

      location: job.location,

      job_url: job.redirect_url

    });

    return response.data;

  } catch (error) {

    console.error(error);

    return {

      success: false,

      message: "Unable to visit job."

    };

  }

};

/**
 * Mark Applied
 */
export const markJobApplied = async (job) => {

  try {

    const response = await api.post("/application/apply", {

      job_title: job.title,
      company: job.company,
      location: job.location,
      job_url: job.redirect_url

    });

    return response.data;

  } catch (error) {

    console.error(error);

    return {

      success: false,

      message: error.response?.data?.message || "Unable to mark applied."

    };

  }

};