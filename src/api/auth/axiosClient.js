import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://tradie-bot-backend.vercel.app/api/v1",
});

export default axiosClient;
