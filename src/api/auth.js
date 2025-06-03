import axiosClient from "../api/auth/axiosClient";

export const userSignup = async (formData) => {
  const response = await axiosClient.post("/signup", {
    ...formData,
  });
  return response.data;
};

export const userLogin = async (formData) => {
  const response = await axiosClient.post("/signin", {
    ...formData,
  });
  return response.data;
};


export const userSendOtp = async (formData) => {
  const response = await axiosClient.post("/sendOTP", {
    ...formData,
  });
  return response.data;
};

export const userVerifyOtp = async (formData) => {
  const response = await axiosClient.post("/verifyOTP", {
    ...formData,
  });
  return response.data;
};


export const userResetPassword = async (formData) => {
  const response = await axiosClient.post("/updatePassword", {
    ...formData,
  });
  return response.data;
};



