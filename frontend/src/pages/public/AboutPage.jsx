import { Link } from 'react-router-dom';
import Container from '../../components/ui/Container';
import SeoHead from '../../components/common/SeoHead';
import images from '../../assets/images';
import ImageReveal from '../../components/motion/ImageReveal';

export function AboutPage() {
  const storyScenes = [
    {
      id: 'eye',
      slate: 'SCENE 01 · THE EYE',
      tag: 'Studio Identity',
      titleLine1: 'Discipline over',
      titleLine2: 'automated shortcuts.',
      body: 'Movic Audits is an independent visual media agency. We work with clients who value technical discipline, measured pacing, and genuine craftsmanship over automated visual shortcuts.',
      image: images.photographerMirror,
      aspectClass: 'aspect-[4/4.6]',
    },
    {
      id: 'light',
      slate: 'SCENE 02 · THE LIGHT',
      tag: 'Visual Philosophy',
      titleLine1: 'Respect for context,',
      titleLine2: 'light, and emotion.',
      body: 'Our philosophy is rooted in the belief that great photography and cinematography require deep respect for context, natural lighting behavior, and human emotion. We compose each frame to communicate authoritatively, whether capturing industrial architecture, corporate milestones, or intimate celebrations.',
      image: images.weddingSparklerExit,
      aspectClass: 'aspect-[4/3.4]',
    },
    {
      id: 'desk',
      slate: 'SCENE 03 · THE DESK',
      tag: 'Production Practice',
      titleLine1: 'End-to-end creative',
      titleLine2: 'precision on set.',
      body: 'Operating with professional full-frame cinema and still cameras, high-output continuous lighting, and dedicated sound equipment, our production desk provides end-to-end creative support from concept through final delivery.',
      image: images.vintageCameraTable,
      aspectClass: 'aspect-[4/4.2]',
    },
  ];

  // Editable Company Origin Demo Data — swap with final studio history details
  const companyMeta = {
    foundedYear: '2021',
    city: 'Kampala, Uganda',
    founderName: 'Moses Victor',
    founderRole: 'Founder & Creative Director',
    conviction:
      'We started Movic Audits in 2021 with a simple conviction: visual work should outlive the moment it was commissioned for.',
    founderQuote:
      'We never set out to be the loudest production house in the room. We set out to craft honest photographs and films that still carry weight ten years from now.',
  };

  const companyStoryChapters = [
    {
      id: 'beginning',
      year: '2021',
      location: 'Kampala',
      shotType: 'CLOSE-UP · ORIGIN',
      titleLine1: 'One camera, natural light,',
      titleLine2: 'and a refusal to rush.',
      body: 'Movic Audits began in 2021 in Kampala when founder Moses Victor stepped away from fast-turnaround agency production to build a quieter, more disciplined visual practice. Working with a single full-frame body, manual prime optics, and notebooks of lighting studies, the first commissions were photographed for local architects, artisans, and independent businesses seeking imagery with permanence.',
      milestone: 'Founded by Moses Victor · Independent Stills Practice',
      image: images.vintageCameraTable,
    },
    {
      id: 'evolution',
      year: '2023',
      location: 'Kampala Studio',
      shotType: 'MEDIUM SHOT · EXPANSION',
      titleLine1: 'From still frames into',
      titleLine2: 'cinema and sound.',
      body: 'By 2023, commercial clients who trusted our still photography began commissioning full brand films and documentary stories. We established our dedicated studio production desk — bringing cinema cameras, high-output continuous lighting, calibrated grading monitors, and directional location sound in-house so every moving image held the same restraint as our stills.',
      milestone: 'Full-Frame Cinema, Lighting & Dedicated Sound In-House',
      image: images.photographerDarkStudio,
    },
    {
      id: 'today',
      year: '2026',
      location: 'East Africa & Beyond',
      shotType: 'WIDE HORIZON · PRESENT',
      titleLine1: 'An independent house',
      titleLine2: 'built for permanence.',
      body: 'Today, Movic Audits operates as an independent visual production house serving commercial brands, cultural institutions, and private commissions across East Africa and international locations. The rigs and crew have grown, yet our founding rule stays untouched: prepare thoroughly, respect the light, and craft every frame by hand.',
      milestone: 'Commercial, Cultural & Private Visual Production House',
      image: images.heroDawn,
    },
  ];

  const [chapterOne, chapterTwo, chapterThree] = companyStoryChapters;

  const processSteps = [
    {
      number: '01',
      phase: 'PHASE I · PLANNING',
      title: 'Pre-Production & Visual Planning',
      description:
        'Every project begins with clear creative alignment. We develop tailored treatment decks, lighting blueprints, call schedules, and shot checklists to maximize production efficiency.',
      deliverables: ['Treatment Decks', 'Lighting Blueprints', 'Call Schedules'],
      image: images.vintageCameraTable,
    },
    {
      number: '02',
      phase: 'PHASE II · ON SET',
      title: 'Principal Photography & Cinema Capture',
      description:
        'On set or on location, our crew executes with methodical focus. We maintain redundant dual-card data backups, multi-channel audio monitoring, and calibrated exposure tools.',
      deliverables: ['Dual-Card Backups', 'Multi-Channel Audio', 'Calibrated Exposure'],
      image: images.photographerDarkStudio,
    },
    {
      number: '03',
      phase: 'PHASE III · POST',
      title: 'Color Grading & Audio Mastering',
      description:
        'Post-production is treated as an editorial art. We apply bespoke color science, master acoustic tracks to broadcast loudness specifications, and deliver multi-aspect renders.',
      deliverables: ['Bespoke Color Science', 'Broadcast Audio', 'Multi-Aspect Masters'],
      image: images.broadcastMonitor,
    },
  ];

  const inventoryItems = [
    {
      number: '01',
      category: 'Camera Systems',
      detail: 'Full-frame cinema & high-resolution mirrorless stills bodies',
    },
    {
      number: '02',
      category: 'Calibrated Optics',
      detail: 'Fast prime lenses & stabilized telephoto zooms',
    },
    {
      number: '03',
      category: 'Lighting & Grip',
      detail: 'High-output continuous studio fixtures & modifiers',
    },
    {
      number: '04',
      category: 'Sound & Aerial',
      detail: 'Directional shotgun mics, dual-channel recorders & aerial rigs',
    },
  ];

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <SeoHead
        title="About Our Studio"
        description="Learn about Movic Audits, our creative philosophy, production team, and commitment to human-crafted visual excellence."
      />

      {/* Hero Section — 50/50 Studio Monolith */}
      <section className="w-full bg-[#231815] text-[#FAF8F6] border-b border-[#3A2B26]">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:h-[calc(100vh-5rem)] lg:min-h-[600px] lg:max-h-[760px]">
          {/* Left Solid Java Brown Panel */}
          <div className="flex flex-col justify-between px-6 sm:px-10 lg:px-14 xl:px-20 py-10 sm:py-12 lg:py-14">
            {/* Top Header Row */}
            <div
              data-aos="fade-up"
              data-aos-delay="50"
              className="flex items-center justify-between gap-4 pb-5 border-b border-[#3A2B26]"
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-0.5 bg-[#A5BCD6]" aria-hidden="true" />
                <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#A5BCD6]">
                  About Movic Audits
                </span>
              </div>
              <span className="hidden sm:inline-block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#82756E]">
                Visual Production
              </span>
            </div>

            {/* Vertically Centered Core Statement & Actions */}
            <div className="my-auto py-8 lg:py-6">
              <h1
                data-aos="fade-up"
                data-aos-delay="120"
                className="text-4xl sm:text-5xl xl:text-[54px] leading-[1.08] tracking-tight text-[#FAF8F6] mb-5 max-w-xl"
              >
                <span className="font-normal block">Visual work with</span>
                <span className="font-extrabold block">discipline and permanence.</span>
              </h1>

              <p
                data-aos="fade-up"
                data-aos-delay="190"
                className="text-sm sm:text-base text-[#C0B7B2] leading-relaxed max-w-lg mb-8 font-normal"
              >
                An independent visual production house committed to authentic photography, intentional cinematography, and end-to-end creative precision for commercial brands, cultural institutions, and private commissions.
              </p>

              <div
                data-aos="fade-up"
                data-aos-delay="260"
                className="flex flex-wrap items-center gap-4"
              >
                <Link
                  to="/book"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#513229] hover:bg-[#3E251E] active:bg-[#2F1B16] text-[#FAF8F6] text-xs font-bold uppercase tracking-[0.16em] rounded-xs transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-[#A5BCD6] min-h-[44px]"
                >
                  <span>Book a Shoot</span>
                  <span aria-hidden="true">&rarr;</span>
                </Link>
                <Link
                  to="/portfolio"
                  className="inline-flex items-center px-5 py-3.5 border border-[#3A2B26] hover:border-[#A5BCD6] text-[#FAF8F6] text-xs font-semibold uppercase tracking-[0.16em] rounded-xs transition-colors duration-150 min-h-[44px]"
                >
                  Explore Portfolio
                </Link>
              </div>

              {/* Studio Profile Summary Strip */}
              <div
                data-aos="fade-up"
                data-aos-delay="320"
                className="mt-8 pt-6 border-t border-[#3A2B26] grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-xl"
              >
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#82756E] block mb-1">
                    Disciplines
                  </span>
                  <span className="text-xs font-semibold text-[#FAF8F6]">
                    Stills, Video &amp; Cinema
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#82756E] block mb-1">
                    Production
                  </span>
                  <span className="text-xs font-semibold text-[#FAF8F6]">
                    Concept to Final Master
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#82756E] block mb-1">
                    Clients
                  </span>
                  <span className="text-xs font-semibold text-[#FAF8F6]">
                    Brands &amp; Commissions
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Scroll Cue */}
            <div className="pt-5 border-t border-[#3A2B26] flex items-center justify-between text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em]">
              <button
                type="button"
                onClick={() => scrollToSection('studio-story')}
                className="inline-flex items-center gap-2 text-[#A5BCD6] hover:text-[#FAF8F6] transition-colors cursor-pointer"
              >
                <span>Scroll to Explore</span>
                <span aria-hidden="true">&darr;</span>
              </button>
              <span className="text-[#82756E]">Kampala, Uganda</span>
            </div>
          </div>

          {/* Right Full-Bleed Natural Photography */}
          <div className="relative h-[380px] sm:h-[440px] lg:h-full bg-[#1C1412] overflow-hidden border-t lg:border-t-0 lg:border-l border-[#3A2B26]">
            <ImageReveal
              src={images.photographerSunset.src}
              alt={images.photographerSunset.alt}
              className="w-full h-full lg:absolute lg:inset-0"
              imageClassName="object-cover object-[center_22%]"
              loading="eager"
            />
            <div className="absolute bottom-0 left-0 z-10 bg-[#231815] px-5 py-3 border-t border-r border-[#3A2B26]">
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A5BCD6]">
                Movic Audits &middot; Production Desk
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Studio Story & Philosophy — Gallery Contact Triptych (Three Scenes) */}
      <section id="studio-story" className="bg-[#FAF8F6] text-[#231815] border-b border-[#E8E3DF]">
        <Container className="py-16 sm:py-24 lg:py-28">
          {/* Top Architectural Header */}
          <div
            data-aos="fade-up"
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end pb-10 border-b border-[#D5CDC7]"
          >
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-[#A5BCD6]" aria-hidden="true" />
                <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#513229]">
                  Studio Philosophy &middot; Three Scenes
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-[46px] tracking-tight leading-[1.08] text-[#231815]">
                <span className="font-normal block">Three scenes behind</span>
                <span className="font-extrabold block">every Movic Audits frame.</span>
              </h2>
            </div>

            <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col sm:items-center lg:items-end justify-between gap-4">
              <p className="text-sm text-[#584C46] leading-relaxed lg:text-right max-w-sm">
                Craftsmanship, light, and physical production discipline &mdash; working together without shortcuts.
              </p>
              <Link
                to="/book"
                className="inline-flex items-center gap-2.5 px-6 py-3 bg-[#513229] hover:bg-[#3E251E] text-[#FAF8F6] text-xs font-bold uppercase tracking-[0.16em] rounded-xs transition-colors duration-150 shrink-0 min-h-[44px]"
              >
                <span>Discuss a Project With Us</span>
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>

          {/* 3-Column Hairline Architectural Contact Sheet */}
          <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-[#D5CDC7] border-b border-[#D5CDC7]">
            {storyScenes.map((scene, idx) => (
              <article
                key={scene.id}
                data-aos="fade-up"
                data-aos-delay={idx * 120}
                className="py-10 lg:py-12 lg:px-8 first:lg:pl-0 last:lg:pr-0 flex flex-col justify-between"
              >
                <div>
                  {/* Index Bar */}
                  <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#E8E3DF]">
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#513229]">
                      {scene.slate}
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#82756E]">
                      {scene.tag}
                    </span>
                  </div>

                  {/* Varied-Ratio Photograph */}
                  <div className="border border-[#E8E3DF] bg-[#231815] mb-6">
                    <ImageReveal
                      src={scene.image.src}
                      alt={scene.image.alt}
                      className={`${scene.aspectClass} w-full`}
                    />
                  </div>

                  {/* Scene Narrative */}
                  <h3 className="text-xl sm:text-2xl tracking-tight leading-snug text-[#231815] mb-3">
                    <span className="font-normal">{scene.titleLine1} </span>
                    <span className="font-extrabold">{scene.titleLine2}</span>
                  </h3>

                  <p className="text-xs sm:text-sm text-[#584C46] leading-relaxed">
                    {scene.body}
                  </p>
                </div>
              </article>
            ))}
          </div>

          {/* Bottom Dark Grounding Statement Bar */}
          <div
            data-aos="fade-up"
            className="bg-[#231815] text-[#FAF8F6] px-6 sm:px-10 py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-[#3A2B26] border-t-0"
          >
            <div className="flex items-center gap-3">
              <span className="w-6 h-0.5 bg-[#A5BCD6]" aria-hidden="true" />
              <span className="text-xs sm:text-sm font-medium text-[#FAF8F6]">
                From concept treatment to calibrated final master &mdash; every frame built by hand.
              </span>
            </div>
            <Link
              to="/portfolio"
              className="text-xs font-bold uppercase tracking-[0.18em] text-[#A5BCD6] hover:text-[#FAF8F6] transition-colors shrink-0"
            >
              See Our Work &rarr;
            </Link>
          </div>
        </Container>
      </section>

      {/* The Company Story — Expanding Print Monograph (Pure Open Space & Corner Overlaps) */}
      <section id="company-story" className="bg-white text-[#231815] border-b border-[#E8E3DF] overflow-x-clip">
        <Container className="py-16 sm:py-24 lg:py-32">
          {/* Opening Editorial Slate */}
          <div
            data-aos="fade-up"
            className="pb-12 sm:pb-16 border-b border-[#D5CDC7]"
          >
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-3">
                <span className="w-8 h-px bg-[#513229]" aria-hidden="true" />
                <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#513229]">
                  02 &middot; The Company Story
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-[#82756E]">
                <span>Est. {companyMeta.foundedYear}</span>
                <span aria-hidden="true">&middot;</span>
                <span>{companyMeta.city}</span>
                <span aria-hidden="true">&middot;</span>
                <span className="text-[#231815]">Founded by {companyMeta.founderName}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
              <div className="lg:col-span-9">
                <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-extrabold tracking-tight leading-[1.08] text-[#231815]">
                  {companyMeta.conviction}
                </h2>
              </div>
              <div className="lg:col-span-3 lg:text-right">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#82756E] block">
                  Three-Cut Monograph
                </span>
                <span className="text-xs font-semibold text-[#513229] block mt-1">
                  2021 &mdash; 2026
                </span>
              </div>
            </div>
          </div>

          {/* CUT 01 — CLOSE-UP: Compact Left Frame + Bottom-Right Warm Linen Plate */}
          <div className="pt-16 sm:pt-24 pb-12 sm:pb-20">
            <div
              data-aos="fade-right"
              className="lg:w-7/12 relative pl-4 pt-4"
            >
              <div className="absolute top-0 left-0 w-24 h-24 bg-[#A5BCD6]" aria-hidden="true" />
              <div className="relative z-0 border border-[#E8E3DF] bg-[#231815]">
                <ImageReveal
                  src={chapterOne.image.src}
                  alt={chapterOne.image.alt}
                  className="aspect-[16/11] w-full"
                />
              </div>
            </div>

            <div
              data-aos="fade-up"
              data-aos-delay="120"
              className="relative z-10 lg:w-7/12 lg:ml-auto lg:-mt-28 mt-5 bg-[#FAF8F6] border border-[#D5CDC7] p-7 sm:p-10 lg:p-12"
            >
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#E8E3DF]">
                <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#513229]">
                  {chapterOne.year} &middot; {chapterOne.shotType}
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#82756E]">
                  {chapterOne.location}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-[36px] tracking-tight leading-[1.1] text-[#231815] mb-4">
                <span className="font-normal block">{chapterOne.titleLine1}</span>
                <span className="font-extrabold block">{chapterOne.titleLine2}</span>
              </h3>

              <p className="text-sm sm:text-base text-[#584C46] leading-relaxed mb-5">
                {chapterOne.body}
              </p>

              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#513229]">
                {chapterOne.milestone}
              </span>
            </div>
          </div>

          {/* CUT 02 — MEDIUM SHOT: Wider Right Frame + Bottom-Left Solid Java Brown Plate */}
          <div className="py-12 sm:py-20">
            <div
              data-aos="fade-left"
              className="lg:w-9/12 lg:ml-auto border border-[#E8E3DF] bg-[#231815]"
            >
              <ImageReveal
                src={chapterTwo.image.src}
                alt={chapterTwo.image.alt}
                className="aspect-[16/10] w-full"
              />
            </div>

            <div
              data-aos="fade-up"
              data-aos-delay="120"
              className="relative z-10 lg:w-7/12 lg:-mt-32 mt-5 bg-[#231815] text-[#FAF8F6] border border-[#3A2B26] p-7 sm:p-10 lg:p-12"
            >
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#3A2B26]">
                <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#A5BCD6]">
                  {chapterTwo.year} &middot; {chapterTwo.shotType}
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#82756E]">
                  {chapterTwo.location}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-[36px] tracking-tight leading-[1.1] text-[#FAF8F6] mb-4">
                <span className="font-normal block text-[#C0B7B2]">{chapterTwo.titleLine1}</span>
                <span className="font-extrabold block">{chapterTwo.titleLine2}</span>
              </h3>

              <p className="text-sm sm:text-base text-[#C0B7B2] leading-relaxed mb-5">
                {chapterTwo.body}
              </p>

              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#A5BCD6]">
                {chapterTwo.milestone}
              </span>
            </div>
          </div>

          {/* CUT 03 — WIDE HORIZON: Full-Width 21:9 Panorama + Centered White Finale Plate */}
          <div className="pt-12 sm:pt-20">
            <div
              data-aos="fade-up"
              className="w-full border border-[#E8E3DF] bg-[#231815]"
            >
              <ImageReveal
                src={chapterThree.image.src}
                alt={chapterThree.image.alt}
                className="aspect-[16/10] sm:aspect-[21/9] w-full"
              />
            </div>

            <div
              data-aos="fade-up"
              data-aos-delay="140"
              className="relative z-10 lg:w-10/12 mx-auto lg:-mt-24 mt-5 bg-white border border-[#D5CDC7] p-7 sm:p-10 lg:p-12"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                <div className="lg:col-span-5">
                  <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#513229] block mb-3">
                    {chapterThree.year} &middot; {chapterThree.shotType}
                  </span>
                  <h3 className="text-2xl sm:text-3xl lg:text-[34px] tracking-tight leading-[1.1] text-[#231815] mb-4">
                    <span className="font-normal block">{chapterThree.titleLine1}</span>
                    <span className="font-extrabold block">{chapterThree.titleLine2}</span>
                  </h3>
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#82756E] block">
                    {chapterThree.milestone}
                  </span>
                </div>

                <div className="lg:col-span-7 space-y-6">
                  <p className="text-sm sm:text-base text-[#584C46] leading-relaxed">
                    {chapterThree.body}
                  </p>

                  <blockquote className="pl-5 border-l-2 border-[#513229] bg-[#FAF8F6] py-5 pr-6 border-y border-r border-y-[#E8E3DF] border-r-[#E8E3DF]">
                    <p className="text-sm font-semibold text-[#231815] leading-relaxed">
                      &ldquo;{companyMeta.founderQuote}&rdquo;
                    </p>
                    <footer className="mt-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#513229]">
                      {companyMeta.founderName} &mdash;{' '}
                      <span className="text-[#82756E] font-semibold">{companyMeta.founderRole}</span>
                    </footer>
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Production Method Section — Sticky Spec Sheet (Muted Stone) */}
      <section id="working-process" className="bg-[#F3EFEA] text-[#231815] border-b border-[#D5CDC7]">
        <Container className="py-16 sm:py-24 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left Sticky Summary Column */}
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-[#513229]" aria-hidden="true" />
                <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#513229]">
                  03 &middot; Methodology
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight leading-[1.1] text-[#231815] mb-5">
                Our Working Process
              </h2>

              <p className="text-sm sm:text-base text-[#584C46] leading-relaxed mb-8">
                Great imagery rarely happens by chance. Our three-stage discipline ensures creative clarity before cameras roll and broadcast-grade precision in final delivery.
              </p>

              {/* Solid Dark Technical Standard Plate */}
              <div className="bg-[#231815] text-[#FAF8F6] p-6 border border-[#3A2B26] mb-8">
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#A5BCD6] block mb-3">
                  Production Standard
                </span>
                <ul className="space-y-2.5 text-xs sm:text-sm text-[#C0B7B2]">
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-[#A5BCD6] shrink-0" aria-hidden="true" />
                    <span>Documented pre-production treatments &amp; call sheets</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-[#A5BCD6] shrink-0" aria-hidden="true" />
                    <span>Dual-card on-set data redundancy &amp; sync sound</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-[#A5BCD6] shrink-0" aria-hidden="true" />
                    <span>Calibrated color pipeline &amp; multi-aspect masters</span>
                  </li>
                </ul>
              </div>

              <Link
                to="/book"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#513229] hover:bg-[#3E251E] text-[#FAF8F6] text-xs font-bold uppercase tracking-[0.16em] rounded-xs transition-colors duration-150 min-h-[44px]"
              >
                <span>Schedule a Discovery Call</span>
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>

            {/* Right Stacked Specification Plates */}
            <div className="lg:col-span-7 space-y-6">
              {processSteps.map((step, idx) => (
                <article
                  key={step.number}
                  data-aos="fade-up"
                  data-aos-delay={idx * 100}
                  className="bg-white border border-[#D5CDC7]"
                >
                  {/* Top Index Strip */}
                  <div className="px-6 py-3.5 bg-[#FAF8F6] border-b border-[#E8E3DF] flex items-center justify-between gap-4">
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#513229]">
                      Step {step.number} &middot; {step.phase}
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#82756E]">
                      {step.number} / 03
                    </span>
                  </div>

                  {/* Body + Thumbnail Split */}
                  <div className="p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                    <div className="sm:col-span-8">
                      <h3 className="text-xl sm:text-2xl font-bold text-[#231815] tracking-tight mb-3">
                        {step.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#584C46] leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    <div className="sm:col-span-4 border border-[#E8E3DF] bg-[#231815]">
                      <ImageReveal
                        src={step.image.src}
                        alt={step.image.alt}
                        className="aspect-[4/3] w-full"
                      />
                    </div>
                  </div>

                  {/* Deliverables Ledger */}
                  <div className="px-6 py-4 border-t border-[#E8E3DF] grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 bg-[#FAF8F6]/60">
                    {step.deliverables.map((item, i) => (
                      <div key={item} className="text-xs font-semibold text-[#231815]">
                        <span className="text-[#82756E] mr-1.5">0{i + 1}.</span>
                        {item}
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Equipment & Field Stills — Field Mosaic & Spec Plate */}
      <section id="equipment-craft" className="bg-[#FAF8F6] text-[#231815] border-b border-[#E8E3DF]">
        <Container className="py-16 sm:py-24 lg:py-28">
          {/* Header */}
          <div
            data-aos="fade-up"
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end pb-10 mb-10 border-b border-[#D5CDC7]"
          >
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-[#A5BCD6]" aria-hidden="true" />
                <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#513229]">
                  04 &middot; Equipment &amp; Field Stills
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-[46px] tracking-tight leading-[1.08] text-[#231815]">
                <span className="font-normal block">Tools chosen for</span>
                <span className="font-extrabold block">truth and reliability.</span>
              </h2>
            </div>

            <div className="lg:col-span-5 lg:text-right">
              <p className="text-sm text-[#584C46] leading-relaxed max-w-md lg:ml-auto">
                From full-frame cinema bodies and calibrated prime lenses to directional sound and aerial platforms.
              </p>
            </div>
          </div>

          {/* Row 1: 8-Col Broadcast Still + 4-Col Optics Still */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
            <div data-aos="fade-up" className="lg:col-span-8">
              <div className="border border-[#E8E3DF] bg-[#231815]">
                <ImageReveal
                  src={images.cinemaCamcorder.src}
                  alt={images.cinemaCamcorder.alt}
                  className="aspect-[16/9.5] w-full"
                />
              </div>
              <div className="mt-3 flex items-center justify-between gap-4">
                <span className="text-xs font-bold text-[#231815]">
                  Commercial Broadcast Systems
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#82756E]">
                  Cinema Audio &middot; High-Bitrate Capture
                </span>
              </div>
            </div>

            <div data-aos="fade-up" data-aos-delay="120" className="lg:col-span-4">
              <div className="border border-[#E8E3DF] bg-[#231815]">
                <ImageReveal
                  src={images.cameraHandBokeh.src}
                  alt={images.cameraHandBokeh.alt}
                  className="aspect-[4/4.6] lg:aspect-[1/1.23] w-full"
                />
              </div>
              <div className="mt-3 flex items-center justify-between gap-4">
                <span className="text-xs font-bold text-[#231815]">
                  Calibrated Prime Optics
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#82756E]">
                  Full-Frame Stills
                </span>
              </div>
            </div>
          </div>

          {/* Row 2: 5-Col Solid Dark Field Readiness Plate + 7-Col Aerial Cinema Still */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            <div
              data-aos="fade-up"
              className="lg:col-span-5 bg-[#231815] text-[#FAF8F6] border border-[#3A2B26] p-7 sm:p-9 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-6 h-0.5 bg-[#A5BCD6]" aria-hidden="true" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#A5BCD6]">
                    Field Readiness
                  </span>
                </div>

                <h3 className="text-2xl font-extrabold tracking-tight text-[#FAF8F6] mb-4">
                  Prepared before the first call.
                </h3>

                <div className="divide-y divide-[#3A2B26] border-y border-[#3A2B26]">
                  {inventoryItems.map((item) => (
                    <div key={item.number} className="py-3">
                      <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#FAF8F6] block">
                        <span className="text-[#A5BCD6] mr-2">{item.number}</span>
                        {item.category}
                      </span>
                      <span className="text-xs text-[#C0B7B2] block mt-0.5">
                        {item.detail}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6">
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#A5BCD6] hover:text-[#FAF8F6] transition-colors"
                >
                  <span>View Full Capabilities</span>
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>

            <div data-aos="fade-up" data-aos-delay="120" className="lg:col-span-7 flex flex-col">
              <div className="border border-[#E8E3DF] bg-[#231815]">
                <ImageReveal
                  src={images.droneCinema.src}
                  alt={images.droneCinema.alt}
                  className="aspect-[16/10] w-full"
                />
              </div>
              <div className="mt-3 flex items-center justify-between gap-4">
                <span className="text-xs font-bold text-[#231815]">
                  Aerial Cinema &amp; Field Staging
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#82756E]">
                  Stabilized Overhead &middot; Matched Color Science
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

export default AboutPage;
