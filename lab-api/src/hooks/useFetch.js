import { useEffect, useState } from "react";

export default function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const CACHE_KEY = `cache_${url}`;
  const TTL = 5 * 60 * 1000;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cached = sessionStorage.getItem(CACHE_KEY);

        if (cached) {
          const parsed = JSON.parse(cached);

          if (Date.now() - parsed.timestamp < TTL) {
            setData(parsed.data);
            setLoading(false);
            return;
          }
        }

        const res = await fetch(url);
        const result = await res.json();

        setData(result);
        setLoading(false);

        sessionStorage.setItem(
          CACHE_KEY,
          JSON.stringify({
            data: result,
            timestamp: Date.now(),
          })
        );
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, [url,CACHE_KEY, TTL]);

  return { data, loading, error };
}