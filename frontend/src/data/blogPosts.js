import images from '../assets/images';

/**
 * Authoritative Static Journal & Field Notes — Movic Audits
 * Edit titles, dates, authors, categories, body sections, and photography directly here.
 */
export const BLOG_POSTS = [
  {
    id: 'post-1',
    slug: 'shooting-in-natural-dawn-light',
    title: 'Why We Schedule Commercial Shoots Around the First Forty Minutes of Light',
    excerpt:
      'Before reaching for high-output studio fixtures, understanding how early-morning atmospheric contrast shapes skin tones, shadow depth, and lens flare transforms the entire visual cadence of a campaign.',
    category: { name: 'Lighting & Craft', slug: 'lighting-craft' },
    author: { name: 'Moses Victor', role: 'Founder & Creative Director' },
    published_at: '2026-09-14',
    readTime: '6 min read',
    issue: 'ISSUE 01',
    featured_media: {
      url: images.heroDawn.src,
      alt_text: images.heroDawn.alt,
    },
    pullQuote:
      'Artificial light can imitate brightness, but it rarely imitates the quiet atmospheric color temperature of an early morning horizon.',
    sections: [
      {
        heading: 'Designing the Call Sheet Around the Sun',
        paragraphs: [
          'Most rushed commercial productions treat lighting as something you overpower on set. Schedules start at 10:00 AM, harsh overhead sun forces heavy diffusion tents, and half the day is spent correcting flat contrast in post-production.',
          'At Movic Audits, we invert the schedule whenever location work permits. Setting tripods before sunrise gives us twenty minutes of cool blue-hour balance followed immediately by low-angle directional gold that carves depth into architecture and faces without a single generator.',
        ],
      },
      {
        heading: 'Exposure Discipline on Location',
        paragraphs: [
          'Because dawn luminance shifts rapidly every five minutes, manual exposure discipline is non-negotiable. We expose strictly for highlight roll-off on calibrated field monitors, allowing shadows to fall naturally into rich umber tones rather than lifting everything artificially.',
          'The result is imagery that requires minimal grading — preserving organic skin texture and authentic color separation straight out of the sensor.',
        ],
      },
    ],
  },
  {
    id: 'post-2',
    slug: 'restraint-in-low-key-studio-portraiture',
    title: 'The Architecture of Shadow: Restraint in Low-Key Studio Portraiture',
    excerpt:
      'Controlling where light stops is just as decisive as choosing where it lands. Notes from our Kampala studio floor on negative fill, single-key shaping, and deliberate monochrome contrast.',
    category: { name: 'Commercial Stills', slug: 'commercial-stills' },
    author: { name: 'Movic Audits Editorial Desk', role: 'Production Studio' },
    published_at: '2026-08-28',
    readTime: '5 min read',
    issue: 'ISSUE 02',
    featured_media: {
      url: images.photographerDarkStudio.src,
      alt_text: images.photographerDarkStudio.alt,
    },
    pullQuote:
      'When every corner of a portrait is evenly lit, the viewer has nowhere to rest. Shadow is what gives a subject physical weight.',
    sections: [
      {
        heading: 'Starting From Darkness Instead of Flat Fill',
        paragraphs: [
          'When building an executive or editorial portrait setup, we turn off every ambient overhead fixture first. Working from a clean dark floor lets us introduce one intentional key light and judge exactly how falloff behaves across the jawline and wardrobe.',
          'Instead of adding a second or third fill light automatically, we reach for black matte negative-fill flags to deepen the shadow side and preserve crisp dimensionality.',
        ],
      },
      {
        heading: 'Tethered Review Without Slowing the Subject',
        paragraphs: [
          'Calibrated tethered capture lets our art director inspect focus, micro-contrast, and framing in real time while keeping the photographer engaged directly with the subject — eliminating surprises once the shoot wraps.',
        ],
      },
    ],
  },
  {
    id: 'post-3',
    slug: 'tactile-preparation-before-every-call',
    title: 'Before the Shutter: Our Pre-Production Desk Checklist for Zero-Failure Shoots',
    excerpt:
      'Why physical shot notebooks, dual-card diagnostics, lens calibration, and redundant power planning matter far more than carrying extra gear onto a client location.',
    category: { name: 'Production Craft', slug: 'production-craft' },
    author: { name: 'Moses Victor', role: 'Founder & Creative Director' },
    published_at: '2026-07-19',
    readTime: '7 min read',
    issue: 'ISSUE 03',
    featured_media: {
      url: images.vintageCameraTable.src,
      alt_text: images.vintageCameraTable.alt,
    },
    pullQuote:
      'Calmness on set is never accidental — it is the visible result of preparation finished twenty-four hours before call time.',
    sections: [
      {
        heading: 'Treatment Decks & Physical Call Sheets',
        paragraphs: [
          'Every Movic Audits commission begins on paper before a single case is packed. A concise visual treatment aligns client stakeholders on pacing, aspect ratios, lighting mood, and key deliverables so no creative debate happens while sunlight is fading.',
        ],
      },
      {
        heading: 'Redundancy as a Studio Non-Negotiable',
        paragraphs: [
          'Every primary body records simultaneously to dual media slots, audio runs with safety backup tracks, and optics are inspected and cleaned on our studio desk the evening prior. Reliability is half of creative confidence.',
        ],
      },
    ],
  },
  {
    id: 'post-4',
    slug: 'aerial-motion-like-a-cinema-crane',
    title: 'Moving Like a Cinema Crane: Discipline in Aerial Cinematography',
    excerpt:
      'Aerial footage loses its authority the moment it feels like a fast gadget. How dual-operator pacing, wide horizons, and matched log color science integrate drone frames seamlessly into brand films.',
    category: { name: 'Aerial & Motion', slug: 'aerial-motion' },
    author: { name: 'Movic Audits Editorial Desk', role: 'Aerial Unit' },
    published_at: '2026-06-11',
    readTime: '4 min read',
    issue: 'ISSUE 04',
    featured_media: {
      url: images.droneCinema.src,
      alt_text: images.droneCinema.alt,
    },
    pullQuote:
      'The best aerial shot never announces that a drone is in the sky — it simply reveals scale at the exact moment the story asks for it.',
    sections: [
      {
        heading: 'Separating Flight Control from Framing',
        paragraphs: [
          'Whenever terrain or architectural framing demands precision, separating pilot navigation from gimbal camera operation allows slow, steady parallax reveals that hold up on large projection screens.',
        ],
      },
      {
        heading: 'Color-Matching Air and Ground Units',
        paragraphs: [
          'Shooting aerial clips in flat 10-bit log profiles matched to our ground cinema cameras ensures smooth editorial cuts without jarring shifts in sky saturation or shadow tint.',
        ],
      },
    ],
  },
  {
    id: 'post-5',
    slug: 'sound-and-monitoring-for-live-documentary',
    title: 'Half the Film Is Sound: Field Monitoring for Live Events & Documentary',
    excerpt:
      'Audiences forgive a slightly imperfect handheld frame, but never forgive harsh or clipping audio. Our practical field setup for capturing clean dialogue and natural room presence.',
    category: { name: 'Cinematography', slug: 'cinematography' },
    author: { name: 'Movic Audits Editorial Desk', role: 'Audio & Cinema Unit' },
    published_at: '2026-05-04',
    readTime: '5 min read',
    issue: 'ISSUE 05',
    featured_media: {
      url: images.broadcastMonitor.src,
      alt_text: images.broadcastMonitor.alt,
    },
    pullQuote:
      'Clean acoustic room tone anchors an edit with emotional truth long before a single music cue enters the timeline.',
    sections: [
      {
        heading: 'Dual-Source Audio Redundancy',
        paragraphs: [
          'On live stages and milestone events, we combine clean direct board feeds with directional shotgun microphones mounted to capture natural audience ambience — giving our editors complete tonal control during mastering.',
        ],
      },
      {
        heading: 'Broadcast Loudness & Acoustic Finishing',
        paragraphs: [
          'Before delivery, every film passes through dedicated loudness normalization and acoustic cleanup so dialogue translates clearly from cinema speakers down to mobile headphones.',
        ],
      },
    ],
  },
];

export default BLOG_POSTS;
