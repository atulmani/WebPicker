import React, { useEffect, useState } from 'react'

export const useFetchJSON = (url) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {

        const controller = new AbortController();//AbortController is JS Class/Object

        const fetchData = async () => {
            setIsLoading(true);
            try {
                const res = await fetch(url, { signal: controller.signal });
                if (!res.ok) {
                    throw new Error(res.statusText);
                }
                const json = await res.json();
                setIsLoading(false);
                setData(json);
                setError(null);
            }
            catch (err) {
                if (err.name === "AbortError") {
                    console.log('the fetch was aborted');
                } else {
                    setIsLoading(false);
                    setError('Could not fetch the data');
                    console.log(err.message);
                }
            }
        }
        fetchData();
        //Cleanup funtion
        return () => {
            controller.abort();
        }
    }, [url])

    return { data, isLoading, error }

}
