import { useState, useEffect } from "react";

export function useFetch(url) {
  const [date, setDate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [eroare, setEroare] = useState(null);

  useEffect(() => {
    if (!url) return;

    const controller = new AbortController();

    async function fetchData() {
      try {
        setLoading(true);

        const cache = sessionStorage.getItem(url);
        if (cache) {
          setDate(JSON.parse(cache));
          setLoading(false);
          return;
        }

        const res = await fetch(url, { signal: controller.signal });
        const data = await res.json();

        sessionStorage.setItem(url, JSON.stringify(data));

        setDate(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setEroare(err);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    return () => controller.abort();
  }, [url]);

  return { date, loading, eroare };
}