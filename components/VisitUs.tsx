"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { MapPin, Clock, Phone, ArrowRight, Navigation } from "lucide-react";
import { Container, EditorialReveal, Button } from "@/components/ui";
import { useLanguage } from "@/lib/language";

const easeEditorial: [number, number, number, number] = [0.16, 1, 0.3, 1];

const LeafMotif: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    aria-hidden="true"
    focusable="false"
    viewBox="0 0 120 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M60 185 Q58 130 55 90 Q52 50 60 18" stroke="#C5A059" strokeWidth="1.1" strokeLinecap="round" />
    <path d="M58 155 Q32 135 12 122" stroke="#C5A059" strokeWidth="0.9" strokeLinecap="round" />
    <path d="M57 120 Q30 100 10 88" stroke="#C5A059" strokeWidth="0.85" strokeLinecap="round" />
    <path d="M58 88 Q82 68 100 58" stroke="#C5A059" strokeWidth="0.8" strokeLinecap="round" />
    <ellipse cx="10" cy="120" rx="12" ry="6" transform="rotate(-20 10 120)" fill="#C5A059" fillOpacity="0.4" />
    <ellipse cx="8" cy="88" rx="10" ry="5" transform="rotate(-22 8 88)" fill="#C5A059" fillOpacity="0.34" />
    <ellipse cx="102" cy="56" rx="11" ry="5" transform="rotate(18 102 56)" fill="#C5A059" fillOpacity="0.38" />
  </svg>
);

const MapEmbed: React.FC = () => {
  const { t } = useLanguage();
  return (
  <div className="relative w-full h-full rounded-[2px] overflow-hidden bg-[#EDE8DF]">
    <svg
      viewBox="0 0 320 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    >
      <rect width="320" height="260" fill="#EDE8DF" />
      <rect x="200" y="0" width="120" height="110" fill="#C8D8E8" fillOpacity="0.65" />
      <line x1="0" y1="100" x2="320" y2="100" stroke="#fff" strokeWidth="5" />
      <line x1="0" y1="155" x2="320" y2="155" stroke="#fff" strokeWidth="3.5" />
      <line x1="0" y1="200" x2="320" y2="200" stroke="#fff" strokeWidth="2.5" />
      <line x1="80" y1="0" x2="80" y2="260" stroke="#fff" strokeWidth="3" />
      <line x1="160" y1="0" x2="160" y2="260" stroke="#fff" strokeWidth="5" />
      <line x1="240" y1="0" x2="240" y2="260" stroke="#fff" strokeWidth="3" />
      <line x1="0" y1="70" x2="160" y2="70" stroke="#fff" strokeWidth="2" />
      <line x1="0" y1="130" x2="320" y2="130" stroke="#fff" strokeWidth="2" />
      <line x1="120" y1="0" x2="120" y2="260" stroke="#fff" strokeWidth="2" />
      <line x1="200" y1="100" x2="200" y2="260" stroke="#fff" strokeWidth="2" />
      <rect x="81" y="101" width="78" height="53" fill="#D8D0C0" fillOpacity="0.7" rx="1" />
      <rect x="81" y="156" width="38" height="43" fill="#D8D0C0" fillOpacity="0.6" rx="1" />
      <rect x="121" y="156" width="38" height="43" fill="#D8D0C0" fillOpacity="0.5" rx="1" />
      <rect x="161" y="101" width="38" height="53" fill="#D8D0C0" fillOpacity="0.55" rx="1" />
      <text x="207" y="25" fontFamily="serif" fontSize="8" fill="#8B9AAB" letterSpacing="0.5">Mediterranean Sea</text>
      <text x="88" y="90" fontFamily="serif" fontSize="13" fill="#5a5242" letterSpacing="1">{t("Fnideq")}</text>
      <text x="88" y="230" fontFamily="serif" fontSize="8" fill="#8B9070" letterSpacing="0.4">{t("Morocco")}</text>
      <circle cx="200" cy="128" r="14" fill="#C5A059" fillOpacity="0.18" />
      <circle cx="200" cy="128" r="8" fill="#C5A059" />
      <circle cx="200" cy="128" r="4" fill="#fff" />
      <path d="M200 136 L200 146" stroke="#C5A059" strokeWidth="2" strokeLinecap="round" />
    </svg>
    <a
      href="https://maps.google.com/?q=Fnideq%2C%20Morocco"
      target="_blank"
      rel="noopener noreferrer"
      className="absolute inset-0 flex items-end justify-end p-3"
      aria-label={t("Open Fnideq on Google Maps")}
    >
      <span className="font-sans text-[10px] text-alarak-navy-dark/50 bg-white/70 px-1.5 py-0.5 rounded-sm backdrop-blur-sm">
        {t("View on Maps")}
      </span>
    </a>
  </div>
  );
};

interface InfoRowProps {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
  delay?: number;
}

const InfoRow: React.FC<InfoRowProps> = ({ icon, label, children, delay = 0 }) => {
  const { t } = useLanguage();
  return (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.4 }}
    transition={{ duration: 0.7, delay, ease: easeEditorial }}
    className="flex items-start gap-3.5"
  >
    <span className="mt-[2px] shrink-0 text-alarak-gold">{icon}</span>
    <div>
      <p className="font-sans text-[9px] sm:text-[10px] uppercase tracking-[0.28em] text-alarak-gold font-medium mb-0.5">
        {t(label)}
      </p>
      {children}
    </div>
  </motion.div>
  );
};

export const VisitUs: React.FC = () => {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative w-full bg-[#FAF7F2] text-alarak-navy-dark overflow-x-hidden">
      <div className="pt-32 sm:pt-36 lg:pt-40" />

      <section
        id="visit-us"
        className="relative"
        aria-labelledby="visit-us-heading"
      >
        <Container size="wide" className="pb-16 sm:pb-20 lg:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr_1fr] gap-8 lg:gap-10 xl:gap-12 items-center">

            {/* Col 1: Cafe Image — luxury gold frame */}
            <motion.div
              initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: shouldReduceMotion ? 0.3 : 1.1, ease: easeEditorial }}
              className="relative p-3 lg:p-4"
            >
              {/* Outer gold border frame */}
              <div
                className="absolute inset-0 rounded-[3px]"
                style={{ border: "1px solid rgba(197,160,89,0.55)" }}
              />

              {/* Inner inset frame line */}
              <div
                className="absolute inset-[6px] lg:inset-[8px] rounded-[2px] pointer-events-none"
                style={{ border: "1px solid rgba(197,160,89,0.22)" }}
              />

              {/* Corner accents — top-left */}
              <span aria-hidden="true" className="absolute top-0 left-0 w-6 h-6 pointer-events-none">
                <span className="absolute top-[4px] left-[4px] w-4 h-px bg-alarak-gold" />
                <span className="absolute top-[4px] left-[4px] w-px h-4 bg-alarak-gold" />
              </span>
              {/* Corner accents — top-right */}
              <span aria-hidden="true" className="absolute top-0 right-0 w-6 h-6 pointer-events-none">
                <span className="absolute top-[4px] right-[4px] w-4 h-px bg-alarak-gold" />
                <span className="absolute top-[4px] right-[4px] w-px h-4 bg-alarak-gold" />
              </span>
              {/* Corner accents — bottom-left */}
              <span aria-hidden="true" className="absolute bottom-0 left-0 w-6 h-6 pointer-events-none">
                <span className="absolute bottom-[4px] left-[4px] w-4 h-px bg-alarak-gold" />
                <span className="absolute bottom-[4px] left-[4px] w-px h-4 bg-alarak-gold" />
              </span>
              {/* Corner accents — bottom-right */}
              <span aria-hidden="true" className="absolute bottom-0 right-0 w-6 h-6 pointer-events-none">
                <span className="absolute bottom-[4px] right-[4px] w-4 h-px bg-alarak-gold" />
                <span className="absolute bottom-[4px] right-[4px] w-px h-4 bg-alarak-gold" />
              </span>

              {/* Photo */}
              <div className="relative min-h-[280px] sm:min-h-[340px] lg:h-[420px] rounded-[1px] overflow-hidden shadow-[0_12px_48px_rgba(7,12,24,0.14)]">
                <Image
                  src="/media/cafe-coming-soon.jpg"
                  alt="Alarak Coffee & Bakery – Coming Soon"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  quality={92}
                  className="object-cover object-center"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(7,12,24,0.62) 0%, rgba(7,12,24,0.18) 45%, transparent 100%)",
                  }}
                />
                <div className="absolute bottom-5 left-5 right-5 flex flex-col items-start gap-1">
                  <span className="font-sans text-[9px] uppercase tracking-[0.35em] text-alarak-gold font-medium">
                    Our Location
                  </span>
                  <span className="font-serif text-2xl sm:text-3xl tracking-[0.08em] text-alarak-cream font-light">
                    Coming Soon
                  </span>
                  <div className="mt-1 w-12 h-px bg-alarak-gold/60" />
                </div>
              </div>
            </motion.div>

            {/* Col 2: Visit Info */}
            <div className="flex flex-col justify-center py-4 lg:py-0 lg:px-2">
              <EditorialReveal>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-6 h-px bg-alarak-gold/80" />
                  <p className="font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.32em] text-alarak-gold font-medium">
                    Visit Us
                  </p>
                </div>
              </EditorialReveal>

              <EditorialReveal delay={0.06}>
                <h1
                  id="visit-us-heading"
                  className="font-serif text-[34px] sm:text-[42px] lg:text-[46px] font-normal tracking-[0.04em] leading-[1.1] text-alarak-navy-dark mb-5 sm:mb-6"
                >
                  Come by,<br />
                  <span className="italic font-light">{t("stay awhile.")}</span>
                </h1>
              </EditorialReveal>

              <EditorialReveal delay={0.12}>
                <p className="font-sans text-[14px] sm:text-[15px] text-alarak-navy-dark/60 font-light leading-[1.75] mb-8 sm:mb-9 max-w-[340px]">
                  {t("We'd love to welcome you to Alarak. Enjoy our coffee, fresh pastries and handcrafted cakes in a warm and relaxed atmosphere.")}
                </p>
              </EditorialReveal>

              <div className="space-y-5 sm:space-y-6 mb-8 sm:mb-9">
                <InfoRow icon={<MapPin className="w-4 h-4" />} label="Our Location" delay={0.16}>
                  <p className="font-sans text-[14px] text-alarak-navy-dark/75 font-light leading-snug">
                    Fnideq, Morocco
                  </p>
                </InfoRow>

                <InfoRow icon={<Clock className="w-4 h-4" />} label="Opening Hours" delay={0.20}>
                  <p className="font-sans text-[14px] text-alarak-navy-dark/75 font-light leading-snug">
                    Daily<br />
                    <span className="text-alarak-navy-dark/50 text-[13px]">08:00 – 22:00</span>
                  </p>
                </InfoRow>

                <InfoRow icon={<Phone className="w-4 h-4" />} label="Phone" delay={0.24}>
                  <a
                    href="tel:+212537000000"
                    className="font-sans text-[14px] text-alarak-navy-dark/75 font-light hover:text-alarak-gold transition-colors duration-300"
                  >
                    +212 5 37 00 00 00
                  </a>
                </InfoRow>
              </div>

              <motion.div
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7, delay: 0.28, ease: easeEditorial }}
                className="flex flex-wrap items-center gap-3 sm:gap-4"
              >
                <a
                  href="https://maps.google.com/?q=Fnideq%2C%20Morocco"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="visit-get-directions-btn"
                  className="inline-flex items-center gap-2.5 bg-alarak-navy-dark text-alarak-cream px-5 py-3 font-sans text-[11px] uppercase tracking-[0.22em] hover:bg-alarak-navy-dark/85 transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_6px_20px_rgba(7,12,24,0.22)] rounded-[1px] focus-ring"
                >
                  <Navigation className="w-3.5 h-3.5 text-alarak-gold" />
                  Get Directions
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
                <Link
                  href="/#visit"
                  id="visit-contact-us-btn"
                  className="inline-flex items-center font-sans text-[11px] uppercase tracking-[0.22em] text-alarak-navy-dark/60 hover:text-alarak-gold border-b border-alarak-navy-dark/25 hover:border-alarak-gold pb-px transition-all duration-300 focus-ring"
                >
                  Contact Us
                </Link>
              </motion.div>
            </div>

            {/* Col 3: Map */}
            <motion.div
              initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: shouldReduceMotion ? 0.3 : 1.1, delay: 0.1, ease: easeEditorial }}
              className="relative min-h-[260px] sm:min-h-[320px] lg:h-[420px] rounded-[2px] overflow-hidden shadow-[0_8px_32px_rgba(7,12,24,0.07)]"
            >
              <MapEmbed />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 right-0 w-28 h-40 opacity-20 select-none"
              >
                <LeafMotif className="w-full h-full" />
              </div>
            </motion.div>

          </div>
        </Container>
      </section>

      <div className="border-t border-alarak-gold/15" />
    </div>
  );
};
