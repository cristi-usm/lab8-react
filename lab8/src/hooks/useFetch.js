import { useReducer, useEffect, useRef } from 'react';
import { getCached, setCached } from '../utils/cache';

const initialState = { data: null, loading: false, error: null };

function reducer(state, action) {
  switch (action.type) {
    case 'IDLE': return { data: null, loading: false, error: null };
    case 'LOADING': return { data: null, loading: true, error: null };
    case 'SUCCESS': return { data: action.payload, loading: false, error: null };
    case 'ERROR': return { data: null, loading: false, error: action.payload };
    default: return state;
  }
}

export function useFetch(url) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const abortRef = useRef(null);

  useEffect(() => {
    if (!url) {
      dispatch({ type: 'IDLE' });
      return;
    }

    const cached = getCached(url);
    if (cached) {
      dispatch({ type: 'SUCCESS', payload: cached });
      return;
    }

    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    dispatch({ type: 'LOADING' });

    fetch(url, { signal: controller.signal })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
        return res.json();
      })
      .then(json => {
        setCached(url, json);
        dispatch({ type: 'SUCCESS', payload: json });
      })
      .catch(err => {
        if (err.name === 'AbortError') return;
        dispatch({ type: 'ERROR', payload: err.message || 'Something went wrong' });
      });

    return () => controller.abort();
  }, [url]);

  return state;
}