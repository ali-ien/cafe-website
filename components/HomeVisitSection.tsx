"use client";

import Link from "next/link";
import { Container } from "@/components/ui";
import { useLanguage } from "@/lib/language";
import { LocationMap } from "@/components/LocationMap";

function LocationIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5 shrink-0">
      <path d="M12 22s8-7.1 8-13a8 8 0 1 0-16 0c0 5.9 8 13 8 13Z" fill="currentColor" />
      <circle cx="12" cy="9" r="2.7" fill="#fff" />
    </svg>
  );
}

function HoursIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5 shrink-0">
      <circle cx="12" cy="12" r="10" fill="currentColor" />
      <path d="M12 6.5v5.7l3.8 2.2" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ContactIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5 shrink-0">
      <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.32.56 3.57.56a1 1 0 0 1 1 1v3.5a1 1 0 0 1-1 1C10.28 21 3 13.72 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2Z" />
    </svg>
  );
}

const boutiqueInfo = [
  {
    label: "Location",
    icon: LocationIcon,
    content: (translate: (text: string) => string) => (
      <Link
        href="https://maps.google.com/?q=Fnideq%2C%20Morocco"
        target="_blank"
        rel="noopener noreferrer"
        className="text-alarak-navy-dark/60 transition-colors hover:text-alarak-gold"
      >
        {translate("Fnideq")}<br />{translate("Morocco")}
      </Link>
    ),
  },
  {
    label: "Opening Hours",
    icon: HoursIcon,
    content: (translate: (text: string) => string) => (
      <p className="text-alarak-navy-dark/60">
        {translate("Monday – Sunday")}<br />{translate("08:00 AM – 10:00 PM")}
      </p>
    ),
  },
  {
    label: "Contact",
    icon: ContactIcon,
    content: (
      <div className="flex flex-col items-start">
        <a href="tel:+212663464174" className="text-alarak-navy-dark/60 transition-colors hover:text-alarak-gold">
          +212 663 46 41 74
        </a>
        <a href="mailto:contact@alarak.ma" className="text-alarak-navy-dark/60 transition-colors hover:text-alarak-gold">
          contact@alarak.ma
        </a>
      </div>
    ),
  },
];

export function HomeVisitSection() {
  const { t } = useLanguage();
  return (
    <section className="bg-[#F4EFE8] px-4 py-12 text-alarak-navy-dark sm:px-6 sm:py-16 lg:py-20">
      <Container className="text-center">
        <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.3em] text-alarak-gold sm:text-xs">
          {t("Visit our boutique")}
        </p>
        <h2 className="mt-4 font-serif text-4xl font-normal leading-tight sm:text-5xl lg:text-[56px]">
          {t("Experience ALARAK In Person")}
        </h2>
        <p className="mx-auto mt-5 max-w-2xl font-sans text-sm font-light leading-7 text-slate-500 sm:text-base">
          {t("Join us in Fnideq for exceptional coffee, fresh pastries, and an atmosphere designed for relaxation.")}
        </p>

        <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 border border-[#e7e0d7] bg-white px-5 py-6 text-left shadow-[0_2px_8px_rgba(32,28,20,0.04)] sm:mt-12 sm:grid-cols-3 sm:px-7 sm:py-8 lg:px-10 lg:py-10">
          {boutiqueInfo.map(({ label, icon: Icon, content }, index) => (
            <div
              key={label}
              className={`flex gap-4 py-4 sm:py-0 ${index > 0 ? "border-t border-[#eee8e0] sm:border-l sm:border-t-0 sm:pl-6 lg:pl-8" : ""} ${index < 2 ? "sm:pr-4 lg:pr-6" : ""}`}
            >
              <span aria-hidden="true" className="mt-1 text-alarak-gold">
                <Icon />
              </span>
              <div>
                <h3 className="font-serif text-lg text-alarak-navy-dark sm:text-xl">{t(label)}</h3>
                <div className="mt-1 font-sans text-xs leading-5 sm:text-[13px]">
                  {typeof content === "function" ? content(t) : content}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-5 h-[260px] max-w-3xl overflow-hidden rounded-[2px] border border-[#e7e0d7] shadow-[0_8px_32px_rgba(32,28,20,0.08)] sm:mt-6 sm:h-[330px]">
          <LocationMap />
        </div>
      </Container>
    </section>
  );
}
