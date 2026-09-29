/**
 * Alarak Coffee & Bakery - Media Assets Manifest
 * 
 * Central developer manifest mapping all validated media assets in `public/media/`.
 * Ensures type-safe references across components without hardcoded paths.
 */

export interface MediaAsset {
  /** Relative path from public directory for Next.js Image or <img> */
  src: string;
  /** Accessible title / description for SEO and screen readers */
  alt: string;
  /** Actual image format */
  format: 'jpeg' | 'png' | 'webp' | 'svg';
  /** Original file extension */
  extension: string;
  /** Original dimensions in pixels */
  dimensions: {
    width: number;
    height: number;
    aspectRatio: number;
    orientation: 'portrait' | 'landscape' | 'square';
  };
  /** Whether the image contains native transparency (alpha channel) */
  hasAlpha: boolean;
  /** Visual category tag */
  category: 'brand' | 'hero' | 'cakes' | 'pastries' | 'desserts' | 'coffee' | 'interior' | 'other';
  /** Primary visual focus of the asset */
  visualSubject: string;
  /** Recommended layout roles supported by visual characteristics */
  recommendedUsage: {
    hero: boolean;
    featured: boolean;
    gallery: boolean;
    card: boolean;
    navbar: boolean;
    background: boolean;
  };
  /** Key technical notes & usage recommendations */
  notes: string;
}

export interface HeroSlide {
  id: string;
  src: string;
  alt: string;
  chapter: string;
  arabicChapter: string;
  headlineLine1: string;
  headlineHighlight: string;
  headlineLine2: string;
  subtext: string;
  overlayGradient: string;
  /** CSS object-position for desktop (e.g. '40% center') */
  focalPosition: string;
  /** CSS object-position for mobile */
  mobileFocalPosition: string;
}

export interface MediaManifest {
  logo: {
    /** Untouched official source asset */
    official: MediaAsset;
    /** Web-ready transparent derivative */
    web: MediaAsset;
  };
  brand: {
    /** Authentic Alarak owner portrait */
    owner: MediaAsset;
  };
  hero: {
    /** Main hero visual asset reference */
    main: MediaAsset;
    /** 4 Cinematic editorial hero campaign slides */
    slides: HeroSlide[];
  };
  cakes: {
    cake01: MediaAsset;
    cake02: MediaAsset;
    cake03: MediaAsset;
    cake04: MediaAsset;
    cake05: MediaAsset;
  };
  all: MediaAsset[];
}

export const mediaAssets: MediaManifest = {
  logo: {
    official: {
      src: '/media/logo/alarak-logo.png',
      alt: 'Alarak Coffee & Bakery Official Brand Logo',
      format: 'jpeg', // Technical note: File is binary JPEG with .png extension
      extension: '.png',
      dimensions: {
        width: 928,
        height: 1144,
        aspectRatio: 0.811,
        orientation: 'portrait'
      },
      hasAlpha: false,
      category: 'brand',
      visualSubject: 'Alarak Official Brand Crest & Typography (Gold/Cream on Dark Grey Background)',
      recommendedUsage: {
        hero: true,
        featured: true,
        gallery: false,
        card: false,
        navbar: false, // Solid dark grey background requires dark container or matching background
        background: false
      },
      notes: 'Official logo asset. Features warm gold/cream emblem and typography on solid dark charcoal/grey (#585858). Note: File header is JPEG despite .png extension. Opaque background (no alpha). Best suited for dark background hero headers, footer brand block, or framed brand cards.'
    },
    web: {
      src: '/media/logo/alarak-logo-web.png',
      alt: 'Alarak Coffee & Bakery Transparent Web Logo',
      format: 'png',
      extension: '.png',
      dimensions: {
        width: 928,
        height: 1144,
        aspectRatio: 0.811,
        orientation: 'portrait'
      },
      hasAlpha: true,
      category: 'brand',
      visualSubject: 'Transparent Alarak Gold/Cream Emblem and Typography',
      recommendedUsage: {
        hero: true,
        featured: true,
        gallery: false,
        card: true,
        navbar: true, // Transparent alpha channel allows clean overlay on light or dark headers
        background: false
      },
      notes: 'Web-optimized transparent PNG derivative created from official Alarak logo. Features extracted gold/cream brand artwork with native alpha channel transparency and smooth edge anti-aliasing. Ideal for navigation header, floating badges, and overlays.'
    }
  },
  brand: {
    owner: {
      src: '/media/brand/owner (2).png',
      alt: 'Alarak Coffee & Bakery Founder and Master Artisan',
      format: 'png',
      extension: '.png',
      dimensions: {
        width: 867,
        height: 898,
        aspectRatio: 0.965,
        orientation: 'square'
      },
      hasAlpha: true,
      category: 'brand',
      visualSubject: 'Authentic Alarak Founder and Master Bakery Artisan',
      recommendedUsage: {
        hero: false,
        featured: true,
        gallery: false,
        card: false,
        navbar: false,
        background: false
      },
      notes: 'Authentic provided owner photograph. Must be rendered untouched in editorial story and philosophy sections without artificial modifications.'
    }
  },
  hero: {
    main: {
      src: '/media/hero/alarak-hero 1.png',
      alt: 'Alarak Specialty Coffee & Artisanal Morning Pastries',
      format: 'png',
      extension: '.png',
      dimensions: {
        width: 2752,
        height: 1536,
        aspectRatio: 1.792,
        orientation: 'landscape'
      },
      hasAlpha: false,
      category: 'hero',
      visualSubject: 'Cinematic specialty coffee and artisanal bakery hero visual',
      recommendedUsage: {
        hero: true,
        featured: true,
        gallery: false,
        card: false,
        navbar: false,
        background: true
      },
      notes: 'Primary cinematic hero visual asset.'
    },
    slides: [
      {
        id: 'hero-1',
        src: '/media/hero/alarak-hero 1.png',
        alt: 'Artisan hands preparing fresh pastries on a warm wooden surface',
        chapter: 'CHAPTER I â€” ARTISANAL CRAFT',
        arabicChapter: 'Ù‚Ù‡ÙˆØ© Ù…Ø®ØªØµØ© ÙˆÙ…Ø®Ø¨Ø² ÙØ§Ø®Ø±',
        headlineLine1: 'Where',
        headlineHighlight: 'Elegance',
        headlineLine2: 'Meets Flavor',
        subtext: 'Artisan pastries, specialty coffee, and moments worth savoring.',
        // Left side gradient â€” subject (hands/pastry) is center-right, text on left is readable
        overlayGradient: 'from-[#1a0e06]/80 via-[#1a0e06]/45 via-50% to-transparent',
        focalPosition: '35% center',
        mobileFocalPosition: '40% center'
      },
      {
        id: 'hero-2',
        src: '/media/hero/alarak-hero 2.png',
        alt: 'Specialty latte and artisan pastries beautifully arranged on a cafÃ© table',
        chapter: 'CHAPTER II â€” COFFEE & PASTRY',
        arabicChapter: 'Ù‚Ù‡ÙˆØ© ÙˆØ¹Ø¬Ø§Ø¦Ø¨ Ø§Ù„Ø­Ù„ÙˆÙŠØ§Øª',
        headlineLine1: 'Where',
        headlineHighlight: 'Elegance',
        headlineLine2: 'Meets Flavor',
        subtext: 'Artisan pastries, specialty coffee, and moments worth savoring.',
        // Right side has coffee/pastry subjects, left portion for text
        overlayGradient: 'from-[#1a0e06]/78 via-[#1a0e06]/42 via-45% to-transparent',
        focalPosition: '60% center',
        mobileFocalPosition: '55% center'
      },
      {
        id: 'hero-3',
        src: '/media/hero/alarak-hero 3.png',
        alt: 'Precision espresso extraction pouring into an Alarak branded cup',
        chapter: 'CHAPTER III â€” COFFEE EXTRACTION',
        arabicChapter: 'Ø¹Ù†Ø§ÙŠØ© ÙØ§Ø¦Ù‚Ø© Ø¨ØªÙØ§ØµÙŠÙ„ Ø§Ù„Ù‚Ù‡ÙˆØ©',
        headlineLine1: 'Where',
        headlineHighlight: 'Elegance',
        headlineLine2: 'Meets Flavor',
        subtext: 'Artisan pastries, specialty coffee, and moments worth savoring.',
        // Espresso machine on right, keep left text area darker
        overlayGradient: 'from-[#1a0e06]/82 via-[#1a0e06]/48 via-48% to-transparent',
        focalPosition: '58% center',
        mobileFocalPosition: '60% center'
      },
      {
        id: 'hero-4',
        src: '/media/hero/alarak-hero 4.png',
        alt: 'Exquisite selection of artisan pastries and Moroccan bakery specialties',
        chapter: 'CHAPTER IV â€” BAKERY TREASURES',
        arabicChapter: 'Ø¶ÙŠØ§ÙØ© Ø£ØµÙŠÙ„Ø© ÙˆØ£Ø¬ÙˆØ§Ø¡ Ø±Ø§Ù‚ÙŠØ©',
        headlineLine1: 'Where',
        headlineHighlight: 'Elegance',
        headlineLine2: 'Meets Flavor',
        subtext: 'Artisan pastries, specialty coffee, and moments worth savoring.',
        // Pastries fill the frame, left gradient protects text
        overlayGradient: 'from-[#1a0e06]/80 via-[#1a0e06]/44 via-48% to-transparent',
        focalPosition: '65% center',
        mobileFocalPosition: '70% center'
      }
    ]
  },
  cakes: {
        cake01: {
      src: '/media/cakes/cake-01.jpg',
      alt: 'Alarak Artisanal Berry & Cream Cake',
      format: 'jpeg',
      extension: '.jpg',
      dimensions: { width: 896, height: 1193, aspectRatio: 0.751, orientation: 'portrait' },
      hasAlpha: false,
      category: 'cakes',
      visualSubject: 'Artisanal cake with rich berry and cream details on a warm neutral cream backdrop',
      recommendedUsage: { hero: false, featured: true, gallery: true, card: true, navbar: false, background: false },
      notes: 'High-resolution vertical 3:4 portrait photography.'
    },
    cake02: {
      src: '/media/cakes/Gemini_Generated_Image_fbde1bfbde1bfbde.jfif',
      alt: 'Alarak Signature Pastry 02',
      format: 'jpeg',
      extension: '.jfif',
      dimensions: { width: 1024, height: 1024, aspectRatio: 1, orientation: 'square' },
      hasAlpha: false,
      category: 'cakes',
      visualSubject: 'Signature pastry presentation',
      recommendedUsage: { hero: false, featured: true, gallery: true, card: true, navbar: false, background: false },
      notes: ''
    },
    cake03: {
      src: '/media/cakes/Gemini_Generated_Image_h0pn95h0pn95h0pn (1).jfif',
      alt: 'Alarak Signature Pastry 03',
      format: 'jpeg',
      extension: '.jfif',
      dimensions: { width: 1024, height: 1024, aspectRatio: 1, orientation: 'square' },
      hasAlpha: false,
      category: 'cakes',
      visualSubject: 'Signature pastry presentation',
      recommendedUsage: { hero: false, featured: true, gallery: true, card: true, navbar: false, background: false },
      notes: ''
    },
    cake04: {
      src: '/media/cakes/Gemini_Generated_Image_jag1k2jag1k2jag1.jfif',
      alt: 'Alarak Signature Pastry 04',
      format: 'jpeg',
      extension: '.jfif',
      dimensions: { width: 1024, height: 1024, aspectRatio: 1, orientation: 'square' },
      hasAlpha: false,
      category: 'cakes',
      visualSubject: 'Signature pastry presentation',
      recommendedUsage: { hero: false, featured: true, gallery: true, card: true, navbar: false, background: false },
      notes: ''
    },
    cake05: {
      src: '/media/cakes/Gemini_Generated_Image_srxds4srxds4srxd.jfif',
      alt: 'Alarak Signature Pastry 05',
      format: 'jpeg',
      extension: '.jfif',
      dimensions: { width: 1024, height: 1024, aspectRatio: 1, orientation: 'square' },
      hasAlpha: false,
      category: 'cakes',
      visualSubject: 'Signature pastry presentation',
      recommendedUsage: { hero: false, featured: true, gallery: true, card: true, navbar: false, background: false },
      notes: ''
    }
  },
  all: []
};

// Populate helper array
mediaAssets.all = [
  mediaAssets.logo.official,
  mediaAssets.logo.web,
  mediaAssets.brand.owner,
  mediaAssets.hero.main,
  mediaAssets.cakes.cake01,
  mediaAssets.cakes.cake02,
  mediaAssets.cakes.cake03,
  mediaAssets.cakes.cake04,
  mediaAssets.cakes.cake05
];

/**
 * Helper function to retrieve media asset by path or key
 */
export function getMediaAsset(src: string): MediaAsset | undefined {
  return mediaAssets.all.find(asset => asset.src === src);
}

export default mediaAssets;

