import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import Container from '../../components/ui/Container';
import SeoHead from '../../components/common/SeoHead';
import ImageReveal from '../../components/motion/ImageReveal';
import PORTFOLIO_PROJECTS from '../../data/portfolioProjects';

export function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const featured = PORTFOLIO_PROJECTS[0];

  const categories = useMemo(() => {
    const map = new Map();
    PORTFOLIO_PROJECTS.forEach((project) => {
      if (project.category?.slug && project.category?.name) {
        map.set(project.category.slug, project.category.name);
      }
    });
    return Array.from(map.entries()).map(([slug, name]) => ({ slug, name }));
  }, []);

  const filteredProjects =
    selectedCategory === 'all'
      ? PORTFOLIO_PROJECTS
      : PORTFOLIO_PROJECTS.filter((p) => p.category?.slug === selectedCategory);

  useEffect(() => {
    const isJsdom = typeof navigator !== 'undefined' && navigator.userAgent?.includes('jsdom');
    if (isJsdom || typeof window === 'undefined') return undefined;
    const frameId = requestAnimationFrame(() => AOS.refreshHard());
    return () => cancelAnimationFrame(frameId);
  }, [selectedCategory]);

  return (
    <>
      <SeoHead
        title="Visual Portfolio & Case Studies"
        description="Curated collection of commercial photography, cinematic films, and commissioned visual projects by Movic Audits."
      />

      {/* Portfolio Hero — Monograph Featured Overlap */}
      <section className="bg-[#FAF8F6] text-[#231815] border-b border-[#E8E3DF]">
        <Container className="pt-12 sm:pt-16 lg:pt-20 pb-14 sm:pb-20">
          <div
            data-aos="fade-up"
            className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#D5CDC7]"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-[#513229]" aria-hidden="true" />
                <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#513229]">
                  Selected Works
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-[58px] font-extrabold tracking-tight leading-[1.05] text-[#231815]">
                Portfolio &amp; Case Studies
              </h1>
            </div>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#513229] hover:bg-[#3E251E] text-[#FAF8F6] text-xs font-bold uppercase tracking-[0.16em] rounded-xs transition-colors self-start lg:self-auto min-h-[44px]"
            >
              <span>Request Private Reel</span>
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>

          {/* Wide 21:9 Exhibition Frame + Solid Dark Overlapping Plate */}
          <div className="mt-8">
            <div data-aos="fade-up" data-aos-delay="100" className="border border-[#E8E3DF] bg-[#231815]">
              <ImageReveal
                src={featured.cover_media.url}
                alt={featured.cover_media.alt_text}
                className="aspect-[16/10] sm:aspect-[21/9] w-full"
                loading="eager"
              />
            </div>

            <div
              data-aos="fade-up"
              data-aos-delay="180"
              className="relative z-10 lg:w-8/12 lg:-mt-24 mt-4 bg-[#231815] text-[#FAF8F6] border border-[#3A2B26] p-7 sm:p-9"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-4 border-b border-[#3A2B26]">
                <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#A5BCD6]">
                  Featured Archive &middot; {featured.category.name}
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#82756E]">
                  {featured.year} &middot; {featured.location}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#FAF8F6] mb-2">
                    {featured.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#C0B7B2] leading-relaxed max-w-xl">
                    {featured.description}
                  </p>
                </div>

                <Link
                  to={`/portfolio/${featured.slug}`}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#A5BCD6] hover:text-[#FAF8F6] transition-colors shrink-0"
                >
                  <span>View Case Study</span>
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Asymmetric Exhibition Wall */}
      <section className="bg-white text-[#231815] border-b border-[#E8E3DF]">
        <Container className="py-14 sm:py-20 lg:py-24">
          {/* Editorial Underline Filter Bar */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-[#D5CDC7] mb-12">
            <nav
              aria-label="Filter portfolio by discipline"
              className="flex flex-wrap items-center gap-x-7 sm:gap-x-9 gap-y-2"
            >
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                className={`pb-3.5 -mb-px text-xs uppercase tracking-[0.16em] border-b-2 transition-colors cursor-pointer ${
                  selectedCategory === 'all'
                    ? 'border-[#513229] text-[#231815] font-extrabold'
                    : 'border-transparent text-[#82756E] hover:text-[#231815] hover:border-[#D5CDC7] font-semibold'
                }`}
              >
                All Works
                <sup className="ml-1 text-[9px] font-bold text-[#513229]">
                  {String(PORTFOLIO_PROJECTS.length).padStart(2, '0')}
                </sup>
              </button>

              {categories.map((cat) => {
                const count = PORTFOLIO_PROJECTS.filter((p) => p.category?.slug === cat.slug).length;
                const isActive = selectedCategory === cat.slug;
                return (
                  <button
                    key={cat.slug}
                    type="button"
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`pb-3.5 -mb-px text-xs uppercase tracking-[0.16em] border-b-2 transition-colors cursor-pointer ${
                      isActive
                        ? 'border-[#513229] text-[#231815] font-extrabold'
                        : 'border-transparent text-[#82756E] hover:text-[#231815] hover:border-[#D5CDC7] font-semibold'
                    }`}
                  >
                    {cat.name}
                    <sup
                      className={`ml-1 text-[9px] font-bold ${
                        isActive ? 'text-[#513229]' : 'text-[#82756E]'
                      }`}
                    >
                      {String(count).padStart(2, '0')}
                    </sup>
                  </button>
                );
              })}
            </nav>

            <span className="hidden lg:inline-block pb-3.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#82756E]">
              Showing {String(filteredProjects.length).padStart(2, '0')} of{' '}
              {String(PORTFOLIO_PROJECTS.length).padStart(2, '0')} Works
            </span>
          </div>

          {/* Museum Rhythm Grid: [7, 5, 12(wide), 5, 7, 12(wide)] */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-14 sm:gap-y-16">
            {filteredProjects.map((album, idx) => {
              const num = String(idx + 1).padStart(2, '0');
              const pattern = idx % 6;
              const colClass =
                pattern === 0 || pattern === 4
                  ? 'lg:col-span-7'
                  : pattern === 1 || pattern === 3
                    ? 'lg:col-span-5'
                    : 'lg:col-span-12';
              const aspectClass =
                pattern === 2 || pattern === 5
                  ? 'aspect-[16/10] sm:aspect-[21/9]'
                  : pattern === 1 || pattern === 3
                    ? 'aspect-[4/4.2]'
                    : 'aspect-[16/10.5]';

              return (
                <article
                  key={album.slug}
                  data-aos="fade-up"
                  data-aos-delay={(idx % 2) * 90}
                  className={colClass}
                >
                  <Link to={`/portfolio/${album.slug}`} className="group block">
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.2em] text-[#82756E] mb-3">
                      <span className="text-[#513229]">
                        {num} &middot; {album.category?.name}
                      </span>
                      <span>
                        {album.year} &middot; {album.location}
                      </span>
                    </div>

                    <div className="border border-[#E8E3DF] group-hover:border-[#513229] transition-colors bg-[#231815] overflow-hidden mb-5">
                      <ImageReveal
                        src={album.cover_media?.url}
                        alt={album.cover_media?.alt_text || album.title}
                        className={`${aspectClass} w-full`}
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#231815] group-hover:text-[#513229] transition-colors mb-1.5">
                          {album.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#584C46] leading-relaxed max-w-2xl">
                          {album.description}
                        </p>
                      </div>
                      <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#513229] shrink-0">
                        Case Study &rarr;
                      </span>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}

export default PortfolioPage;
