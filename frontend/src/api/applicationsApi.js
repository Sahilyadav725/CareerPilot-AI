import api from "./api";

export const getApplications = async () => {
  const response = await api.get("/application/my");
  return response.data;
};

export const updateApplicationStatus = async (id, status) => {
  const response = await api.put(`/application/status/${id}`, {
    status,
  });

  return response.data;
};

export const deleteApplication = async (id) => {
  const response = await api.delete(`/application/${id}`);
  return response.data;
};