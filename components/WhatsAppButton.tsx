"use client";

import { MessageCircle, Phone } from "lucide-react";
import { useLanguage } from "@/lib/language";

const WHATSAPP_URL = "https://wa.me/212663464174";

export function WhatsAppButton() {
  const { t } = useLanguage();
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("Chat with us on WhatsApp")}
      title={t("Chat with us on WhatsApp")}
      className="group fixed bottom-5 right-5 z-30 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(0,0,0,0.28)] transition duration-300 hover:scale-105 hover:bg-[#20bd5a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#25D366] sm:bottom-7 sm:right-7 sm:h-16 sm:w-16"
    >
      <span className="relative grid h-8 w-8 place-items-center sm:h-9 sm:w-9" aria-hidden="true">
        <MessageCircle className="absolute inset-0 h-full w-full" strokeWidth={2.2} />
        <Phone className="absolute h-[42%] w-[42%]" strokeWidth={2.4} />
      </span>
    </a>
  );
}
