"use client";

import { withCmsSection, CmsText, CmsAnchor, CmsImage as Image, useCmsLanguage as useLanguage } from "@/lib/cms";

import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button, Container } from "@/components/ui";
import { mediaAssets } from "@/lib/media";
import { cn } from "@/lib/utils";

import { resolveHero, type HeroDocument } from "@/lib/hero-content";
import { fetchHero } from "@/lib/sanity";

// ─── Slide dot indicator ────────────────────────────────────────────────────
const SlideDot: React.FC<{ active: boolean; onClick: () => void; index: number }> = ({
  active,
  onClick,
  index,
}) => (
  <button
    aria-label={`Go to slide ${index + 1}`}
    onClick={onClick}
    className={cn(
      "transition-all duration-500 rounded-full focus:outline-none",
      active
        ? "w-6 h-1.5 bg-alarak-gold shadow-[0_0_8px_rgba(212,175,55,0.7)]"
        : "w-1.5 h-1.5 bg-alarak-cream/40 hover:bg-alarak-gold/60"
    )}
  />
);

// ─── Main Hero ───────────────────────────────────────────────────────────────
const HeroContent: React.FC = () => {
  const { t, language } = useLanguage();
  const [cmsHero, setCmsHero] = useState<HeroDocument | null>(null);

  useEffect(() => {
    let active = true;
    let controller: AbortController | null = null;
    const refresh = () => {
      if (document.visibilityState === "hidden" || controller) return;
      const request = new AbortController();
      controller = request;
      fetchHero(request.signal)
        .then(data => { if (active && !request.signal.aborted) setCmsHero(data); })
        .catch(() => { /* Keep the last good CMS content or the original Hero. */ })
        .finally(() => { if (controller === request) controller = null; });
    };
    refresh();
    const timer = window.setInterval(refresh, 60_000);
    window.addEventListener("focus", refresh);
    document.addEventListener("visibilitychange", refresh);
    return () => {
      active = false;
      controller?.abort();
      window.clearInterval(timer);
      window.removeEventListener("focus", refresh);
      document.removeEventListener("visibilitychange", refresh);
    };
  }, []);

  const content = useMemo(() => resolveHero(cmsHero, language, t, mediaAssets.hero.slides), [cmsHero, language, t]);
  const slides = content.slides;
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [prevSlideIndex, setPrevSlideIndex] = useState<number | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const shouldReduceMotion = useReducedMotion();

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Go to slide — always smooth crossfade
  const goToSlide = useCallback(
    (nextIndex: number) => {
      if (nextIndex === currentSlideIndex || transitioning) return;
      setTransitioning(true);
      setPrevSlideIndex(currentSlideIndex);
      setCurrentSlideIndex(nextIndex);
      setTimeout(() => {
        setPrevSlideIndex(null);
        setTransitioning(false);
      }, shouldReduceMotion ? 0 : 1800);
    },
    [currentSlideIndex, transitioning, shouldReduceMotion]
  );

  // Keep the hero moving on its own; reduced-motion preferences disable the fade, not autoplay.
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentSlideIndex((prev) => {
        const next = (prev + 1) % slides.length;
        setPrevSlideIndex(prev);
        setTransitioning(true);
        setTimeout(() => {
          setPrevSlideIndex(null);
          setTransitioning(false);
        }, shouldReduceMotion ? 0 : 1800);
        return next;
      });
    }, 6000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [shouldReduceMotion, slides.length]);

  // CMS data can arrive while the four-slide fallback carousel is already moving.
  const visibleIndex = currentSlideIndex % slides.length;
  const currentSlide = slides[visibleIndex];

  return (
    <section
      className="relative w-full h-screen min-h-[600px] max-h-[1000px] overflow-hidden flex flex-col"
      aria-label={t("Hero Section")}
    >
      {/* ====================================================================
          LAYER 1 — IMAGE CAROUSEL (absolute stacking, pure crossfade)
      ==================================================================== */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {slides.map((slide, idx) => {
          const isCurrent = idx === visibleIndex;
          const isPrev = idx === prevSlideIndex;
          const isVisible = isCurrent || isPrev;

          return (
            <div
              key={slide.id}
              className="absolute inset-0 w-full h-full"
              style={{
                zIndex: isCurrent ? 2 : isPrev ? 1 : 0,
                visibility: isVisible ? "visible" : "hidden",
              }}
            >
              {/* Background image — never shifts position between slides */}
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={idx === 0}
                sizes="100vw"
                quality={90}
                className="object-cover"
                style={{
                  objectPosition: isMobile
                    ? slide.mobileFocalPosition
                    : slide.focalPosition,
                }}
              />

              {/* Per-slide left-to-right text protection gradient */}
              <div
                className={cn(
                  "absolute inset-0 bg-gradient-to-r pointer-events-none",
                  slide.overlayGradient
                )}
              />

              {/* Top vignette — protects navbar readability */}
              <div className="absolute inset-x-0 top-0 h-52 bg-gradient-to-b from-black/50 via-black/18 to-transparent pointer-events-none" />

              {/* Bottom soft fade */}
              <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/25 to-transparent pointer-events-none" />

              {/* Crossfade mask — overlays each slide with dark bg, fades in/out */}
              <motion.div
                className="absolute inset-0"
                style={{ backgroundColor: "#0d0906" }}
                initial={{ opacity: idx === 0 ? 0 : 1 }}
                animate={{ opacity: isCurrent ? 0 : 1 }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 1.5,
                  ease: [0.4, 0, 0.2, 1],
                }}
              />
            </div>
          );
        })}
      </div>

      {/* ====================================================================
          LAYER 2 — STATIC FOREGROUND CONTENT
      ==================================================================== */}
      <div className="relative z-10 flex flex-col h-full">
        <Container
          size="wide"
          className="flex flex-col justify-center flex-1 pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-20"
        >
          <div className="max-w-[560px] lg:max-w-[620px] space-y-5 sm:space-y-6">

            {/* Eyebrow row: brand name + Arabic chapter (Arabic fades per slide) */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.3, ease: "easeOut" }}
              className="flex flex-wrap items-center gap-3"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-px bg-alarak-gold flex-shrink-0" />
                <span className="font-sans text-[10px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-alarak-gold"><CmsText value={"ALARAK COFFEE & BAKERY"} /></span>
              </div>
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentSlide.chapter}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="font-arabic text-xs sm:text-sm text-alarak-gold/80 border-l border-alarak-gold/30 pl-3"
                >
                  {currentSlide.chapter}
                </motion.span>
              </AnimatePresence>
            </motion.div>

            {/* Editorial headline — no overflow-hidden; opacity+small-y only to prevent clipping */}
            <div className="space-y-0 sm:space-y-0.5">
              <motion.h1
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif text-[44px] sm:text-[64px] md:text-[76px] lg:text-[86px] font-normal tracking-tight leading-[1.05] text-alarak-cream drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)]"
              >
                {content.firstLine}{" "}
                <span className="text-alarak-gold italic font-light">
                  {content.highlight}
                </span>
              </motion.h1>
              <motion.h1
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.56, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif text-[44px] sm:text-[64px] md:text-[76px] lg:text-[86px] font-normal tracking-tight leading-[1.05] text-alarak-cream drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)]"
              >
                {content.secondLine}
              </motion.h1>
            </div>

            {/* Supporting paragraph — static */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.7, ease: "easeOut" }}
              className="font-sans text-sm sm:text-base md:text-[17px] text-alarak-cream/85 font-light leading-relaxed max-w-[340px] sm:max-w-[400px] drop-shadow-[0_1px_6px_rgba(0,0,0,0.5)]"
            >
              {content.description}
            </motion.p>

            {/* CTAs — static */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.85, ease: "easeOut" }}
              className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1"
            >
              <CmsAnchor
                href={content.primaryButton.href}
                target={content.primaryButton.newTab ? "_blank" : undefined}
                rel={content.primaryButton.newTab ? "noopener noreferrer" : undefined}
                aria-label={content.primaryButton.label}
                className="inline-flex items-center justify-center gap-2.5 rounded-sm font-sans font-medium uppercase tracking-widest focus-ring select-none px-8 py-4 text-sm relative overflow-hidden group bg-alarak-gold hover:bg-alarak-gold-light text-alarak-navy-dark shadow-[0_6px_20px_rgba(212,175,55,0.28)] hover:shadow-[0_10px_28px_rgba(212,175,55,0.45)] hover:-translate-y-[2px] transition-all duration-300 sm:text-base"
              >
                <span className="relative z-10">{content.primaryButton.label}</span>
                <span className="relative z-10 shrink-0">
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/22 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
              </CmsAnchor>

              <Button
                variant="outline"
                size="lg"
                className="border-alarak-cream/35 text-alarak-cream hover:border-alarak-gold hover:text-alarak-gold hover:-translate-y-[2px] bg-transparent backdrop-blur-sm transition-all duration-300 text-sm sm:text-base"
                onClick={() => {
                  const { href, newTab } = content.secondaryButton;
                  if (newTab) window.open(href, "_blank", "noopener,noreferrer");
                  else if (href.startsWith("#")) document.getElementById(href.slice(1))?.scrollIntoView({ behavior: shouldReduceMotion ? "instant" : "smooth" });
                  else window.location.assign(href);
                }}
              >
                {content.secondaryButton.label}
              </Button>
            </motion.div>

            {/* Brand accent line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.85, delay: 1.0, ease: "easeInOut" }}
              className="h-px w-16 bg-gradient-to-r from-alarak-gold via-alarak-gold/70 to-transparent origin-left"
            />
          </div>
        </Container>

        {/* Slide dot navigation — bottom center */}
        <div className="absolute bottom-7 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
          {slides.map((slide, idx) => (
            <SlideDot
              key={slide.id}
              index={idx}
              active={idx === visibleIndex}
              onClick={() => goToSlide(idx)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export const Hero = withCmsSection("homePage", HeroContent);
