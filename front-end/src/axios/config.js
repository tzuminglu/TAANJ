import axios from "axios";

const baseURL = import.meta.env.VITE_APP_API_URL;

const axiosClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "same-origin",
});

export default axiosClient;
