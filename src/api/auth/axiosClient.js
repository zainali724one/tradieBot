import axios from "axios";

const axiosClient = axios.create({
  // baseURL: "https://tradie-bot-backend.vercel.app/api/user",

  baseURL :"https://5xj674r7-3000.inc1.devtunnels.ms/api/user"
});

export default axiosClient;
