"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export const useFetch = (url) => {
  const [data, setdata] = useState([]);
  const [Error, setError] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(url);
        setdata(res.data);
      } catch (error) {
        console.log(error);
        setError(error);
      }
    };
    fetchData();
  }, []);

  return {
    data,
    Error,
  };
};
