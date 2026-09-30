import type { Metadata } from "next";
import { Navbar, Footer } from "@/components";
import { GalleryExperience } from "@/components/GalleryExperience";

export const metadata: Metadata = {
  title: "Gallery | Alarak Coffee & Bakery",
  description: "Explore the coffee, pastries, and welcoming spaces of Alarak Coffee & Bakery in Fnideq.",
};

export default function GalleryPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-alarak-navy-dark text-alarak-cream selection:bg-alarak-gold selection:text-alarak-navy-dark">
      <Navbar />
      <main id="main-content">
        <GalleryExperience />
      </main>
      <Footer />
    </div>
  );
}
