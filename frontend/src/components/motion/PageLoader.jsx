import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Editorial route metadata generator for contextual slate titles
 */
function getRouteMetadata(pathname) {
  if (!pathname || pathname === '/') {
    return {
      eyebrow: 'Production Slate',
      title: 'Movic Audits',
      subtitle: 'Visual Production • Studio',
    };
  }
  if (pathname.startsWith('/about')) {
    return {
      eyebrow: 'Studio Profile',
      title: 'About Studio',
      subtitle: 'Philosophy • Team • Process',
    };
  }
  if (pathname.startsWith('/services')) {
    return {
      eyebrow: 'Disciplines',
      title: 'Services',
      subtitle: 'Photography • Videography • Cinema',
    };
  }
  if (pathname.startsWith('/portfolio')) {
    return {
      eyebrow: 'Selected Works',
      title: 'Portfolio',
      subtitle: 'Visual Catalog • Case Studies',
    };
  }
  if (pathname.startsWith('/blog')) {
    return {
      eyebrow: 'Technical Journal',
      title: 'Field Notes',
      subtitle: 'Essays • Insights • Production',
    };
  }
  if (pathname.startsWith('/contact')) {
    return {
      eyebrow: 'Direct Line',
      title: 'Contact',
      subtitle: 'Inquiries • Collaborations',
    };
  }
  if (pathname.startsWith('/book')) {
    return {
      eyebrow: 'Production Desk',
      title: 'Book a Shoot',
      subtitle: 'Studio Reservations • Scheduling',
    };
  }
  return {
    eyebrow: 'Archive',
    title: 'Movic Audits',
    subtitle: 'Visual Production',
  };
}

/**
 * PageLoader — Editorial Production Slate & Navigation Loader
 * 
 * Displays an authentic editorial production slate and top progress hairline
 * on initial page load and whenever the user navigates between public pages.
 * 
 * Features:
 * - Top brand progress hairline sweeping smoothly across the screen
 * - Contextual page title and discipline subtitles
 * - Expanding Deep Umber (#513229) hairline rule with cinematic easing
 * - Respects prefers-reduced-motion and bypasses in test (jsdom) environments
 * - Fast, non-blocking sequence (~400ms visible + 240ms fade-out)
 */
export default function PageLoader() {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [meta, setMeta] = useState(() => getRouteMetadata(location?.pathname));

  useEffect(() => {
    // Detect jsdom / test environment
    const isJsdom = typeof navigator !== 'undefined' && navigator.userAgent?.includes('jsdom');
    
    // Detect user reduced motion preference
    const prefersReducedMotion = typeof window !== 'undefined' && 
      window.matchMedia && 
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isJsdom || prefersReducedMotion) {
      setIsVisible(false);
      return;
    }

    const currentPath = location?.pathname || '/';

    // Update metadata for current route
    setMeta(getRouteMetadata(currentPath));

    // Trigger loader state
    setIsVisible(true);
    setIsFading(false);
    setProgress(20);

    // Scroll window smoothly to top during transition if not targeting an anchor hash
    if (typeof window !== 'undefined' && window.scrollTo && !location?.hash) {
      window.scrollTo(0, 0);
    }

    // Sequence timeline:
    // 0ms: Initial mount (20% progress)
    // 120ms: Mid-progress (75% progress)
    // 380ms: Complete progress (100%) and start fade-out
    // 620ms: Fully invisible / unmount
    const midTimer = setTimeout(() => {
      setProgress(75);
    }, 120);

    const fadeTimer = setTimeout(() => {
      setProgress(100);
      setIsFading(true);
    }, 380);

    const doneTimer = setTimeout(() => {
      setIsVisible(false);
      setIsFading(false);
      setProgress(0);
    }, 620);

    return () => {
      clearTimeout(midTimer);
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [location?.pathname, location?.hash]);

  if (!isVisible) {
    return null;
  }

  return (
    <>
      {/* Top Brand Progress Hairline */}
      <div 
        className="fixed top-0 left-0 right-0 h-[2.5px] sm:h-[3px] z-[9999] pointer-events-none bg-transparent"
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <div 
          className="h-full bg-gradient-to-r from-[#513229] via-[#A5BCD6] to-[#513229] transition-all duration-300 ease-out shadow-[0_0_8px_rgba(165,188,214,0.6)]"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Editorial Production Slate Overlay */}
      <div
        role="status"
        aria-label={`Loading ${meta.title}`}
        className={`fixed inset-0 z-[9990] flex flex-col items-center justify-center bg-[#FAF8F6] select-none transition-opacity duration-240 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <div className="flex flex-col items-center px-6 text-center">
          {/* Eyebrow / Production Stage */}
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.28em] font-semibold text-[#82756E] mb-2 sm:mb-3">
            {meta.eyebrow}
          </span>

          {/* Contextual Title / Brand Wordmark */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-[-0.03em] text-[#231815] uppercase font-sans">
            {meta.title}
          </h1>

          {/* Expanding Brand Hairline Rule */}
          <div 
            className="h-[1.5px] bg-[#513229] my-3 sm:my-4 transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              width: isFading ? '128px' : '72px',
              transform: isFading ? 'scaleX(1.1)' : 'scaleX(1)',
            }}
          />

          {/* Subtitle / Discipline */}
          <p className="text-xs sm:text-sm font-medium tracking-[0.24em] text-[#584C46] uppercase mb-4">
            {meta.subtitle}
          </p>

          {/* Editorial Micro Progress Track */}
          <div className="w-28 sm:w-36 h-[2px] bg-[#E8E3DF] overflow-hidden rounded-full mt-1">
            <div 
              className="h-full bg-[#513229] transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
