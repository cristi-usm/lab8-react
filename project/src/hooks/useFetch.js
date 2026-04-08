import { useEffect, useState } from "react";

const TOKEN = import.meta.env.VITE_API_READ_ACCESS_TOKEN;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${TOKEN}`,
  },
};

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setErorr] = useState(null);

  useEffect(() => {
    if (!url) return;
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(url, options);

        if (!res.ok) throw new Error(`Eroare: ${res.status}`);

        const json = await res.json();
        setData(json);
      } catch (err) {
        setErorr(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, loading, error };
};
