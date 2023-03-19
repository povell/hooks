import { useState } from 'react';

export function useToggle(defaultValue) {
  const [value, setValue] = useState(defaultValue);

  function toggleValue(value){
    setValue((prevState) => typeof value === 'boolean' ? value : !prevState);
  }

  return [value, toggleValue];
}