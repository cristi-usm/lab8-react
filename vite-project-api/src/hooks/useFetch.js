import { useState, useEffect } from "react";
import { getCache, setCache } from "../utils/cache";

export default function useFetch(url, ttl = 300000) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      try {
        const cached = getCache(url, ttl);
        if (cached) {
          setData(cached);
          return;
        }

        setLoading(true);
        setError(null);

        const response = await fetch(url);
        if (!response.ok) throw new Error("Network error");

        const json = await response.json();
        setData(json);
        setCache(url, json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, ttl]);

  return { data, loading, error };
}