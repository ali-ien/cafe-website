"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Camera, ChevronLeft, ChevronRight, Clock3, MapPin, Maximize2, Sparkles, X } from "lucide-react";
import { galleryCategories, galleryItems, type GalleryItem } from "@/lib/gallery";
import { Container } from "@/components/ui";
import { useLanguage } from "@/lib/language";

function GalleryPhoto({ item, className = "", contain = false }: { item: GalleryItem; className?: string; contain?: boolean }) {
  const { t } = useLanguage();
  const [failed, setFailed] = useState(false);
  return (
    <div className={`relative overflow-hidden bg-[#121a29] ${className}`}>
      {failed ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[radial-gradient(ellipse_at_center,_rgba(197,160,89,0.12),_transparent_68%)] text-alarak-gold/70">
          <Camera className="h-8 w-8" strokeWidth={1} />
          <span className="font-sans text-[9px] uppercase tracking-[0.24em] text-alarak-cream/45">{t("Photo coming soon")}</span>
        </div>
      ) : (
        <Image src={item.image} alt={item.title} fill unoptimized sizes={contain ? "(max-width: 768px) 100vw, 60vw" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
          onError={() => setFailed(true)} className={contain ? "object-contain" : "object-cover"} />
      )}
    </div>
  );
}

export function GalleryExperience() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const filteredItems = activeCategory === "all" ? galleryItems : galleryItems.filter((item) => item.categorySlug === activeCategory);
  const activeItem = lightboxIndex === null ? null : filteredItems[lightboxIndex];

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const moveLightbox = useCallback((direction: -1 | 1) => {
    setLightboxIndex((current) => current === null ? null : (current + direction + filteredItems.length) % filteredItems.length);
  }, [filteredItems.length]);

  useEffect(() => {
    if (!activeItem) return;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowRight") moveLightbox(1);
      if (event.key === "ArrowLeft") moveLightbox(-1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = oldOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeItem, closeLightbox, moveLightbox]);

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0b1220] via-alarak-navy-dark to-alarak-navy-dark pb-14 pt-36 sm:pb-20 sm:pt-44">
        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/4 h-72 w-[min(80vw,700px)] -translate-x-1/2 rounded-full bg-alarak-gold/[0.06] blur-[100px]" />
        <Container size="narrow" className="relative text-center">
          <div className="mb-6 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-alarak-gold" />
            <span className="flex items-center gap-2 font-sans text-[10px] uppercase tracking-[0.28em] text-alarak-gold sm:text-xs"><Sparkles className="h-3.5 w-3.5" /> {t("Atmosphere & moments")}</span>
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-alarak-gold" />
          </div>
          <h1 className="font-serif text-5xl font-light tracking-[0.08em] text-alarak-cream sm:text-6xl lg:text-7xl">{t("Our Gallery")}</h1>
          <p className="mx-auto mt-6 max-w-2xl font-sans text-sm font-light leading-7 text-alarak-cream/60 sm:text-base">
            {t("A visual journey through artisanal craft, warm ambience, and specialty coffee in Fnideq. Every corner is made for slowing down and savoring the moment.")}
          </p>
          <div className="mt-9 flex items-center justify-center gap-2 text-alarak-gold/70" aria-hidden="true">
            <span className="h-1.5 w-1.5 rotate-45 border border-current" /><span className="h-2 w-2 rotate-45 bg-current" /><span className="h-1.5 w-1.5 rotate-45 border border-current" />
          </div>
        </Container>
      </section>

      <div className="sticky top-[76px] z-30 border-y border-white/[0.07] bg-alarak-navy-dark/90 py-3 backdrop-blur-xl sm:top-[88px] sm:py-4">
        <Container size="wide" className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex min-w-max items-center justify-center gap-2 sm:gap-3">
            {galleryCategories.map((category) => {
              const selected = activeCategory === category.value;
              return <button type="button" key={category.value} aria-pressed={selected}
                onClick={() => { setActiveCategory(category.value); setLightboxIndex(null); }}
                className={`rounded-full px-4 py-2 font-sans text-[9px] font-medium uppercase tracking-[0.16em] transition-colors sm:px-5 sm:text-[10px] ${selected ? "bg-alarak-gold text-alarak-navy-dark shadow-[0_0_18px_rgba(197,160,89,0.2)]" : "bg-white/[0.05] text-alarak-cream/55 hover:bg-white/10 hover:text-alarak-cream"}`}>
                {t(category.label)}
              </button>;
            })}
          </div>
        </Container>
      </div>

      <section className="min-h-[480px] py-12 sm:py-16" aria-label={t("Gallery photos")}>
        <Container size="wide">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
            {filteredItems.map((item, index) => (
              <button type="button" key={item.id} onClick={() => setLightboxIndex(index)} aria-label={`${t("View photo")}: ${t(item.title)}`}
                className="group relative overflow-hidden rounded-sm border border-white/[0.07] bg-[#101827] text-left transition duration-500 hover:-translate-y-1 hover:border-alarak-gold/50 hover:shadow-[0_18px_50px_rgba(0,0,0,0.3)]">
                <GalleryPhoto item={item} className="aspect-[4/3] w-full" />
                <span className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/15 to-transparent opacity-75 transition-opacity duration-300 group-hover:opacity-95" />
                <span className="pointer-events-none absolute inset-0 flex flex-col justify-between p-5 sm:p-6">
                  <span className="self-end rounded-full border border-alarak-gold/30 bg-black/50 px-3 py-1 text-[9px] uppercase tracking-[0.18em] text-alarak-gold opacity-0 backdrop-blur transition-all group-hover:opacity-100">{t(item.category)}</span>
                  <span>
                    <span className="block font-serif text-xl text-white transition-colors group-hover:text-alarak-gold sm:text-2xl">{t(item.title)}</span>
                    <span className="mt-2 block line-clamp-2 font-sans text-xs font-light leading-5 text-white/70">{t(item.caption)}</span>
                    <span className="mt-3 flex items-center gap-2 font-sans text-[9px] uppercase tracking-[0.2em] text-alarak-gold opacity-0 transition-opacity group-hover:opacity-100">{t("View photo")} <Maximize2 className="h-3 w-3" /></span>
                  </span>
                </span>
                <span className="pointer-events-none absolute left-3 top-3 h-4 w-4 border-l border-t border-transparent transition-colors group-hover:border-alarak-gold" />
                <span className="pointer-events-none absolute right-3 top-3 h-4 w-4 border-r border-t border-transparent transition-colors group-hover:border-alarak-gold" />
                <span className="pointer-events-none absolute bottom-3 left-3 h-4 w-4 border-b border-l border-transparent transition-colors group-hover:border-alarak-gold" />
                <span className="pointer-events-none absolute bottom-3 right-3 h-4 w-4 border-b border-r border-transparent transition-colors group-hover:border-alarak-gold" />
              </button>
            ))}
          </div>
        </Container>
      </section>

      {activeItem && lightboxIndex !== null && (
        <div role="dialog" aria-modal="true" aria-label={t(activeItem.title)}
          onMouseDown={(event) => { if (event.target === event.currentTarget) closeLightbox(); }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-3 backdrop-blur-xl sm:p-6">
          <button type="button" onClick={closeLightbox} aria-label={t("Close photo viewer")} className="absolute right-4 top-4 z-20 rounded-full p-3 text-white/60 transition hover:bg-white/10 hover:text-white sm:right-7 sm:top-7"><X className="h-6 w-6" /></button>
          <button type="button" onClick={() => moveLightbox(-1)} aria-label={t("Previous photo")} className="absolute left-1 top-1/2 z-20 -translate-y-1/2 rounded-full p-2 text-white/70 transition hover:bg-white/10 hover:text-alarak-gold sm:left-5 sm:p-3"><ChevronLeft className="h-7 w-7" /></button>
          <button type="button" onClick={() => moveLightbox(1)} aria-label={t("Next photo")} className="absolute right-1 top-1/2 z-20 -translate-y-1/2 rounded-full p-2 text-white/70 transition hover:bg-white/10 hover:text-alarak-gold sm:right-5 sm:p-3"><ChevronRight className="h-7 w-7" /></button>
          <div className="grid max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-md border border-white/10 bg-[#0d1421] md:grid-cols-[1.3fr_0.9fr]">
            <GalleryPhoto item={activeItem} contain className="min-h-[40vh] bg-black md:min-h-[70vh]" />
            <div className="flex min-h-0 flex-col justify-between overflow-y-auto p-6 sm:p-9">
              <div>
                <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-alarak-gold">{t(activeItem.category)}</span>
                  <span className="font-sans text-[10px] tracking-widest text-alarak-cream/40">{lightboxIndex + 1} / {filteredItems.length}</span>
                </div>
                <h2 className="font-serif text-3xl text-white sm:text-4xl">{t(activeItem.title)}</h2>
                <p className="mt-4 font-sans text-sm font-light leading-7 text-alarak-cream/65">{t(activeItem.caption)}</p>
                <div className="mt-6 border-l-2 border-alarak-gold bg-white/[0.04] p-4">
                  <h3 className="mb-2 font-sans text-[9px] uppercase tracking-[0.2em] text-alarak-gold">{t("The craft story")}</h3>
                  <p className="font-serif text-base italic leading-6 text-alarak-cream/55">{t(activeItem.story)}</p>
                </div>
              </div>
              <button type="button" onClick={closeLightbox} className="mt-6 self-end font-sans text-[9px] uppercase tracking-[0.2em] text-alarak-cream/55 transition hover:text-alarak-gold">{t("Close viewer")}</button>
            </div>
          </div>
        </div>
      )}

      <section className="border-y border-white/[0.06] bg-[#080d16] py-16 sm:py-20">
        <Container className="text-center">
          <span className="mb-4 inline-flex rounded-full bg-white/[0.05] p-3 text-alarak-gold"><Camera className="h-5 w-5" /></span>
          <h2 className="font-serif text-3xl text-alarak-cream sm:text-4xl">{t("Share your Alarak moments")}</h2>
          <p className="mx-auto mt-3 max-w-lg font-sans text-sm leading-6 text-alarak-cream/55">{t("Tag us at")} <span className="text-alarak-gold">@alarak.ma</span> {t("on Instagram to be featured in our community gallery.")}</p>
          <a href="https://www.instagram.com/alarak.ma?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw==" target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-2 border border-alarak-gold/70 px-6 py-3 font-sans text-[9px] uppercase tracking-[0.2em] text-alarak-gold transition hover:bg-alarak-gold hover:text-alarak-navy-dark">{t("Follow")} @alarak.ma <Camera className="h-3.5 w-3.5" /></a>
        </Container>
      </section>

      <section className="bg-[#faf7f2] py-14 text-alarak-navy-dark sm:py-16">
        <Container className="text-center">
          <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-alarak-gold">{t("Visit & taste")}</span>
          <h2 className="mt-3 font-serif text-3xl sm:text-5xl">{t("Experience Alarak in person")}</h2>
          <p className="mx-auto mt-5 max-w-2xl font-sans text-sm leading-7 text-alarak-navy-dark/70">{t("Find us in Fnideq for specialty coffee, freshly baked pastries, and a warm place to pause.")}</p>
          <div className="mt-7 flex flex-wrap justify-center gap-x-8 gap-y-3 font-sans text-[10px] font-medium uppercase tracking-[0.16em] text-alarak-navy-dark/70">
            <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-alarak-gold" /> {t("Immeuble Alia, 18, Fnideq 93100")}</span>
            <span className="flex items-center gap-2"><Clock3 className="h-4 w-4 text-alarak-gold" /> {t("Daily")}: {t("07:00 – 22:00")}</span>
          </div>
        </Container>
      </section>
    </>
  );
}

