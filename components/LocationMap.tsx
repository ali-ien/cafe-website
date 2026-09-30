"use client";

import { useLanguage } from "@/lib/language";

export function LocationMap() {
  const { t } = useLanguage();
  const mapUrl = "https://maps.google.com/maps?q=Fnideq%2C%20Morocco&z=14&output=embed";
  const directionsUrl = "https://maps.google.com/?q=Fnideq%2C%20Morocco";

  return (
    <div className="relative h-full w-full overflow-hidden rounded-[2px] bg-[#EDE8DF]">
      <iframe
        title={t("Open Fnideq on Google Maps")}
        src={mapUrl}
        className="absolute inset-0 h-full w-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
      <a
        href={directionsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-3 right-3 rounded-sm bg-white/95 px-3 py-2 font-sans text-[10px] font-medium text-alarak-navy-dark shadow-md transition-colors hover:text-alarak-gold"
      >
        {t("View on Maps")}
      </a>
    </div>
  );
}
