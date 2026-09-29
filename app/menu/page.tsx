import type { Metadata } from "next";
import { Navbar, Footer, MenuDesserts } from "@/components";

export const metadata: Metadata = {
  title: "Desserts Menu | Alarak Coffee & Bakery",
  description:
    "Explore the Alarak desserts menu: cakes and pastries, trompe l'oeil desserts, and cookies.",
};

export default function MenuPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-alarak-navy-dark selection:bg-alarak-gold selection:text-alarak-navy-dark overflow-x-hidden">
      <Navbar />
      <main id="main-content">
        <MenuDesserts />
      </main>
      <Footer />
    </div>
  );
}
