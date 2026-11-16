import type { HeroSlide } from "./media";

export type HeroLanguage = "en" | "es" | "ar";
type Localized = Partial<Record<HeroLanguage, string>>;
type HeroButton = { label?: Localized; href?: string; newTab?: boolean };
export interface HeroDocument {
  _id?: string;
  heroTitle?: { firstLine?: Localized; highlight?: Localized; secondLine?: Localized };
  heroDescription?: Localized;
  heroSlides?: Array<{
    _key?: string;
    src?: string;
    alt?: Localized;
    chapter?: Localized;
    desktopPosition?: string;
    mobilePosition?: string;
  }>;
  primaryButton?: HeroButton;
  secondaryButton?: HeroButton;
}

const text = (value: unknown) => typeof value === "string" ? value.trim() : "";

export function localized(value: Localized | undefined, language: HeroLanguage, fallback: string) {
  // Missing Spanish/Arabic fields keep the existing translated website text.
  return text(value?.[language]) || fallback;
}

export function safeHref(value: unknown, fallback: string): string {
  const href = text(value);
  if (!href || /[\s\\\u0000-\u001f\u007f]/.test(href)) return fallback;
  if (/^#[A-Za-z][\w:.-]*$/.test(href)) return href;
  if (href.startsWith("/") && !href.startsWith("//") && !/%(?:5c|0[ad])/i.test(href)) return href;
  try {
    const url = new URL(href);
    if (url.protocol === "https:" && url.hostname && !url.username && !url.password) return href;
  } catch { /* Use the original destination for incomplete editor input. */ }
  return fallback;
}

export function resolveHero(
  document: HeroDocument | null,
  language: HeroLanguage,
  t: (value: string) => string,
  defaults: HeroSlide[],
) {
  const title = document?.heroTitle;
  const button = (value: HeroButton | undefined, label: string, href: string, newTab: boolean) => ({
    label: localized(value?.label, language, t(label)),
    href: safeHref(value?.href, href),
    newTab: typeof value?.newTab === "boolean" ? value.newTab : newTab,
  });
  const slides = (Array.isArray(document?.heroSlides) ? document.heroSlides : []).flatMap((slide, index) => {
    if (!slide || typeof slide.src !== "string" || !slide.src.startsWith("https://cdn.sanity.io/images/")) return [];
    const base = defaults[index % defaults.length];
    return [{
      ...base,
      id: slide._key || `cms-${index}`,
      src: slide.src,
      alt: localized(slide.alt, language, t(base.alt)),
      chapter: localized(slide.chapter, language, t(base.chapter)),
      focalPosition: text(slide.desktopPosition) || base.focalPosition,
      mobileFocalPosition: text(slide.mobilePosition) || text(slide.desktopPosition) || base.mobileFocalPosition,
    }];
  });
  return {
    // Only the multilingual Hero fields may replace the original translated copy.
    // Old published title/description values are intentionally ignored.
    firstLine: localized(title?.firstLine, language, t("Where")),
    highlight: localized(title?.highlight, language, t("Elegance")),
    secondLine: localized(title?.secondLine, language, t("Meets Flavor")),
    description: localized(document?.heroDescription, language,
      t("Artisan pastries, specialty coffee, and moments worth savoring.")),
    slides: slides.length ? slides : defaults.map(slide => ({ ...slide, alt: t(slide.alt), chapter: t(slide.chapter) })),
    primaryButton: button(document?.primaryButton, "Discover Our Menu", "/media/menu/alarak-menu.pdf", true),
    secondaryButton: button(document?.secondaryButton, "Visit Us", "#story", false),
  };
}
