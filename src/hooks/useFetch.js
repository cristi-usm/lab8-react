import { useEffect, useState } from 'react';

const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000;

export function useFetch(url) {
  const [state, setState] = useState({ data: null, loading: Boolean(url), error: null });

  useEffect(() => {
    if (!url) {
      setState({ data: null, loading: false, error: null });
      return undefined;
    }

    const cached = cache.get(url);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      setState({ data: cached.data, loading: false, error: null });
      return undefined;
    }

    const controller = new AbortController();
    setState({ data: null, loading: true, error: null });

    fetch(url, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Serverul a răspuns cu ${response.status}.`);
        return response.json();
      })
      .then((data) => {
        cache.set(url, { data, timestamp: Date.now() });
        setState({ data, loading: false, error: null });
      })
      .catch((error) => {
        if (error.name !== 'AbortError') setState({ data: null, loading: false, error });
      });

    return () => controller.abort();
  }, [url]);

  return state;
}

export const clearCache = () => cache.clear();
