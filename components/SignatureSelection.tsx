"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container, GoldAccent, EditorialReveal } from "@/components/ui";

// ── Types ────────────────────────────────────────────────────────────────────
interface Chapter {
  number: string;
  category: string;
  title: string;
  description: string;
  src: string;
  alt: string;
  sizes: string;
  objectPosition: string;
  ratio: string;
  href: string;
}

// ── 3 Equal Chapters ─────────────────────────────────────────────────────────
const CHAPTERS: Chapter[] = [
  {
    number: "01",
    category: "Bakery",
    title: "Freshly Baked",
    description: "Golden layers and flaky pastries, baked fresh in-house every morning.",
    src: "/media/cakes/Gemini_Generated_Image_fbde1bfbde1bfbde.jfif",
    alt: "Alarak Freshly Baked Pastry",
    sizes: "(max-width: 768px) 100vw, 33vw",
    objectPosition: "50% 50%",
    ratio: "4 / 3",
    href: "/menu",
  },
  {
    number: "02",
    category: "Pastry",
    title: "Signature Pastries",
    description: "Made slowly. Finished with intention. An elegant touch to your day.",
    src: "/media/cakes/Gemini_Generated_Image_h0pn95h0pn95h0pn (1).jfif",
    alt: "Alarak Signature Pastry",
    sizes: "(max-width: 768px) 100vw, 33vw",
    objectPosition: "50% 50%",
    ratio: "4 / 3",
    href: "/menu",
  },
  {
    number: "03",
    category: "Desserts",
    title: "Fine Desserts",
    description: "A final touch worth staying for — beautiful, seasonal, made with care.",
    src: "/media/cakes/Gemini_Generated_Image_jag1k2jag1k2jag1.jfif",
    alt: "Alarak Fine Dessert",
    sizes: "(max-width: 768px) 100vw, 33vw",
    objectPosition: "50% 50%",
    ratio: "4 / 3",
    href: "/menu",
  }
];

// ── Components ───────────────────────────────────────────────────────────────
const ChapterCard: React.FC<{ chapter: Chapter; delay: number }> = ({ chapter, delay }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 1.0, delay, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col"
    >
      <p
        aria-hidden="true"
        className="font-sans text-[10px] tracking-[0.35em] text-alarak-charcoal/35 font-medium uppercase mb-3"
      >
        {chapter.number}
      </p>

      <Link href={chapter.href} aria-label={`Explore our ${chapter.category}`} className="block focus-ring rounded-[2px]" tabIndex={0}>
        <div
          className="relative w-full overflow-hidden rounded-[2px]"
          style={{ aspectRatio: chapter.ratio }}
        >
          <Image
            src={chapter.src}
            alt={chapter.alt}
            fill
            sizes={chapter.sizes}
            quality={90}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            style={{ objectPosition: chapter.objectPosition }}
          />
        </div>
      </Link>

      <div className="mt-5 space-y-1.5">
        <p className="font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-alarak-gold font-medium">
          {chapter.category}
        </p>
        <h3 className="font-serif text-[22px] sm:text-[26px] font-normal tracking-tight leading-[1.18] text-alarak-navy-dark">
          {chapter.title}
        </h3>
        <p className="font-sans text-[13.5px] sm:text-[14.5px] text-[#3d3228]/70 font-light leading-[1.72] pt-0.5">
          {chapter.description}
        </p>
        <div className="pt-2">
          <Link
            href={chapter.href}
            className="inline-flex items-center gap-1.5 font-sans text-[10px] uppercase tracking-[0.26em] text-alarak-charcoal/40 hover:text-alarak-gold transition-colors duration-300 group/link"
            aria-label={`Explore ${chapter.category}`}
          >
            <span>Explore</span>
            <ArrowRight className="w-2.5 h-2.5 transition-transform duration-300 group-hover/link:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
};

// ── Main Section ──────────────────────────────────────────────────────────────
export const SignatureSelection: React.FC = () => {
  return (
    <section
      id="signature"
      className="relative w-full bg-[#FAF6F0]"
      aria-labelledby="signature-heading"
    >
      <Container size="wide" className="pt-6 sm:pt-8 pb-12 sm:pb-16 lg:pb-24">

        {/* Intro */}
        <div className="mb-12 sm:mb-16 lg:mb-20">
          <EditorialReveal delay={0}>
            <div className="flex items-center gap-3 mb-5">
              <GoldAccent variant="line" width="w-6" />
              <span className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.3em] text-alarak-gold font-medium">
                Signature Selection
              </span>
              <span className="font-arabic text-sm text-alarak-charcoal/40 border-l border-alarak-gold/20 pl-3" dir="rtl" lang="ar">
                اختياراتنا
              </span>
            </div>
          </EditorialReveal>
          <EditorialReveal delay={0.1}>
            <h2 id="signature-heading" className="font-serif text-[36px] sm:text-[46px] lg:text-[54px] font-normal tracking-tight leading-[1.1] text-alarak-navy-dark">
              Made to Be <span className="italic font-light text-alarak-gold">Savored.</span>
            </h2>
          </EditorialReveal>
          <EditorialReveal delay={0.18}>
            <p className="mt-4 font-sans text-[15px] sm:text-base text-[#3d3228]/65 font-light leading-[1.78] max-w-lg">
              From carefully crafted coffee to freshly baked creations, every detail is made to turn an everyday moment into something memorable.
            </p>
          </EditorialReveal>
        </div>

        {/* 3 Equal Columns Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12 gap-x-6 lg:gap-x-10">
          {CHAPTERS.map((chapter, i) => (
            <ChapterCard key={chapter.number} chapter={chapter} delay={0.06 * i} />
          ))}
        </div>

        {/* CTA */}
        <EditorialReveal delay={0.28}>
          <div className="mt-14 sm:mt-16 lg:mt-24 flex items-center justify-between flex-wrap gap-4">
            <GoldAccent variant="line" width="w-12" />
            <Link href="/menu" className="inline-flex items-center gap-2.5 font-sans text-[11px] uppercase tracking-[0.28em] text-alarak-charcoal/50 hover:text-alarak-gold transition-colors duration-300 group">
              <span>View Full Menu</span>
              <span className="w-6 h-px bg-current transition-all duration-300 group-hover:w-10" />
            </Link>
          </div>
        </EditorialReveal>

      </Container>
    </section>
  );
};
