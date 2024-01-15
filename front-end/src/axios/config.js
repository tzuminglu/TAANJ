import axios from "axios";

const baseURL = import.meta.env.VITE_APP_API_URL;

const axiosClient = axios.create({ withCredentials: true, baseURL });

export default axiosClient;
