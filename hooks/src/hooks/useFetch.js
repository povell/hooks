import { useState } from 'react';

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

    let prepareUrl = url;

    if (options && 'params' in options) {
      for (let key in options.params) {
        prepareUrl += `/?${key}=${options.params[key]}`;
      }
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


  return {
    data,
    isLoading,
    error,
    refetch,
  }
};