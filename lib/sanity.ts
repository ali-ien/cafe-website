import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";
import type { HeroDocument } from "./hero-content";

// Public browser client: never add tokens or private environment variables here.
export const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "z12n5wz6",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-11-15",
};

export const client = createClient({
  ...sanityConfig,
  useCdn: false,
  perspective: "published",
  timeout: 6000,
  maxRetries: 0,
  withCredentials: false,
});

export const imageBuilder = createImageUrlBuilder(sanityConfig);

// Prefer the Studio singleton; keep existing documents readable without migrating data.
export const homePageQuery = `coalesce(
  *[_type == "homePage" && _id == "homePage"][0],
  *[_type == "homePage"] | order(_updatedAt desc)[0]
){
  _id, heroImage,
  heroTitle{firstLine, highlight, secondLine}, heroDescription,
  heroSlides[]{_key, image, alt, chapter, desktopPosition, mobilePosition},
  primaryButton{label, href, newTab}, secondaryButton{label, href, newTab}
}`;

type SanityImage = Parameters<typeof imageBuilder.image>[0];
type RawSlide = NonNullable<HeroDocument["heroSlides"]>[number] & { image?: SanityImage };
type RawDocument = Omit<HeroDocument, "heroSlides"> & { heroImage?: SanityImage; heroSlides?: Array<RawSlide | null> };

export function normalizeHero(document: RawDocument | null): HeroDocument | null {
  if (!document) return null;
  const sourceSlides = Array.isArray(document.heroSlides) && document.heroSlides.length
    ? document.heroSlides : document.heroImage ? [{ _key: "legacy", image: document.heroImage }] : [];
  const heroSlides = sourceSlides.flatMap(slide => {
    if (!slide?.image) return [];
    const { image, ...fields } = slide;
    try {
      const src = imageBuilder.image(image).width(2400).auto("format").url();
      const hotspot = (image as { hotspot?: { x?: number; y?: number } }).hotspot;
      const position = typeof hotspot?.x === "number" && typeof hotspot?.y === "number"
        ? `${Math.round(hotspot.x * 100)}% ${Math.round(hotspot.y * 100)}%` : undefined;
      return [{ ...fields, src, desktopPosition: fields.desktopPosition || position,
        mobilePosition: fields.mobilePosition || fields.desktopPosition || position }];
    } catch { return []; }
  });
  return {
    _id: document._id,
    heroTitle: document.heroTitle, heroDescription: document.heroDescription, heroSlides,
    primaryButton: document.primaryButton, secondaryButton: document.secondaryButton,
  };
}

// Called after hydration and on refresh, never during the static build.
export async function fetchHero(signal?: AbortSignal): Promise<HeroDocument | null> {
  const document = await client.fetch<RawDocument | null>(homePageQuery, {}, { signal, cache: "no-store" });
  return normalizeHero(document);
}
