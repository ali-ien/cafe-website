"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Container, GoldAccent, EditorialReveal } from "@/components/ui";

// ── Types ────────────────────────────────────────────────────────────────────
interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote: "Beautiful coffee, thoughtful pastries, and an atmosphere that makes you want to stay just a little longer.",
    author: "Guest Name",
    role: "Alarak Guest",
  },
  {
    quote: "Every visit feels like discovering a new favorite. The attention to detail here is simply unmatched.",
    author: "Guest Name",
    role: "Alarak Guest",
  },
  {
    quote: "A warm and inviting space where the quality of the coffee is only rivaled by the kindness of the staff.",
    author: "Guest Name",
    role: "Alarak Guest",
  },
];

export const GuestStories: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-rotate every 6 seconds
  useEffect(() => {
    if (shouldReduceMotion) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [shouldReduceMotion]);

  return (
    <section
      id="guest-stories"
      className="relative w-full bg-[#F4EFEA]" // Soft warm background as requested
      aria-labelledby="guest-stories-heading"
    >
      <Container size="wide" className="py-20 sm:py-28 lg:py-36">
        
        <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-20 xl:gap-28">
          
          {/* ── LEFT VISUAL (45%) ─────────────────────────────────────────── */}
          <div className="w-full lg:w-[45%]">
            <EditorialReveal delay={0}>
              <div className="relative w-full overflow-hidden rounded-[2px]" style={{ aspectRatio: "4 / 5" }}>
                <Image
                  // Using hero 1: Artisan hands preparing croissants - highly human & hospitable
                  src="/media/hero/alarak-hero 1.png"
                  alt="Alarak hospitality and fresh bakery preparation"
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  quality={90}
                  className="object-cover"
                  style={{ objectPosition: "45% center" }}
                />
              </div>
            </EditorialReveal>
          </div>

          {/* ── RIGHT CONTENT (55%) ───────────────────────────────────────── */}
          <div className="w-full lg:w-[55%] flex flex-col justify-center">
            
            <EditorialReveal delay={0.1}>
              <div className="flex items-center gap-3 mb-8 lg:mb-12">
                <GoldAccent variant="line" width="w-6" />
                <h2
                  id="guest-stories-heading"
                  className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.3em] text-alarak-gold font-medium"
                >
                  Guest Stories
                </h2>
                <span className="font-arabic text-sm text-alarak-charcoal/40 border-l border-alarak-gold/20 pl-3" dir="rtl" lang="ar">
                  آراء ضيوفنا
                </span>
              </div>
            </EditorialReveal>

            {/* Carousel Container — Grid stack prevents fixed heights while allowing absolute-like crossfading */}
            <EditorialReveal delay={0.2}>
              <div className="grid">
                {TESTIMONIALS.map((testimonial, i) => (
                  <div
                    key={i}
                    className={`col-start-1 row-start-1 flex flex-col transition-opacity duration-1000 ease-in-out ${
                      i === activeIndex ? "opacity-100 z-10 pointer-events-auto" : "opacity-0 z-0 pointer-events-none"
                    }`}
                    aria-hidden={i !== activeIndex}
                  >
                    {/* Subtle opening quote mark (visual only) */}
                    <span className="font-serif text-alarak-gold/40 text-6xl leading-none -ml-2 mb-2" aria-hidden="true">
                      &ldquo;
                    </span>
                    
                    {/* Large Quote */}
                    <p className="font-serif text-[28px] sm:text-[34px] lg:text-[40px] font-normal tracking-tight leading-[1.25] text-alarak-navy-dark max-w-2xl">
                      {testimonial.quote}
                    </p>

                    {/* Author Area */}
                    <div className="mt-8 sm:mt-10 lg:mt-12">
                      <div className="w-8 h-px bg-alarak-gold/40 mb-5" />
                      <p className="font-sans text-[14px] sm:text-[15px] font-medium text-alarak-navy-dark tracking-wide">
                        {testimonial.author}
                      </p>
                      <p className="font-sans text-[12px] sm:text-[13px] font-light text-alarak-charcoal/50 tracking-wider uppercase mt-1">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </EditorialReveal>

            {/* Navigation Dots */}
            <EditorialReveal delay={0.3}>
              <div className="flex items-center gap-4 mt-12 lg:mt-16">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    aria-label={`Go to guest story ${i + 1}`}
                    className="group py-2 focus-ring"
                  >
                    <div
                      className={`w-[5px] h-[5px] rounded-full transition-all duration-500 ${
                        i === activeIndex
                          ? "bg-alarak-gold scale-125"
                          : "bg-alarak-charcoal/20 group-hover:bg-alarak-gold/50"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </EditorialReveal>

          </div>
        </div>
      </Container>
    </section>
  );
};
