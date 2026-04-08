import { useEffect, useState } from "react";

const TOKEN = import.meta.env.VITE_API_READ_ACCESS_TOKEN;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${TOKEN}`,
  },
};

const cache = {};
const TTL = 1000 * 60 * 5;

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      const cached = cache[url];
      const now = Date.now();
      if (cached && now - cached.timestamp < TTL) {
        setData(cached.data);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(url, options);
        if (!res.ok) throw new Error(`Eroare: ${res.status}`);
        const json = await res.json();

        cache[url] = { data: json, timestamp: now };

        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);


  return { data, loading, error };
};
