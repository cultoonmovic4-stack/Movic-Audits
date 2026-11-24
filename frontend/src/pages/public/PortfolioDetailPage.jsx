import { useParams, Link } from 'react-router-dom';
import Container from '../../components/ui/Container';
import SeoHead from '../../components/common/SeoHead';
import ImageReveal from '../../components/motion/ImageReveal';
import images from '../../assets/images';
import PORTFOLIO_PROJECTS from '../../data/portfolioProjects';

const SPEC_FALLBACK_IMAGES = [
  images.cameraHandBokeh,
  images.cinemaCamcorder,
  images.broadcastMonitor,
  images.photographerSunset,
];

export function PortfolioDetailPage() {
  const { slug } = useParams();
  const currentIndex = PORTFOLIO_PROJECTS.findIndex((item) => item.slug === slug);
  const album = currentIndex >= 0 ? PORTFOLIO_PROJECTS[currentIndex] : null;

  if (!album) {
    return (
      <section className="bg-[#FAF8F6] text-[#231815] py-24 border-b border-[#E8E3DF]">
        <Container className="text-center max-w-xl mx-auto">
          <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#513229] mb-3 block">
            Portfolio Record
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#231815] mb-4">
            Case Study Not Found
          </h1>
          <p className="text-sm text-[#584C46] mb-8 leading-relaxed">
            The requested portfolio project does not exist in our curated archive.
          </p>
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#513229] hover:bg-[#3E251E] text-[#FAF8F6] text-xs font-bold uppercase tracking-[0.16em] rounded-xs transition-colors min-h-[44px]"
          >
            <span>&larr; Return to Portfolio</span>
          </Link>
        </Container>
      </section>
    );
  }

  const prevProject =
    PORTFOLIO_PROJECTS[(currentIndex - 1 + PORTFOLIO_PROJECTS.length) % PORTFOLIO_PROJECTS.length];
  const nextProject =
    PORTFOLIO_PROJECTS[(currentIndex + 1) % PORTFOLIO_PROJECTS.length];

  return (
    <>
      <SeoHead
        title={album.title}
        description={album.description || `Case study for ${album.title} by Movic Audits.`}
      />

      {/* Scene 01 — Case Study Opening Slate & Hero Frame */}
      <section className="bg-[#FAF8F6] text-[#231815] border-b border-[#E8E3DF]">
        <Container className="pt-10 sm:pt-14 pb-14 sm:pb-20">
          <div className="mb-8 flex items-center justify-between gap-4">
            <Link
              to="/portfolio"
              className="text-xs font-bold uppercase tracking-[0.18em] text-[#513229] hover:text-[#231815] transition-colors"
            >
              &larr; Back to Portfolio
            </Link>
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#82756E]">
              Case Study {String(currentIndex + 1).padStart(2, '0')} / {String(PORTFOLIO_PROJECTS.length).padStart(2, '0')}
            </span>
          </div>

          <div
            data-aos="fade-up"
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-10 border-b border-[#D5CDC7]"
          >
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-[#513229]" aria-hidden="true" />
                <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#513229]">
                  {album.category?.name || 'Case Study'}
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight leading-[1.06] text-[#231815] mb-4">
                {album.title}
              </h1>
              <p className="text-sm sm:text-base text-[#584C46] leading-relaxed max-w-2xl">
                {album.description}
              </p>
            </div>

            <div className="lg:col-span-4 lg:text-right">
              <Link
                to="/book"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#513229] hover:bg-[#3E251E] text-[#FAF8F6] text-xs font-bold uppercase tracking-[0.16em] rounded-xs transition-colors min-h-[44px]"
              >
                <span>Inquire Similar Production</span>
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>

          {/* Project Metadata Strip */}
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 lg:divide-x divide-[#D5CDC7] border-b border-[#D5CDC7] mb-10">
            <div className="py-5 lg:pr-6">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#82756E] block mb-1">
                Client
              </span>
              <span className="text-xs sm:text-sm font-bold text-[#231815]">
                {album.client}
              </span>
            </div>
            <div className="py-5 lg:px-6">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#82756E] block mb-1">
                Location
              </span>
              <span className="text-xs sm:text-sm font-bold text-[#231815]">
                {album.location}
              </span>
            </div>
            <div className="py-5 lg:px-6">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#82756E] block mb-1">
                Year
              </span>
              <span className="text-xs sm:text-sm font-bold text-[#231815]">
                {album.year}
              </span>
            </div>
            <div className="py-5 lg:pl-6">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#82756E] block mb-1">
                Discipline
              </span>
              <span className="text-xs sm:text-sm font-bold text-[#231815]">
                {album.category?.name}
              </span>
            </div>
          </div>

          {/* Opening Establishing Still */}
          <div data-aos="fade-up" data-aos-delay="100" className="border border-[#E8E3DF] bg-[#231815]">
            <ImageReveal
              src={album.cover_media.url}
              alt={album.cover_media.alt_text || album.title}
              className="aspect-[16/10] sm:aspect-[21/9] w-full"
              loading="eager"
            />
          </div>
        </Container>
      </section>

      {/* Scene 02 — The Brief, Creative Approach & Deliverables */}
      <section className="bg-white text-[#231815] border-b border-[#E8E3DF]">
        <Container className="py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left: The Brief & Director's Note */}
            <div data-aos="fade-up" className="lg:col-span-5 space-y-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-7 h-px bg-[#513229]" aria-hidden="true" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#513229]">
                    01 &middot; The Brief
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#231815] mb-4">
                  Commission Context
                </h2>
                <p className="text-sm sm:text-base text-[#584C46] leading-relaxed">
                  {album.brief}
                </p>
              </div>

              {album.directorNote && (
                <blockquote className="pl-5 border-l-2 border-[#513229] bg-[#FAF8F6] py-5 pr-6 border-y border-r border-y-[#E8E3DF] border-r-[#E8E3DF]">
                  <p className="text-sm sm:text-base font-semibold text-[#231815] leading-relaxed">
                    &ldquo;{album.directorNote}&rdquo;
                  </p>
                  <footer className="mt-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#513229]">
                    Production Desk Note
                  </footer>
                </blockquote>
              )}
            </div>

            {/* Right: Creative Approach & Deliverables Ledger */}
            <div data-aos="fade-up" data-aos-delay="100" className="lg:col-span-7 space-y-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-7 h-px bg-[#A5BCD6]" aria-hidden="true" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#513229]">
                    02 &middot; Creative Approach
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#231815] mb-4">
                  How We Captured It
                </h2>
                <p className="text-sm sm:text-base text-[#584C46] leading-relaxed">
                  {album.approach}
                </p>
              </div>

              {album.deliverables && album.deliverables.length > 0 && (
                <div className="pt-6 border-t border-[#D5CDC7]">
                  <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#82756E] block mb-4">
                    Final Deliverables
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {album.deliverables.map((item, idx) => (
                      <div
                        key={item}
                        className="p-4 bg-[#FAF8F6] border border-[#E8E3DF]"
                      >
                        <span className="text-[10px] font-bold text-[#513229] block mb-1">
                          0{idx + 1}
                        </span>
                        <span className="text-xs font-bold text-[#231815] leading-snug block">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Scene 03 — Selected Exhibition Frames */}
      {album.images && album.images.length > 0 && (
        <section className="bg-[#FAF8F6] text-[#231815] border-b border-[#E8E3DF]">
          <Container className="py-16 sm:py-24">
            <div data-aos="fade-up" className="flex items-end justify-between gap-4 pb-8 mb-10 border-b border-[#D5CDC7]">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-7 h-px bg-[#513229]" aria-hidden="true" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#513229]">
                    03 &middot; Selected Frames
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#231815]">
                  Visual Sequence
                </h2>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#82756E]">
                {String(album.images.length).padStart(2, '0')} Plates
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {album.images.map((img, idx) => {
                const isWide = idx === 0 || album.images.length === 1;
                return (
                  <figure
                    key={img.id}
                    data-aos="fade-up"
                    data-aos-delay={(idx % 2) * 100}
                    className={isWide ? 'lg:col-span-12' : 'lg:col-span-6'}
                  >
                    <div className="border border-[#E8E3DF] bg-[#231815]">
                      <ImageReveal
                        src={img.media.url}
                        alt={img.media.alt_text || img.caption || album.title}
                        className={isWide ? 'aspect-[16/9] w-full' : 'aspect-[4/3] w-full'}
                      />
                    </div>
                    {img.caption && (
                      <figcaption className="mt-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#82756E]">
                        {img.caption}
                      </figcaption>
                    )}
                  </figure>
                );
              })}
            </div>
          </Container>
        </section>
      )}

      {/* Scene 04 — Darkroom Technical Dossier */}
      {album.productionSpecs && album.productionSpecs.length > 0 && (
        <section className="bg-[#1C1412] text-[#FAF8F6] border-b border-[#3A2B26]">
          <Container className="py-16 sm:py-24 lg:py-28">
            {/* Top Architectural Slate Header */}
            <div
              data-aos="fade-up"
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end pb-10 mb-10 border-b border-[#3A2B26]"
            >
              <div className="lg:col-span-7">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-0.5 bg-[#A5BCD6]" aria-hidden="true" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#A5BCD6]">
                    04 &middot; Technical Notes
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-[44px] tracking-tight leading-[1.08] text-[#FAF8F6]">
                  <span className="font-normal text-[#C0B7B2]">Production </span>
                  <span className="font-extrabold">Specification Sheet.</span>
                </h2>
              </div>

              <div className="lg:col-span-5 lg:text-right space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#A5BCD6] block">
                  Log Ref &middot; MA-{album.year}-{String(currentIndex + 1).padStart(2, '0')}
                </span>
                <p className="text-xs sm:text-sm text-[#C0B7B2] leading-relaxed max-w-md lg:ml-auto">
                  Every commission is logged with calibrated camera, lighting, audio, and finishing standards so visual quality stays repeatable.
                </p>
              </div>
            </div>

            {/* Full-Width 2×2 Architectural Photographic Spec Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 border border-[#3A2B26] bg-[#231815]">
              {album.productionSpecs.map((spec, idx) => {
                const parts = spec.value.split('·').map((s) => s.trim());
                const primary = parts[0];
                const secondary = parts.slice(1).join(' · ');
                const isLeftCol = idx % 2 === 0;
                const isBottomRow = idx >= 2;
                const specMedia = spec.image || SPEC_FALLBACK_IMAGES[idx % SPEC_FALLBACK_IMAGES.length];

                return (
                  <article
                    key={spec.label}
                    data-aos="fade-up"
                    data-aos-delay={(idx % 2) * 90}
                    className={`flex flex-col justify-between border-b md:border-b-0 border-[#3A2B26] last:border-b-0 ${
                      isLeftCol ? 'md:border-r md:border-[#3A2B26]' : ''
                    } ${isBottomRow ? 'md:border-t md:border-[#3A2B26]' : ''}`}
                  >
                    <div>
                      {/* Cell Top Index Header */}
                      <div className="px-6 sm:px-7 py-4 border-b border-[#3A2B26] flex items-center justify-between gap-4">
                        <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#A5BCD6]">
                          {spec.label}
                        </span>
                        <span className="text-xl font-light leading-none text-[#82756E]">
                          0{idx + 1}
                        </span>
                      </div>

                      {/* Dedicated Spec Photograph */}
                      <div className="bg-[#160F0D] border-b border-[#3A2B26] overflow-hidden">
                        <ImageReveal
                          src={specMedia.src}
                          alt={specMedia.alt || spec.label}
                          className="aspect-[16/9.5] w-full"
                        />
                      </div>
                    </div>

                    {/* Technical Detail Copy */}
                    <div className="p-6 sm:p-7">
                      <div className="text-base sm:text-lg font-bold text-[#FAF8F6] tracking-tight leading-snug">
                        {primary}
                      </div>
                      {secondary && (
                        <div className="text-xs sm:text-sm text-[#C0B7B2] mt-1.5 leading-relaxed">
                          {secondary}
                        </div>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Bottom Commissioning Action Bar */}
            <div
              data-aos="fade-up"
              data-aos-delay="120"
              className="mt-10 pt-8 border-t border-[#3A2B26] flex flex-col lg:flex-row lg:items-center justify-between gap-6"
            >
              <div className="flex items-center gap-3">
                <span className="w-6 h-0.5 bg-[#A5BCD6] shrink-0" aria-hidden="true" />
                <p className="text-xs sm:text-sm text-[#C0B7B2]">
                  Planning a similar production? We tailor crew size, optics, and schedules to your brief.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <Link
                  to="/services"
                  className="inline-flex items-center px-5 py-3.5 border border-[#3A2B26] hover:border-[#A5BCD6] text-[#FAF8F6] text-xs font-semibold uppercase tracking-[0.16em] rounded-xs transition-colors min-h-[44px]"
                >
                  Explore Capabilities
                </Link>
                <Link
                  to="/book"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#513229] hover:bg-[#3E251E] text-[#FAF8F6] text-xs font-bold uppercase tracking-[0.16em] rounded-xs transition-colors min-h-[44px]"
                >
                  <span>Commission a Similar Shoot</span>
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Scene 05 — Prev / Next Case Study Navigation */}
      <section className="bg-white text-[#231815] border-b border-[#E8E3DF]">
        <Container className="py-10 sm:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[#D5CDC7]">
            <Link
              to={`/portfolio/${prevProject.slug}`}
              className="py-4 sm:pr-8 group block"
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#82756E] block mb-1.5">
                &larr; Previous Case Study
              </span>
              <span className="text-base sm:text-lg font-extrabold text-[#231815] group-hover:text-[#513229] transition-colors block">
                {prevProject.title}
              </span>
            </Link>

            <Link
              to={`/portfolio/${nextProject.slug}`}
              className="py-4 sm:pl-8 sm:text-right group block"
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#82756E] block mb-1.5">
                Next Case Study &rarr;
              </span>
              <span className="text-base sm:text-lg font-extrabold text-[#231815] group-hover:text-[#513229] transition-colors block">
                {nextProject.title}
              </span>
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}

export default PortfolioDetailPage;
