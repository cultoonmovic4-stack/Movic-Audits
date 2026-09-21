import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * RouteTransition — Subtle Editorial Page Change Transition
 *
 * Wraps page content to ensure clean, non-disruptive entry transitions on route change.
 * Resets window scroll to top smoothly when route path updates.
 */
export default function RouteTransition({ children }) {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check hash - if there is a hash (e.g., #studio-philosophy), don't reset to top
    const isJsdom = typeof navigator !== 'undefined' && navigator.userAgent?.includes('jsdom');
    try {
      if (!isJsdom && typeof window !== 'undefined' && window.scrollTo && !location?.hash) {
        window.scrollTo(0, 0);
      }
    } catch {
      // jsdom or environment where scrollTo throws
    }

    // Trigger brief, elegant route entrance fade
    setIsVisible(false);
    const frameId = requestAnimationFrame(() => {
      setIsVisible(true);
    });

    return () => cancelAnimationFrame(frameId);
  }, [location?.pathname, location?.hash]);

  return (
    <div
      key={location.pathname}
      className={`transition-opacity duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {children}
    </div>
  );
}
