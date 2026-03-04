import { useState, useEffect } from 'react';

/**
 * useWindowSize
 * Returns the current width and height of the browser window.
 * Automatically updates on resize.
 *
 * @returns {{ width: number, height: number }}
 *
 * @example
 * const { width, height } = useWindowSize();
 * if (width < 768) return <MobileLayout />;
 */
export function useWindowSize() {
  const [size, setSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}
