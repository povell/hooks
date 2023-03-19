import { useState } from 'react';
import { useWindowEvent } from './useWindowEvent';

export function useViewportSize() {
  const [height, setHeight] = useState();
  const [width, setWidth] = useState();

  const setHV = (e) => {
    setHeight(e.target.outerHeight);
    setWidth(e.target.outerWidth);
  }

  useWindowEvent('resize', setHV);

  return { height, width };
}