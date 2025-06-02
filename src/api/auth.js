import axiosClient from "../api/auth/axiosClient";

export const userSignup = async (formData) => {
  const response = await axiosClient.post("/signup", {
    ...formData,
  });
  return response.data;
};

export const userLogin = async (formData) => {
  const response = await axiosClient.post("/login", {
    ...formData,
  });
  return response.data;
};


export const userSendOtp = async (formData) => {
  const response = await axiosClient.post("/forgot-password/send-otp", {
    ...formData,
  });
  return response.data;
};

export const userVerifyOtp = async (formData) => {
  const response = await axiosClient.post("/forgot-password/verify-otp", {
    ...formData,
  });
  return response.data;
};


export const userResetPassword = async (formData) => {
  const response = await axiosClient.post("/forgot-password/update-password", {
    ...formData,
  });
  return response.data;
};



