import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Container from '../../components/ui/Container';
import Section from '../../components/ui/Section';
import SeoHead from '../../components/common/SeoHead';
import images from '../../assets/images';
import publicService from '../../services/publicService';
import Reveal from '../../components/motion/Reveal';
import ImageReveal from '../../components/motion/ImageReveal';

export function HomePage() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    let isMounted = true;
    publicService.getTestimonials()
      .then((res) => {
        if (isMounted && res?.data && Array.isArray(res.data)) {
          setTestimonials(res.data);
        }
      })
      .catch(() => {
        // Testimonials remain empty if API or DB is unpopulated
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const scrollToDiscover = () => {
    const section = document.getElementById('studio-philosophy');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <SeoHead
        title="Visual Production & Cinematic Media"
        description="Movic Audits delivers bespoke commercial photography, cinematic videography, and digital brand storytelling."
      />

      {/* Cinematic Hero Section */}
      <section className="relative w-full min-h-[680px] sm:min-h-[760px] lg:min-h-[820px] xl:min-h-[880px] flex flex-col justify-between overflow-hidden border-b border-[#E8E3DF] bg-[#231815]">
        {/* Full-width Immersive Production Background */}
        <img
          src={images.heroDawn.src}
          alt={images.heroDawn.alt}
          className="absolute inset-0 w-full h-full object-cover object-[78%_center] sm:object-[75%_center] lg:object-[80%_center] pointer-events-none"
          loading="eager"
        />

        {/* Contrast Scrims preserving photographic integrity & legibility across all screen sizes */}
        {/* Ambient warm light wash behind copy for guaranteed 100% legibility on mobile and desktop */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#FAF8F6]/98 via-[#FAF8F6]/80 to-transparent sm:bg-gradient-to-r sm:from-[#FAF8F6]/95 sm:via-[#FAF8F6]/65 sm:to-transparent w-full md:w-4/5 lg:w-3/5 pointer-events-none"
          aria-hidden="true"
        />
        {/* Bottom dark vignette for service strip & scroll indicator */}
        <div
          className="absolute inset-x-0 bottom-0 h-64 sm:h-52 bg-gradient-to-t from-[#1C1412]/95 via-[#1C1412]/60 to-transparent pointer-events-none"
          aria-hidden="true"
        />

        {/* Hero Interactive & Typographic Layer */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-between pt-10 sm:pt-16 lg:pt-32 xl:pt-40 pb-8 sm:pb-10">
          {/* Top/Middle: Headline & Right-side Brand Detail */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Content Area */}
            <div className="lg:col-span-8 xl:col-span-7">
              {/* Eyebrow — Responsive wrap preventing horizontal overflow on 320px */}
              <Reveal variant="fade-up" delay={80} immediate>
                <div className="text-[10px] sm:text-xs font-semibold tracking-[0.16em] sm:tracking-[0.22em] uppercase text-[#3A2B26] mb-4 sm:mb-6 flex flex-wrap items-center gap-x-1.5 sm:gap-x-2">
                  <span>PHOTOGRAPHY</span>
                  <span className="text-[#82756E]/80" aria-hidden="true">/</span>
                  <span>VIDEOGRAPHY</span>
                  <span className="text-[#82756E]/80" aria-hidden="true">/</span>
                  <span>CINEMATOGRAPHY</span>
                </div>
              </Reveal>

              {/* Main Headline */}
              <Reveal variant="fade-up" delay={160} immediate>
                <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-[58px] xl:text-[66px] leading-[1.12] sm:leading-[1.08] tracking-tight text-[#231815] mb-4 sm:mb-6">
                  <span className="font-normal block">Visual storytelling</span>
                  <span className="font-extrabold block">that moves people.</span>
                </h1>
              </Reveal>

              {/* Supporting Paragraph */}
              <Reveal variant="fade-up" delay={240} immediate>
                <p className="text-xs sm:text-base text-[#473B35] leading-relaxed max-w-xl mb-6 sm:mb-10 font-normal">
                  We capture authentic moments, craft compelling stories, and create visual content that makes an impact.
                </p>
              </Reveal>

              {/* CTAs */}
              <Reveal variant="fade-up" delay={320} immediate>
                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    to="/book"
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#513229] hover:bg-[#3E251E] active:bg-[#2F1B16] text-[#FAF8F6] text-xs font-bold uppercase tracking-wider rounded-xs transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-[#A5BCD6] shadow-xs"
                  >
                    <span>Book a Shoot</span>
                    <span aria-hidden="true">&rarr;</span>
                  </Link>
                  <Link
                    to="/portfolio"
                    className="inline-flex items-center px-6 py-3.5 border border-[#513229]/60 hover:border-[#513229] bg-[#FAF8F6]/75 hover:bg-[#FAF8F6]/95 backdrop-blur-[2px] text-[#231815] text-xs font-bold uppercase tracking-wider rounded-xs transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-[#A5BCD6]"
                  >
                    Explore Our Work
                  </Link>
                </div>
              </Reveal>
            </div>

            {/* Right-side Hero Detail */}
            <div className="hidden lg:flex flex-col items-end text-right pt-2 select-none lg:col-span-4 xl:col-span-5">
              <Reveal variant="fade-left" delay={320} immediate>
                <div className="flex flex-col items-end text-right">
                  <div className="w-10 h-px bg-white/60 mb-3" />
                  <div className="text-[10px] xl:text-[11px] font-semibold tracking-[0.24em] text-white/90 uppercase leading-relaxed drop-shadow-xs">
                    <div>REAL PEOPLE.</div>
                    <div>AUTHENTIC STORIES.</div>
                    <div>LASTING VISUALS.</div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Lower Area: Scroll Indicator & Three-Pillar Service Strip */}
          <Reveal variant="fade-up" delay={400} immediate>
            <div className="mt-12 sm:mt-16 lg:mt-20">
              {/* Scroll Indicator Button */}
              <div className="mb-6 sm:mb-8">
                <button
                  type="button"
                  onClick={scrollToDiscover}
                  className="inline-flex items-center gap-2.5 text-[11px] sm:text-xs font-normal tracking-[0.24em] text-[#231815] hover:text-[#513229] uppercase transition-colors cursor-pointer group focus-visible:outline-2 focus-visible:outline-[#513229] rounded-xs select-none"
                  aria-label="Scroll to discover studio philosophy"
                >
                  <span className="w-px h-3.5 bg-[#231815]/80 group-hover:bg-[#513229] transition-colors inline-block" aria-hidden="true" />
                  <span>SCROLL TO DISCOVER</span>
                  <span className="inline-block text-xs translate-y-px transition-transform duration-200 group-hover:translate-y-1 animate-bounce" aria-hidden="true">&darr;</span>
                </button>
              </div>

              {/* Service Strip: Three Equal Pillars */}
              <div className="border-t border-white/15 pt-6 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                {/* Pillar 1: Photography */}
                <div className="flex items-center gap-3.5">
                  <div className="text-white shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
                    Photography
                  </span>
                  <span className="text-[10px] sm:text-xs font-medium tracking-wider text-[#D5CDC7] uppercase mt-0.5">
                    Stunning, Timeless Images
                  </span>
                </div>
              </div>

              {/* Pillar 2: Videography */}
              <div className="flex items-center gap-3.5">
                <div className="text-white shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
                    Videography
                  </span>
                  <span className="text-[10px] sm:text-xs font-medium tracking-wider text-[#D5CDC7] uppercase mt-0.5">
                    Engaging, Professional Films
                  </span>
                </div>
              </div>

              {/* Pillar 3: Cinematography */}
              <div className="flex items-center gap-3.5">
                <div className="text-white shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h12A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5M7.5 3.75L6 9M12 3.75L10.5 9M16.5 3.75L15 9" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
                    Cinematography
                  </span>
                  <span className="text-[10px] sm:text-xs font-medium tracking-wider text-[#D5CDC7] uppercase mt-0.5">
                    Cinematic, Story-Driven Visuals
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>

      {/* Editorial Studio Philosophy / Story Section */}
      <section id="studio-philosophy" className="relative py-20 sm:py-28 lg:py-36 bg-[#FAF8F6] border-b border-[#E8E3DF] overflow-hidden">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Editorial Philosophy Content — Order 1 on mobile, Order 2 on desktop */}
            <div className="lg:col-span-6 xl:col-span-5 order-1 lg:order-2 pt-2 lg:pt-0">
              <Reveal variant="fade-up">
                {/* Top Header: Eyebrow + Section Marker */}
                <div className="flex items-start justify-between mb-5 sm:mb-8">
                  <div className="flex items-center gap-3 pt-1">
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#513229]">
                      Studio Philosophy
                    </span>
                    <span className="w-8 h-px bg-[#513229]/40 inline-block" aria-hidden="true" />
                  </div>

                  {/* Section Number 01 + Vertical Line */}
                  <div className="flex flex-col items-center select-none" aria-hidden="true">
                    <span className="text-3xl sm:text-4xl font-light text-[#A5BCD6] leading-none font-mono">
                      01
                    </span>
                    <span className="w-px h-8 bg-[#A5BCD6]/60 mt-2 inline-block" />
                  </div>
                </div>

                {/* Main Headline */}
                <h2 className="text-3xl sm:text-4xl lg:text-[44px] xl:text-[48px] text-[#231815] tracking-tight leading-[1.12] mb-5 sm:mb-6">
                  <span className="font-normal block">We start with</span>
                  <span className="font-extrabold block">the story.</span>
                </h2>

                {/* Body Copy */}
                <div className="space-y-4 text-xs sm:text-base text-[#584C46] leading-relaxed mb-6 sm:mb-8">
                  <p>
                    At Movic Audits, every project begins with a deeper understanding &mdash; of your people, your purpose and the moments that matter.
                  </p>
                  <p>
                    We don&apos;t just capture what&apos;s in front of the camera. We craft visual stories through intention, creativity, and technical precision &mdash; bringing your vision to life with authenticity and impact.
                  </p>
                </div>

                {/* Action Button CTA — Centered on Mobile per art-direction specification */}
                <div className="pt-2 flex justify-center lg:justify-start">
                  <Link
                    to="/about"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#513229] hover:bg-[#3E251E] active:bg-[#2F1B16] text-[#FAF8F6] text-xs font-bold uppercase tracking-[0.16em] rounded-xs transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-[#A5BCD6] shadow-xs group min-h-[44px]"
                  >
                    <span>Our Approach</span>
                    <span className="transition-transform duration-150 group-hover:translate-x-1" aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
              </Reveal>
            </div>

            {/* Asymmetrical Layered Editorial Image — Order 2 on mobile, Order 1 on desktop */}
            <div className="lg:col-span-6 xl:col-span-7 order-2 lg:order-1 relative mt-4 lg:mt-0">
              <Reveal variant="scale-in" delay={120}>
                {/* Decorative Accent: Muted Slate block extending behind upper-left */}
                <div
                  className="absolute -top-3 left-0 sm:-top-6 sm:-left-6 w-28 sm:w-48 h-6 sm:h-10 bg-[#A5BCD6] select-none"
                  aria-hidden="true"
                />

                {/* Main Image Frame */}
                <div className="relative z-10 overflow-hidden border border-[#E8E3DF] shadow-sm bg-[#231815]">
                  <ImageReveal
                    src={images.photographerSunset.src}
                    alt={images.photographerSunset.alt}
                    className="w-full h-auto max-h-[360px] sm:max-h-[500px] lg:max-h-[580px] object-cover object-[center_30%]"
                  />

                  {/* Annotation Overlay on upper-right of image */}
                  <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 select-none text-right">
                    <div className="text-[8.5px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.24em] font-semibold text-white/90 uppercase leading-relaxed drop-shadow-md">
                      <div>REAL PEOPLE.</div>
                      <div>AUTHENTIC STORIES.</div>
                      <div>LASTING VISUALS.</div>
                    </div>
                  </div>
                </div>

                {/* Intersecting Dark Translucent Overlay — Contained safely inside on mobile to prevent edge clipping */}
                <div className="absolute bottom-3 right-3 sm:-bottom-7 sm:-right-6 bg-[#1C1412]/92 border border-[#3A2B26] px-4 py-3 sm:px-7 sm:py-5 z-20 shadow-md max-w-[calc(100%-1.5rem)]">
                  <p className="text-[#FAF8F6] font-serif italic text-xs sm:text-base tracking-wide leading-snug">
                    Real Stories.<br />Lasting Impact.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* Core Offerings — "Three Ways of Seeing" Editorial Composition */}
      <section className="relative py-20 sm:py-28 lg:py-36 bg-[#FAF8F6] text-[#231815] border-b border-[#E8E3DF] overflow-hidden isolate">
        <Container>
          {/* Section Header */}
          <Reveal variant="fade-up">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-20 sm:mb-28 lg:mb-32">
              <div className="max-w-xl">
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#513229]">
                    Core Offerings
                  </span>
                  <span className="sr-only">Production Disciplines</span>
                  <span className="w-10 h-px bg-[#A5BCD6]" aria-hidden="true" />
                </div>
                <h2 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-[#231815] leading-[1.06]">
                  Three ways <br />
                  <span className="font-normal">of seeing.</span>
                </h2>
              </div>

              <p className="text-sm sm:text-base text-[#584C46] leading-relaxed max-w-sm lg:pt-10">
                Photography, videography and cinematography each bring a different perspective &mdash; and together, they create a complete visual language.
              </p>
            </div>
          </Reveal>

          {/* ========================================================================= */}
          {/* DISCIPLINE 01 — PHOTOGRAPHY                                              */}
          {/* ========================================================================= */}
          <Reveal variant="fade-up">
            <div className="relative mb-16 sm:mb-24 lg:mb-36">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
                {/* Left Content Column */}
                <div className="lg:col-span-5 space-y-3 sm:space-y-4 lg:pr-6">
                  <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.24em] uppercase text-[#7D7068] block">
                    01 &middot; PHOTOGRAPHY
                  </span>
                  <h3 className="text-2xl sm:text-4xl lg:text-[42px] font-normal text-[#231815] leading-tight tracking-tight">
                    The moment, <br />
                    held.
                  </h3>
                  <span className="w-8 h-px bg-[#A5BCD6] block" aria-hidden="true" />
                  <p className="text-xs sm:text-sm text-[#584C46] leading-relaxed max-w-sm">
                    Light, composition and perspective distilled into a single frame.
                  </p>
                </div>

                {/* Right Image Column */}
                <div className="lg:col-span-7 relative">
                  <div className="relative overflow-hidden shadow-xl sm:shadow-2xl shadow-black/10">
                    <ImageReveal
                      src={images.vintageCameraTable.src}
                      alt={images.vintageCameraTable.alt}
                      className="w-full h-auto object-cover max-h-[280px] sm:max-h-[380px] lg:max-h-[480px]"
                      loading="lazy"
                    />
                    {/* Subtle dark gradient scrim at bottom edge for contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" aria-hidden="true" />
                  </div>
                </div>
              </div>

              {/* Oversized Typographic Landmark: PHOTOGRAPHY (Preserved exclusively for desktop editorial layout) */}
              <div className="hidden lg:block relative -mt-22 xl:-mt-26 z-10 pointer-events-none select-none">
                <span className="text-[124px] xl:text-[144px] font-normal tracking-[0.06em] uppercase leading-none text-[#231815] block [text-shadow:_0_1px_12px_rgba(250,248,246,0.6)]">
                  PHOTOGRAPHY
                </span>
              </div>
            </div>
          </Reveal>

          {/* ========================================================================= */}
          {/* DISCIPLINE 02 — VIDEOGRAPHY                                              */}
          {/* ========================================================================= */}
          <Reveal variant="fade-up">
            <div className="relative mb-16 sm:mb-24 lg:mb-36">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
                {/* Image Column — Order 2 on mobile (after copy), Order 1 on desktop */}
                <div className="lg:col-span-7 order-2 lg:order-1 relative">
                  <div className="relative overflow-hidden shadow-xl sm:shadow-2xl shadow-black/10">
                    <ImageReveal
                      src={images.photographerDarkStudio.src}
                      alt={images.photographerDarkStudio.alt}
                      className="w-full h-auto object-cover max-h-[280px] sm:max-h-[380px] lg:max-h-[480px] object-[center_30%]"
                      loading="lazy"
                    />
                    {/* Subtle dark gradient scrim at bottom edge for contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" aria-hidden="true" />
                  </div>
                </div>

                {/* Content Column — Order 1 on mobile, Order 2 on desktop */}
                <div className="lg:col-span-5 order-1 lg:order-2 space-y-3 sm:space-y-4 lg:pl-8 xl:pl-12">
                  <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.24em] uppercase text-[#7D7068] block">
                    02 &middot; VIDEOGRAPHY
                  </span>
                  <h3 className="text-2xl sm:text-4xl lg:text-[42px] font-normal text-[#231815] leading-tight tracking-tight">
                    The moment, <br />
                    moving.
                  </h3>
                  <span className="w-8 h-px bg-[#A5BCD6] block" aria-hidden="true" />
                  <p className="text-xs sm:text-sm text-[#584C46] leading-relaxed max-w-sm">
                    Movement, sound and sequence shaped into living visual narratives.
                  </p>
                </div>
              </div>

              {/* Oversized Typographic Landmark: VIDEOGRAPHY (Preserved exclusively for desktop editorial layout) */}
              <div className="hidden lg:block relative -mt-22 xl:-mt-26 z-10 pointer-events-none select-none">
                <span className="text-[124px] xl:text-[144px] font-normal tracking-[0.06em] uppercase leading-none text-[#231815] block [text-shadow:_0_1px_12px_rgba(250,248,246,0.6)]">
                  VIDEOGRAPHY
                </span>
              </div>
            </div>
          </Reveal>

          {/* ========================================================================= */}
          {/* DISCIPLINE 03 — CINEMATOGRAPHY                                           */}
          {/* ========================================================================= */}
          <Reveal variant="fade-up">
            <div className="relative mb-16 sm:mb-20 lg:mb-24">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
                {/* Left Content Column */}
                <div className="lg:col-span-5 space-y-3 sm:space-y-4 lg:pr-6">
                  <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.24em] uppercase text-[#7D7068] block">
                    03 &middot; CINEMATOGRAPHY
                  </span>
                  <h3 className="text-2xl sm:text-4xl lg:text-[42px] font-normal text-[#231815] leading-tight tracking-tight">
                    The world, <br />
                    composed.
                  </h3>
                  <span className="w-8 h-px bg-[#A5BCD6] block" aria-hidden="true" />
                  <p className="text-xs sm:text-sm text-[#584C46] leading-relaxed max-w-sm">
                    Light, lens, colour and movement brought together with cinematic intention.
                  </p>
                </div>

                {/* Right Image Column */}
                <div className="lg:col-span-7 relative">
                  <div className="relative overflow-hidden shadow-xl sm:shadow-2xl shadow-black/10">
                    <ImageReveal
                      src={images.broadcastMonitor.src}
                      alt={images.broadcastMonitor.alt}
                      className="w-full h-auto object-cover max-h-[280px] sm:max-h-[380px] lg:max-h-[480px] object-[center_35%]"
                      loading="lazy"
                    />
                    {/* Subtle dark gradient scrim at bottom edge for contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" aria-hidden="true" />
                  </div>
                </div>
              </div>

              {/* Oversized Typographic Landmark: CINEMATOGRAPHY (Preserved exclusively for desktop editorial layout) */}
              <div className="hidden lg:block relative -mt-22 xl:-mt-26 z-10 pointer-events-none select-none">
                <span className="text-[104px] xl:text-[120px] font-normal tracking-[0.05em] uppercase leading-none text-[#231815] block [text-shadow:_0_1px_12px_rgba(250,248,246,0.6)]">
                  CINEMATOGRAPHY
                </span>
              </div>
            </div>
          </Reveal>

          {/* ========================================================================= */}
          {/* SECTION CLOSING                                                          */}
          {/* ========================================================================= */}
          <Reveal variant="fade-up">
            <div className="pt-12 sm:pt-16 lg:pt-20 flex flex-col items-center sm:flex-row sm:justify-between gap-6 border-t border-[#E8E3DF] text-center sm:text-left">
              <div className="flex items-center gap-3">
                <span className="w-8 h-px bg-[#A5BCD6]" aria-hidden="true" />
                <span className="text-xs sm:text-sm font-normal text-[#584C46] tracking-wide">
                  Three disciplines. One visual language.
                </span>
              </div>

              {/* Centered on mobile per art-direction specification */}
              <Link
                to="/services"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#513229] hover:bg-[#3E251E] active:bg-[#2F1B16] text-[#FAF8F6] text-xs font-bold uppercase tracking-[0.16em] rounded-xs transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-[#A5BCD6] shadow-xs group min-h-[44px]"
              >
                <span>View All Services</span>
                <span className="transition-transform duration-150 group-hover:translate-x-1" aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Technical Mastery — "The Production Desk" Continuous Editorial Workspace */}
      <section className="relative py-20 sm:py-28 lg:py-32 bg-[#160F0D] text-[#FAF8F6] overflow-hidden">
        {/* Cinematic ambient background lighting */}
        <div
          className="absolute inset-0 pointer-events-none opacity-80"
          style={{
            background:
              'radial-gradient(ellipse 90% 60% at 65% 25%, rgba(81, 50, 41, 0.28) 0%, rgba(22, 15, 13, 0) 70%), radial-gradient(circle at 100% 100%, rgba(0, 0, 0, 0.7) 0%, transparent 45%)',
          }}
          aria-hidden="true"
        />

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 relative">
          {/* ========================================================================= */}
          {/* DESKTOP LAYOUT (lg & above) — Exact recreation of the Production Desk     */}
          {/* ========================================================================= */}
          <div className="hidden lg:block relative">
            {/* Hand-drawn flowing connector line (SVG) linking all 5 stages across the desk */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
              viewBox="0 0 1400 920"
              fill="none"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M 1260,160 
                   C 1230,220 1140,260 980,265 
                   C 760,270 540,320 440,365 
                   C 360,400 480,480 620,510 
                   C 780,545 920,560 1020,590 
                   C 1120,625 1060,690 920,705 
                   C 740,725 480,710 340,750 
                   C 260,775 320,830 520,845 
                   C 660,855 780,850 880,840"
                stroke="#A5BCD6"
                strokeWidth="1.35"
                strokeOpacity="0.45"
                strokeLinecap="round"
              />
            </svg>

            {/* ----------------------------------------------------------------------- */}
            {/* TIER 1: Header + 01 Photography + Photo 1 + Annotations                 */}
            {/* ----------------------------------------------------------------------- */}
            <Reveal variant="fade-up">
              <div className="grid grid-cols-12 gap-8 items-start relative z-10 mb-14 xl:mb-20">
                {/* Left Column: Eyebrow + Main Headline + Supporting Copy */}
                <div className="col-span-4 pr-2">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#A5BCD6]">
                      Technical Mastery
                    </span>
                    <span className="w-10 h-px bg-[#A5BCD6]/40 inline-block" aria-hidden="true" />
                  </div>

                  <h2 className="text-3xl xl:text-[42px] font-light tracking-tight text-[#FAF8F6] leading-[1.14] mb-5">
                    From the still frame <br />
                    <span className="font-normal">to the moving image.</span>
                  </h2>

                  <div className="space-y-3.5 text-xs xl:text-[13px] text-[#C0B7B2] leading-relaxed max-w-sm">
                    <p>
                      Every visual begins with a decision &mdash; how light falls, how a subject occupies the frame, how movement carries emotion, and how a sequence unfolds in time.
                    </p>
                    <p>
                      Across photography, videography and cinematography, we bring those decisions together through deliberate pre-production, considered capture and meticulous finishing.
                    </p>
                  </div>
                </div>

                {/* Center Column: Photo 1 (Vintage camera on wooden table with prints) */}
                <div className="col-span-4 flex justify-center">
                  <div className="relative -rotate-2 hover:rotate-0 transition-transform duration-500 p-2 bg-[#FAF8F6] shadow-2xl shadow-black/80 max-w-[340px] xl:max-w-[380px]">
                    <img
                      src={images.vintageCameraTable.src}
                      alt={images.vintageCameraTable.alt}
                      className="w-full h-auto object-cover max-h-[260px] xl:max-h-[290px]"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Right Column: 01 — Photography Copy + Handwritten Annotations */}
                <div className="col-span-4 flex items-start justify-between gap-4 pl-2">
                  <div className="space-y-3 max-w-[230px] xl:max-w-[260px]">
                    <div className="flex items-center gap-2 text-[10px] font-mono tracking-[0.2em] uppercase text-[#A5BCD6]">
                      <span>01</span>
                      <span className="w-3.5 h-px bg-[#A5BCD6]/50" />
                      <span>PHOTOGRAPHY</span>
                    </div>
                    <h3 className="text-lg xl:text-xl font-normal text-[#FAF8F6] leading-snug tracking-tight">
                      Before the shutter, <br />
                      we see the frame.
                    </h3>
                    <p className="text-xs xl:text-[12.5px] text-[#C0B7B2] leading-relaxed">
                      Photography begins long before the shutter is released. We consider composition, available light, perspective, subject placement and visual intention &mdash; shaping the conditions for an image that communicates with precision.
                    </p>
                  </div>

                  {/* Handwritten Annotations (Top Right) */}
                  <div className="flex flex-col items-start -rotate-6 pt-2 shrink-0 select-none" aria-hidden="true">
                    <div className="text-xs xl:text-[13px] italic tracking-wide text-[#A5BCD6]/90 space-y-1 font-sans">
                      <div>Composition</div>
                      <div>Light</div>
                      <div>Perspective</div>
                      <div>Subject</div>
                      <div>Exposure</div>
                    </div>
                    <svg className="w-14 h-10 text-[#A5BCD6]/60 -mt-1 -ml-1" viewBox="0 0 50 35" fill="none">
                      <path d="M40,2 C30,18 18,28 4,32 M10,33 L4,32 L6,26" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* ----------------------------------------------------------------------- */}
            {/* TIER 2: 02 Videography + Photo 2 + Photo 3 + 03 Cinematography          */}
            {/* ----------------------------------------------------------------------- */}
            <Reveal variant="fade-up" delay={80}>
              <div className="grid grid-cols-12 gap-6 xl:gap-8 items-center relative z-10 my-16 xl:my-24">
                {/* Left Group: Annotations + Photo 2 (Filmmaker) + 02 Videography text */}
                <div className="col-span-6 flex items-center gap-4 xl:gap-6">
                  {/* Handwritten Annotations (Middle Left) */}
                  <div className="flex flex-col items-end -rotate-6 shrink-0 select-none" aria-hidden="true">
                    <div className="text-xs xl:text-[13px] italic tracking-wide text-[#A5BCD6]/90 space-y-1 text-right font-sans">
                      <div>Camera movement</div>
                      <div>Focal length</div>
                      <div>Continuity</div>
                      <div>Ambience</div>
                      <div>Sync sound</div>
                    </div>
                    <svg className="w-12 h-6 text-[#A5BCD6]/60 mt-1" viewBox="0 0 45 20" fill="none">
                      <path d="M4,4 C18,8 32,14 40,18 M34,18 L40,18 L38,12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>

                  {/* Photo 2: Filmmaker holding camera in dark studio */}
                  <div className="relative rotate-[1.5deg] hover:rotate-0 transition-transform duration-500 shadow-2xl shadow-black/80 border border-[#3A2B26]/80 overflow-hidden shrink-0 max-w-[200px] xl:max-w-[230px]">
                    <img
                      src={images.photographerDarkStudio.src}
                      alt={images.photographerDarkStudio.alt}
                      className="w-full h-auto object-cover max-h-[240px] xl:max-h-[270px]"
                      loading="lazy"
                    />
                  </div>

                  {/* 02 — VIDEOGRAPHY Text */}
                  <div className="space-y-3 max-w-[200px] xl:max-w-[230px]">
                    <div className="flex items-center gap-2 text-[10px] font-mono tracking-[0.2em] uppercase text-[#A5BCD6]">
                      <span>02</span>
                      <span className="w-3.5 h-px bg-[#A5BCD6]/50" />
                      <span>VIDEOGRAPHY</span>
                    </div>
                    <h3 className="text-lg xl:text-xl font-normal text-[#FAF8F6] leading-snug tracking-tight">
                      When the frame <br />
                      begins to move.
                    </h3>
                    <p className="text-xs xl:text-[12.5px] text-[#C0B7B2] leading-relaxed">
                      Videography introduces another dimension: movement, continuity and sound. Camera movement, focal transitions, ambient detail and human performance are captured as a sequence rather than an isolated moment.
                    </p>
                  </div>
                </div>

                {/* Right Group: Photo 3 (Monitor suite) + 03 Cinematography text + Annotations */}
                <div className="col-span-6 flex items-start gap-4 xl:gap-6 pl-4">
                  {/* Photo 3: Broadcast production monitor / color grading in dark studio */}
                  <div className="relative -rotate-[1deg] hover:rotate-0 transition-transform duration-500 shadow-2xl shadow-black/80 border border-[#3A2B26]/80 overflow-hidden shrink-0 max-w-[270px] xl:max-w-[310px]">
                    <img
                      src={images.broadcastMonitor.src}
                      alt={images.broadcastMonitor.alt}
                      className="w-full h-auto object-cover max-h-[220px] xl:max-h-[250px]"
                      loading="lazy"
                    />
                  </div>

                  {/* 03 — CINEMATOGRAPHY Text + Annotations beneath */}
                  <div className="space-y-3 max-w-[230px] xl:max-w-[260px]">
                    <div className="flex items-center gap-2 text-[10px] font-mono tracking-[0.2em] uppercase text-[#A5BCD6]">
                      <span>03</span>
                      <span className="w-3.5 h-px bg-[#A5BCD6]/50" />
                      <span>CINEMATOGRAPHY</span>
                    </div>
                    <h3 className="text-lg xl:text-xl font-normal text-[#FAF8F6] leading-snug tracking-tight">
                      Where images become <br />
                      visual language.
                    </h3>
                    <p className="text-xs xl:text-[12.5px] text-[#C0B7B2] leading-relaxed">
                      Cinematography goes beyond recording what is in front of the lens. Through lighting design, composition, colour, lens selection, camera movement and visual continuity, we construct a coherent cinematic language around the story.
                    </p>

                    {/* Handwritten Annotations (Beneath Cinematography) */}
                    <div className="flex flex-col items-start -rotate-6 pt-1 pl-2 select-none" aria-hidden="true">
                      <svg className="w-8 h-6 text-[#A5BCD6]/60 -mb-1 -ml-3" viewBox="0 0 30 20" fill="none">
                        <path d="M4,2 C12,8 20,14 26,18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                      </svg>
                      <div className="text-xs xl:text-[13px] italic tracking-wide text-[#A5BCD6]/90 space-y-0.5 font-sans">
                        <div>Lighting design</div>
                        <div>Lensing</div>
                        <div>Framing</div>
                        <div>Camera movement</div>
                        <div>Colour</div>
                        <div>Visual continuity</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* ----------------------------------------------------------------------- */}
            {/* TIER 3: Finishing + Photo 4 (Final Frame) + Final Visual Payoff         */}
            {/* ----------------------------------------------------------------------- */}
            <Reveal variant="fade-up" delay={80}>
              <div className="grid grid-cols-12 gap-6 xl:gap-8 items-center relative z-10 pt-4 xl:pt-8">
                {/* Left Group: Annotations + Finishing Text */}
                <div className="col-span-4 flex items-start gap-3 xl:gap-5 pr-2">
                  {/* Handwritten Annotations (Bottom Left) */}
                  <div className="flex flex-col items-end -rotate-6 shrink-0 pt-2 select-none" aria-hidden="true">
                    <div className="text-xs xl:text-[13px] italic tracking-wide text-[#A5BCD6]/90 space-y-1 text-right font-sans">
                      <div>Edit</div>
                      <div>Grade</div>
                      <div>Sound</div>
                      <div>Rhythm</div>
                      <div>Finish</div>
                    </div>
                    <svg className="w-10 h-6 text-[#A5BCD6]/60 mt-1" viewBox="0 0 35 20" fill="none">
                      <path d="M2,4 C14,8 24,14 32,18 M26,18 L32,18 L30,12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>

                  {/* Finishing Text Block */}
                  <div className="space-y-2.5 max-w-[220px] xl:max-w-[250px]">
                    <span className="text-[10px] font-mono tracking-[0.24em] uppercase text-[#A5BCD6] block">
                      FINISHING
                    </span>
                    <h3 className="text-lg xl:text-xl font-normal text-[#FAF8F6] leading-snug tracking-tight">
                      Capture is only <br />
                      half the image.
                    </h3>
                    <p className="text-xs xl:text-[12.5px] text-[#C0B7B2] leading-relaxed">
                      The final image emerges through the discipline of post-production &mdash; editing, colour grading, sound design and finishing working in concert with what was captured on set.
                    </p>
                  </div>
                </div>

                {/* Center Column: Photo 4 (Final Frame: Dawn seascape landscape) */}
                <div className="col-span-5 flex justify-center">
                  <div className="relative -rotate-[0.8deg] hover:rotate-0 transition-transform duration-500 shadow-2xl shadow-black/90 border border-[#3A2B26]/90 overflow-hidden w-full max-w-[440px] xl:max-w-[500px]">
                    <img
                      src={images.heroDawn.src}
                      alt="Dawn cinematic master deliverable frame representing the finished work"
                      className="w-full h-auto object-cover max-h-[220px] xl:max-h-[250px]"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Right Column: Final Visual Payoff */}
                <div className="col-span-3 pl-2">
                  <h3 className="text-2xl xl:text-3xl font-light text-[#FAF8F6] leading-tight tracking-tight mb-2.5">
                    From first intention <br />
                    <span className="font-normal">to final frame.</span>
                  </h3>
                  <p className="text-xs xl:text-sm italic text-[#C0B7B2]">
                    Every frame has a reason to exist.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* ========================================================================= */}
          {/* MOBILE & TABLET LAYOUT (lg:hidden) — Continuous vertical editorial journey */}
          {/* ========================================================================= */}
          <div className="lg:hidden space-y-16 sm:space-y-20 relative">
            {/* Header */}
            <Reveal variant="fade-up">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#A5BCD6]">
                    Technical Mastery
                  </span>
                  <span className="w-10 h-px bg-[#A5BCD6]/40 inline-block" aria-hidden="true" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-light text-[#FAF8F6] tracking-tight leading-tight mb-4">
                  From the still frame <br />
                  <span className="font-normal">to the moving image.</span>
                </h2>
                <div className="space-y-3 text-sm text-[#C0B7B2] leading-relaxed">
                  <p>
                    Every visual begins with a decision &mdash; how light falls, how a subject occupies the frame, how movement carries emotion, and how a sequence unfolds in time.
                  </p>
                  <p className="text-xs sm:text-sm text-[#82756E]">
                    Across photography, videography and cinematography, we bring those decisions together through deliberate pre-production, considered capture and meticulous finishing.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Stage 01: Photography */}
            <Reveal variant="fade-up">
              <div className="space-y-5">
                <div className="relative p-2 bg-[#FAF8F6] shadow-xl max-w-sm mx-auto -rotate-1">
                  <img
                    src={images.vintageCameraTable.src}
                    alt={images.vintageCameraTable.alt}
                    className="w-full h-auto object-cover max-h-[260px]"
                    loading="lazy"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-mono tracking-[0.2em] uppercase text-[#A5BCD6]">
                      <span>01</span>
                      <span className="w-3.5 h-px bg-[#A5BCD6]/50" />
                      <span>PHOTOGRAPHY</span>
                    </div>
                    <span className="text-xs italic text-[#A5BCD6]/80 -rotate-3" aria-hidden="true">
                      Composition &middot; Light
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-normal text-[#FAF8F6] tracking-tight">
                    Before the shutter, we see the frame.
                  </h3>
                  <p className="text-sm text-[#C0B7B2] leading-relaxed">
                    Photography begins long before the shutter is released. We consider composition, available light, perspective, subject placement and visual intention &mdash; shaping the conditions for an image that communicates with precision.
                  </p>
                  <div className="text-[11px] font-mono tracking-wider text-[#A5BCD6] flex flex-wrap gap-x-2 gap-y-1 pt-1 uppercase">
                    <span>Composition</span> &middot;
                    <span>Light</span> &middot;
                    <span>Perspective</span> &middot;
                    <span>Subject</span> &middot;
                    <span>Exposure</span>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Vertical Flow Connector */}
            <div className="flex flex-col items-center justify-center py-2 select-none" aria-hidden="true">
              <div className="w-px h-6 bg-gradient-to-b from-[#A5BCD6]/40 to-[#A5BCD6]/10" />
              <div className="flex items-center gap-2 text-[10px] font-mono tracking-[0.22em] text-[#A5BCD6]/70 uppercase py-1">
                <span>&bull;</span>
                <span>MOVEMENT & CONTINUITY</span>
                <span>&bull;</span>
              </div>
              <div className="w-px h-6 bg-gradient-to-b from-[#A5BCD6]/10 to-[#A5BCD6]/40" />
            </div>

            {/* Stage 02: Videography */}
            <Reveal variant="fade-up">
              <div className="space-y-5">
                <div className="border border-[#3A2B26] overflow-hidden shadow-xl max-w-sm mx-auto rotate-1">
                  <img
                    src={images.photographerDarkStudio.src}
                    alt={images.photographerDarkStudio.alt}
                    className="w-full h-auto object-cover max-h-[260px]"
                    loading="lazy"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-mono tracking-[0.2em] uppercase text-[#A5BCD6]">
                      <span>02</span>
                      <span className="w-3.5 h-px bg-[#A5BCD6]/50" />
                      <span>VIDEOGRAPHY</span>
                    </div>
                    <span className="text-xs italic text-[#A5BCD6]/80 -rotate-3" aria-hidden="true">
                      Movement &middot; Sound
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-normal text-[#FAF8F6] tracking-tight">
                    When the frame begins to move.
                  </h3>
                  <p className="text-sm text-[#C0B7B2] leading-relaxed">
                    Videography introduces another dimension: movement, continuity and sound. Camera movement, focal transitions, ambient detail and human performance are captured as a sequence rather than an isolated moment.
                  </p>
                  <div className="text-[11px] font-mono tracking-wider text-[#A5BCD6] flex flex-wrap gap-x-2 gap-y-1 pt-1 uppercase">
                    <span>Camera Movement</span> &middot;
                    <span>Focal Length</span> &middot;
                    <span>Continuity</span> &middot;
                    <span>Ambience</span> &middot;
                    <span>Sync Sound</span>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Vertical Flow Connector */}
            <div className="flex flex-col items-center justify-center py-2 select-none" aria-hidden="true">
              <div className="w-px h-6 bg-gradient-to-b from-[#A5BCD6]/40 to-[#A5BCD6]/10" />
              <div className="flex items-center gap-2 text-[10px] font-mono tracking-[0.22em] text-[#A5BCD6]/70 uppercase py-1">
                <span>&bull;</span>
                <span>VISUAL LANGUAGE</span>
                <span>&bull;</span>
              </div>
              <div className="w-px h-6 bg-gradient-to-b from-[#A5BCD6]/10 to-[#A5BCD6]/40" />
            </div>

            {/* Stage 03: Cinematography */}
            <Reveal variant="fade-up">
              <div className="space-y-5">
                <div className="border border-[#3A2B26] overflow-hidden shadow-xl max-w-sm mx-auto -rotate-1">
                  <img
                    src={images.broadcastMonitor.src}
                    alt={images.broadcastMonitor.alt}
                    className="w-full h-auto object-cover max-h-[260px]"
                    loading="lazy"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-mono tracking-[0.2em] uppercase text-[#A5BCD6]">
                      <span>03</span>
                      <span className="w-3.5 h-px bg-[#A5BCD6]/50" />
                      <span>CINEMATOGRAPHY</span>
                    </div>
                    <span className="text-xs italic text-[#A5BCD6]/80 -rotate-3" aria-hidden="true">
                      Lensing &middot; Colour
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-normal text-[#FAF8F6] tracking-tight">
                    Where images become visual language.
                  </h3>
                  <p className="text-sm text-[#C0B7B2] leading-relaxed">
                    Cinematography goes beyond recording what is in front of the lens. Through lighting design, composition, colour, lens selection, camera movement and visual continuity, we construct a coherent cinematic language around the story.
                  </p>
                  <div className="text-[11px] font-mono tracking-wider text-[#A5BCD6] flex flex-wrap gap-x-2 gap-y-1 pt-1 uppercase">
                    <span>Lighting Design</span> &middot;
                    <span>Lensing</span> &middot;
                    <span>Framing</span> &middot;
                    <span>Camera Movement</span> &middot;
                    <span>Colour</span> &middot;
                    <span>Visual Continuity</span>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Vertical Flow Connector */}
            <div className="flex flex-col items-center justify-center py-2 select-none" aria-hidden="true">
              <div className="w-px h-6 bg-gradient-to-b from-[#A5BCD6]/40 to-[#A5BCD6]/10" />
              <div className="flex items-center gap-2 text-[10px] font-mono tracking-[0.22em] text-[#A5BCD6]/70 uppercase py-1">
                <span>&bull;</span>
                <span>FINISHING & MASTERING</span>
                <span>&bull;</span>
              </div>
              <div className="w-px h-6 bg-gradient-to-b from-[#A5BCD6]/10 to-[#A5BCD6]/40" />
            </div>

            {/* Stage 04: Finishing */}
            <Reveal variant="fade-up">
              <div className="pt-8 border-t border-[#3A2B26]/60 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono tracking-[0.24em] uppercase text-[#A5BCD6]">
                    FINISHING
                  </span>
                  <span className="text-xs italic text-[#A5BCD6]/80 -rotate-3" aria-hidden="true">
                    Edit &middot; Grade &middot; Rhythm
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-normal text-[#FAF8F6] tracking-tight">
                  Capture is only half the image.
                </h3>
                <p className="text-sm text-[#C0B7B2] leading-relaxed">
                  The final image emerges through the discipline of post-production &mdash; editing, colour grading, sound design and finishing working in concert with what was captured on set.
                </p>
                <div className="text-[11px] font-mono tracking-wider text-[#A5BCD6] flex flex-wrap gap-x-2 gap-y-1 pt-1 uppercase">
                  <span>Edit</span> &middot;
                  <span>Grade</span> &middot;
                  <span>Sound</span> &middot;
                  <span>Rhythm</span> &middot;
                  <span>Finish</span>
                </div>
              </div>
            </Reveal>

            {/* Stage 05: Final Visual Payoff */}
            <Reveal variant="fade-up">
              <div className="space-y-5 pt-4">
                <div className="border border-[#3A2B26] overflow-hidden shadow-2xl">
                  <img
                    src={images.heroDawn.src}
                    alt="Dawn cinematic master deliverable frame representing the finished work"
                    className="w-full h-auto object-cover max-h-[300px]"
                    loading="lazy"
                  />
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-light text-[#FAF8F6] tracking-tight leading-tight mb-2">
                    From first intention <br />
                    <span className="font-normal">to final frame.</span>
                  </h3>
                  <p className="text-sm italic text-[#C0B7B2]">
                    Every frame has a reason to exist.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Testimonials Section (Dynamically Rendered if available) */}
      {testimonials.length > 0 && (
        <Section variant="white" className="border-b border-[#E8E3DF]">
          <Container>
            <Reveal variant="fade-up">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <span className="text-xs font-bold uppercase tracking-wider text-[#513229] mb-2 block">
                  Client Trust
                </span>
                <h2 className="text-3xl font-extrabold text-[#231815] tracking-tight">
                  Client Testimonials
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.map((item) => (
                  <div key={item.id} className="p-6 bg-[#FAF8F6] border border-[#E8E3DF] rounded-sm">
                    <p className="text-sm text-[#584C46] italic mb-4 leading-relaxed">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                    <div className="text-xs font-bold text-[#231815]">{item.client_name}</div>
                    {item.company && <div className="text-[11px] text-[#82756E]">{item.company}</div>}
                  </div>
                ))}
              </div>
            </Reveal>
          </Container>
        </Section>
      )}

    </>
  );
}

export default HomePage;
