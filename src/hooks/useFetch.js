import { useState, useEffect } from 'react';

export function useFetch(url) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const reset = () => {
    setData([]);
    setError(null);
  }

  const refetch = async (options) => {
    reset();

    let params= {};
    let prepareUrl = url;

    if (options && 'params' in options) {
      params = options.params;
    } else {
      params = {
        _limit: 3
      }
    }

    for (let key in params) {
      prepareUrl += `/?${key}=${params[key]}`;
    }
    setIsLoading(true)
    try {
      const response = await fetch(prepareUrl);
      const result = await response.json();
      if (response.ok) {
        setData(result)
      } else {
        setError(result)
      }
    } catch (err) {
      setError(err);
    }
    setIsLoading(false)
  }

  useEffect(() => {
    refetch();
  }, [url]);


  return {
    data,
    isLoading,
    error,
    refetch,
  }
};