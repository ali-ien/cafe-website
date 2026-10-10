"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Container, EditorialReveal, GoldAccent, Button } from "@/components/ui";
import { dessertsMenu, type MenuCategory } from "@/lib/menu";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/language";

const easeEditorial: [number, number, number, number] = [0.16, 1, 0.3, 1];

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
  const [activeMenuCategory, setActiveMenuCategory] = useState("coffee");
  const { eyebrow, title, subtitle, heroImage, ctaImage, categories } = dessertsMenu;
  const menuCategories = [{ id: "coffee", label: "Coffee" }, ...categories];

  return (
    <div className="relative w-full bg-white text-alarak-navy-dark overflow-x-hidden">
      {/* ── 1. Hero Section with Background Dessert Image ── */}
      <section
        className="relative overflow-hidden bg-[#091321] pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40"
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
                  "linear-gradient(to right, #091321 0%, rgba(9, 19, 33, 0.88) 18%, rgba(9, 19, 33, 0.3) 48%, transparent 80%), linear-gradient(to bottom, #091321 0%, transparent 18%, transparent 82%, #091321 100%)",
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
                className="font-serif text-[44px] sm:text-[56px] lg:text-[66px] font-normal tracking-[0.04em] uppercase leading-[1.04] text-alarak-cream"
              >
                {t(title)}
              </h1>
            </EditorialReveal>
            <EditorialReveal delay={0.16}>
              <p className="mt-4 font-serif italic text-[18px] sm:text-[20px] text-alarak-cream/70 font-light">
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
      <nav aria-label={t("Menu categories")} className="sticky top-[76px] z-30 border-y border-white/[0.07] bg-[#091321] py-5 sm:top-[88px] sm:py-6">
        <Container size="wide" className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <ul className="flex min-w-max items-center justify-center gap-3 sm:gap-4">
              {menuCategories.map((category) => (
                <li key={category.id}>
                  <a
                    href={`#${category.id}`}
                    aria-current={activeMenuCategory === category.id ? "location" : undefined}
                    onClick={() => setActiveMenuCategory(category.id)}
                    className={`block rounded-full px-6 py-3 font-sans text-[10px] font-semibold uppercase tracking-[0.16em] transition-colors sm:px-8 sm:text-xs ${
                      activeMenuCategory === category.id
                        ? "bg-alarak-gold text-alarak-navy-dark"
                        : "bg-white/[0.05] text-alarak-cream/55 hover:bg-white/10 hover:text-alarak-cream"
                    }`}
                  >
                    {t(category.label)}
                  </a>
                </li>
              ))}
            </ul>
        </Container>
      </nav>

      <section id="coffee" className="relative isolate scroll-mt-28 overflow-hidden border-y border-alarak-gold/15 bg-white py-16 text-alarak-navy-dark sm:py-20 lg:py-24" aria-labelledby="coffee-heading">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-[0.1] [background-image:radial-gradient(rgba(197,160,89,0.75)_0.7px,transparent_0.7px)] [background-size:26px_26px]" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-20 -z-10 h-[480px] w-[480px] rounded-full border border-alarak-gold/10" />
        <Container size="wide">
          <div className="mb-10 grid items-end gap-5 border-b border-alarak-gold/20 pb-7 sm:mb-14 sm:pb-9 lg:grid-cols-[1fr_0.75fr] lg:gap-12">
            <div>
              <p className="flex items-center gap-3 font-sans text-[9px] font-semibold uppercase tracking-[0.32em] text-alarak-gold sm:text-[10px]">
                <span className="h-px w-8 bg-alarak-gold" />{t("Coffee at Alarak")}
              </p>
              <h2 id="coffee-heading" className="mt-4 font-serif text-3xl font-normal leading-[1.08] tracking-tight text-alarak-navy-dark sm:text-4xl lg:text-5xl">
                {t("Our Coffee Selection")}
              </h2>
            </div>
            <p className="max-w-xl font-sans text-sm font-light leading-7 text-alarak-navy-dark/70 sm:text-base sm:leading-8 lg:justify-self-end">
              {t("Coffee is at the heart of our coffee and bakery experience. We carefully select every bean we serve.")}
            </p>
          </div>

          <div className="grid items-start gap-6 lg:grid-cols-2 lg:gap-8">
            <article className="group relative">
              <div className="relative mx-auto aspect-square w-full max-w-[440px] overflow-hidden border border-alarak-gold/25 bg-[#f6f0e5] shadow-[0_24px_70px_rgba(0,0,0,0.28)] transition-transform duration-500 group-hover:-translate-y-1">
                <Image
                  src="/media/menu/coffee-illy-selection.jpeg"
                  alt={t("illy coffee bean selection with six varieties")}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  quality={90}
                  className="object-contain p-3 transition-transform duration-700 group-hover:scale-[1.025] sm:p-5"
                />
                <span className="absolute left-4 top-4 border border-white/40 bg-[#091321]/85 px-3 py-2 font-sans text-[9px] uppercase tracking-[0.2em] text-alarak-cream backdrop-blur-sm">01 · illy</span>
              </div>
              <div className="mx-auto max-w-[440px] pt-5 sm:pt-7">
                <p className="font-sans text-[9px] font-semibold uppercase tracking-[0.25em] text-alarak-gold">100% Arabica</p>
                <h3 className="mt-2 font-serif text-2xl text-alarak-navy-dark sm:text-3xl">{t("Six origins, six experiences")}</h3>
                <p className="mt-3 font-sans text-sm font-light leading-6 text-alarak-navy-dark/70">
                  {t("Explore six illy coffee varieties: Classico, Intenso, Decaffeinato, Brasile, Guatemala, and Ethiopia.")}
                </p>
                <ul className="mt-5 flex flex-wrap gap-2" aria-label={t("illy coffee varieties")}>
                  {["Classico", "Intenso", "Decaffeinato", "Brasile", "Guatemala", "Ethiopia"].map((variant) => (
                    <li key={variant} className="border border-alarak-gold/25 bg-[#f6f0e5] px-2.5 py-1.5 font-sans text-[9px] uppercase tracking-[0.12em] text-alarak-navy-dark/75">
                      {variant}
                    </li>
                  ))}
                </ul>
              </div>
            </article>

            <article className="group relative">
              <div className="relative mx-auto aspect-square w-full max-w-[440px] overflow-hidden border border-alarak-gold/25 bg-[#c4b69e] shadow-[0_24px_70px_rgba(0,0,0,0.28)] transition-transform duration-500 group-hover:-translate-y-1">
                <Image
                  src="/media/menu/coffee-miscela-espresso.jpeg"
                  alt={t("Miscela d’Oro Espresso Gusto Classico coffee bag by the sea")}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  quality={90}
                  className="object-contain p-3 transition-transform duration-700 group-hover:scale-[1.025] sm:p-5"
                />
                <span className="absolute left-4 top-4 border border-white/40 bg-[#091321]/85 px-3 py-2 font-sans text-[9px] uppercase tracking-[0.2em] text-alarak-cream backdrop-blur-sm">02 · Miscela d’Oro</span>
                <span className="absolute right-4 top-4 border border-alarak-gold/55 bg-[#091321]/90 px-3 py-2 font-sans text-[9px] uppercase tracking-[0.2em] text-alarak-gold backdrop-blur-sm">500 g</span>
              </div>
              <div className="mx-auto max-w-[440px] pt-5 sm:pt-7">
                <p className="font-sans text-[9px] font-semibold uppercase tracking-[0.25em] text-alarak-gold">{t("Italian coffee")}</p>
                <h3 className="mt-2 font-serif text-2xl text-alarak-navy-dark sm:text-3xl">Espresso Gusto Classico</h3>
                <p className="mt-3 font-sans text-sm font-light leading-6 text-alarak-navy-dark/70">
                  {t("An Italian Arabica and Robusta blend, selected for its full espresso character and velvety crema.")}
                </p>
              </div>
            </article>
          </div>
        </Container>
      </section>

      {/* ── 3. Products Categories ── */}
      <Container size="wide" className="py-16 sm:py-20 lg:py-24 space-y-20 sm:space-y-24 lg:space-y-28">
        {categories.map((category, i) => (
          <CategoryBlock key={category.id} category={category} delay={0.04 * i} />
        ))}
      </Container>

      {/* ── 4. Compact Sweet Awaits Section with Background Image & Centered Button ── */}
      <section
        className="relative overflow-hidden border-t border-alarak-gold/15 bg-[#070c18] py-12 sm:py-14 lg:py-16"
        aria-labelledby="menu-cta-heading"
      >
        {/* Dessert background image on right, blending seamlessly into the navy background */}
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
                  "linear-gradient(to right, #070c18 0%, rgba(7, 12, 24, 0.9) 20%, rgba(7, 12, 24, 0.3) 55%, transparent 85%), linear-gradient(to bottom, #070c18 0%, transparent 20%, transparent 80%, #070c18 100%)",
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
                className="font-serif text-[28px] sm:text-[34px] lg:text-[40px] font-normal tracking-[0.05em] uppercase leading-[1.15] text-alarak-cream"
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
                    className="border-alarak-gold/50 text-alarak-cream hover:border-alarak-gold hover:bg-alarak-gold hover:text-alarak-navy-dark px-7 py-2.5 text-[11px] tracking-[0.24em] uppercase transition-all duration-300 shadow-sm"
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

