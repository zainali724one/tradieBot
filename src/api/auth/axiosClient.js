import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://tradie-bot-backend.vercel.app/api"

  // baseURL :"https://m24j7m06-3000.inc1.devtunnels.ms/api"
});

export default axiosClient;
