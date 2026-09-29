"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Container, GoldAccent, EditorialReveal } from "@/components/ui";
import { mediaAssets } from "@/lib/media";

export const Story: React.FC = () => {
  const ownerAsset = mediaAssets.brand.owner;
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="story"
      className="relative w-full bg-[#FAF7F2]"
      aria-labelledby="story-heading"
    >
      <Container size="wide" className="py-20 sm:py-28 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-[48fr_52fr] gap-10 lg:gap-16 xl:gap-20 items-center">

          {/* LEFT: OWNER PHOTOGRAPH */}
          <motion.div
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -14 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
            className="order-1 lg:order-1"
          >
            {/* Photo — gold luxury frame */}
            <div className="relative rounded-[3px] p-[3px] sm:p-[4px] bg-gradient-to-br from-alarak-gold-light via-alarak-gold to-alarak-gold-dark shadow-[0_8px_28px_rgba(158,125,59,0.18)]">
              <div className="rounded-[2px] p-1.5 sm:p-2 bg-[#FAF7F2]">
                <div
                  className="relative w-full overflow-hidden rounded-[1px] ring-1 ring-alarak-gold/45"
                  style={{ aspectRatio: "4 / 3" }}
                >
                  <Image
                    src={ownerAsset.src}
                    alt={ownerAsset.alt}
                    fill
                    sizes="(max-width: 1024px) 90vw, 46vw"
                    quality={92}
                    className="object-cover object-[50%_15%]"
                    priority={false}
                  />
                </div>
              </div>
            </div>

            <p className="mt-3 font-serif text-xs text-[#9a8672] tracking-widest italic text-center">
              Alarak Founder &amp; Master Artisan
            </p>
          </motion.div>

          {/* RIGHT: EDITORIAL TEXT */}
          <div className="order-2 lg:order-2 space-y-6 sm:space-y-7">

            {/* Eyebrow */}
            <EditorialReveal delay={0.1}>
              <div className="flex items-center gap-3">
                <GoldAccent variant="line" width="w-7" />
                <GoldAccent variant="badge">OUR STORY</GoldAccent>
              </div>
            </EditorialReveal>

            {/* Arabic subtitle */}
            <EditorialReveal delay={0.15}>
              <p className="font-arabic text-sm text-alarak-gold/70 leading-relaxed">
                قصتنا — العناية بالتفاصيل والضيافة الأصيلة
              </p>
            </EditorialReveal>

            {/* Heading */}
            <EditorialReveal delay={0.2}>
              <h2
                id="story-heading"
                className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-normal tracking-tight leading-[1.12] text-alarak-navy-dark"
              >
                Crafted with{" "}
                <span className="italic font-light text-[#b8892a]">Purpose.</span>
              </h2>
            </EditorialReveal>

            {/* Body copy */}
            <EditorialReveal delay={0.28}>
              <div className="space-y-4">
                <p className="font-sans text-base sm:text-[17px] text-alarak-charcoal/80 font-light leading-[1.75]">
                  ALARAK was born from a deep love of craft — where the art of specialty coffee meets the warmth of Moroccan hospitality. Every cup is brewed with intention, every pastry shaped by the hands of artisans who believe that food is a form of care.
                </p>
                <p className="font-sans text-base sm:text-[17px] text-alarak-charcoal/80 font-light leading-[1.75]">
                  We create spaces and flavors that invite you to slow down, to savor, and to feel genuinely welcomed. This is not just a café — it is a moment worth returning to.
                </p>
              </div>
            </EditorialReveal>

            {/* Quote */}
            <EditorialReveal delay={0.36}>
              <div className="border-l-2 border-alarak-gold/55 pl-5 py-2 bg-[#F4EFE8]/50 pr-4">
                <p className="font-serif text-lg sm:text-xl text-alarak-navy-dark/80 italic leading-[1.55]">
                  &ldquo;Coffee and pastry are not simply served&thinsp;&mdash;&thinsp;they are shared moments of genuine warmth.&rdquo;
                </p>
              </div>
            </EditorialReveal>

            {/* Gold line */}
            <EditorialReveal delay={0.42}>
              <GoldAccent variant="line" width="w-14" />
            </EditorialReveal>

            {/* CTA */}
            <EditorialReveal delay={0.48}>
              <a
                href="#"
                className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.28em] text-alarak-gold hover:text-[#b8892a] transition-colors duration-300 group"
              >
                <span>Discover Our Story</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </EditorialReveal>

          </div>
        </div>
      </Container>
    </section>
  );
};
