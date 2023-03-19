import { useState } from 'react';

export function useLocalStorage(key) {
  const getValueFromLocalStorage = () => {
    const val = localStorage.getItem(key);
    return JSON.parse(val);
  }

  const [value, setValue] = useState(getValueFromLocalStorage);

  const setItem = (value) => {
    localStorage.setItem(key, value);
    setValue(value);
  }

  const removeItem = () => {
    localStorage.removeItem(key);
    setValue(null);
  }

  return [value, { setItem, removeItem}];
};