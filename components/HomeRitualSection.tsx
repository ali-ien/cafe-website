"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui";
import { useLanguage } from "@/lib/language";

const copy = {
  fr: {
    eyebrow: "UN INSTANT À SAVOURER",
    titleFirst: "Le plaisir de",
    titleAccent: "prendre son temps.",
    description:
      "Un café de spécialité, une pâtisserie façonnée à la main et une atmosphère chaleureuse. Chez ALARAK, chaque visite est une invitation à ralentir et à savourer l’instant.",
    detail: "Préparé avec soin, chaque jour à Fnideq",
    cta: "Découvrir notre menu",
    imageAlt: "Tarte artisanale aux framboises préparée chez Alarak",
  },
  ar: {
    eyebrow: "لحظة تستحق التذوق",
    titleFirst: "متعة",
    titleAccent: "التمهّل والاستمتاع.",
    description:
      "قهوة مختصة، وحلوى مصنوعة يدوياً، وأجواء دافئة. في الأراك، كل زيارة دعوة للاسترخاء والاستمتاع باللحظة.",
    detail: "تحضير يومي بعناية في الفنيدق",
    cta: "اكتشفوا قائمتنا",
    imageAlt: "تارت توت العليق المحضّرة يدوياً في الأراك",
  },
  en: {
    eyebrow: "A MOMENT TO SAVOR",
    titleFirst: "The pleasure of",
    titleAccent: "slowing down.",
    description:
      "Specialty coffee, a pastry shaped by hand, and a warm atmosphere. At ALARAK, every visit is an invitation to slow down and savor the moment.",
    detail: "Thoughtfully made every day in Fnideq",
    cta: "Explore our menu",
    imageAlt: "Handcrafted raspberry tart from Alarak",
  },
} as const;

export function HomeRitualSection() {
  const { language } = useLanguage();
  const text = copy[language];

  return (
    <section className="relative overflow-hidden bg-[#0b1528] py-14 text-alarak-cream sm:py-18 lg:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-alarak-gold/[0.07] blur-[100px]"
      />
      <Container size="wide" className="relative grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div className="relative mx-auto w-full max-w-[560px] lg:mx-0">
          <div className="absolute -inset-2 border border-alarak-gold/35 sm:-inset-3" />
          <div className="relative aspect-[4/3] overflow-hidden bg-[#131d2e]">
            <Image
              src="/media/cakes/cake-01.jpg"
              alt=""
              fill
              sizes="(max-width: 1024px) 90vw, 48vw"
              quality={75}
              aria-hidden="true"
              className="scale-110 object-cover blur-xl opacity-35"
            />
            <div className="absolute inset-0 bg-[#131d2e]/20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative h-full aspect-[3/4] max-w-full shadow-[0_12px_40px_rgba(0,0,0,0.3)]">
                <Image
                  src="/media/cakes/cake-01.jpg"
                  alt={text.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 75vw, 36vw"
                  quality={90}
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-xl lg:py-5">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-7 bg-alarak-gold" />
            <p className="font-sans text-[9px] font-medium uppercase tracking-[0.24em] text-alarak-gold sm:text-[10px]">
              {text.eyebrow}
            </p>
          </div>
          <h2 className="font-serif text-4xl font-light leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-[58px]">
            {text.titleFirst} <span className="italic text-alarak-gold">{text.titleAccent}</span>
          </h2>
          <p className="mt-6 max-w-lg font-sans text-sm font-light leading-7 text-alarak-cream/65 sm:text-base sm:leading-8">
            {text.description}
          </p>
          <div className="mt-7 flex items-center gap-3 border-t border-white/10 pt-5">
            <span aria-hidden="true" className="h-1.5 w-1.5 rotate-45 bg-alarak-gold" />
            <p className="font-sans text-[9px] uppercase tracking-[0.14em] text-alarak-cream/45 sm:text-[10px]">
              {text.detail}
            </p>
          </div>
          <Link
            href="/menu"
            className="group mt-8 inline-flex items-center gap-2 border-b border-alarak-gold/50 pb-2 font-sans text-[10px] font-medium uppercase tracking-[0.16em] text-alarak-gold transition-colors hover:border-alarak-cream hover:text-alarak-cream"
          >
            {text.cta}
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
