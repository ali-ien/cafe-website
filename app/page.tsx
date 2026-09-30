"use client";

import React from "react";
import { Navbar, Hero, Story, SignatureSelection, Footer } from "@/components";
import { HomeVisitSection } from "@/components/HomeVisitSection";
import { HomeRitualSection } from "@/components/HomeRitualSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-alarak-navy-dark text-alarak-cream selection:bg-alarak-gold selection:text-alarak-navy-dark">
      {/* 1. Responsive Navbar */}
      <Navbar />

      {/* Main Content Flow */}
      <main id="main-content">
        {/* 2. Cinematic Hero Section */}
        <Hero />

        {/* 3. Our Story Section */}
        <Story />

        <div
          className="w-full bg-[#FAF7F2] flex items-center justify-center py-6 sm:py-8"
          aria-hidden="true"
        >
          <div className="h-[2px] w-40 sm:w-56 lg:w-72 bg-alarak-gold" />
        </div>

        {/* 4. Signature Selection — Coffee / Bakery / Desserts */}
        <SignatureSelection />

        {/* A short brand moment between the menu showcase and visit details */}
        <HomeRitualSection />

        {/* Boutique visit details */}
        <HomeVisitSection />
      </main>

      <Footer />
    </div>
  );
}
