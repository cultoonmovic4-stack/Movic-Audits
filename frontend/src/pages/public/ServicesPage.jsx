import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import Container from '../../components/ui/Container';
import SeoHead from '../../components/common/SeoHead';
import images from '../../assets/images';
import publicService from '../../services/publicService';
import ImageReveal from '../../components/motion/ImageReveal';

export function ServicesPage() {
  const [apiServices, setApiServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    publicService.getServices()
      .then((res) => {
        if (isMounted && res?.data && Array.isArray(res.data) && res.data.length > 0) {
          setApiServices(res.data);
        }
      })
      .catch(() => {
        // Fallback to established production offerings if DB is empty
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  // Established visual production offerings matching studio capabilities & supplied image library
  const defaultServices = [
    {
      title: 'Commercial & Editorial Photography',
      slug: 'commercial-photography',
      description:
        'High-resolution still imagery engineered for advertising campaigns, editorial lookbooks, executive portraits, and architectural structures.',
      deliverables: [
        'High-Resolution Retouched Stills',
        'Commercial Licensing Documentation',
        'Color-Calibrated Multi-Crop Renders',
        'Secure Cloud Archive & Delivery',
      ],
      image: images.cameraHandBokeh,
    },
    {
      title: 'Cinematic Videography & Film',
      slug: 'cinematic-videography',
      description:
        'Full-cycle video production covering treatment development, on-location cinematography, audio capture, and master color grading.',
      deliverables: [
        'Brand Anthem & Manifesto Films',
        '4K Broadcast-Ready Master Files',
        'Dedicated Audio Mix & Foley',
        'Social Format Cuts (9:16 & 1:1)',
      ],
      image: images.broadcastMonitor,
    },
    {
      title: 'Milestone Events & Celebration Coverage',
      slug: 'event-production',
      description:
        'Comprehensive, unobtrusive documentation for corporate summits, milestone weddings, private galas, and cultural events.',
      deliverables: [
        'Full Day Dual-Shooter Coverage',
        'Highlight Reel & Full Archival Edits',
        'Curated Same-Day Social Sneak Peek',
        'Print-Ready Digital Gallery',
      ],
      image: images.weddingBridalParty,
    },
    {
      title: 'Aerial & Motion Production',
      slug: 'aerial-production',
      description:
        'FAA-compliant cinema drone capture for sweeping landscape perspectives, real estate architectural surveys, and dynamic vehicle tracking.',
      deliverables: [
        'High-Altitude 4K/60fps Motion Capture',
        'Stabilized Panoramic Survey Stills',
        'Pre-Flight Risk & Airspace Clearance',
        'Raw Log & Color-Graded Deliverables',
      ],
      image: images.droneCinema,
    },
  ];

  const services = apiServices.length > 0 ? apiServices : defaultServices;

  useEffect(() => {
    if (loading) return undefined;
    const isJsdom = typeof navigator !== 'undefined' && navigator.userAgent?.includes('jsdom');
    if (isJsdom || typeof window === 'undefined') return undefined;
    const frameId = requestAnimationFrame(() => AOS.refreshHard());
    return () => cancelAnimationFrame(frameId);
  }, [loading, services.length]);

  const scrollToService = (slug) => {
    const target = document.getElementById(`service-${slug}`);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <SeoHead
        title="Production Services"
        description="Explore commercial photography, cinematic video production, event coverage, and aerial drone services by Movic Audits."
      />

      {/* Services Hero — Gallery Masthead & Widescreen Rig Bar */}
      <section className="bg-white text-[#231815] border-b border-[#E8E3DF]">
        <Container className="pt-12 sm:pt-16 lg:pt-20 pb-12 sm:pb-16">
          <div
            data-aos="fade-up"
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-end pb-8 border-b border-[#D5CDC7]"
          >
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-[#513229]" aria-hidden="true" />
                <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#513229]">
                  Capabilities &amp; Disciplines
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-[60px] font-extrabold tracking-tight leading-[1.05] text-[#231815]">
                Production Services
              </h1>
            </div>

            <div className="lg:col-span-5 flex flex-col items-start lg:items-end gap-4">
              <p className="text-sm sm:text-base text-[#584C46] leading-relaxed lg:text-right max-w-md">
                Four core visual production disciplines crafted for commercial brands, institutions, and private commissions.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  to="/book"
                  className="inline-flex items-center gap-2.5 px-6 py-3 bg-[#513229] hover:bg-[#3E251E] text-[#FAF8F6] text-xs font-bold uppercase tracking-[0.16em] rounded-xs transition-colors duration-150 min-h-[44px]"
                >
                  <span>Inquire Now</span>
                  <span aria-hidden="true">&rarr;</span>
                </Link>
                <Link
                  to="/portfolio"
                  className="text-xs font-bold uppercase tracking-[0.16em] text-[#513229] hover:text-[#231815] border-b-2 border-[#513229] pb-0.5 transition-colors"
                >
                  See Our Work
                </Link>
              </div>
            </div>
          </div>

          {/* Widescreen Cinema Rig Frame + Flush Dark Jump Bar */}
          <div data-aos="fade-up" data-aos-delay="120" className="mt-8">
            <div className="border border-[#E8E3DF] bg-[#231815]">
              <ImageReveal
                src={images.cinemaCamcorder.src}
                alt={images.cinemaCamcorder.alt}
                className="aspect-[16/9] sm:aspect-[21/8.5] w-full"
                loading="eager"
              />
            </div>

            <div className="bg-[#231815] text-[#FAF8F6] border border-[#3A2B26] border-t-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#3A2B26]">
              {services.slice(0, 4).map((service, idx) => (
                <button
                  key={service.slug || service.id}
                  type="button"
                  onClick={() => scrollToService(service.slug)}
                  className="px-5 py-4 text-left hover:bg-[#2D201C] transition-colors cursor-pointer flex items-center justify-between gap-3 group"
                >
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A5BCD6] block">
                      0{idx + 1}
                    </span>
                    <span className="text-xs font-bold text-[#FAF8F6] block truncate mt-0.5">
                      {service.title}
                    </span>
                  </div>
                  <span className="text-xs text-[#82756E] group-hover:text-[#A5BCD6] shrink-0" aria-hidden="true">
                    &darr;
                  </span>
                </button>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Services Disciplines Showcase — Monograph Overlap Spreads */}
      {loading ? (
        <section className="bg-[#FAF8F6] border-b border-[#E8E3DF]">
          <Container className="py-20 text-center text-xs text-[#82756E]">
            Loading service disciplines...
          </Container>
        </section>
      ) : (
        <section className="bg-[#FAF8F6] text-[#231815] border-b border-[#E8E3DF] overflow-x-clip">
          <Container className="py-16 sm:py-24 lg:py-28 space-y-20 sm:space-y-28">
            {services.map((service, index) => {
              const num = String(index + 1).padStart(2, '0');
              const isDarkPlate = index % 2 === 1;
              const serviceImage =
                service.media?.url ||
                service.image?.src ||
                (index % 2 === 0 ? images.cameraHandBokeh.src : images.broadcastMonitor.src);
              const serviceAlt =
                service.media?.alt_text || service.image?.alt || service.title;

              return (
                <article
                  key={service.slug || service.id}
                  id={`service-${service.slug}`}
                  className="scroll-mt-24"
                >
                  {/* Dominant Framed Photograph */}
                  <div
                    data-aos={isDarkPlate ? 'fade-left' : 'fade-right'}
                    className={`${isDarkPlate ? 'lg:w-9/12 lg:ml-auto' : 'lg:w-9/12'} border border-[#E8E3DF] bg-[#231815]`}
                  >
                    <ImageReveal
                      src={serviceImage}
                      alt={serviceAlt}
                      className="aspect-[16/10] w-full"
                    />
                  </div>

                  {/* Intersecting Solid Specification Plate */}
                  <div
                    data-aos="fade-up"
                    data-aos-delay="120"
                    className={`relative z-10 lg:w-8/12 lg:-mt-28 mt-5 p-7 sm:p-10 lg:p-12 border ${
                      isDarkPlate
                        ? 'bg-[#231815] text-[#FAF8F6] border-[#3A2B26]'
                        : 'lg:ml-auto bg-white text-[#231815] border-[#D5CDC7]'
                    }`}
                  >
                    <div
                      className={`flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b ${
                        isDarkPlate ? 'border-[#3A2B26]' : 'border-[#E8E3DF]'
                      }`}
                    >
                      <span
                        className={`text-[11px] font-bold uppercase tracking-[0.22em] ${
                          isDarkPlate ? 'text-[#A5BCD6]' : 'text-[#513229]'
                        }`}
                      >
                        Discipline {num}
                      </span>
                      <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#82756E]">
                        Custom Proposals Available
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold tracking-tight leading-[1.1] mb-4">
                      {service.title}
                    </h2>

                    <p
                      className={`text-sm sm:text-base leading-relaxed mb-7 ${
                        isDarkPlate ? 'text-[#C0B7B2]' : 'text-[#584C46]'
                      }`}
                    >
                      {service.description || service.short_description}
                    </p>

                    {service.deliverables && service.deliverables.length > 0 && (
                      <div
                        className={`pt-5 mb-7 border-t ${
                          isDarkPlate ? 'border-[#3A2B26]' : 'border-[#E8E3DF]'
                        }`}
                      >
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#82756E] block mb-3.5">
                          Standard Deliverables
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                          {service.deliverables.map((item, i) => (
                            <div
                              key={item}
                              className={`text-xs sm:text-sm ${
                                isDarkPlate ? 'text-[#FAF8F6]' : 'text-[#231815]'
                              }`}
                            >
                              <span
                                className={`mr-2 font-bold ${
                                  isDarkPlate ? 'text-[#A5BCD6]' : 'text-[#82756E]'
                                }`}
                              >
                                0{i + 1}.
                              </span>
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div
                      className={`pt-5 border-t flex flex-wrap items-center justify-between gap-4 ${
                        isDarkPlate ? 'border-[#3A2B26]' : 'border-[#E8E3DF]'
                      }`}
                    >
                      <Link
                        to={`/services/${service.slug}`}
                        className={`text-xs font-bold uppercase tracking-[0.16em] inline-flex items-center gap-2 transition-colors ${
                          isDarkPlate
                            ? 'text-[#A5BCD6] hover:text-[#FAF8F6]'
                            : 'text-[#513229] hover:text-[#231815]'
                        }`}
                      >
                        <span>View Service Specification</span>
                        <span aria-hidden="true">&rarr;</span>
                      </Link>

                      <Link
                        to="/book"
                        className="inline-flex items-center gap-2.5 px-6 py-3 bg-[#513229] hover:bg-[#3E251E] text-[#FAF8F6] text-xs font-bold uppercase tracking-[0.16em] rounded-xs transition-colors duration-150 min-h-[44px]"
                      >
                        <span>Book This Discipline</span>
                        <span aria-hidden="true">&rarr;</span>
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </Container>
        </section>
      )}
    </>
  );
}

export default ServicesPage;
