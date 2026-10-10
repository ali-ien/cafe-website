"use client";

import Image from "next/image";
import { useState } from "react";
import { Container } from "@/components/ui";
import { useLanguage } from "@/lib/language";

type CredentialType = "diploma" | "certificate";
type CredentialFilter = "all" | CredentialType;

const credentials: {
  type: CredentialType;
  image: string;
  imageAlt: string;
  number: string;
  title: string;
  year: string;
  hours: string;
  honor: string;
  description: string;
  caption: string;
}[] = [
  {
    type: "diploma",
    image: "/media/our-story/ice-culinary-diploma.jpeg",
    imageAlt: "Abdellah El Idrissi's Culinary Arts diploma",
    number: "01",
    title: "Culinary Arts Diploma",
    year: "2016",
    hours: "720",
    honor: "Graduated with Highest Honors",
    description:
      "Intensive training in cooking, nutrition, food preparation, and culinary techniques at the Institute of Culinary Education in New York. Graduated with Highest Honors.",
    caption: "Culinary Arts · 2016",
  },
  {
    type: "diploma",
    image: "/media/our-story/ice-diploma.jpeg",
    imageAlt: "Abdellah El Idrissi's Pastry and Baking Arts diploma",
    number: "02",
    title: "Pastry & Baking Arts Diploma",
    year: "2018",
    hours: "600",
    honor: "Graduated with Highest Honors",
    description:
      "Intensive training in pastry, baking, dessert production, and confectionery arts at the Institute of Culinary Education in New York. Graduated with Highest Honors.",
    caption: "Pastry & Baking Arts · 2018",
  },
  {
    type: "certificate",
    image: "/media/our-story/carte_sticker_originale (6).png",
    imageAlt: "Abdellah El Idrissi's New York City Department of Health and Mental Hygiene food protection certificate",
    number: "03",
    title: "Food Protection Certificate",
    year: "2018",
    hours: "Food Safety",
    honor: "Issued by NYC Health",
    description:
      "Qualified under the New York City Department of Health and Mental Hygiene in food protection standards and safe food handling practices, strengthening his commitment to trusted, high-standard preparation.",
    caption: "Food Protection · 2018",
  },
];

export function OurStoryExperience() {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<CredentialFilter>("all");
  const filters: { value: CredentialFilter; label: string }[] = [
    { value: "all", label: "All" },
    { value: "diploma", label: "Diplomas" },
    { value: "certificate", label: "Certificates" },
  ];
  const filteredCredentials = credentials.filter(
    (credential) => activeFilter === "all" || credential.type === activeFilter,
  );

  return (
    <>
      <section className="relative isolate flex min-h-[620px] items-center overflow-hidden border-b border-white/[0.08] bg-alarak-navy-dark py-32 sm:min-h-[700px] sm:py-40">
        <Image
          src="/media/our-story/owner (2).png"
          alt=""
          fill
          priority
          unoptimized
          sizes="100vw"
          className="-z-20 object-cover object-[center_38%]"
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(5,10,20,0.92)_0%,rgba(5,10,20,0.76)_52%,rgba(5,10,20,0.42)_100%)]" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-alarak-navy-dark via-transparent to-alarak-navy-dark/25" />
        <Container size="wide">
          <div className="max-w-3xl">
            <p className="mb-5 font-sans text-[10px] font-semibold uppercase tracking-[0.3em] text-alarak-gold sm:text-xs">
              {t("Our Story")}
            </p>
            <h1 className="font-serif text-4xl font-medium leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl">
              {t("Crafting Moments of Pure Warmth &")}
              <span className="mt-2 block font-normal italic text-alarak-gold">
                {t("Artisan Mastery in Fnideq")}
              </span>
            </h1>
            <div aria-hidden="true" className="my-7 h-px w-24 bg-gradient-to-r from-alarak-gold to-transparent sm:my-9" />
            <p className="max-w-2xl font-sans text-base font-light leading-7 text-white/85 sm:text-lg sm:leading-8">
              {t("Specialty coffee and artisan pastry, made slowly in Fnideq — a warm place to pause, savor, and return to.")}
            </p>
          </div>
        </Container>
      </section>

      <section className="border-b border-white/[0.08] bg-alarak-navy-dark py-5 sm:py-6">
        <Container size="wide">
          <div className="flex justify-center gap-3 overflow-x-auto pb-1" role="group" aria-label={t("Filter credentials")}>
            {filters.map((filter) => {
              const isActive = activeFilter === filter.value;

              return (
                <button
                  key={filter.value}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveFilter(filter.value)}
                  className={`shrink-0 rounded-full px-6 py-3 font-sans text-[10px] font-semibold uppercase tracking-[0.14em] transition-colors sm:px-7 sm:text-xs ${
                    isActive
                      ? "bg-alarak-gold text-alarak-navy-dark"
                      : "bg-white/[0.05] text-white/55 hover:bg-white/[0.09] hover:text-white"
                  }`}
                >
                  {t(filter.label)}
                </button>
              );
            })}
          </div>
        </Container>
      </section>

      {filteredCredentials.map((diploma, index) => (
        <section
          key={diploma.number}
          id={diploma.number === "01" ? "career" : undefined}
          className="scroll-mt-24 border-b border-white/[0.07] py-14 sm:py-20 lg:py-24"
        >
          <Container size="wide">
            <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
              <div className={`space-y-5 ${index % 2 ? "lg:order-2" : ""}`}>
                <p className="font-sans text-[9px] font-semibold uppercase tracking-[0.26em] text-alarak-gold sm:text-[10px]">
                  {t("Institute of Culinary Education")} · {diploma.number}
                </p>
                <h2 className="font-serif text-3xl font-light leading-[1.08] text-white sm:text-4xl lg:text-5xl">
                  {t(diploma.title)}
                </h2>
                <p className="max-w-xl font-sans text-sm font-light leading-7 text-alarak-cream/75 sm:text-base sm:leading-8">
                  {t(diploma.description)}
                </p>
                <div className="flex flex-wrap gap-8 border-t border-alarak-gold/25 pt-5">
                  <div>
                    <p className="font-serif text-2xl text-alarak-gold sm:text-3xl">{diploma.hours}</p>
                    <p className="mt-1 font-sans text-[8px] uppercase tracking-[0.16em] text-alarak-cream/55 sm:text-[9px]">
                      {t("Hours of training")}
                    </p>
                  </div>
                  <div>
                    <p className="font-serif text-2xl text-alarak-gold sm:text-3xl">{diploma.year}</p>
                    <p className="mt-1 font-sans text-[8px] uppercase tracking-[0.16em] text-alarak-cream/55 sm:text-[9px]">
                      {t(diploma.honor)}
                    </p>
                  </div>
                </div>
              </div>

              <figure className={`group relative mx-auto w-full max-w-2xl ${index % 2 ? "lg:order-1" : ""}`}>
                <div className="relative aspect-[1.34/1] overflow-hidden bg-transparent">
                  <Image
                    src={diploma.image}
                    alt={t(diploma.imageAlt)}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    quality={90}
                    className="object-contain transition-transform duration-700 group-hover:scale-[1.01]"
                  />
                </div>
                <figcaption className="mt-4 flex flex-col justify-between gap-1 font-sans text-[8px] uppercase tracking-[0.16em] text-alarak-cream/50 sm:flex-row sm:text-[9px]">
                  <span>{t("Institute of Culinary Education")}</span>
                  <span className="text-alarak-gold/80">{t(diploma.caption)}</span>
                </figcaption>
              </figure>
            </div>
          </Container>
        </section>
      ))}
    </>
  );
}
