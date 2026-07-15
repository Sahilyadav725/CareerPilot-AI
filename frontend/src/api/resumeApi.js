
import api from "./api";

export const uploadResume = async (file) => {
  const formData = new FormData();

  formData.append("file", file);

  const response = await api.post(
    "/resume/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};


// ==========================
// AI Resume Generator
// ==========================

export const generateAIResume = async (resumeData) => {

  try {

    const response = await api.post(
      "/resume/generate-ai",
      resumeData
    );

    return response.data;

  } catch (error) {

  console.log("========== AI ERROR ==========");
  console.log("Status :", error.response?.status);
  console.log("Response :", error.response?.data);
  console.log("==============================");

  return {

    success: false,

    message:
      error.response?.data?.detail ||
      "Unable to generate AI Resume."

  };

}

};