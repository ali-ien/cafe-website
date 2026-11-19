"use client";

import React, { useCallback, useMemo } from "react";
import NextImage, { type ImageProps } from "next/image";
import NextLink from "next/link";
import { useLanguage, type Language } from "./language";
import { ContentSectionContext, useContentSection, useSiteContent } from "./cms-context";
import { contentHref, contentText, resolveContentLink, resolveContentText, type ContentRecord, type ContentSection, type PageContent } from "./site-content";
import { imageBuilder } from "./sanity";

export function withCmsSection<P extends object>(section: ContentSection, Component: React.ComponentType<P>) {
  function ScopedComponent(props: P) {
    return <ContentSectionContext.Provider value={section}><Component {...props} /></ContentSectionContext.Provider>;
  }
  ScopedComponent.displayName = `CMS(${Component.displayName || Component.name || section})`;
  return ScopedComponent;
}

export function useCmsLanguage() {
  const languageContext = useLanguage();
  const content = useSiteContent();
  const section = useContentSection();
  const t = useCallback((source: string) => resolveContentText(content, section, source, languageContext.language, languageContext.t(source)), [content, section, languageContext]);
  return useMemo(() => ({...languageContext, t}), [languageContext, t]);
}

export function CmsText({value}: {value: string}) {
  const content = useSiteContent();
  const section = useContentSection();
  const {language} = useLanguage();
  const resolved = resolveContentText(content, section, value, language, value);
  return resolved === value ? value : `${value.match(/^\s*/)?.[0] || ""}${resolved.trim()}${value.match(/\s*$/)?.[0] || ""}`;
}

export function cmsImageUrl(value: unknown, fallback: string): string {
  if (!value) return fallback;
  if (typeof value === "string") return value.startsWith("/media/") || value.startsWith("https://cdn.sanity.io/images/") ? value : fallback;
  try { return imageBuilder.image(value as Parameters<typeof imageBuilder.image>[0]).width(2400).auto("format").url(); }
  catch { return fallback; }
}

export function CmsImage(props: ImageProps) {
  const content = useSiteContent();
  const section = useContentSection();
  const {language} = useLanguage();
  const source = typeof props.src === "string" ? props.src : "";
  const local = content[section]?.media?.find(item => item?.source === source);
  const global = content.siteSettings?.media?.find(item => item?.source === source);
  const page = content[section];
  const shared = [page?.storyPhotos, page?.signatureCards, page?.credentials, page?.menuCategories, page?.galleryItems].flatMap(items => items || []).find(item => item?.fallbackImage === source);
  const entry = local?.image || local?.src ? local : global ?? local;
  const src = cmsImageUrl(local?.image || local?.src || shared?.image || shared?.src || global?.image || global?.src, source);
  return <NextImage {...props} src={source ? src : props.src} alt={contentText(local?.alt || shared?.alt || shared?.imageAlt || global?.alt, language, props.alt)} style={entry?.position ? {...props.style, objectPosition: entry.position} : props.style} />;
}

export const CmsAnchor = React.forwardRef<HTMLAnchorElement, React.ComponentProps<"a"> & {cmsKey?: string}>(({cmsKey, ...props}, ref) => {
  const content = useSiteContent();
  const section = useContentSection();
  const link = resolveContentLink(content, section, props.href || "", cmsKey);
  const target = link.newTab === undefined ? props.target : link.newTab ? "_blank" : undefined;
  return <a {...props} ref={ref} href={link.href} target={target} rel={target === "_blank" ? "noopener noreferrer" : props.rel} />;
});
CmsAnchor.displayName = "CmsAnchor";

export const CmsLink = React.forwardRef<HTMLAnchorElement, React.ComponentProps<typeof NextLink>>((props, ref) => {
  const content = useSiteContent();
  const section = useContentSection();
  const link = typeof props.href === "string" ? resolveContentLink(content, section, props.href) : null;
  const target = link?.newTab === undefined ? props.target : link.newTab ? "_blank" : undefined;
  return <NextLink {...props} ref={ref} href={link?.href ?? props.href} target={target} rel={target === "_blank" ? "noopener noreferrer" : props.rel} />;
});
CmsLink.displayName = "CmsLink";

// Undefined collections retain the entire original list. An explicit [] means delete all.
export function useCmsCollection<T extends object>(field: keyof PageContent, fallback: readonly T[]): T[] {
  const content = useSiteContent();
  const section = useContentSection();
  const {language} = useLanguage();
  return useMemo(() => resolveCollection(field, content[section]?.[field], fallback, language), [content, section, field, fallback, language]);
}

export function resolveCollection<T extends object>(field: keyof PageContent, records: unknown, fallback: readonly T[], language: Language): T[] {
    if (!Array.isArray(records)) return fallback.slice();
    return records.filter(record => record && typeof record === "object").map(record => {
      const raw = record as ContentRecord;
      const originalIndex = typeof raw.fallbackIndex === "number" && Number.isInteger(raw.fallbackIndex) && raw.fallbackIndex >= 0 ? raw.fallbackIndex : -1;
      const base = (raw.id ? fallback.find(item => "id" in item && item.id === raw.id) || {} : fallback[originalIndex] || {}) as Record<string, unknown>;
      const merge = (value: unknown, original: unknown): unknown => {
        if (Array.isArray(value)) return value.map(item => {
          const fallbackIndex = item && typeof item === "object" ? (item as ContentRecord).fallbackIndex : undefined;
          return merge(item, Array.isArray(original) && typeof fallbackIndex === "number" ? original[fallbackIndex] : {});
        });
        if (value && typeof value === "object") {
          if (["en", "es", "ar"].some(lang => lang in value)) return contentText(value, language, typeof original === "string" ? original : contentText(value, "en", ""));
          if ("asset" in value) return cmsImageUrl(value, typeof original === "string" ? original : "");
          const old = original && typeof original === "object" ? original as Record<string, unknown> : {};
          return Object.fromEntries([...Object.entries(old), ...Object.entries(value).filter(([key]) => !["_key", "_type"].includes(key)).map(([key, child]) => [key, merge(child, old[key])])]);
        }
        return value;
      };
      const result = merge(raw, base) as Record<string, unknown>;
      if (typeof raw.fallbackImage === "string" || raw.image || raw.src) {
        const fallbackImage = typeof raw.fallbackImage === "string" ? raw.fallbackImage : "";
        if (field === "menuCategories") result.image = {src: cmsImageUrl(raw.image, fallbackImage || String((base.image as {src?: string})?.src || "")), alt: contentText(raw.imageAlt, language, String((base.image as {alt?: string})?.alt || ""))};
        else if (["signatureCards", "storyPhotos"].includes(field)) result.src = cmsImageUrl(raw.src || raw.image, fallbackImage || String(base.src || ""));
        else if (["galleryItems", "credentials"].includes(field)) result.image = cmsImageUrl(raw.image, fallbackImage || String(base.image || ""));
      }
      if (typeof result.href === "string") result.href = contentHref(result.href, String(base.href || "/"));
      if (field === "menuCategories") {if (!Array.isArray(result.items)) result.items = []; result.layout ||= "image-left";}
      if (field === "signatureCards") {
        result.sizes ||= "(max-width: 768px) 100vw, 33vw";
        result.ratio ||= "4 / 3";
        result.objectPosition ||= "50% 50%";
        result.href ||= "/menu";
        result.description ||= "";
        result.category ||= "";
        result.alt ||= result.title || "";
      }
      if (field === "galleryItems") {
        result.caption ||= ""; result.story ||= "";
        if (!raw.category) result.category = ({coffee: "Artisan Coffee", bakery: "Fresh Bakery", interior: "Interior & Vibe", craft: "Barista Craft"} as Record<string, string>)[String(result.categorySlug)] || "";
      }
      if (field === "credentials") result.imageAlt ||= result.title || "";
      if (!result.id && raw._key) result.id = raw._key;
      return result as T;
    });
}
