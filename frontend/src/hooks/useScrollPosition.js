import { useState, useEffect } from 'react';

/**
 * useScrollPosition
 * Throttled window scroll position hook for UI triggers (e.g. BackToTop).
 *
 * @param {number} [throttleMs=100] - Throttle interval in milliseconds
 * @returns {number} Current window.scrollY
 */
export function useScrollPosition(throttleMs = 100) {
  const [scrollY, setScrollY] = useState(() => {
    if (typeof window === 'undefined') return 0;
    return window.scrollY || 0;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let timeoutId = null;
    let lastRan = Date.now();

    const handleScroll = () => {
      const now = Date.now();
      if (now - lastRan >= throttleMs) {
        setScrollY(window.scrollY);
        lastRan = now;
      } else {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          setScrollY(window.scrollY);
          lastRan = Date.now();
        }, throttleMs - (now - lastRan));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, [throttleMs]);

  return scrollY;
}

export default useScrollPosition;
