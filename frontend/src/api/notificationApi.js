import api from "./api";

export const getNotifications = async () => {
  const response = await api.get("/notification/my");
  return response.data;
};

export const markAsRead = async (id) => {
  const response = await api.put(`/notification/read/${id}`);
  return response.data;
};