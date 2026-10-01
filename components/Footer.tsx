"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  MapPin,
  Clock,
  ArrowRight,
  ArrowUp,
} from "lucide-react";
import { Container } from "@/components/ui";
import { mediaAssets } from "@/lib/media";
import { useLanguage } from "@/lib/language";

// ─── Constants ────────────────────────────────────────────────────────────────

const INSTAGRAM_URL = "https://www.instagram.com/alarak.ma?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw==";

const EXPLORE_LINKS = [
  { name: "Home", href: "/" },
  { name: "Our Story", href: "/our-story" },
  { name: "Menu", href: "/menu" },
  { name: "Contact", href: "/visit" },
] as const;

const LEGAL_LINKS = [
  { name: "العربية", href: "#ar" },
  { name: "English", href: "#en" },
  { name: "Privacy", href: "#privacy" },
  { name: "Terms", href: "#terms" },
] as const;

const easeEditorial: [number, number, number, number] = [0.16, 1, 0.3, 1];

// ─── Sub-components ───────────────────────────────────────────────────────────

const FooterColumn: React.FC<{
  delay: number;
  children: React.ReactNode;
  className?: string;
  id?: string;
}> = ({ delay, children, className, id }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: shouldReduceMotion ? 0.3 : 1,
        delay: shouldReduceMotion ? 0 : delay,
        ease: easeEditorial,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/** Decorative botanical SVG — coffee plant sketch, right-side accent */
const BotanicalAccent: React.FC = () => (
  <svg
    aria-hidden="true"
    focusable="false"
    viewBox="0 0 260 420"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="pointer-events-none select-none h-full w-full opacity-[0.055]"
    preserveAspectRatio="xMaxYMid meet"
  >
    {/* Main stem */}
    <path
      d="M130 400 Q128 300 125 220 Q122 140 130 60"
      stroke="#C5A059"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    {/* Left branches */}
    <path d="M127 340 Q90 310 50 295" stroke="#C5A059" strokeWidth="0.9" strokeLinecap="round" />
    <path d="M126 290 Q85 265 42 248" stroke="#C5A059" strokeWidth="0.9" strokeLinecap="round" />
    <path d="M125 240 Q88 210 55 195" stroke="#C5A059" strokeWidth="0.9" strokeLinecap="round" />
    <path d="M126 190 Q92 165 65 150" stroke="#C5A059" strokeWidth="0.9" strokeLinecap="round" />
    <path d="M127 145 Q95 120 72 108" stroke="#C5A059" strokeWidth="0.8" strokeLinecap="round" />
    {/* Right branches */}
    <path d="M129 320 Q168 295 208 280" stroke="#C5A059" strokeWidth="0.9" strokeLinecap="round" />
    <path d="M128 268 Q170 244 212 228" stroke="#C5A059" strokeWidth="0.9" strokeLinecap="round" />
    <path d="M127 218 Q168 192 206 178" stroke="#C5A059" strokeWidth="0.8" strokeLinecap="round" />
    <path d="M128 170 Q165 145 200 132" stroke="#C5A059" strokeWidth="0.8" strokeLinecap="round" />
    <path d="M129 125 Q160 102 188 92" stroke="#C5A059" strokeWidth="0.7" strokeLinecap="round" />
    {/* Leaves — left */}
    <ellipse cx="42" cy="290" rx="18" ry="9" transform="rotate(-20 42 290)" fill="#C5A059" fillOpacity="0.5" />
    <ellipse cx="35" cy="245" rx="16" ry="8" transform="rotate(-25 35 245)" fill="#C5A059" fillOpacity="0.45" />
    <ellipse cx="48" cy="193" rx="15" ry="7" transform="rotate(-18 48 193)" fill="#C5A059" fillOpacity="0.4" />
    <ellipse cx="60" cy="148" rx="13" ry="6" transform="rotate(-22 60 148)" fill="#C5A059" fillOpacity="0.35" />
    {/* Leaves — right */}
    <ellipse cx="215" cy="278" rx="18" ry="8" transform="rotate(18 215 278)" fill="#C5A059" fillOpacity="0.5" />
    <ellipse cx="218" cy="226" rx="16" ry="7" transform="rotate(22 218 226)" fill="#C5A059" fillOpacity="0.45" />
    <ellipse cx="210" cy="177" rx="14" ry="6" transform="rotate(20 210 177)" fill="#C5A059" fillOpacity="0.38" />
    {/* Coffee cherries */}
    <circle cx="42" cy="290" r="3.5" fill="#C5A059" fillOpacity="0.7" />
    <circle cx="35" cy="245" r="3" fill="#C5A059" fillOpacity="0.65" />
    <circle cx="215" cy="278" r="3.5" fill="#C5A059" fillOpacity="0.7" />
    <circle cx="218" cy="226" r="3" fill="#C5A059" fillOpacity="0.65" />
  </svg>
);

/** Decorative floral mark for the bottom bar */
const FloralMark: React.FC = () => (
  <svg
    aria-hidden="true"
    focusable="false"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-4 h-4 text-alarak-gold"
  >
    <path d="M12 2 C12 2 10 6 12 9 C14 6 12 2 12 2Z" fill="currentColor" fillOpacity="0.9" />
    <path d="M12 22 C12 22 10 18 12 15 C14 18 12 22 12 22Z" fill="currentColor" fillOpacity="0.9" />
    <path d="M2 12 C2 12 6 10 9 12 C6 14 2 12 2 12Z" fill="currentColor" fillOpacity="0.9" />
    <path d="M22 12 C22 12 18 10 15 12 C18 14 22 12 22 12Z" fill="currentColor" fillOpacity="0.9" />
    <circle cx="12" cy="12" r="2" fill="currentColor" />
  </svg>
);

/** Column heading label */
const ColumnHeading: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { t } = useLanguage();
  return (
  <p className="font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.32em] text-alarak-gold font-medium mb-5 sm:mb-6">
    {typeof children === "string" ? t(children) : children}
  </p>
);
};

// ─── Newsletter Form ──────────────────────────────────────────────────────────

const ContactMessageForm: React.FC = () => {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorText, setErrorText] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    setErrorText("");

    const formData = new FormData(e.currentTarget);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          message,
          website: formData.get("website"),
        }),
      });

      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        const errorMessage = result.error === "EMAIL_NOT_CONFIGURED"
          ? "Email is temporarily unavailable. Please contact us on WhatsApp."
          : result.error === "EMAIL_DELIVERY_FAILED"
            ? "Your message could not be delivered. Please try again later or contact us on WhatsApp."
            : "We could not send your message. Please check your details and try again.";
        setErrorText(t(errorMessage));
        setStatus("error");
        return;
      }
      setEmail("");
      setMessage("");
      setStatus("sent");
    } catch {
      setErrorText(t("We could not send your message. Please try again."));
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} aria-label={t("Send a message")} className="space-y-2.5">
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="footer-website">{t("Leave this field empty")}</label>
        <input id="footer-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <div>
        <label htmlFor="footer-email" className="sr-only">{t("Your email address")}</label>
        <input
          id="footer-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("Your email address")}
          required
          className="w-full rounded-sm border border-alarak-gold/25 bg-transparent px-3 py-2.5 font-sans text-xs text-alarak-cream placeholder-alarak-cream/35 transition-colors focus:border-alarak-gold/60 focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="footer-message" className="sr-only">{t("Your message")}</label>
        <textarea
          id="footer-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={t("Write your message...")}
          rows={3}
          required
          className="w-full resize-y rounded-sm border border-alarak-gold/25 bg-transparent px-3 py-2.5 font-sans text-xs leading-5 text-alarak-cream placeholder-alarak-cream/35 transition-colors focus:border-alarak-gold/60 focus:outline-none"
        />
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-alarak-gold px-3.5 py-2.5 font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-alarak-navy-dark transition-colors duration-300 hover:bg-alarak-gold-light focus-ring"
      >
        {status === "sending" ? t("Sending...") : t("Send message")} <ArrowRight className="h-3.5 w-3.5" />
      </button>
      <p className="font-sans text-[10px] leading-4 text-alarak-cream/35">
        {status === "sent"
          ? t("Your message has been sent. Thank you!")
          : status === "error"
            ? errorText
            : t("Your message will be sent directly to our team.")}
      </p>
    </form>
  );
};

// ─── Back to Top ─────────────────────────────────────────────────────────────

const BackToTop: React.FC = () => {
  const { t } = useLanguage();
  return (
  <button
    type="button"
    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    aria-label={t("Back to top")}
    className="group w-9 h-9 rounded-full border border-alarak-gold/45 text-alarak-gold flex items-center justify-center hover:bg-alarak-gold hover:text-alarak-navy-dark hover:border-alarak-gold transition-all duration-300 focus-ring shrink-0"
  >
    <ArrowUp className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
  </button>
  );
};

// ─── Main Footer ──────────────────────────────────────────────────────────────

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  const logoWeb = mediaAssets.logo.web;
  const shouldReduceMotion = useReducedMotion();

  return (
    <footer
      className="relative w-full bg-[#070c18] text-alarak-cream overflow-hidden"
      aria-labelledby="footer-brand-heading"
    >
      {/* Subtle noise texture overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: "radial-gradient(rgba(250,246,240,0.5) 0.5px, transparent 0.5px)",
          backgroundSize: "2.5px 2.5px",
        }}
      />

      {/* Botanical decorative element — desktop only */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 bottom-0 w-[240px] hidden lg:block overflow-hidden"
      >
        <BotanicalAccent />
      </div>

      {/* ── Main grid ─────────────────────────────────────────────────────── */}
      <Container
        size="wide"
        className="relative pt-14 sm:pt-18 lg:pt-20 pb-12 sm:pb-16 lg:pb-20"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1.5fr_1fr_2fr] gap-10 sm:gap-x-8 sm:gap-y-12 lg:gap-x-10 xl:gap-x-14">

          {/* ── Col 1: Brand ─────────────────────────────────────────────── */}
          <FooterColumn delay={0.06} className="sm:col-span-2 lg:col-span-1">
            {/* Logo + wordmark */}
            <a
              href="#"
              className="group inline-flex items-center gap-3.5 focus-ring rounded-sm"
              aria-label="Alarak Coffee & Bakery — Back to top"
            >
              <motion.div
                initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: shouldReduceMotion ? 0.3 : 0.9, ease: easeEditorial }}
                className="relative h-12 sm:h-14 w-auto aspect-[928/1144] shrink-0"
              >
                <Image
                  src={logoWeb.src}
                  alt={logoWeb.alt}
                  width={logoWeb.dimensions.width}
                  height={logoWeb.dimensions.height}
                  className="h-full w-auto object-contain"
                />
              </motion.div>
              <div
                id="footer-brand-heading"
                className="flex flex-col justify-center border-l border-alarak-gold/30 pl-3.5"
              >
                <span className="font-serif text-lg sm:text-xl tracking-[0.22em] text-alarak-cream font-medium leading-none group-hover:text-alarak-gold transition-colors duration-300">
                  ALARAK
                </span>
                <span className="font-sans text-[8px] sm:text-[9.5px] tracking-[0.3em] uppercase text-alarak-gold leading-none mt-1">
                  Coffee &amp; Bakery
                </span>
              </div>
            </a>

            {/* Description */}
            <p className="mt-5 max-w-[260px] font-sans text-[13.5px] text-alarak-cream/50 font-light leading-[1.8]">
              {t("Specialty coffee and artisan pastry, made slowly in Fnideq — a warm place to pause, savor, and return to.")}
            </p>

            {/* Social icons row */}
            <div className="mt-6 flex items-center gap-2.5" aria-label={t("Social media links")}>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("Follow Alarak on Instagram")}
                className="w-8 h-8 rounded-full border border-alarak-gold/25 flex items-center justify-center text-alarak-cream/50 hover:text-alarak-gold hover:border-alarak-gold/60 transition-all duration-300 focus-ring"
              >
                <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                </svg>
              </a>
              {/* Facebook */}
              <a
                href="https://www.facebook.com/share/1BVvEpkcAk/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("Follow Alarak on Facebook")}
                className="w-8 h-8 rounded-full border border-alarak-gold/25 flex items-center justify-center text-alarak-cream/50 hover:text-alarak-gold hover:border-alarak-gold/60 transition-all duration-300 focus-ring"
              >
                <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@alarakcoffeebakery"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("Follow Alarak on TikTok")}
                className="w-8 h-8 rounded-full border border-alarak-gold/25 flex items-center justify-center text-alarak-cream/50 hover:text-alarak-gold hover:border-alarak-gold/60 transition-all duration-300 focus-ring"
              >
                <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.73a8.27 8.27 0 0 0 4.84 1.55V6.83a4.85 4.85 0 0 1-1.07-.14z" />
                </svg>
              </a>
              {/* YouTube */}
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("Follow Alarak on YouTube")}
                className="w-8 h-8 rounded-full border border-alarak-gold/25 flex items-center justify-center text-alarak-cream/50 hover:text-alarak-gold hover:border-alarak-gold/60 transition-all duration-300 focus-ring"
              >
                <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
                </svg>
              </a>
            </div>
          </FooterColumn>

          {/* ── Col 2: Explore ───────────────────────────────────────────── */}
          <FooterColumn delay={0.12}>
            <ColumnHeading>{t("Explore")}</ColumnHeading>
            <nav aria-label={t("Footer navigation")}>
              <ul className="space-y-3.5">
                {EXPLORE_LINKS.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="font-sans text-[13.5px] text-alarak-cream/55 hover:text-alarak-gold transition-colors duration-300 focus-ring rounded-sm relative group inline-block"
                    >
                      <span className="relative">
                        {t(link.name)}
                        <span className="absolute -bottom-px left-0 w-0 h-px bg-alarak-gold/60 group-hover:w-full transition-all duration-300" />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </FooterColumn>

          {/* ── Col 3: Visit Us ──────────────────────────────────────────── */}
          <FooterColumn delay={0.18} id="visit">
            <ColumnHeading>{t("Visit Us")}</ColumnHeading>
            <address className="not-italic space-y-4 font-sans text-[13.5px] text-alarak-cream/55 font-light">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-alarak-gold/70 mt-[2px] shrink-0" aria-hidden="true" />
                <span>{t("Immeuble Alia, 18, Fnideq 93100")}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-3.5 h-3.5 text-alarak-gold/70 mt-[2px] shrink-0" aria-hidden="true" />
                <div>
                  <span className="block">{t("Daily")}</span>
                  <span className="block text-alarak-cream/70">{t("08:00 – 22:00")}</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-alarak-gold/70 mt-[2px] shrink-0">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                </svg>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-alarak-gold transition-colors duration-300 focus-ring rounded-sm"
                >
                  {t("Reservations via Instagram")}
                </a>
              </div>
            </address>
          </FooterColumn>

          {/* ── Col 4: Follow ────────────────────────────────────────────── */}
          <FooterColumn delay={0.24}>
            <ColumnHeading>{t("Follow")}</ColumnHeading>
            <ul className="space-y-3.5">
              <li>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 font-sans text-[13.5px] text-alarak-cream/55 hover:text-alarak-gold transition-colors duration-300 focus-ring rounded-sm"
                >
                  <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-alarak-gold/60 group-hover:text-alarak-gold transition-colors duration-300">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                  </svg>
                  <span>Instagram</span>
                  <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </a>
              </li>
            </ul>
          </FooterColumn>

          {/* ── Col 5: Stay in Touch ─────────────────────────────────────── */}
          <FooterColumn delay={0.30}>
            <ColumnHeading>{t("Send a message")}</ColumnHeading>
            <p className="font-sans text-[13.5px] text-alarak-cream/55 font-light leading-[1.75] mb-5 max-w-[240px]">
              {t("Have a question? Send us a note and we'll get back to you.")}
            </p>
            <ContactMessageForm />
          </FooterColumn>
        </div>
      </Container>

      {/* ── Thin divider ───────────────────────────────────────────────────── */}
      <motion.div
        aria-hidden="true"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{
          duration: shouldReduceMotion ? 0.2 : 1.2,
          delay: shouldReduceMotion ? 0 : 0.1,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="mx-4 sm:mx-6 lg:mx-8 origin-left h-px bg-alarak-gold/15"
      />

      {/* ── Bottom bar ─────────────────────────────────────────────────────── */}
      <Container size="wide" className="relative py-5 sm:py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-3">

          {/* Left: Copyright */}
          <div className="flex flex-col items-center sm:items-start gap-0.5 order-2 sm:order-1">
            <p className="font-sans text-[11px] tracking-[0.08em] text-alarak-cream/35">
              {t("© 2026 Alarak Coffee & Bakery")}
            </p>
            <p className="font-sans text-[10.5px] tracking-[0.06em] text-alarak-cream/25">
              {t("All rights reserved.")}
            </p>
          </div>

          {/* Center: Decorative mark */}
          <div className="flex flex-col items-center gap-2 order-1 sm:order-2">
            <div className="flex items-center gap-3">
              <div className="w-10 sm:w-14 h-px bg-alarak-gold/25" />
              <FloralMark />
              <div className="w-10 sm:w-14 h-px bg-alarak-gold/25" />
            </div>
            <p className="font-sans text-[9px] sm:text-[10px] tracking-[0.32em] uppercase text-alarak-gold/60">
              {t("Good Coffee • Great Moments")}
            </p>
          </div>

          {/* Right: Legal links + Back to top */}
          <div className="flex items-center gap-4 order-3">
            <nav aria-label={t("Legal links")} className="hidden sm:flex items-center">
              {LEGAL_LINKS.map((link, i) => (
                <React.Fragment key={link.name}>
                  {i > 0 && (
                    <span aria-hidden="true" className="mx-3 text-alarak-cream/20 text-[10px]">
                      |
                    </span>
                  )}
                  <a
                    href={link.href}
                    className="font-sans text-[11px] tracking-[0.06em] text-alarak-cream/40 hover:text-alarak-gold transition-colors duration-300 focus-ring rounded-sm"
                  >
                    {t(link.name)}
                  </a>
                </React.Fragment>
              ))}
            </nav>
            <BackToTop />
          </div>
        </div>

        {/* Legal links — mobile stacked */}
        <nav
          aria-label={t("Legal links")}
          className="sm:hidden flex flex-wrap justify-center gap-x-4 gap-y-1.5 mt-4"
        >
          {LEGAL_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="font-sans text-[11px] tracking-[0.06em] text-alarak-cream/40 hover:text-alarak-gold transition-colors duration-300 focus-ring rounded-sm"
            >
              {t(link.name)}
            </a>
          ))}
        </nav>
      </Container>
    </footer>
  );
};
