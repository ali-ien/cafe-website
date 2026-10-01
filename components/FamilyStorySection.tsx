"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui";
import { useLanguage } from "@/lib/language";

const easeEditorial: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function FamilyStorySection() {
  const { t, language } = useLanguage();
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="story"
      dir={language === "ar" ? "rtl" : "ltr"}
      aria-labelledby="family-story-heading"
      className="relative isolate overflow-hidden bg-[#0b1423] text-alarak-cream"
    >
      <div aria-hidden="true" className="pointer-events-none absolute -end-40 -top-40 h-[30rem] w-[30rem] rounded-full border border-alarak-gold/10 sm:h-[42rem] sm:w-[42rem]" />
      <div aria-hidden="true" className="pointer-events-none absolute -start-48 top-[42rem] h-[30rem] w-[30rem] rounded-full border border-alarak-gold/10" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.08]" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.28) 0.45px, transparent 0.45px)", backgroundSize: "5px 5px" }} />

      <Container size="wide" padding="none" className="relative pb-16 pt-[68px] sm:pb-20 sm:pt-10 lg:pb-28 lg:pt-32">
        <header className="relative mb-14 px-4 sm:mb-14 lg:mb-14 lg:px-0">
          <p className="mb-5 font-sans text-[10px] font-medium uppercase tracking-[0.3em] text-alarak-gold sm:mb-6 sm:text-xs lg:ms-6 min-[1400px]:-ms-5">
            {t("OUR STORY · NOTRE HISTOIRE")}
          </p>
          <div className="grid items-center gap-7 lg:grid-cols-[1fr_270px] lg:gap-10">
            <h2 id="family-story-heading" className="max-w-[270px] font-serif text-[56px] font-light leading-[0.9] tracking-tight text-alarak-cream sm:max-w-none sm:text-7xl lg:ms-6 lg:text-[108px] min-[1400px]:-ms-5 xl:text-[124px]">
              <span className="block whitespace-normal sm:whitespace-nowrap">{t("From New York")}</span>
              <span className="block ps-[0.35em] italic text-alarak-gold sm:ps-[0.82em]">{t("to Morocco")}</span>
            </h2>
            <div className="hidden max-w-[270px] flex-col items-center gap-4 justify-self-end pb-1 text-center lg:flex">
              <div aria-hidden="true" className="flex w-44 items-center gap-2 text-alarak-gold">
                <span className="h-px flex-1 bg-alarak-gold/60" />
                <span className="text-2xl leading-none">✦</span>
                <span className="h-px flex-1 bg-alarak-gold/60" />
              </div>
              <p className="font-serif text-lg italic leading-snug text-alarak-gold-light sm:text-xl">
                {t("A family dream, baked every day.")}
              </p>
            </div>
          </div>
        </header>

        <div className="relative mb-20 grid grid-cols-[1.3fr_1fr] items-start gap-3 sm:mb-28 lg:mb-28 lg:grid-cols-[59.2%_35.5%] lg:gap-10">
          <motion.figure
            initial={{ opacity: 0, x: reduceMotion ? 0 : -18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.16 }}
            transition={{ duration: 0.85, ease: easeEditorial }}
            className="group relative order-1 max-lg:scale-[0.92]"
          >
            <div className="relative aspect-[0.65/1] border border-alarak-gold/40 p-1.5 sm:p-3 lg:aspect-[0.98/1]">
              <div className="relative h-full w-full overflow-hidden border border-alarak-gold/20 bg-[#17243a]">
                <Image
                  src="/media/brand/owner (2).png"
                  alt={t("Abdellah El Idrissi in a New York restaurant")}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  quality={90}
                  className="object-cover object-[50%_24%] transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </div>
            </div>
            <figcaption className="relative z-10 mt-2 w-full max-w-[240px] border border-alarak-gold/25 bg-[#0b1423] px-2.5 py-2.5 shadow-xl sm:mt-3 sm:max-w-[290px] sm:px-4 sm:py-3">
              <span className="block font-sans text-[8px] font-semibold uppercase tracking-[0.2em] text-alarak-gold sm:text-[9px]">
                {t("Founder & Pastry Artisan")}
              </span>
              <span className="mt-0.5 block font-serif text-base leading-tight text-alarak-cream sm:text-lg">Abdellah El Idrissi</span>
              <span className="mt-2 flex items-center gap-2 border-t border-alarak-gold/20 pt-2">
                <span className="relative block h-[38px] w-[52px] shrink-0 border-[3px] border-[#f6efdf] bg-[#f6efdf] shadow-md sm:h-[44px] sm:w-[60px]">
                  <Image
                    src="/media/our-story/ice-diploma.jpeg"
                    alt={t("Abdellah El Idrissi's pastry and baking arts diploma")}
                    fill
                    sizes="60px"
                    quality={88}
                    className="object-cover"
                  />
                </span>
                <Link
                  href="/our-story#career"
                  className="group inline-flex min-w-0 flex-1 items-center justify-between gap-1 font-sans text-[8px] font-medium leading-tight text-alarak-cream/75 transition-colors hover:text-alarak-gold sm:text-[9px]"
                >
                  <span>{t("View more about Abdellah's career")}</span>
                  <span aria-hidden="true" className="shrink-0 text-alarak-gold">↗</span>
                </Link>
              </span>
            </figcaption>
          </motion.figure>

          <motion.figure
            initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.85, delay: 0.08, ease: easeEditorial }}
            className="group relative order-2 mt-[10rem] border border-alarak-gold/35 p-1.5 sm:p-2 lg:mt-[19rem] lg:p-3 max-lg:scale-[0.92]"
          >
            <div className="relative aspect-[0.5/1] overflow-hidden bg-[#17243a] lg:aspect-[1.3/1]">
              <Image
                src="/media/our-story/family-new-york.jpg"
                alt={t("Abdellah and his daughter outside a New York bakery")}
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                quality={90}
                className="object-cover object-[50%_56%] transition-transform duration-700 group-hover:scale-[1.025]"
              />
            </div>
            <figcaption className="mt-3 px-1 text-center font-serif text-sm italic text-alarak-cream/65">
              {t("New York · Where the journey grew")}
            </figcaption>
          </motion.figure>

          <div aria-hidden="true" className="absolute start-[72%] top-[-2rem] z-10 flex h-16 w-16 items-center justify-center rounded-full border border-alarak-gold bg-[#0b1423] font-serif text-[8px] uppercase tracking-[0.15em] text-alarak-gold lg:start-[58%] lg:top-[3.5rem] lg:h-[104px] lg:w-[104px] lg:text-[11px]">
            <span className="flex flex-col items-center gap-1">NYC<span className="h-px w-7 rotate-[-35deg] bg-alarak-gold lg:w-10" />MAR</span>
          </div>
        </div>

        <section aria-labelledby="beginning-heading" className="mb-20 border-t border-alarak-gold/20 px-5 pt-8 sm:mb-28 sm:pt-12 lg:mb-36 lg:px-0 lg:pt-8">
          <div className="grid gap-7 lg:grid-cols-[0.55fr_1.45fr] lg:gap-10">
            <div className="pt-2 lg:ps-14">
              <span className="mb-5 block h-px w-44 bg-alarak-gold/40" />
              <div className="flex items-center gap-4 lg:block">
                <span className="block font-serif text-3xl text-alarak-gold">01</span>
                <p className="font-sans text-[9px] font-medium uppercase tracking-[0.24em] text-alarak-cream/65 lg:mt-2">
                  {t("The Beginning")}
                </p>
              </div>
            </div>
            <div>
              <h3 id="beginning-heading" className="max-w-5xl font-serif text-3xl font-light leading-[1.12] text-alarak-cream sm:text-4xl lg:text-[42px]">
                {t("My journey into the world of culinary arts and pastry began with a passion for craftsmanship, creativity, and attention to detail.")}
              </h3>
              <div className="mt-8 grid gap-7 font-sans text-xs font-light leading-6 text-alarak-cream/70 sm:grid-cols-2 sm:gap-10 sm:text-[13px] sm:leading-7 lg:mt-10">
                <p>{t("This journey led me to New York, where I earned my diploma from the Institute of Culinary Education in Culinary Arts and Pastry Arts.")}</p>
                <p>{t("From New York, I brought back more than techniques. I brought with me a modern approach to the world of coffee, bakery, and pastry — inspired by the diversity, creativity, and energy of the city.")}</p>
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="chapter-heading" className="mb-20 grid items-start gap-10 px-5 sm:mb-28 lg:mb-36 lg:grid-cols-[49%_43%] lg:justify-between lg:px-0">
          <motion.figure
            initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, ease: easeEditorial }}
            className="group relative mb-4 aspect-[0.7/1] border border-alarak-gold/30 p-2 sm:aspect-[0.83/1] sm:p-3 lg:ms-5 max-lg:scale-[0.92]"
          >
            <div className="relative h-full w-full overflow-hidden border border-alarak-gold/20 bg-[#17243a]">
              <Image
                src="/media/our-story/family-baking.jpg"
                alt={t("Abdellah baking together with his daughter")}
                fill
                sizes="(max-width: 1024px) 100vw, 44vw"
                quality={90}
                className="object-cover object-[50%_46%] transition-transform duration-700 group-hover:scale-[1.02]"
              />
            </div>
            <div aria-hidden="true" className="pointer-events-none absolute -inset-3 z-10 border border-alarak-gold/15" />
            <figcaption className="absolute inset-x-0 bottom-7 text-center font-serif text-4xl italic text-alarak-gold-light drop-shadow-md sm:bottom-10 sm:text-5xl">
              {t("Made together")}
            </figcaption>
          </motion.figure>

          <div className="pt-2 lg:pt-12">
            <p className="mb-4 font-sans text-[9px] font-medium uppercase tracking-[0.26em] text-alarak-gold sm:text-[10px]">
              {t("A New Chapter · Morocco")}
            </p>
            <h3 id="chapter-heading" className="mb-8 max-w-xl font-serif text-4xl font-light leading-[1.02] text-alarak-cream sm:text-5xl lg:text-6xl">
              {t("A dream shaped around family.")}<span aria-hidden="true" className="ms-2 inline-block align-middle text-[0.48em]">❤️</span>
            </h3>
            <div className="space-y-4 font-sans text-xs font-light leading-6 text-alarak-cream/70 sm:text-[13px] sm:leading-7">
              <p>{t("But returning to Morocco marked the beginning of a new chapter.")}</p>
              <p>{t("The dream was to transform this experience into something that reflected who we are: a family project built around passion, craftsmanship, and hospitality.")}</p>
            </div>
            <p className="my-7 border-y border-alarak-gold/25 py-4 font-serif text-lg italic leading-snug text-alarak-gold-light sm:my-8 sm:text-xl">
              {t("And that dream became")}<br />
              <span className="not-italic">{t("Alarak Coffee & Bakery.")}</span>
            </p>
            <p className="font-sans text-xs font-light leading-6 text-alarak-cream/70 sm:text-[13px] sm:leading-7">
              {t("A place where the spirit of New York meets a Moroccan touch, with Mediterranean influences woven into our coffee, pastries, cakes, and baked creations.")}
            </p>
          </div>
        </section>

        <blockquote className="mx-auto mb-20 max-w-4xl border-y border-alarak-gold/20 px-4 py-10 text-center sm:mb-28 sm:py-14 lg:mb-36">
          <span aria-hidden="true" className="font-serif text-3xl leading-none text-alarak-gold">“</span>
          <p className="mx-auto max-w-4xl font-serif text-2xl italic leading-tight text-alarak-cream sm:text-3xl lg:text-4xl">
            {t("The finest things we make begin with the people we make them for.")}
          </p>
          <cite className="mt-6 block not-italic font-sans text-[8px] uppercase tracking-[0.24em] text-alarak-gold sm:text-[9px]">
            — {t("The El Idrissi Family")}
          </cite>
        </blockquote>

        <section aria-labelledby="coffee-heading" className="mb-20 grid items-center gap-10 px-7 sm:mb-28 lg:mx-10 lg:mb-36 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16 lg:px-0">
          <div className="order-2 lg:order-1">
            <div className="mb-5 flex items-center gap-3 text-alarak-gold">
              <span className="font-sans text-[9px] font-medium uppercase tracking-[0.26em] sm:text-[10px]">
                02 · {t("Our Coffee")}
              </span>
            </div>
            <h3 id="coffee-heading" className="max-w-lg font-serif text-4xl font-light leading-[1.02] text-alarak-cream sm:text-5xl lg:text-[54px]">
              {t("Selected with the same care as everything we bake.")}
            </h3>
            <div className="mt-7 space-y-4 font-sans text-xs font-light leading-6 text-alarak-cream/70 sm:mt-8 sm:text-[13px] sm:leading-7">
              <p>{t("Because coffee is at the heart of the coffee & bakery experience, we carefully selected the coffees we serve.")}</p>
              <p>{t("We use Miscela d'Oro Italian coffee, a blend of Arabica and Robusta, alongside illy 100% Arabica, offering different coffee profiles and experiences for our guests.")}</p>
              <p>{t("For us, quality begins with the ingredients — from the coffee we select to the pastries we bake and the way every creation is prepared and presented.")}</p>
            </div>
          </div>
          <motion.figure
            initial={{ opacity: 0, x: reduceMotion ? 0 : 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, ease: easeEditorial }}
            style={{ rotate: "0.3deg" }}
            className="group relative order-1 aspect-[0.78/1] border border-alarak-gold/30 p-2 sm:aspect-[0.83/1] sm:p-3 lg:order-2 max-lg:scale-[0.92]"
          >
            <div className="relative h-full w-full overflow-hidden bg-[#17243a]">
              <Image
                src="/media/our-story/family-creation.jpg"
                alt={t("A young family baker presenting a freshly baked pastry")}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={90}
                className="object-cover object-[54%_42%] transition-transform duration-700 group-hover:scale-[1.025]"
              />
            </div>
            <figcaption className="absolute -bottom-3 end-0 bg-alarak-cream px-5 py-4 text-[#182133] shadow-lg sm:-end-4 sm:bottom-8 sm:px-7 sm:py-5">
              <span className="block font-sans text-[7px] font-medium uppercase tracking-[0.2em] sm:text-[8px]">
                {t("Craft is passed on")}
              </span>
              <span className="mt-1 block font-serif text-xl italic sm:text-2xl">{t("with joy")}</span>
            </figcaption>
          </motion.figure>
        </section>

        <footer className="relative isolate mx-auto flex aspect-[0.9/1] min-h-[420px] max-w-[1120px] items-center justify-center overflow-hidden border border-alarak-gold/25 px-6 py-16 text-center sm:aspect-[1.72/1] sm:px-12 sm:py-10">
          <Image
            src="/media/our-story/family-new-york.jpg"
            alt=""
            fill
            sizes="(max-width: 1120px) 100vw, 1120px"
            quality={90}
            className="-z-20 object-cover object-[50%_55%]"
          />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[#08111f]/80" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[#08111f]/30 via-[#08111f]/50 to-[#08111f]/75" />
          <div className="relative max-w-5xl">
            <div aria-hidden="true" className="mx-auto mb-8 flex w-36 items-center gap-2 text-alarak-gold">
              <span className="h-px flex-1 bg-current" /><span className="text-xl">✦</span><span className="h-px flex-1 bg-current" />
            </div>
            <p className="font-sans text-[8px] font-medium uppercase tracking-[0.22em] text-alarak-gold sm:text-[9px]">
              {t("Alarak is more than a Coffee & Bakery.")}
            </p>
            <h3 className="mt-5 font-serif text-4xl font-light leading-tight text-alarak-cream sm:text-5xl lg:text-6xl">
              {t("It is a family dream brought to life.")}
            </h3>
            <p className="mx-auto mt-6 max-w-2xl font-sans text-xs font-light leading-6 text-alarak-cream/75 sm:text-sm sm:leading-7">
              {t("Every pastry, every dessert, and every cup of coffee is prepared with care, passion, and a love for the craft.")}
            </p>
            <p className="mt-8 font-serif text-lg leading-relaxed text-alarak-cream sm:text-xl">
              {t("Welcome to Alarak.")}<br />
              <span className="text-alarak-gold-light italic">{t("A family dream, baked with passion.")}</span>
            </p>
            <span aria-hidden="true" className="mt-4 inline-flex items-center gap-2 text-lg" role="presentation">
              <span>👨‍👩‍👧‍👦</span><span>❤️</span>
            </span>
          </div>
          <span aria-hidden="true" className="pointer-events-none absolute left-0 top-0 h-12 w-12 border-l border-t border-alarak-gold/80" />
          <span aria-hidden="true" className="pointer-events-none absolute bottom-0 right-0 h-12 w-12 border-b border-r border-alarak-gold/80" />
        </footer>
      </Container>
    </section>
  );
}
