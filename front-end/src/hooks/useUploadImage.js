import { useState } from "react";
import axiosClient from "../axios/config.js";

const useUploadImage = ({ url, method = "POST" }) => {
  const [state, setState] = useState({
    isLoading: false,
    error: "",
    imageURL: "",
  });

  const fn = async (data) => {
    setState({ isLoading: true });

    await axiosClient({
      url,
      method,
      data,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        setState({ isLoading: false, error: "", imageURL: res.data.url });
      })
      .catch((error) => {
        setState({ isLoading: false, error: error.message, imageURL: "" });
      });
  };
  return { mutate: fn, ...state };
};

export default useUploadImage;
