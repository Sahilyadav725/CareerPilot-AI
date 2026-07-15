import api from "./api";

// Register
export const registerUser = async (data) => {

  const response = await api.post(
    "/auth/signup",
    data
  );

  return response.data;

};


// Login
export const loginUser = async (data) => {

  const formData = new URLSearchParams();

  formData.append("username", data.email);

  formData.append("password", data.password);

  const response = await api.post(

    "/auth/login",

    formData,

    {

      headers: {

        "Content-Type":
          "application/x-www-form-urlencoded",

      },

    }

  );

  return response.data;

};


// Send OTP
export const sendOTP = async (email) => {

  const response = await api.post(

    "/auth/send-otp",

    {

      email,

    }

  );

  return response.data;

};


// Verify OTP
export const verifyOTP = async (

  email,

  otp

) => {

  const response = await api.post(

    "/auth/verify-otp",

    {

      email,

      otp,

    }

  );

  return response.data;

};

export const resetPassword = async (

  email,

  password

) => {

  const response = await api.post(

    "/auth/reset-password",

    {

      email,

      password,

    }

  );

  return response.data;

};