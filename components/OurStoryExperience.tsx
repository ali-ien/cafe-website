"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import { Container } from "@/components/ui";
import { useLanguage } from "@/lib/language";

const pastryPhoto = "/media/our-story/Gemini_Generated_Image_srxds4srxds4srxd.jfif";
const founderPhoto = "/media/our-story/owner (2).png";

export function OurStoryExperience() {
  const { t } = useLanguage();
  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-white/[0.06] bg-gradient-to-b from-[#101a2b] via-[#0b1220] to-alarak-navy-dark pb-20 pt-36 sm:pb-24 sm:pt-44">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-[0.14] [background-image:radial-gradient(rgba(197,160,89,0.6)_0.7px,transparent_0.7px)] [background-size:28px_28px]" />
        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-80 w-[min(80vw,760px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-alarak-gold/[0.07] blur-[110px]" />
        <Container size="narrow" className="text-center">
          <p className="mb-5 inline-flex items-center gap-2 font-sans text-[10px] font-semibold uppercase tracking-[0.3em] text-alarak-gold sm:text-xs">
            <Sparkles className="h-3.5 w-3.5" /> {t("Our Story")}
          </p>
          <h1 className="font-serif text-4xl font-medium leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-6xl">
            {t("Crafting Moments of Pure Warmth &")}
            <span className="mt-2 block font-normal italic text-alarak-gold">{t("Artisan Mastery in Fnideq")}</span>
          </h1>
          <div aria-hidden="true" className="mx-auto my-8 h-px w-24 bg-gradient-to-r from-transparent via-alarak-gold to-transparent" />
          <p className="mx-auto max-w-2xl font-sans text-base font-light leading-7 text-alarak-cream/70 sm:text-lg sm:leading-8">
            {t("Specialty coffee and artisan pastry, made slowly in Fnideq — a warm place to pause, savor, and return to.")}
          </p>
        </Container>
      </section>

      <section className="py-16 sm:py-20 lg:py-28">
        <Container size="wide">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="order-2 space-y-6 lg:order-1 lg:py-8">
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-alarak-gold" />
                <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-alarak-gold">{t("Artisan precision")}</span>
              </div>
              <h2 className="font-serif text-3xl leading-tight text-white sm:text-4xl">
                {t("The Art of ")}<span className="italic text-alarak-gold">{t("Slow Crafting")}</span>
              </h2>
              <p className="font-sans text-sm font-light leading-7 text-alarak-cream/75 sm:text-base">
                {t("At Alarak, every pastry tells a story of dedication, precision, and refined flavor. Our pastry chefs prepare each signature tartlet with fresh berries, delicate custard, and carefully finished chocolate.")}
              </p>
              <p className="font-sans text-sm font-light leading-7 text-alarak-cream/55">
                {t("Paired with thoughtfully selected specialty coffee, every detail reflects our love of good ingredients and careful craft.")}
              </p>
              <div className="grid grid-cols-2 gap-3 border-t border-white/10 pt-5 sm:gap-4">
                <div className="rounded-sm border border-white/[0.07] bg-white/[0.035] p-4 sm:p-5">
                  <h3 className="font-serif text-lg text-alarak-gold sm:text-xl">{t("Fresh pastries")}</h3>
                  <p className="mt-1 font-sans text-[11px] leading-5 text-alarak-cream/50">{t("Baked each morning in Fnideq")}</p>
                </div>
                <div className="rounded-sm border border-white/[0.07] bg-white/[0.035] p-4 sm:p-5">
                  <h3 className="font-serif text-lg text-alarak-gold sm:text-xl">{t("Specialty coffee")}</h3>
                  <p className="mt-1 font-sans text-[11px] leading-5 text-alarak-cream/50">{t("Single-origin beans, carefully brewed")}</p>
                </div>
              </div>
            </div>

            <figure className="group relative order-1 lg:order-2">
              <div aria-hidden="true" className="absolute -inset-3 rounded-md bg-gradient-to-br from-alarak-gold/25 via-transparent to-transparent opacity-60 blur-xl transition-opacity duration-500 group-hover:opacity-90" />
              <div className="relative overflow-hidden rounded-sm border border-alarak-gold/25 bg-[#111a29] shadow-[0_24px_80px_rgba(0,0,0,0.32)]">
                <div className="relative aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5]">
                  <Image
                    src={pastryPhoto}
                    alt={t("Alarak artisan berry tartlet, prepared with care")}
                    fill
                    unoptimized
                    sizes="(max-width: 1024px) 100vw, 48vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    priority
                  />
                  <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#070c18]/75 via-transparent to-transparent" />
                  <figcaption className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                    <p className="font-sans text-[9px] font-semibold uppercase tracking-[0.22em] text-alarak-gold">{t("Handcrafted perfection")}</p>
                    <p className="mt-1 font-serif text-xl text-white sm:text-2xl">{t("Fresh berry tartlets, made daily")}</p>
                  </figcaption>
                </div>
              </div>
            </figure>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-[#faf6f0] py-14 text-alarak-navy-dark sm:py-16">
        <div aria-hidden="true" className="absolute left-1/2 top-0 h-px w-40 -translate-x-1/2 bg-gradient-to-r from-transparent via-alarak-gold to-transparent" />
        <Container size="narrow" className="text-center">
          <span className="font-arabic text-2xl font-bold text-alarak-gold sm:text-3xl" lang="ar" dir="rtl">الأرك</span>
          <blockquote className="mt-4 font-serif text-2xl italic leading-snug sm:text-3xl">
            {t("Coffee is not just a drink; it’s an invitation to slow down, connect, and savor the finest moments in life.")}
          </blockquote>
          <p className="mt-5 font-sans text-[9px] font-semibold uppercase tracking-[0.25em] text-alarak-navy-dark/55">{t("The Alarak philosophy")}</p>
        </Container>
      </section>

      <section className="py-16 sm:py-20 lg:py-28">
        <Container size="wide">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <figure className="group relative">
              <div aria-hidden="true" className="absolute -inset-3 rounded-md bg-gradient-to-bl from-alarak-gold/25 via-transparent to-transparent opacity-60 blur-xl transition-opacity duration-500 group-hover:opacity-90" />
              <div className="relative overflow-hidden rounded-sm border border-alarak-gold/25 bg-[#111a29] shadow-[0_24px_80px_rgba(0,0,0,0.32)]">
                <div className="relative aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5]">
                  <Image
                    src={founderPhoto}
                    alt={t("Alarak founder welcoming guests")}
                    fill
                    sizes="(max-width: 1024px) 100vw, 48vw"
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#070c18]/75 via-transparent to-transparent" />
                  <figcaption className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                    <p className="font-sans text-[9px] font-semibold uppercase tracking-[0.22em] text-alarak-gold">{t("Warm hospitality")}</p>
                    <p className="mt-1 font-serif text-xl text-white sm:text-2xl">{t("A welcome that feels like home")}</p>
                  </figcaption>
                </div>
              </div>
            </figure>

            <div className="space-y-6 lg:py-8">
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-alarak-gold" />
                <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-alarak-gold">{t("Our vision")}</span>
              </div>
              <h2 className="font-serif text-3xl leading-tight text-white sm:text-4xl">
                {t("An Elegant Refuge in ")}<span className="italic text-alarak-gold">{t("the Heart of Fnideq")}</span>
              </h2>
              <p className="font-sans text-sm font-light leading-7 text-alarak-cream/75 sm:text-base">
                {t("ALARAK brings contemporary elegance together with the warmth of Moroccan hospitality, creating a welcoming place for coffee lovers and pastry enthusiasts.")}
              </p>
              <p className="font-sans text-sm font-light leading-7 text-alarak-cream/55">
                {t("Whether you’re stopping in for your morning coffee or meeting friends over something sweet, we hope each visit becomes a small ritual worth returning to.")}
              </p>
              <Link href="/visit" className="group inline-flex items-center gap-3 pt-2 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-alarak-gold transition-colors hover:text-alarak-cream">
                {t("Visit our location")} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-white/[0.06] bg-[#080d16] py-12">
        <Container className="flex flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">
          <div>
            <p className="font-serif text-2xl text-white">{t("Come share a moment with us.")}</p>
            <p className="mt-1 font-sans text-xs text-alarak-cream/50">{t("Good coffee, thoughtful pastries, and a warm welcome in Fnideq.")}</p>
          </div>
          <Link href="/menu" className="inline-flex items-center gap-2 border border-alarak-gold/60 px-5 py-3 font-sans text-[9px] font-semibold uppercase tracking-[0.2em] text-alarak-gold transition-colors hover:bg-alarak-gold hover:text-alarak-navy-dark">
            {t("Explore the menu")} <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </Container>
      </section>
    </>
  );
}
