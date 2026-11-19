"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { SiteContentContext } from "./cms-context";
import { useLanguage } from "./language";
import { contentText, type ContentSection, type SiteContent } from "./site-content";
import { fetchSiteContent } from "./sanity";

export function SiteContentProvider({children}: {children: React.ReactNode}) {
  const [content, setContent] = useState<SiteContent>({});
  const pathname = usePathname();
  const {language} = useLanguage();
  const metadataFallback = useRef(new Map<string, {title: string; description: string}>());
  useEffect(() => {
    let active = true;
    let request: AbortController | null = null;
    const refresh = () => {
      if (document.visibilityState === "hidden" || request) return;
      const controller = new AbortController();
      request = controller;
      fetchSiteContent(controller.signal).then(next => {if (active) setContent(next);})
        .catch(() => { /* Retain the last published snapshot or the original content. */ })
        .finally(() => {if (request === controller) request = null;});
    };
    refresh();
    const timer = window.setInterval(refresh, 60_000);
    window.addEventListener("focus", refresh);
    document.addEventListener("visibilitychange", refresh);
    return () => {active = false; request?.abort(); window.clearInterval(timer); window.removeEventListener("focus", refresh); document.removeEventListener("visibilitychange", refresh);};
  }, []);
  useEffect(() => {
    const section: ContentSection = pathname?.startsWith("/menu") ? "menuPage" : pathname?.startsWith("/gallery") ? "galleryPage" : pathname?.startsWith("/our-story") ? "storyPage" : pathname?.startsWith("/visit") ? "visitPage" : "homePage";
    const seo = content[section]?.seo;
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const key = pathname || "/";
    if (!metadataFallback.current.has(key)) metadataFallback.current.set(key, {title: document.title, description: meta?.content || ""});
    const fallback = metadataFallback.current.get(key)!;
    document.title = contentText(seo?.title, language, fallback.title);
    if (meta) meta.content = contentText(seo?.description, language, fallback.description);
  }, [content, pathname, language]);
  return <SiteContentContext.Provider value={content}>{children}</SiteContentContext.Provider>;
}
