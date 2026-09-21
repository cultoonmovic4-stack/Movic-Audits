import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Container from '../../components/ui/Container';
import Section from '../../components/ui/Section';
import { PageHeader } from '../../components/ui/Container';
import SeoHead from '../../components/common/SeoHead';
import ResponsiveImage from '../../components/common/ResponsiveImage';
import Button from '../../components/ui/Button';
import images from '../../assets/images';
import publicService from '../../services/publicService';

// Fallback service specifications dictionary
const FALLBACK_CATALOG = {
  'commercial-photography': {
    title: 'Commercial & Editorial Photography',
    description:
      'Engineered for advertising campaigns, editorial lookbooks, executive portraits, and architectural structures. Every photograph is captured with calibrated lighting, intentional composition, and disciplined color science.',
    deliverables: [
      'Full-resolution 16-bit uncompressed master exports',
      'Custom color grading and micro-contrast retouching',
      'Comprehensive multi-platform commercial usage rights',
      'Direct cloud delivery via private client archive',
    ],
    equipment: 'High-resolution mirrorless bodies, prime optics, calibrated strobes, tethered capture rigs.',
    image: images.cameraHandBokeh,
  },
  'cinematic-videography': {
    title: 'Cinematic Videography & Film',
    description:
      'Full-cycle video production covering treatment development, multi-camera cinematography, sound engineering, and master color grading. Built for brand manifestos, documentary features, and commercial spots.',
    deliverables: [
      '4K DCI broadcast-ready master deliverables',
      'Dedicated multi-track acoustic audio mastering & sound design',
      'Standard horizontal (16:9) and vertical social (9:16) format renders',
      'Raw footage archival options upon request',
    ],
    equipment: 'Cinema cameras, gimbal stabilization systems, shotgun & lavalier audio kits, calibrated monitoring.',
    image: images.broadcastMonitor,
  },
  'event-production': {
    title: 'Milestone Events & Celebration Coverage',
    description:
      'Unobtrusive, comprehensive visual documentation for corporate summits, milestone weddings, private galas, and cultural events. We capture candid authenticity and high-energy atmosphere without disrupting guests.',
    deliverables: [
      'Full day dual-shooter photo and cinema capture',
      'Cinematic highlight film (3-5 minutes) with licensed music score',
      'Chronological documentary archive of speeches and ceremonies',
      'High-resolution digital photo gallery with print release',
    ],
    equipment: 'Low-light prime lenses, wireless audio transmitters, discreet portable lighting units.',
    image: images.weddingBridalParty,
  },
  'aerial-production': {
    title: 'Aerial & Motion Production',
    description:
      'FAA-compliant cinema drone capture for sweeping landscape perspectives, architectural surveys, and dynamic vehicle tracking.',
    deliverables: [
      'High-altitude 4K/60fps motion capture',
      'Stabilized panoramic survey stills',
      'Pre-flight risk and airspace compliance clearance',
      'Color-graded log exports matching ground cameras',
    ],
    equipment: 'DJI Inspire cinema drone platforms with interchangeable optics and dual-operator controls.',
    image: images.droneCinema,
  },
};

export function ServiceDetailPage() {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    publicService.getService(slug)
      .then((res) => {
        if (isMounted && res?.data) {
          setService(res.data);
        }
      })
      .catch(() => {
        // Fallback to local catalog if not yet populated in database
        if (isMounted && FALLBACK_CATALOG[slug]) {
          setService(FALLBACK_CATALOG[slug]);
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, [slug]);

  const activeService = service || FALLBACK_CATALOG[slug] || {
    title: slug
      ? slug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
      : 'Service Specification',
    description: 'Bespoke production discipline delivered by Movic Audits.',
    deliverables: ['Custom project deliverables tailored to client specifications.'],
    equipment: 'Professional full-frame cinema and still capture systems.',
    image: images.cameraHandBokeh,
  };

  const displayImage =
    activeService.media?.url ||
    activeService.image?.src ||
    images.cameraHandBokeh.src;
  const displayAlt =
    activeService.media?.alt_text ||
    activeService.image?.alt ||
    activeService.title;

  return (
    <>
      <SeoHead
        title={activeService.title}
        description={`Production specifications and deliverables for ${activeService.title} by Movic Audits.`}
      />

      <Section variant="canvas" className="border-b border-[#E8E3DF]">
        <Container>
          <PageHeader
            breadcrumbs={
              <Link to="/services" className="hover:underline font-semibold text-[#513229]">
                &larr; Back to Services
              </Link>
            }
            eyebrow="Service Specification"
            title={activeService.title}
            subtitle="Explore deliverables, production standards, and equipment capabilities for this discipline."
            actions={
              <Link to="/book">
                <Button variant="primary" size="md">
                  Book This Discipline
                </Button>
              </Link>
            }
          />

          {loading ? (
            <div className="py-16 text-center text-xs text-[#82756E]">
              Loading service details...
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-8">
              <div className="lg:col-span-7 space-y-8">
                <div className="bg-white p-8 border border-[#E8E3DF] rounded-sm">
                  <h2 className="text-xl font-bold text-[#231815] mb-4">
                    Overview & Approach
                  </h2>
                  <p className="text-sm sm:text-base text-[#584C46] leading-relaxed">
                    {activeService.description}
                  </p>
                </div>

                {activeService.deliverables && (
                  <div className="bg-white p-8 border border-[#E8E3DF] rounded-sm">
                    <h2 className="text-xl font-bold text-[#231815] mb-4">
                      Project Deliverables
                    </h2>
                    <ul className="space-y-3">
                      {activeService.deliverables.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-sm text-[#584C46]">
                          <span className="w-2 h-2 rounded-full bg-[#513229] mt-1.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeService.equipment && (
                  <div className="bg-white p-8 border border-[#E8E3DF] rounded-sm">
                    <h2 className="text-xl font-bold text-[#231815] mb-2">
                      Equipment & Technology
                    </h2>
                    <p className="text-xs sm:text-sm text-[#82756E] leading-relaxed">
                      {activeService.equipment}
                    </p>
                  </div>
                )}
              </div>

              <div className="lg:col-span-5 space-y-6">
                <div className="border border-[#E8E3DF] rounded-sm overflow-hidden bg-white shadow-xs">
                  <ResponsiveImage
                    src={displayImage}
                    alt={displayAlt}
                    aspectRatio="aspect-[4/3]"
                    className="w-full object-cover"
                  />
                  <div className="p-4 bg-white border-t border-[#E8E3DF] text-xs text-[#82756E]">
                    <span className="font-bold text-[#231815]">Production Field Asset</span> &bull; {activeService.title}
                  </div>
                </div>

                <div className="p-6 bg-[#231815] text-[#FAF8F6] rounded-sm border border-[#3A2B26]">
                  <h3 className="text-base font-bold mb-2">Ready to plan this shoot?</h3>
                  <p className="text-xs text-[#C0B7B2] mb-6 leading-relaxed">
                    Contact our production desk to review call sheets, location logistics, and crew availability.
                  </p>
                  <Link to="/book">
                    <Button variant="accent" size="sm" fullWidth>
                      Reserve Production Dates
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}

export default ServiceDetailPage;
