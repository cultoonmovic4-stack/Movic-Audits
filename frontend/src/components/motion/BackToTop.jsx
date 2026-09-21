import { useState, useEffect } from 'react';
import useScrollPosition from '../../hooks/useScrollPosition';

/**
 * BackToTop Component
 * Minimal, accessible floating control that smoothly scrolls to the top of the page
 * when the user scrolls past the threshold.
 *
 * @param {Object} props
 * @param {number} [props.threshold=550] - Vertical scroll distance in px before showing
 */
export function BackToTop({ threshold = 550 }) {
  const scrollY = useScrollPosition(80);
  const isVisible = scrollY > threshold;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToTop = () => {
    if (typeof window === 'undefined') return;
    try {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } catch {
      try {
        window.scrollTo(0, 0);
      } catch {
        // jsdom fallback
      }
    }
  };

  if (!mounted) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top of page"
      className={`fixed z-40 right-5 sm:right-8 bottom-6 sm:bottom-8 w-11 h-11 rounded-xs bg-[#231815] text-[#FAF8F6] hover:bg-[#513229] active:bg-[#3E251E] border border-[#3A2B26]/60 shadow-md flex items-center justify-center transition-all duration-300 ease-out focus-visible:outline-2 focus-visible:outline-[#A5BCD6] cursor-pointer group ${
        isVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-2.5 pointer-events-none'
      }`}
    >
      <svg
        className="w-4 h-4 text-[#FAF8F6] transition-transform duration-200 group-hover:-translate-y-0.5"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2.2"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
      </svg>
    </button>
  );
}

export default BackToTop;
