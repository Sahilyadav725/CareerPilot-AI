import api from "./api";

export const getSavedJobs = async () => {

  const response = await api.get("/jobs/saved");

  return response.data;

};

export const removeSavedJob = async (id) => {

  const response = await api.delete(`/jobs/saved/${id}`);

  return response.data;

};