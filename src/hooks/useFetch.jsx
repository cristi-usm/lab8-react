import { useState, useEffect, useCallback } from 'react';

const timeLimit = 10 * 60 * 1000;

export default function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = useCallback( async (signal) =>{
        if(!url) {
            setData(null);
            setLoading(false);
            return;
        };
        try{
            setError(null);

            const cached = sessionStorage.getItem(url);
            if(cached){
                const parsed = JSON.parse(cached);
                const validTime = (Date.now() - parsed.time) < timeLimit;
                if(validTime){
                    setData(parsed.data);
                    setLoading(false);
                    return;
                }
            }

            setLoading(true);

            const response = await fetch(url, {signal});

            if(!response.ok) throw new Error("HTTP" + response.status);

            const json = await response.json();
            sessionStorage.setItem(url, JSON.stringify({data: json, time: Date.now()}));
            setData(json);
            setLoading(false);

        }catch(err){
            if(err.name !== 'AbortError') {
                setError(err.message);
            }
        }finally{
            setLoading(false);
        }
    }, [url]);

    useEffect(() => {
        const controller = new AbortController();
        fetchData(controller.signal);
        return () => controller.abort();
    }, [fetchData]);
    
    const refetch = () => fetchData();

    return {data, loading, error, refetch}
}