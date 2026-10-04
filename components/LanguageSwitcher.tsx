"use client";

import { useLanguage, type Language } from "@/lib/language";

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <label className="inline-flex items-center">
      <span className="sr-only">{t("Select language")}</span>
      <select
        value={language}
        onChange={(event) => setLanguage(event.target.value as Language)}
        aria-label={t("Select language")}
        className="h-9 rounded-sm border border-alarak-gold/35 bg-alarak-navy-dark/60 px-2 font-sans text-[10px] font-medium uppercase tracking-wider text-alarak-cream outline-none transition-colors hover:border-alarak-gold focus-visible:ring-2 focus-visible:ring-alarak-gold"
      >
        <option value="en">English</option>
        <option value="ar" lang="ar">العربية</option>
        <option value="es" lang="es">Español</option>
      </select>
    </label>
  );
}
