import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LanguageProvider } from "../context/LanguageContext";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "Casa Italia | Ristorante & Enoteca Autentica",
  description: "Experience authentic Italian dining at Casa Italia. Fresh pasta, wood-fired Neapolitan pizza, Tuscan charcoal steaks, and fine DOCG wine pairings.",
  keywords: ["Casa Italia", "Italian Restaurant", "Rome", "Fresh Pasta", "Wood Fired Pizza", "Wine Pairing", "Digital Menu"],
  other: {
    google: "notranslate",
  },
  openGraph: {
    title: "Casa Italia | Autentica Cucina Italiana",
    description: "Bright, elegant digital menu & table service experience for Casa Italia.",
    images: ["/logo/logo-01.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="it"
      translate="no"
      className="notranslate h-full antialiased light"
    >
      <body className="notranslate min-h-full flex flex-col font-sans bg-[#ededed] text-[#1a1816]">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
