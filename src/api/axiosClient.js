import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://the-hive-backend.vercel.app",
  // baseURL: "https://hive-backend-eta.vercel.app",
});

export default axiosClient;
