import { useState } from 'react';
import { NavLink, Link, Outlet } from 'react-router-dom';
import Container from '../components/ui/Container';
import PageLoader from '../components/motion/PageLoader';
import RouteTransition from '../components/motion/RouteTransition';
import BackToTop from '../components/motion/BackToTop';
import Reveal from '../components/motion/Reveal';

export function PublicLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Services', to: '/services' },
    { label: 'Portfolio', to: '/portfolio' },
    { label: 'Blog', to: '/blog' },
    { label: 'Contact', to: '/contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F6] text-[#231815]">
      {/* Top Brand Header */}
      <header className="sticky top-0 z-40 bg-[#FAF8F6]/95 backdrop-blur-none border-b border-[#E8E3DF]">
        <Container>
          <div className="flex items-center justify-between h-20">
            {/* Brand Logo / Wordmark */}
            <Link to="/" className="flex items-center gap-2.5 sm:gap-3 focus-visible:outline-2 focus-visible:outline-[#A5BCD6]">
              <div className="w-8 h-8 sm:w-9 sm:h-9 bg-[#513229] flex items-center justify-center text-[#FAF8F6] font-extrabold text-base sm:text-lg rounded-xs tracking-tighter shrink-0">
                M
              </div>
              <div className="flex flex-col">
                <span className="text-sm sm:text-base font-extrabold tracking-tight text-[#231815] leading-none uppercase">
                  Movic Audits
                </span>
                <span className="text-[8.5px] sm:text-[9px] font-bold tracking-[0.18em] sm:tracking-[0.22em] text-[#7D7068] uppercase mt-0.5 sm:mt-1">
                  Visual Production
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-7 lg:gap-9" aria-label="Main Navigation">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `text-xs font-medium tracking-[0.08em] uppercase transition-colors duration-150 py-1.5 border-b-2 ${
                      isActive
                        ? 'text-[#231815] border-[#231815] font-semibold'
                        : 'text-[#584C46] border-transparent hover:text-[#231815] hover:border-[#D5CDC7]'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* Right Action CTA */}
            <div className="hidden md:flex items-center">
              <Link
                to="/book"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-5 py-2.5 bg-[#513229] text-[#FAF8F6] hover:bg-[#3E251E] active:bg-[#2F1B16] rounded-xs transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-[#A5BCD6] shadow-xs"
              >
                <span>Book a Shoot</span>
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>

            {/* Mobile Actions: Book & Menu Button */}
            <div className="flex md:hidden items-center gap-2 sm:gap-3">
              <Link
                to="/book"
                className="min-h-[38px] inline-flex items-center px-3.5 py-1.5 bg-[#513229] text-[#FAF8F6] text-xs font-bold uppercase tracking-wider rounded-xs active:bg-[#3E251E]"
              >
                Book
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="min-w-[44px] min-h-[44px] p-2.5 text-[#231815] hover:bg-[#F3EFEA] rounded-xs focus-visible:outline-2 focus-visible:outline-[#A5BCD6] flex items-center justify-center"
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle Navigation Menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Dropdown Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-[#E8E3DF] flex flex-col gap-1.5">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 text-sm font-semibold tracking-wider uppercase rounded-xs transition-colors ${
                      isActive ? 'bg-[#513229] text-[#FAF8F6]' : 'text-[#584C46] hover:bg-[#F3EFEA] active:bg-[#EAE4DC]'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          )}
        </Container>
      </header>

      {/* Global Opening Slate / Page Loader */}
      <PageLoader />

      {/* Main Outlet wrapped in subtle route transition */}
      <main className="flex-1 flex flex-col">
        <RouteTransition>
          <Outlet />
        </RouteTransition>
      </main>

      {/* Accessible Floating Back-To-Top Button */}
      <BackToTop threshold={550} />

      {/* Public Footer — Production Editorial Layout */}
      <footer className="bg-[#120C0A] text-[#FAF8F6] mt-auto border-t border-[#3A2B26]">
        <Container className="pt-12 sm:pt-14 lg:pt-16 pb-8">
          {/* Zone 1: Closing Statement / Primary CTA */}
          <Reveal variant="fade-up">
            <div className="pb-12 sm:pb-14 lg:pb-16 border-b border-[#3A2B26] flex flex-col lg:flex-row lg:items-end justify-between gap-8">
              <div className="max-w-2xl space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-px bg-[#A5BCD6]" aria-hidden="true" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#A5BCD6]">
                    Movic Audits &middot; Visual Production
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-[52px] font-extrabold text-[#FAF8F6] tracking-tight leading-[1.08]">
                  Visual stories, <br />
                  thoughtfully made.
                </h2>
                <p className="text-sm sm:text-base text-[#C0B7B2] leading-relaxed max-w-xl font-normal">
                  Photography, videography and cinematography for people, brands and moments worth remembering.
                </p>
              </div>

              <div className="shrink-0 w-full sm:w-auto lg:pb-1">
                <Link
                  to="/book"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 border border-[#FAF8F6] hover:border-[#A5BCD6] text-[#FAF8F6] hover:bg-[#FAF8F6] hover:text-[#231815] text-xs font-bold uppercase tracking-[0.18em] transition-all duration-200 focus-visible:outline-2 focus-visible:outline-[#A5BCD6] group min-h-[48px] rounded-xs"
                >
                  <span>Book a Shoot</span>
                  <span className="transition-transform duration-150 group-hover:translate-x-1" aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>
          </Reveal>

          {/* Zone 2: Main Footer Content — Balanced & Aligned */}
          <Reveal variant="fade-up" delay={100}>
            <div className="py-12 sm:py-14 lg:py-16 border-b border-[#3A2B26]">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
                {/* Left Column: Brand Identity Anchor */}
                <div className="lg:col-span-4 space-y-3">
                  <div className="text-4xl sm:text-5xl xl:text-[58px] font-extrabold text-[#FAF8F6] tracking-tight leading-[0.94] uppercase">
                    MOVIC <br />
                    AUDITS
                  </div>
                  <div className="flex items-center gap-3 pt-1">
                    <span className="w-6 h-px bg-[#A5BCD6]" aria-hidden="true" />
                    <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.24em] text-[#82756E] uppercase">
                      VISUAL PRODUCTION
                    </span>
                  </div>
                </div>

                {/* Right Columns: Three Equal-Height Navigation Groups */}
                <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-12 gap-8 lg:gap-6">
                  {/* Group 1: Explore — 3x3 (2 columns × 3 rows) */}
                  <div className="sm:col-span-5 space-y-4">
                    <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-[#A5BCD6]">
                      EXPLORE
                    </h3>
                    <ul className="grid grid-cols-2 grid-flow-col grid-rows-3 gap-x-6 gap-y-2.5 text-sm text-[#C0B7B2]">
                      <li><Link to="/" className="hover:text-white transition-colors py-0.5 inline-block">Home</Link></li>
                      <li><Link to="/about" className="hover:text-white transition-colors py-0.5 inline-block">About</Link></li>
                      <li><Link to="/services" className="hover:text-white transition-colors py-0.5 inline-block">Services</Link></li>
                      <li><Link to="/portfolio" className="hover:text-white transition-colors py-0.5 inline-block">Portfolio</Link></li>
                      <li><Link to="/blog" className="hover:text-white transition-colors py-0.5 inline-block">Blog</Link></li>
                      <li><Link to="/contact" className="hover:text-white transition-colors py-0.5 inline-block">Contact</Link></li>
                    </ul>
                  </div>

                  {/* Group 2: Services — 3 aligned rows */}
                  <div className="sm:col-span-3 space-y-4">
                    <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-[#A5BCD6]">
                      SERVICES
                    </h3>
                    <ul className="space-y-2.5 text-sm text-[#C0B7B2]">
                      <li><Link to="/services" className="hover:text-white transition-colors py-0.5 inline-block">Photography</Link></li>
                      <li><Link to="/services" className="hover:text-white transition-colors py-0.5 inline-block">Videography</Link></li>
                      <li><Link to="/services" className="hover:text-white transition-colors py-0.5 inline-block">Cinematography</Link></li>
                    </ul>
                  </div>

                  {/* Group 3: Get in Touch — 3 aligned rows */}
                  <div className="sm:col-span-4 space-y-4">
                    <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-[#A5BCD6]">
                      GET IN TOUCH
                    </h3>
                    <ul className="space-y-2.5 text-sm text-[#C0B7B2]">
                      <li>
                        <a href="mailto:info@movicaudits.test" className="hover:text-white transition-colors py-0.5 inline-block">
                          info@movicaudits.test
                        </a>
                      </li>
                      <li>
                        <span className="text-[#82756E] py-0.5 inline-block">+256 XXX XXX XXX</span>
                      </li>
                      <li>
                        <span className="py-0.5 inline-block">Kampala, Uganda</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Zone 3: Bottom Legal Bar — True 3-Column Alignment */}
          <div className="pt-7 grid grid-cols-1 sm:grid-cols-3 items-center gap-4 text-xs text-[#82756E] text-center">
            <div className="sm:text-left">
              &copy; {new Date().getFullYear()} MOVIC AUDITS
            </div>
            <div className="flex items-center justify-center gap-2.5">
              <span className="hover:text-[#C0B7B2] transition-colors cursor-pointer">Privacy Policy</span>
              <span aria-hidden="true">&middot;</span>
              <span className="hover:text-[#C0B7B2] transition-colors cursor-pointer">Terms</span>
              <span aria-hidden="true">&middot;</span>
              <Link to="/admin/login" className="hover:text-[#A5BCD6] transition-colors">
                Admin
              </Link>
            </div>
            <div className="sm:text-right text-[11px] font-bold tracking-[0.22em] uppercase text-[#82756E]">
              VISUAL PRODUCTION
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
}

export default PublicLayout;
