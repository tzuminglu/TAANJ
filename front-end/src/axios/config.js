import axios from "axios";

const baseURL = import.meta.env.VITE_APP_API_URL;

const axiosClient = axios.create({
  baseURL,
  headers: {
    "Access-Control-Allow-Origin": baseURL,
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default axiosClient;
