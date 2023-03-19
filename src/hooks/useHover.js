import { useState, useEffect, useRef } from 'react';

export function useHover() {
  const ref = useRef();
  const [hovered, setHovered] = useState();

  useEffect(() => {
    const node = ref.current;
    node.addEventListener('mouseover', () => {setHovered(true)})
    node.addEventListener('mouseout', () => {setHovered(false)})

    return () => {
      node.removeEventListener('mouseover', () => {setHovered(true)})
      node.removeEventListener('mouseout', () => {setHovered(false)})
    }
  },[ref]);

  return { hovered, ref };
};