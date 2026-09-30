/**
 * Gallery content for Alarak Coffee & Bakery.
 * Photos are loaded from public/media/gallery/; file paths are mapped below.
 * Replace or add photos in that folder and update the matching image path.
 */

export type GalleryCategorySlug = "coffee" | "bakery" | "interior" | "craft";

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  categorySlug: GalleryCategorySlug;
  image: string;
  aspectRatio: string;
  caption: string;
  story: string;
}

export const galleryCategories: {
  label: string;
  value: GalleryCategorySlug | "all";
}[] = [
  { label: "All", value: "all" },
  { label: "Artisan Coffee", value: "coffee" },
  { label: "Fresh Bakery", value: "bakery" },
  { label: "Interior & Vibe", value: "interior" },
  { label: "Barista Craft", value: "craft" },
];

export const galleryItems: GalleryItem[] = [
  {
    id: "1",
    title: "Signature Pour-Over Precision",
    category: "Artisan Coffee",
    categorySlug: "coffee",
    image: "/media/gallery/Gemini_Generated_Image_20nyk020nyk020ny.jfif",
    aspectRatio: "aspect-[3/4]",
    caption:
      "Handcrafted single-origin pour-over coffee brewed with meticulous attention to temperature and grind precision.",
    story:
      "Sourced directly from high-altitude Ethiopian farms, our bloom time is timed to the second to unlock delicate floral and bergamot notes.",
  },
  {
    id: "2",
    title: "Golden Flake Croissant",
    category: "Fresh Bakery",
    categorySlug: "bakery",
    image: "/media/gallery/Gemini_Generated_Image_2p8i952p8i952p8i.jfif",
    aspectRatio: "aspect-[4/3]",
    caption:
      "Freshly baked daily using Normandy butter for 72-hour fermented laminated perfection.",
    story:
      "Our master baker begins at 4:00 AM every morning ensuring that classic, shattered-glass crunch on the first bite.",
  },
  {
    id: "3",
    title: "Sanctuary of Warmth & Quiet",
    category: "Interior & Vibe",
    categorySlug: "interior",
    image: "/media/gallery/Gemini_Generated_Image_47x2nf47x2nf47x2.jfif",
    aspectRatio: "aspect-[1/1]",
    caption:
      "Thoughtfully designed space blending modern Moroccan architecture with warm brass and oak accents.",
    story:
      "Architecturally crafted to evoke a sense of calm in the heart of Fnideq, offering cozy alcoves and natural sunlight.",
  },
  {
    id: "4",
    title: "Velvet Espresso & Latte Art",
    category: "Barista Craft",
    categorySlug: "craft",
    image: "/media/gallery/Gemini_Generated_Image_7z15m27z15m27z15.jfif",
    aspectRatio: "aspect-[4/5]",
    caption:
      "Silky microfoam etched with precision over our dark chocolate & hazelnut house espresso blend.",
    story:
      "Every cup is poured with artistic pride by our senior baristas who train in sensory calibration weekly.",
  },
  {
    id: "5",
    title: "Artisan Sourdough & Pastry Display",
    category: "Fresh Bakery",
    categorySlug: "bakery",
    image: "/media/gallery/Gemini_Generated_Image_87htao87htao87ht.jfif",
    aspectRatio: "aspect-[16/9]",
    caption:
      "A daily selection of rustic sourdough loaves, cardamom knots, and seasonal tartlets.",
    story:
      "Made with wild sourdough starter nurtured in Fnideq since Alarak opened its doors.",
  },
  {
    id: "6",
    title: "Evening Glow at Alarak",
    category: "Interior & Vibe",
    categorySlug: "interior",
    image: "/media/gallery/Gemini_Generated_Image_vy6r50vy6r50vy6r.jfif",
    aspectRatio: "aspect-[3/4]",
    caption:
      "As dusk falls, ambient warm lighting transforms the cafe into an intimate evening retreat.",
    story:
      "Custom dimmable lighting and curated lounge acoustics create the perfect ambiance for evening conversations.",
  },
  {
    id: "7",
    title: "Cold Brew Infusion Tower",
    category: "Artisan Coffee",
    categorySlug: "coffee",
    image: "/media/gallery/Gemini_Generated_Image_h625j2h625j2h625.jfif",
    aspectRatio: "aspect-[1/1]",
    caption:
      "Slow 18-hour Dutch cold drip extraction producing smooth, low-acidity elixir with notes of plum.",
    story:
      "Extracted drop-by-drop over 18 hours to preserve volatile aromatic compounds without bitterness.",
  },
  {
    id: "8",
    title: "Pistachio Paris-Brest",
    category: "Fresh Bakery",
    categorySlug: "bakery",
    image: "/media/gallery/Gemini_Generated_Image_kcypslkcypslkcyp.jfif",
    aspectRatio: "aspect-[4/3]",
    caption:
      "Choux pastry ring filled with roasted Sicilian pistachio praline cream and dusted with icing sugar.",
    story:
      "Our signature homage to classical French patisserie elevated with premium Mediterranean ingredients.",
  },
  {
    id: "9",
    title: "Barista Grind Calibration",
    category: "Barista Craft",
    categorySlug: "craft",
    image: "/media/gallery/Gemini_Generated_Image_ktg882ktg882ktg8.jfif",
    aspectRatio: "aspect-[3/4]",
    caption:
      "Dialing in the espresso grind multiple times a day to adapt to humidity and temperature changes.",
    story:
      "Consistency is our obsessive standard. Humidity in Fnideq shifts daily, and our grind size adjusts in microns.",
  },
];
