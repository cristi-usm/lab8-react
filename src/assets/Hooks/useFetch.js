import { useState, useEffect, useRef } from 'react';

const cache = {};
const TTL = 5 * 60 * 1000;

function useFetch(url) {
  const [date, setDate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [eroare, setEroare] = useState(null);
  const controllerRef = useRef(null);

  useEffect(() => {
    if (!url) {
      setLoading(false);
      return;
    }

    const acum = Date.now();
    if (cache[url] && acum - cache[url].timp < TTL) {
      setDate(cache[url].date);
      setLoading(false);
      setEroare(null);
      return;
    }

    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    controllerRef.current = new AbortController();

    async function fetchDate() {
      try {
        setLoading(true);
        setEroare(null);

        const res = await fetch(url, { signal: controllerRef.current.signal });
        if (!res.ok) throw new Error('HTTP ' + res.status);
        const json = await res.json();

        cache[url] = { date: json, timp: Date.now() };
        setDate(json);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setEroare(err.message);
          setDate(null);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchDate();

    return () => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
    };
  }, [url]);

  return { date, loading, eroare };
}
export default useFetch;
