import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Container from '../../components/ui/Container';
import Section from '../../components/ui/Section';
import { PageHeader } from '../../components/ui/Container';
import SeoHead from '../../components/common/SeoHead';
import ResponsiveImage from '../../components/common/ResponsiveImage';
import Button from '../../components/ui/Button';
import images from '../../assets/images';
import publicService from '../../services/publicService';
import Reveal from '../../components/motion/Reveal';

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

  return (
    <>
      <SeoHead
        title="Production Services"
        description="Explore commercial photography, cinematic video production, event coverage, and aerial drone services by Movic Audits."
      />

      <Section variant="canvas">
        <Container>
          <Reveal variant="fade-up">
            <PageHeader
              eyebrow="Capabilities & Disciplines"
              title="Production Services"
              subtitle="Tailored creative production designed to represent your brand and moments with clarity, depth, and distinction."
              actions={
                <Link to="/book">
                  <Button variant="primary" size="sm">
                    Inquire Now
                  </Button>
                </Link>
              }
            />
          </Reveal>

          {loading ? (
            <div className="py-16 text-center text-xs text-[#82756E]">
              Loading service disciplines...
            </div>
          ) : (
            <div className="space-y-12 mt-8">
              {services.map((service, index) => {
                const serviceImage =
                  service.media?.url ||
                  service.image?.src ||
                  (index % 2 === 0 ? images.cameraHandBokeh.src : images.broadcastMonitor.src);
                const serviceAlt =
                  service.media?.alt_text || service.image?.alt || service.title;

                return (
                  <Reveal key={service.slug || service.id} variant="fade-up" delay={index * 50}>
                    <div
                      className="bg-white border border-[#E8E3DF] rounded-sm overflow-hidden hover:border-[#513229] transition-colors"
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                        <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-[#E8E3DF]">
                          <ResponsiveImage
                            src={serviceImage}
                            alt={serviceAlt}
                            aspectRatio="aspect-[16/10] lg:aspect-full"
                            className="w-full h-full min-h-[260px] object-cover"
                          />
                        </div>

                        <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-[11px] font-bold uppercase tracking-wider text-[#A5BCD6]">
                                Discipline {String(index + 1).padStart(2, '0')}
                              </span>
                              <span className="text-xs font-semibold text-[#82756E]">
                                Custom Proposals Available
                              </span>
                            </div>

                            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#231815] mb-3">
                              {service.title}
                            </h2>

                            <p className="text-sm text-[#584C46] leading-relaxed mb-6">
                              {service.description || service.short_description}
                            </p>

                            {service.deliverables && (
                              <div className="mb-6 pt-4 border-t border-[#E8E3DF]">
                                <h3 className="text-xs font-bold uppercase tracking-wider text-[#231815] mb-3">
                                  Standard Deliverables
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                  {service.deliverables.map((item) => (
                                    <div
                                      key={item}
                                      className="flex items-center gap-2 text-xs text-[#584C46]"
                                    >
                                      <span className="w-1.5 h-1.5 rounded-full bg-[#513229] shrink-0" />
                                      <span>{item}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="pt-4 border-t border-[#E8E3DF] flex flex-wrap items-center justify-between gap-4">
                            <Link
                              to={`/services/${service.slug}`}
                              className="text-xs font-bold uppercase tracking-wider text-[#513229] inline-flex items-center gap-1 hover:underline"
                            >
                              View Service Specification &rarr;
                            </Link>

                            <Link to="/book">
                              <Button variant="primary" size="sm">
                                Book This Discipline
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}

export default ServicesPage;
