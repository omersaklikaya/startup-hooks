import { useState, useEffect } from 'react';

/**
 * useScroll
 * Tracks the window scroll position and direction in real time.
 *
 * @returns {{ x: number, y: number, direction: 'up' | 'down' | null, isAtTop: boolean, isAtBottom: boolean }}
 *
 * @example
 * const { y, direction } = useScroll();
 * // Hide navbar when scrolling down
 * const navVisible = direction !== 'down' || y < 100;
 */
export function useScroll() {
  const [scroll, setScroll] = useState({
    x: 0,
    y: 0,
    direction: null,
    isAtTop: true,
    isAtBottom: false,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let lastY = window.scrollY;

    const handleScroll = () => {
      const x = window.scrollX;
      const y = window.scrollY;
      const direction = y > lastY ? 'down' : y < lastY ? 'up' : null;
      const isAtTop = y === 0;
      const isAtBottom =
        window.innerHeight + y >= document.documentElement.scrollHeight - 1;

      setScroll({ x, y, direction, isAtTop, isAtBottom });
      lastY = y;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scroll;
}
