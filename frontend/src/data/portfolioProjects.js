import images from '../assets/images';

/**
 * Authoritative Static Portfolio Archive — Movic Audits
 * Edit titles, clients, years, locations, case study stories, technical notes, and photography here.
 */
export const PORTFOLIO_PROJECTS = [
  {
    id: 'project-1',
    slug: 'dawn-horizon-brand-anthem',
    title: 'Dawn Horizon — Brand Anthem Film',
    year: '2026',
    location: 'Lake Victoria, Uganda',
    client: 'East African Expedition House',
    category: { name: 'Cinematography', slug: 'cinematography' },
    description:
      'A sunrise commercial anthem film and companion still series capturing quiet endurance, coastal light, and field precision across three shoot days.',
    brief:
      'East African Expedition House needed a flagship brand film and print still library that avoided loud commercial clichés. The goal was to convey calm authority, craftsmanship, and natural atmosphere across early-morning lakeside locations.',
    approach:
      'We scheduled principal capture strictly around pre-dawn blue hour and the first forty minutes of golden light. Shooting with a compact two-person camera and sound unit allowed us to move quietly without staging artificial performances, pairing wide tripod compositions with tight telephoto tracking.',
    directorNote:
      'When natural dawn light is doing the heavy lifting, the camera only needs patience and restraint.',
    deliverables: ['4K Brand Anthem Film (2:30)', 'Editorial Still Series (45 Plates)', 'Broadcast Color Master & 9:16 Cuts'],
    productionSpecs: [
      { label: 'Camera & Optics', value: 'Full-Frame Cinema Body · 35mm & 70–200mm Telephoto' },
      { label: 'Lighting & Sound', value: '100% Natural Dawn Light · Directional Field Ambience' },
      { label: 'Post & Color', value: 'Bespoke Warm Filmic LUT · Broadcast Loudness Mix' },
      { label: 'Production Scope', value: '3 Location Days · 2-Person Field Crew' },
    ],
    cover_media: {
      url: images.heroDawn.src,
      alt_text: images.heroDawn.alt,
    },
    images: [
      {
        id: 'dh-1',
        caption: '01 · Pre-dawn tripod monitor framing at first light',
        media: { url: images.heroDawn.src, alt_text: images.heroDawn.alt },
      },
      {
        id: 'dh-2',
        caption: '02 · Golden hour telephoto field tracking along the ridge',
        media: { url: images.photographerSunset.src, alt_text: images.photographerSunset.alt },
      },
      {
        id: 'dh-3',
        caption: '03 · Calibrated broadcast monitor check during morning capture',
        media: { url: images.broadcastMonitor.src, alt_text: images.broadcastMonitor.alt },
      },
    ],
  },
  {
    id: 'project-2',
    slug: 'atelier-mirror-portrait-study',
    title: 'Atelier Reflections — Editorial Portrait Series',
    year: '2026',
    location: 'Kampala, Uganda',
    client: 'Independent Cultural Archive',
    category: { name: 'Commercial Stills', slug: 'commercial-stills' },
    description:
      'Natural-light portrait commission exploring craft, perspective, and tactile materiality using fast prime lenses without artificial studio polish.',
    brief:
      'Commissioned for a print monograph profiling independent East African craftsmen and visual artists, the series required honest environmental portraiture that preserved texture, imperfections, and the physical workspace around each subject.',
    approach:
      'Every portrait was photographed exclusively with fast prime lenses and available window light. Rather than clearing rooms or imposing studio backdrops, we framed subjects through architectural surfaces, mirrors, and working desks to keep context intact.',
    directorNote:
      'A studio workspace tells half the portrait before the subject even looks toward the lens.',
    deliverables: ['16-Bit Print Masters', 'Editorial Monograph Plates', 'Full Commercial & Exhibition Rights'],
    productionSpecs: [
      { label: 'Camera & Optics', value: 'Full-Frame Mirrorless · 50mm f/1.8 & 35mm Primes' },
      { label: 'Lighting & Sound', value: 'Available Window Light · Negative Fill Flags' },
      { label: 'Post & Color', value: 'Tactile Film Grain Calibration · CMYK Print Proofs' },
      { label: 'Production Scope', value: '2 Studio & Location Days · Tethered Capture' },
    ],
    cover_media: {
      url: images.photographerMirror.src,
      alt_text: images.photographerMirror.alt,
    },
    images: [
      {
        id: 'am-1',
        caption: '01 · Framed reflection study in natural window light',
        media: { url: images.photographerMirror.src, alt_text: images.photographerMirror.alt },
      },
      {
        id: 'am-2',
        caption: '02 · Tactile 50mm prime study with shallow depth of field',
        media: { url: images.cameraHandBokeh.src, alt_text: images.cameraHandBokeh.alt },
      },
      {
        id: 'am-3',
        caption: '03 · Manual SLR body and production notes on timber desk',
        media: { url: images.vintageCameraTable.src, alt_text: images.vintageCameraTable.alt },
      },
    ],
  },
  {
    id: 'project-3',
    slug: 'midnight-sparkler-celebration',
    title: 'Evening Under Sparklers — Milestone Celebration',
    year: '2025',
    location: 'Entebbe, Uganda',
    client: 'Private Commission',
    category: { name: 'Events & Celebrations', slug: 'events-celebrations' },
    description:
      'Unobtrusive dual-shooter photography and documentary highlight film preserving candid warmth, available night light, and unscripted human moments.',
    brief:
      'The hosts wanted complete full-day photo and film documentation of an intimate lakeside celebration without intrusive flash rigs, stiff posing, or crew members blocking guests during key moments.',
    approach:
      'We deployed two synchronized shooters using fast low-light primes and discreet wireless lapel recorders for speeches and vows. During the night celebration, we leaned fully into practical candlelight and sparklers to preserve authentic warmth.',
    directorNote:
      'The best celebration frames happen when guests forget a camera is even in the room.',
    deliverables: ['Full-Day Dual-Shooter Gallery (420+ Stills)', '5-Minute Documentary Film', 'Archival Print Box Release'],
    productionSpecs: [
      { label: 'Camera & Optics', value: 'Dual Full-Frame Bodies · Fast f/1.4–f/1.8 Primes' },
      { label: 'Lighting & Sound', value: 'Practical Night Light · Dual Wireless Lavaliers' },
      { label: 'Post & Color', value: 'Warm Skin-Tone Color Science · Licensed Acoustic Score' },
      { label: 'Production Scope', value: '12-Hour Coverage · 2 Photographers + 1 Filmmaker' },
    ],
    cover_media: {
      url: images.weddingSparklerExit.src,
      alt_text: images.weddingSparklerExit.alt,
    },
    images: [
      {
        id: 'ms-1',
        caption: '01 · Night exit captured strictly in practical sparkler light',
        media: { url: images.weddingSparklerExit.src, alt_text: images.weddingSparklerExit.alt },
      },
      {
        id: 'ms-2',
        caption: '02 · Afternoon bridal party documentary portrait in urban lane',
        media: { url: images.weddingBridalParty.src, alt_text: images.weddingBridalParty.alt },
      },
    ],
  },
  {
    id: 'project-4',
    slug: 'low-key-studio-campaign',
    title: 'Low-Key Monograph — Commercial Lookbook',
    year: '2025',
    location: 'Kampala Studio',
    client: 'Commercial Brand Commission',
    category: { name: 'Commercial Stills', slug: 'commercial-stills' },
    description:
      'Controlled low-key continuous lighting series designed for print lookbooks, executive portraiture, and disciplined monochrome brand identity.',
    brief:
      'A commercial brand refresh required sculpted, low-key studio photography with deep shadow retention and consistent visual tone across print posters, digital lookbooks, and executive leadership profiles.',
    approach:
      'Working inside a blacked-out studio floor, we built a single-key continuous lighting diagram shaped with grids and flags. Every shot was tethered directly to a color-calibrated reference display so creative directors approved framing and contrast live on set.',
    directorNote:
      'Controlling where light stops is just as decisive as choosing where it lands.',
    deliverables: ['Studio Campaign Stills (60 Retouched)', 'Print Lookbook Layout Plates', 'Multi-Aspect Digital Crops'],
    productionSpecs: [
      { label: 'Camera & Optics', value: 'Full-Frame Stills & Cinema Rig · 50mm & 85mm Primes' },
      { label: 'Lighting & Sound', value: 'High-Output Continuous Key + Deep Negative Fill' },
      { label: 'Post & Color', value: 'Low-Key Shadow Curve · Live Tethered Grading' },
      { label: 'Production Scope', value: '1 Full Studio Day · Tethered Production Desk' },
    ],
    cover_media: {
      url: images.photographerDarkStudio.src,
      alt_text: images.photographerDarkStudio.alt,
    },
    images: [
      {
        id: 'lk-1',
        caption: '01 · Studio floor low-key lighting setup during principal capture',
        media: { url: images.photographerDarkStudio.src, alt_text: images.photographerDarkStudio.alt },
      },
      {
        id: 'lk-2',
        caption: '02 · Production audio and cinema camera rig staged between takes',
        media: { url: images.cinemaCamcorder.src, alt_text: images.cinemaCamcorder.alt },
      },
    ],
  },
  {
    id: 'project-5',
    slug: 'skyline-aerial-survey',
    title: 'Open-Sky Perspective — Aerial Cinema Commission',
    year: '2025',
    location: 'Central Region, Uganda',
    client: 'Architectural Development Group',
    category: { name: 'Aerial Production', slug: 'aerial-production' },
    description:
      'Stabilized high-altitude 4K/60fps cinema drone capture and panoramic architectural survey plates matched seamlessly to ground-level footage.',
    brief:
      'An architectural development group needed clear, sweeping aerial plates and smooth overhead cinema movements to showcase site scale, surrounding topography, and morning light orientation for investor presentations.',
    approach:
      'Following pre-flight airspace clearance and wind-window planning, we operated a stabilized dual-operator cinema drone platform — separating flight navigation from camera framing so every horizon reveal remained razor-steady and log-matched to ground units.',
    directorNote:
      'Aerial motion works best when it moves like a slow crane, never like a race.',
    deliverables: ['4K/60fps Stabilized Aerial Reels', 'High-Res Panoramic Survey Plates', 'Matched Log & Graded Masters'],
    productionSpecs: [
      { label: 'Camera & Optics', value: 'Cinema Aerial Platform · Interchangeable Wide Optics' },
      { label: 'Lighting & Sound', value: 'Early-Morning Clear Sky Window · Pre-Flight Clearance' },
      { label: 'Post & Color', value: '10-Bit Log Pipeline Matched to Ground Cinema Cameras' },
      { label: 'Production Scope', value: '2 Flight Windows · Pilot + Dedicated Camera Operator' },
    ],
    cover_media: {
      url: images.droneCinema.src,
      alt_text: images.droneCinema.alt,
    },
    images: [
      {
        id: 'sa-1',
        caption: '01 · Dual-operator cinema aerial rig hovering in open airspace',
        media: { url: images.droneCinema.src, alt_text: images.droneCinema.alt },
      },
      {
        id: 'sa-2',
        caption: '02 · Wide coastal dawn horizon establishing scale and light',
        media: { url: images.heroDawn.src, alt_text: images.heroDawn.alt },
      },
    ],
  },
  {
    id: 'project-6',
    slug: 'live-stage-broadcast-film',
    title: 'Stage & Signal — Live Performance Documentary',
    year: '2024',
    location: 'Kampala, Uganda',
    client: 'Cultural Performance Showcase',
    category: { name: 'Cinematography', slug: 'cinematography' },
    description:
      'Multi-camera live performance coverage engineered with calibrated broadcast monitors, synced multi-track sound, and restrained editorial pacing.',
    brief:
      'A live cultural showcase required broadcast-grade multi-camera recording and behind-the-scenes documentary stills that captured both stage acoustics and audience energy in demanding theatrical lighting.',
    approach:
      'We rigged locked wide angles alongside a roving handheld cinema unit monitored via calibrated field displays, pulling clean direct feeds from the house sound board paired with directional ambient shotgun mics for authentic room depth.',
    directorNote:
      'Live performance gives you one take — preparation and sound redundancy decide everything.',
    deliverables: ['Full Multi-Cam Concert Film', 'Mastered Broadcast Stereo & Stems', 'Backstage Stills Archive'],
    productionSpecs: [
      { label: 'Camera & Optics', value: '3-Camera Synced Cinema Setup · Fast Zoom Optics' },
      { label: 'Lighting & Sound', value: 'Stage Theatrical Lighting · Direct Board + Boom Mix' },
      { label: 'Post & Color', value: 'Multi-Cam Color Matching · -14 LUFS Broadcast Master' },
      { label: 'Production Scope', value: 'Rehearsal + Live Show · 4-Person Production Crew' },
    ],
    cover_media: {
      url: images.broadcastMonitor.src,
      alt_text: images.broadcastMonitor.alt,
    },
    images: [
      {
        id: 'ls-1',
        caption: '01 · Live performance feed monitored in calibrated color space',
        media: { url: images.broadcastMonitor.src, alt_text: images.broadcastMonitor.alt },
      },
      {
        id: 'ls-2',
        caption: '02 · Directional shotgun microphone and camcorder rig on stage floor',
        media: { url: images.cinemaCamcorder.src, alt_text: images.cinemaCamcorder.alt },
      },
    ],
  },
];

export default PORTFOLIO_PROJECTS;
