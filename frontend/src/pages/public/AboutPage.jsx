import { Link } from 'react-router-dom';
import Container from '../../components/ui/Container';
import Section from '../../components/ui/Section';
import { PageHeader } from '../../components/ui/Container';
import SeoHead from '../../components/common/SeoHead';
import ResponsiveImage from '../../components/common/ResponsiveImage';
import Button from '../../components/ui/Button';
import images from '../../assets/images';
import Reveal from '../../components/motion/Reveal';

export function AboutPage() {
  const steps = [
    {
      number: '01',
      title: 'Pre-Production & Visual Planning',
      description:
        'Every project begins with clear creative alignment. We develop tailored treatment decks, lighting blueprints, call schedules, and shot checklists to maximize production efficiency.',
    },
    {
      number: '02',
      title: 'Principal Photography & Cinema Capture',
      description:
        'On set or on location, our crew executes with methodical focus. We maintain redundant dual-card data backups, multi-channel audio monitoring, and calibrated exposure tools.',
    },
    {
      number: '03',
      title: 'Color Grading & Audio Mastering',
      description:
        'Post-production is treated as an editorial art. We apply bespoke color science, master acoustic tracks to broadcast loudness specifications, and deliver multi-aspect renders.',
    },
  ];

  return (
    <>
      <SeoHead
        title="About Our Studio"
        description="Learn about Movic Audits, our creative philosophy, production team, and commitment to human-crafted visual excellence."
      />

      <Section variant="canvas" className="border-b border-[#E8E3DF]">
        <Container>
          <Reveal variant="fade-up">
            <PageHeader
              eyebrow="Studio Story & Philosophy"
              title="About Movic Audits"
              subtitle="Dedicated to producing compelling visual narratives for commercial brands, cultural institutions, and private commissions."
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mt-10">
              <div className="lg:col-span-6 space-y-6 text-sm sm:text-base text-[#584C46] leading-relaxed">
                <p className="font-semibold text-[#231815]">
                  Movic Audits is an independent visual media agency. We work with clients who value technical discipline, measured pacing, and genuine craftsmanship over automated visual shortcuts.
                </p>
                <p>
                  Our philosophy is rooted in the belief that great photography and cinematography require deep respect for context, natural lighting behavior, and human emotion. We compose each frame to communicate authoritatively, whether capturing industrial architecture, corporate milestones, or intimate celebrations.
                </p>
                <p>
                  Operating with professional full-frame cinema and still cameras, high-output continuous lighting, and dedicated sound equipment, our production desk provides end-to-end creative support from concept through delivery.
                </p>
                <div className="pt-2">
                  <Link to="/book">
                    <Button variant="primary" size="md">
                      Discuss a Project With Us
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="border border-[#E8E3DF] rounded-sm overflow-hidden bg-white shadow-xs">
                  <ResponsiveImage
                    src={images.photographerMirror.src}
                    alt={images.photographerMirror.alt}
                    aspectRatio="aspect-[4/5]"
                    className="w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Production Method Section */}
      <Section variant="white" className="border-b border-[#E8E3DF]">
        <Container>
          <Reveal variant="fade-up">
            <div className="max-w-2xl mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-[#513229] mb-2 block">
                Methodology
              </span>
              <h2 className="text-3xl font-extrabold text-[#231815] tracking-tight">
                Our Working Process
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((step) => (
                <div
                  key={step.number}
                  className="p-8 bg-[#FAF8F6] border border-[#E8E3DF] rounded-sm flex flex-col justify-between"
                >
                  <div>
                    <span className="text-3xl font-black text-[#513229] mb-4 block font-mono">
                      {step.number}
                    </span>
                    <h3 className="text-lg font-bold text-[#231815] mb-2">{step.title}</h3>
                    <p className="text-xs sm:text-sm text-[#584C46] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Equipment & Field Stills Gallery Grid */}
      <Section variant="canvas" className="border-b border-[#E8E3DF]">
        <Container>
          <Reveal variant="fade-up">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-3">
                <div className="border border-[#E8E3DF] rounded-sm overflow-hidden bg-white">
                  <ResponsiveImage
                    src={images.vintageCameraTable.src}
                    alt={images.vintageCameraTable.alt}
                    aspectRatio="aspect-[16/10]"
                  />
                </div>
                <div className="text-xs font-bold text-[#231815]">Tactile Craft & Preparation</div>
                <div className="text-xs text-[#82756E]">
                  Meticulous staging and equipment diagnostics before every production call.
                </div>
              </div>

              <div className="space-y-3">
                <div className="border border-[#E8E3DF] rounded-sm overflow-hidden bg-white">
                  <ResponsiveImage
                    src={images.cinemaCamcorder.src}
                    alt={images.cinemaCamcorder.alt}
                    aspectRatio="aspect-[16/10]"
                  />
                </div>
                <div className="text-xs font-bold text-[#231815]">Commercial Broadcast Systems</div>
                <div className="text-xs text-[#82756E]">
                  Dedicated cinema audio, calibrated optics, and high-bitrate recording formats.
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}

export default AboutPage;
