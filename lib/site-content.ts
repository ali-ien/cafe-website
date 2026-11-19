import type { Language } from "./language";

export type LocalizedContent = Partial<Record<Language, string>>;
export interface ContentImage { image?: unknown; src?: string; alt?: LocalizedContent; position?: string; }
export interface ContentLink { source: string; slotId?: string; href?: string; newTab?: boolean; }
export interface ContentText { source: string; value?: LocalizedContent; }
export interface ContentRecord {
  _key?: string;
  [key: string]: unknown;
}
export interface PageContent {
  _id?: string;
  _type?: string;
  textEntries?: ContentText[];
  media?: (ContentImage & { source: string })[];
  links?: ContentLink[];
  menuCategories?: ContentRecord[];
  galleryItems?: ContentRecord[];
  credentials?: ContentRecord[];
  signatureCards?: ContentRecord[];
  storyPhotos?: ContentRecord[];
  navigationLinks?: ContentRecord[];
  exploreLinks?: ContentRecord[];
  legalLinks?: ContentRecord[];
  coffeeVariants?: string[];
  phoneDisplay?: string;
  phone?: string;
  email?: string;
  address?: LocalizedContent;
  openingHours?: LocalizedContent;
  instagramHandle?: string;
  instagramUrl?: string;
  whatsappUrl?: string;
  directionsUrl?: string;
  mapEmbedUrl?: string;
  menuPdf?: string;
  menuFileUrl?: string;
  seo?: {title?: LocalizedContent; description?: LocalizedContent};
}
export type ContentSection = "homePage" | "menuPage" | "storyPage" | "galleryPage" | "visitPage" | "navbar" | "footer" | "siteSettings";
export type SiteContent = Partial<Record<ContentSection, PageContent | null>>;
export const contentSections: ContentSection[] = ["homePage", "menuPage", "storyPage", "galleryPage", "visitPage", "navbar", "footer", "siteSettings"];

export function contentText(value: unknown, language: Language, fallback: string): string {
  if (typeof value === "string") return value.trim() ? value : fallback;
  if (!value || typeof value !== "object") return fallback;
  const translated = (value as LocalizedContent)[language];
  return typeof translated === "string" && translated.trim() ? translated : fallback;
}

export function contentHref(value: unknown, fallback: string): string {
  if (typeof value !== "string" || !value || /[\s\\\u0000-\u001f\u007f]/.test(value)) return fallback;
  if (/^#[A-Za-z][\w:.-]*$/.test(value)) return value;
  if (value.startsWith("/") && !value.startsWith("//") && !/%(?:5c|0[ad])/i.test(value)) return value;
  if (/^tel:\+?[\d()-]+$/.test(value)) return value;
  if (/^mailto:[^@?]+@[^@?]+\.[^@?]+(?:\?[^\r\n]*)?$/.test(value)) return value;
  try {
    const url = new URL(value);
    if (url.protocol === "https:" && !url.username && !url.password && url.hostname) return value;
  } catch { /* Keep the current website destination. */ }
  return fallback;
}

export function selectPublishedContent(documents: PageContent[]): SiteContent {
  const result: SiteContent = {};
  for (const section of contentSections) {
    const candidates = documents.filter(doc => doc && doc._type === section && !doc._id?.startsWith("drafts.") && !doc._id?.startsWith("versions."));
    result[section] = candidates.find(doc => doc._id === section) ?? candidates[0] ?? null;
  }
  return result;
}

export function resolveContentText(content: SiteContent, section: ContentSection, source: string, language: Language, fallback: string): string {
  source = typeof source === "string" ? source : "";
  fallback = typeof fallback === "string" ? fallback : "";
  const settings = content.siteSettings;
  const original = source.trim();
  if (settings) {
    if (/^(\+212\s?663|0663)/.test(source) && settings.phoneDisplay?.trim()) return settings.phoneDisplay;
    if (original === "bakeryservice@alarak.com" && settings.email?.trim()) return settings.email;
    if (original === "@alarak.ma" && settings.instagramHandle?.trim()) return settings.instagramHandle;
    if (source === "Immeuble Alia, 18, Fnideq 93100" && settings.address) return contentText(settings.address, language, fallback);
    if (/^07:00\s?(?:AM)?\s?-\s?(?:10:00 PM|22:00)$/.test(source) && settings.openingHours) return contentText(settings.openingHours, language, fallback);
  }
  const local = content[section]?.textEntries?.find(entry => entry?.source === source);
  const global = settings?.textEntries?.find(entry => entry?.source === source);
  return contentText(local?.value, language, contentText(global?.value, language, fallback));
}

export function resolveContentLink(content: SiteContent, section: ContentSection, source: string, slotId?: string): {href: string; newTab?: boolean} {
  const settings = content.siteSettings;
  let candidate: unknown;
  if (settings) {
    if (source.startsWith("tel:") && settings.phone) candidate = `tel:${settings.phone}`;
    else if (source.startsWith("mailto:") && settings.email) candidate = `mailto:${settings.email}${source.includes("?") ? source.slice(source.indexOf("?")) : ""}`;
    else if (source.startsWith("https://wa.me/")) candidate = settings.whatsappUrl;
    else if (source.startsWith("https://www.instagram.com/")) candidate = settings.instagramUrl;
    else if (source.startsWith("https://maps.app.goo.gl/")) candidate = settings.directionsUrl;
    else if (source === "/media/menu/alarak-menu.pdf") candidate = settings.menuFileUrl || settings.menuPdf;
  }
  const matches = (link: ContentLink) => link?.slotId ? link.slotId === slotId : link?.source === source;
  const entry = content[section]?.links?.find(matches) ?? settings?.links?.find(matches);
  return {href: contentHref(entry?.href, contentHref(candidate, source)), newTab: entry?.newTab};
}

export function mapEmbedUrl(content: SiteContent, fallback: string): string {
  const value = content.siteSettings?.mapEmbedUrl;
  if (!value) return fallback;
  try {
    const url = new URL(value);
    return url.protocol === "https:" && ["maps.google.com", "www.google.com", "www.google.co.ma"].includes(url.hostname) && url.pathname.startsWith("/maps") ? value : fallback;
  } catch { return fallback; }
}
