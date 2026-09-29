import type { Metadata } from "next";
import { Navbar, VisitUs, Footer } from "@/components";

export const metadata: Metadata = {
  title: "Visit Us | Alarak Coffee & Bakery – Rabat, Morocco",
  description:
    "Find Alarak Coffee & Bakery in Rabat, Morocco. Open daily 08:00–22:00. Enjoy specialty coffee, artisan pastries and handcrafted cakes in a warm atmosphere.",
};

export default function VisitPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <VisitUs />
      </main>
      <Footer />
    </>
  );
}
