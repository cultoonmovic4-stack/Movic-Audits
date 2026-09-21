import { useEffect, useRef, useState } from 'react';

/**
 * useScrollReveal
 * Lightweight IntersectionObserver hook for cinematic scroll reveals.
 * Automatically unobserves once triggered, and defaults to immediately visible
 * if reduced motion is requested or IntersectionObserver is not supported.
 *
 * @param {Object} options
 * @param {number} [options.threshold=0.1] - Observer threshold
 * @param {string} [options.rootMargin='0px 0px -8% 0px'] - Observer rootMargin
 * @param {boolean} [options.immediate=false] - Skip scroll observation and reveal immediately
 * @returns {{ ref: React.RefObject<HTMLElement>, isRevealed: boolean }}
 */
export function useScrollReveal({
  threshold = 0.1,
  rootMargin = '0px 0px -8% 0px',
  immediate = false,
} = {}) {
  const ref = useRef(null);
  const [isRevealed, setIsRevealed] = useState(() => {
    if (immediate) return true;
    if (typeof window === 'undefined') return true;
    // Check if IntersectionObserver is available (handles jsdom/test environments)
    if (!('IntersectionObserver' in window)) return true;
    // Check prefers-reduced-motion
    try {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return true;
      }
    } catch {
      // Fallback if matchMedia is unavailable
    }
    return false;
  });

  useEffect(() => {
    if (isRevealed) return;
    const element = ref.current;
    if (!element) return;

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsRevealed(true);
      return;
    }

    try {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setIsRevealed(true);
        return;
      }
    } catch {
      // Ignored
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.unobserve(element);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, isRevealed]);

  return { ref, isRevealed };
}

export default useScrollReveal;
