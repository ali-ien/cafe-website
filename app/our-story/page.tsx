import type { Metadata } from "next";
import { Footer, Navbar } from "@/components";
import { OurStoryExperience } from "@/components/OurStoryExperience";

export const metadata: Metadata = {
  title: "Our Story | Alarak Coffee & Bakery",
  description:
    "Discover the craft, hospitality, and care behind Alarak Coffee & Bakery in Fnideq.",
};

export default function OurStoryPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-alarak-navy-dark text-alarak-cream selection:bg-alarak-gold selection:text-alarak-navy-dark">
      <Navbar />
      <main id="main-content">
        <OurStoryExperience />
      </main>
      <Footer />
    </div>
  );
}
