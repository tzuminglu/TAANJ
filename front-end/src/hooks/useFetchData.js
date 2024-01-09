import { useEffect, useState } from "react";
import axiosClient from "../axios/config.js";

const useFetchData = ({ url, method = "GET" }) => {
  const [state, setState] = useState({
    isLoading: false,
    error: "",
    data: undefined,
  });

  const fetchData = async () => {
    setState({ isLoading: true });

    try {
      const res = await axiosClient({ url, method });
      setState({ isLoading: false, error: "", data: res.data });
    } catch (error) {
      setState({ isLoading: false, error: error.message, data: undefined });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { mutate: fetchData, ...state };
};

export default useFetchData;
