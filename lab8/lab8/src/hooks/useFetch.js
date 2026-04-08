import { useEffect, useRef, useState } from "react";

export default function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(!!url);
  const [error, setError] = useState("");
  const abortRef = useRef(null);

  useEffect(() => {
    if (!url) return;

    const controller = new AbortController();
    abortRef.current = controller;

    async function fetchData() {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(url, { signal: controller.signal });

        if (!res.ok) {
          throw new Error("Error fetching data");
        }

        const json = await res.json();
        setData(json);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    return () => controller.abort();
  }, [url]);

  return { data, loading, error };
}