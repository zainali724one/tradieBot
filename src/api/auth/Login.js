import axiosClient from "./axiosClient";
export const getHistory = async (telegramId) => {
  const response = await axiosClient.get(
    `/api/history/getHistory/${telegramId}`
  );
  return response.data;
};
