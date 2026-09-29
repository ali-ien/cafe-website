"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, X, Coffee, MapPin } from "lucide-react";
import { Button, Container } from "@/components/ui";
import { mediaAssets } from "@/lib/media";
import { cn } from "@/lib/utils";

// Centralized Navigation Config
const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Menu", href: "/menu" },
  { name: "Our Story", href: "/#story" },
  { name: "Gallery", href: "/#gallery" },
  { name: "Visit Us", href: "/visit" },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const logoWeb = mediaAssets.logo.web;

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          // On /visit page: always solid. Elsewhere: solid when scrolled, transparent gradient when not.
          isScrolled || pathname?.startsWith("/visit")
            ? "bg-alarak-navy-dark/95 backdrop-blur-md border-b border-alarak-gold/20 py-3 shadow-2xl"
            : "bg-gradient-to-b from-alarak-navy-dark/95 via-alarak-navy-dark/60 to-transparent py-4 sm:py-6"
        )}
      >
        <Container size="wide">
          <nav className="flex items-center justify-between" aria-label="Main Navigation">
            {/* Prominent Substantially Sized Luxury Alarak Logo */}
            <Link
              href="/"
              className="group flex items-center gap-3.5 focus-ring rounded-sm py-1 transition-all duration-300"
              aria-label="Alarak Coffee & Bakery Home"
            >
              {/* Logo Sizing: ~52-64px on mobile, ~64-78px on desktop */}
              <motion.div 
                initial={{ scale: shouldReduceMotion ? 1 : 0.96, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative h-14 sm:h-16 lg:h-[76px] w-auto aspect-[928/1144] flex items-center justify-center shrink-0"
              >
                <Image
                  src={logoWeb.src}
                  alt={logoWeb.alt}
                  width={logoWeb.dimensions.width}
                  height={logoWeb.dimensions.height}
                  priority
                  className="h-full w-auto object-contain transition-all duration-500 ease-out group-hover:scale-[1.02] filter drop-shadow-[0_4px_12px_rgba(212,175,55,0.15)] group-hover:drop-shadow-[0_0_16px_rgba(212,175,55,0.45)]"
                />
              </motion.div>

              {/* Accompanying Typography Lockup */}
              <div className="flex flex-col justify-center border-l border-alarak-gold/25 pl-3.5">
                <span className="font-serif text-lg sm:text-xl lg:text-2xl tracking-[0.22em] text-alarak-cream font-medium leading-none group-hover:text-alarak-gold transition-colors duration-300">
                  ALARAK
                </span>
                <span className="font-sans text-[8px] sm:text-[9.5px] tracking-[0.3em] uppercase text-alarak-gold/90 leading-none mt-1">
                  Coffee &amp; Bakery
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <ul className="hidden lg:flex items-center gap-9">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href || (link.href === "/menu" && pathname?.startsWith("/menu")) || (link.href === "/visit" && pathname?.startsWith("/visit"));
                return (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className={cn(
                        "font-sans text-xs uppercase tracking-[0.22em] transition-colors duration-300 py-1.5 focus-ring relative group flex flex-col items-center",
                        isActive ? "text-alarak-gold font-medium" : "text-alarak-cream/85 hover:text-alarak-gold"
                      )}
                    >
                      <span>{link.name}</span>
                      <span
                        className={cn(
                          "w-1 h-1 rounded-full bg-alarak-gold transition-all duration-300 mt-1 shadow-[0_0_8px_rgba(212,175,55,0.8)]",
                          isActive ? "opacity-100 scale-100" : "opacity-0 group-hover:opacity-100"
                        )}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Desktop CTA Action */}
            <div className="hidden sm:flex items-center gap-4">
              <Link href="/menu">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-alarak-gold/40 text-alarak-cream hover:border-alarak-gold hover:text-alarak-gold hover:bg-alarak-gold/10 hover:-translate-y-[2px] transition-all duration-300 hover:shadow-[0_4px_16px_rgba(212,175,55,0.25)] px-5"
                >
                  View Menu
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-alarak-cream hover:text-alarak-gold focus-ring rounded-sm transition-colors"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              {mobileMenuOpen ? <X className="w-7 h-7 text-alarak-gold" /> : <Menu className="w-7 h-7" />}
            </button>
          </nav>
        </Container>
      </motion.header>

      {/* Mobile Overlay Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-alarak-navy-dark/98 backdrop-blur-2xl lg:hidden pt-28 pb-12 px-6 flex flex-col justify-between"
          >
            <div className="space-y-8">
              {/* Mobile Prominent Logo Header */}
              <div className="flex flex-col items-center text-center pt-2 pb-2">
                <div className="relative h-20 w-auto aspect-[928/1144] mb-3">
                  <Image
                    src={logoWeb.src}
                    alt={logoWeb.alt}
                    width={logoWeb.dimensions.width}
                    height={logoWeb.dimensions.height}
                    className="h-full w-auto object-contain drop-shadow-[0_4px_16px_rgba(212,175,55,0.2)]"
                  />
                </div>
                <span className="font-serif text-2xl tracking-[0.22em] text-alarak-cream font-medium">
                  ALARAK
                </span>
                <span className="font-sans text-[10px] tracking-[0.32em] uppercase text-alarak-gold mt-1">
                  Moroccan Specialty Coffee &amp; Bakery
                </span>
              </div>

              <div className="w-16 h-px bg-alarak-gold/30 mx-auto" />

              <ul className="flex flex-col space-y-6 text-center">
                {NAV_LINKS.map((link, idx) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 * idx, duration: 0.3 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "font-serif text-2xl transition-colors tracking-wider",
                        pathname === link.href ? "text-alarak-gold font-medium" : "text-alarak-cream hover:text-alarak-gold"
                      )}
                    >
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <div className="w-16 h-px bg-alarak-gold/30 mx-auto" />
            </div>

            <div className="space-y-5 text-center">
              <Link href="/menu" onClick={() => setMobileMenuOpen(false)} className="block w-full">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full justify-center text-base"
                  icon={<Coffee className="w-5 h-5" />}
                >
                  Discover Our Menu
                </Button>
              </Link>
              <div className="flex items-center justify-center gap-2 text-xs text-alarak-gold/80 tracking-widest uppercase">
                <MapPin className="w-3.5 h-3.5 text-alarak-gold" />
                <span>Rabat, Morocco</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
