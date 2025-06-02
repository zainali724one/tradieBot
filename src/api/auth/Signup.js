// import {axiosClient} from "./axiosClient";
// import {axiosClient} from "/api/axiosClient";
import axiosClient from "../auth/axiosClient";

export const userSignup = async (telegramData) => {
  const response = await axiosClient.post("/signup", {
    ...telegramData,
  });
  return response.data;
};
