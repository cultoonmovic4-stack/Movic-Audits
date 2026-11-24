/**
 * Movic Audits — Visual Asset Registry
 *
 * Maps supplied photography and videography assets to semantic editorial roles.
 * Authoritative source: C:\xampp\htdocs\AdvancedPHP\Audits\frontend\src\assets
 */

import heroDawn from './vovanquy-dawn-5517011_1920.jpg';
import photographerSunset from './tiensinh-man-7927646_1920.jpg';
import photographerDarkStudio from './u_ojq9rdzqq7-camera-7726802_1920.jpg';
import photographerMirror from './denisdoukhan-photographer-775155_1920.jpg';
import weddingSparklerExit from './ashleybrown07-couple-8885735_1920.jpg';
import weddingBridalParty from './prettywildflowers-wedding-8206095_1920.jpg';
import droneCinema from './powie-drone-1080844_1920.jpg';
import broadcastMonitor from './stocksnap-technology-2608867_1920.jpg';
import cinemaCamcorder from './redmac-camera-7230748_1920.jpg';
import cameraHandBokeh from './deepakkumarbhuyan111-camera-6745432_1920.jpg';
import vintageCameraTable from './markusspiske-camera-581126_1920.jpg';

export const images = {
  // Hero & Wide Storytelling
  heroDawn: {
    src: heroDawn,
    alt: 'Cinematic sunrise horizon captured through camera monitor on tripod',
    aspectRatio: 'aspect-[16/9]',
  },
  // Editorial & Portraiture
  photographerSunset: {
    src: photographerSunset,
    alt: 'Photographer walking towards golden hour landscape with telephoto camera gear',
    aspectRatio: 'aspect-[3/4]',
  },
  photographerDarkStudio: {
    src: photographerDarkStudio,
    alt: 'Studio photographer holding professional Sony camera in low-key lighting',
    aspectRatio: 'aspect-[4/3]',
  },
  photographerMirror: {
    src: photographerMirror,
    alt: 'Photographer reflection captured through an ornate vintage gold frame mirror',
    aspectRatio: 'aspect-[2/3]',
  },
  // Wedding & Event Documentation
  weddingSparklerExit: {
    src: weddingSparklerExit,
    alt: 'Wedding couple laughing under a sparkler arch during night celebration',
    aspectRatio: 'aspect-[3/2]',
  },
  weddingBridalParty: {
    src: weddingBridalParty,
    alt: 'Bridal party holding vibrant floral bouquets laughing together in an urban lane',
    aspectRatio: 'aspect-[1/1]',
  },
  // Motion, Drone & Technology
  droneCinema: {
    src: droneCinema,
    alt: 'DJI Inspire cinema drone hovering against open sky for aerial production',
    aspectRatio: 'aspect-[16/10]',
  },
  broadcastMonitor: {
    src: broadcastMonitor,
    alt: 'Professional broadcast camera monitor displaying live event performance',
    aspectRatio: 'aspect-[16/10]',
  },
  cinemaCamcorder: {
    src: cinemaCamcorder,
    alt: 'Commercial production camcorder with directional shotgun microphone on tripod',
    aspectRatio: 'aspect-[16/10]',
  },
  // Equipment & Craft
  cameraHandBokeh: {
    src: cameraHandBokeh,
    alt: 'Hand holding Sony mirrorless camera with 50mm f/1.8 lens and lens hood',
    aspectRatio: 'aspect-[2/3]',
  },
  vintageCameraTable: {
    src: vintageCameraTable,
    alt: 'Manual SLR camera body with lens placed on rustic timber desk with production notebook',
    aspectRatio: 'aspect-[3/2]',
  },
};

export default images;
