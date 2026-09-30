"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Container, EditorialReveal, GoldAccent, Button } from "@/components/ui";
import { dessertsMenu, type MenuCategory } from "@/lib/menu";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/language";

const easeEditorial: [number, number, number, number] = [0.16, 1, 0.3, 1];

const LeafMotif: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    aria-hidden="true"
    focusable="false"
    viewBox="0 0 120 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M58 150 C56 110 40 78 22 52"
      stroke="#C5A059"
      strokeWidth="1.1"
      strokeLinecap="round"
    />
    <path
      d="M58 118 C78 98 96 92 112 88"
      stroke="#C5A059"
      strokeWidth="1"
      strokeLinecap="round"
    />
    <ellipse cx="24" cy="50" rx="14" ry="7" transform="rotate(-28 24 50)" fill="#C5A059" fillOpacity="0.35" />
    <ellipse cx="108" cy="86" rx="12" ry="6" transform="rotate(18 108 86)" fill="#C5A059" fillOpacity="0.32" />
    <ellipse cx="46" cy="86" rx="11" ry="5.5" transform="rotate(-16 46 86)" fill="#C5A059" fillOpacity="0.22" />
  </svg>
);

const Diamond: React.FC = () => (
  <span
    aria-hidden="true"
    className="mt-[0.45em] h-[6px] w-[6px] shrink-0 rotate-45 bg-alarak-gold"
  />
);

const CategoryBlock: React.FC<{ category: MenuCategory; delay?: number }> = ({
  category,
  delay = 0,
}) => {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const imageFirst = category.layout === "image-left";

  return (
    <section
      id={category.id}
      className="scroll-mt-28 sm:scroll-mt-32"
      aria-labelledby={`${category.id}-heading`}
    >
      <div
        className={cn(
          "grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-24 items-center",
          !imageFirst && "lg:[&>*:first-child]:order-2"
        )}
      >
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: shouldReduceMotion ? 0.3 : 1, delay, ease: easeEditorial }}
        >
          <div
            className="relative w-full overflow-hidden rounded-[2px] shadow-[0_8px_30px_rgba(7,12,24,0.06)]"
            style={{ aspectRatio: "4 / 3" }}
          >
            <Image
              src={category.image.src}
              alt={t(category.image.alt)}
              fill
              sizes="(max-width: 1024px) 100vw, 48vw"
              quality={92}
              className="object-cover"
            />
          </div>
        </motion.div>

        <div className={cn(!imageFirst && "lg:order-1")}>
          <EditorialReveal delay={delay + 0.04}>
            <p className="font-sans text-[9px] sm:text-[10px] uppercase tracking-[0.32em] text-alarak-gold font-medium mb-2">
              {t(category.label)}
            </p>
          </EditorialReveal>
          <EditorialReveal delay={delay + 0.08}>
            <h2
              id={`${category.id}-heading`}
              className="font-serif text-[28px] sm:text-[34px] lg:text-[40px] font-normal tracking-[0.06em] uppercase text-alarak-navy-dark leading-[1.12]"
            >
              {t(category.label)}
            </h2>
          </EditorialReveal>

          <ul className="mt-8 sm:mt-9 space-y-4 sm:space-y-4.5">
            {category.items.map((item, i) => (
              <motion.li
                key={t(item.name)}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: shouldReduceMotion ? 0.2 : 0.55,
                  delay: shouldReduceMotion ? 0 : delay + 0.12 + i * 0.03,
                  ease: easeEditorial,
                }}
                className="group pb-3 border-b border-alarak-gold/15 last:border-b-0"
              >
                <div className="flex items-start gap-3">
                  <Diamond />
                  <span className="font-serif text-[17px] sm:text-[18px] lg:text-[19px] text-alarak-navy-dark/85 font-light leading-snug group-hover:text-alarak-gold transition-colors duration-200">
                    {t(item.name)}
                  </span>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export const MenuDesserts: React.FC = () => {
  const { t } = useLanguage();
  const { eyebrow, title, subtitle, heroImage, ctaImage, categories } = dessertsMenu;

  return (
    <div className="relative w-full bg-[#FAF7F2] text-alarak-navy-dark overflow-x-hidden">
      {/* ── 1. Hero Section with Background Dessert Image ── */}
      <section
        className="relative pt-32 sm:pt-36 lg:pt-40 pb-16 sm:pb-20 overflow-hidden"
        aria-labelledby="menu-heading"
      >
        {/* Soft background dessert image anchored to the right, matching template */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 right-0 bottom-0 w-full sm:w-[65%] lg:w-[50%] xl:w-[46%] overflow-hidden select-none"
        >
          <div className="relative w-full h-full">
            <Image
              src={heroImage.src}
              alt=""
              fill
              priority
              quality={92}
              className="object-cover object-center lg:object-[center_right]"
            />
            {/* Seamless gradients blending image into the light background */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to right, #FAF7F2 0%, rgba(250, 247, 242, 0.88) 18%, rgba(250, 247, 242, 0.3) 48%, transparent 80%), linear-gradient(to bottom, #FAF7F2 0%, transparent 18%, transparent 82%, #FAF7F2 100%)",
              }}
            />
          </div>
        </div>

        <Container size="wide" className="relative z-10">
          <div className="max-w-xl lg:max-w-2xl">
            <EditorialReveal>
              <div className="flex items-center gap-3 mb-2.5">
                <div className="w-8 h-px bg-alarak-gold/80" />
                <p className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.32em] text-alarak-gold font-medium">
                  {t(eyebrow)}
                </p>
              </div>
            </EditorialReveal>
            <EditorialReveal delay={0.08}>
              <h1
                id="menu-heading"
                className="font-serif text-[44px] sm:text-[56px] lg:text-[66px] font-normal tracking-[0.04em] uppercase leading-[1.04] text-alarak-navy-dark"
              >
                {t(title)}
              </h1>
            </EditorialReveal>
            <EditorialReveal delay={0.16}>
              <p className="mt-4 font-serif italic text-[18px] sm:text-[20px] text-alarak-navy-dark/65 font-light">
                {t(subtitle)}.
              </p>
            </EditorialReveal>
            <EditorialReveal delay={0.22}>
              <div className="mt-4 flex items-center gap-2 text-alarak-gold">
                <div className="w-10 h-px bg-alarak-gold" />
                <span className="text-xs">→</span>
              </div>
            </EditorialReveal>
          </div>
        </Container>
      </section>

      {/* ── 2. Category Navigation Bar with side accent lines ── */}
      <nav aria-label={t("Dessert categories")} className="border-y border-alarak-gold/20 py-4 sm:py-5">
        <Container size="wide">
          <div className="flex items-center justify-center gap-4 sm:gap-8">
            <div className="hidden md:block w-12 lg:w-20 h-px bg-alarak-gold/30" />
            <ul className="flex flex-wrap items-center justify-center gap-x-8 sm:gap-x-12 gap-y-3">
              {categories.map((category) => (
                <li key={category.id}>
                  <a
                    href={`#${category.id}`}
                    className="font-sans text-[11px] sm:text-[12px] uppercase tracking-[0.24em] text-alarak-navy-dark/70 hover:text-alarak-gold transition-colors duration-300 focus-ring font-medium"
                  >
                    {t(category.label)}
                  </a>
                </li>
              ))}
            </ul>
            <div className="hidden md:block w-12 lg:w-20 h-px bg-alarak-gold/30" />
          </div>
        </Container>
      </nav>

      {/* ── 3. Products Categories ── */}
      <Container size="wide" className="py-16 sm:py-20 lg:py-24 space-y-20 sm:space-y-24 lg:space-y-28">
        {categories.map((category, i) => (
          <CategoryBlock key={category.id} category={category} delay={0.04 * i} />
        ))}
      </Container>

      {/* ── 4. Compact Sweet Awaits Section with Background Image & Centered Button ── */}
      <section
        className="relative overflow-hidden border-t border-alarak-gold/15 py-12 sm:py-14 lg:py-16 bg-[#FAF7F2]"
        aria-labelledby="menu-cta-heading"
      >
        {/* Subtle leaf motif sketch in left corner */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 bottom-0 top-0 w-36 sm:w-48 opacity-40 overflow-hidden flex items-center"
        >
          <LeafMotif className="w-full h-auto" />
        </div>

        {/* Dessert background image on right, blending seamlessly into cream background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 right-0 bottom-0 w-full sm:w-[50%] lg:w-[42%] overflow-hidden select-none"
        >
          <div className="relative w-full h-full">
            <Image
              src={ctaImage.src}
              alt=""
              fill
              quality={92}
              className="object-cover object-center lg:object-right"
            />
            {/* Gradients blending image into background */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to right, #FAF7F2 0%, rgba(250, 247, 242, 0.9) 20%, rgba(250, 247, 242, 0.3) 55%, transparent 85%), linear-gradient(to bottom, #FAF7F2 0%, transparent 20%, transparent 80%, #FAF7F2 100%)",
              }}
            />
          </div>
        </div>

        <Container size="wide" className="relative z-10">
          <div className="max-w-2xl mx-auto text-center flex flex-col items-center">
            <EditorialReveal>
              <p className="font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.32em] text-alarak-gold font-medium mb-2.5">
                {t("Something sweet awaits")}
              </p>
            </EditorialReveal>

            <EditorialReveal delay={0.08}>
              <h2
                id="menu-cta-heading"
                className="font-serif text-[28px] sm:text-[34px] lg:text-[40px] font-normal tracking-[0.05em] uppercase leading-[1.15] text-alarak-navy-dark"
              >
                {t("Come taste it for yourself.")}
              </h2>
            </EditorialReveal>

            <EditorialReveal delay={0.16}>
              <div className="mt-6 sm:mt-7">
                <Link href="/#visit">
                  <Button
                    variant="outline"
                    size="md"
                    className="border-alarak-gold/50 text-alarak-navy-dark hover:border-alarak-navy-dark hover:bg-alarak-navy-dark hover:text-alarak-cream px-7 py-2.5 text-[11px] tracking-[0.24em] uppercase transition-all duration-300 shadow-sm"
                  >
                    {t("Visit Alarak →")}
                  </Button>
                </Link>
              </div>
            </EditorialReveal>
          </div>
        </Container>
      </section>
    </div>
  );
};

