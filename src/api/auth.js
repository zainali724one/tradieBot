import axiosClient from "./axiosClient";

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
