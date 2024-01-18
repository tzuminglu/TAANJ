import axiosClient from "../axios/config";
import { useState, useEffect } from "react";

export function useAPi(url) {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await axiosClient({
      url: url,
      method: "GET",
    });
    setData(response.data);
  };

  const removeData = (id) => {
    axiosClient({ data: id, method: "DELETE" });
    axios.delete(`${url}/${id}`).then(() => {
      const del = data.filter((item) => id !== item.id);
      setData(del);
    });
  };

  return { data, removeData };
}
