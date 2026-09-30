import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans, Tajawal } from "next/font/google";
import { LanguageProvider } from "@/lib/language";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-tajawal",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Alarak Coffee & Bakery | Specialty Coffee & Artisan Pastries",
  description:
    "Experience the refined elegance of Alarak Coffee & Bakery. Premium specialty coffee, artisan pastries, breakfast, and brunch.",
  keywords: [
    "Alarak",
    "Coffee",
    "Bakery",
    "Specialty Coffee",
    "Artisan Pastries",
    "Brunch",
    "alarak.ma",
  ],
  authors: [{ name: "Alarak Coffee & Bakery" }],
};

export const viewport: Viewport = {
  themeColor: "#070C18",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      dir="ltr"
      className={`${cormorant.variable} ${jakarta.variable} ${tajawal.variable} antialiased`}
    >
      <body className="min-h-screen bg-alarak-navy-dark text-alarak-cream selection:bg-alarak-gold selection:text-alarak-navy-dark">
        <LanguageProvider>
          {children}
          <WhatsAppButton />
        </LanguageProvider>
      </body>
    </html>
  );
}
