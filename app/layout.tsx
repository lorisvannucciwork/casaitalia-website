import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LanguageProvider } from "../context/LanguageContext";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ba935a",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://casaitaliarestaurants.com"),
  title: "Casa Italia | Ristorante & Enoteca Autentica",
  description: "Experience authentic Italian dining at Casa Italia in Porto Ghalib. Fresh pasta, wood-fired Neapolitan pizza, Tuscan charcoal steaks, and fine DOCG wine pairings.",
  keywords: ["Casa Italia", "Italian Restaurant", "Porto Ghalib", "Fresh Pasta", "Wood Fired Pizza", "Wine Pairing", "Digital Menu"],
  alternates: {
    canonical: "/",
  },
  other: {
    google: "notranslate",
  },
  openGraph: {
    title: "Casa Italia | Autentica Cucina Italiana",
    description: "Bright, elegant digital menu & table service experience for Casa Italia in Porto Ghalib.",
    url: "https://casaitaliarestaurants.com",
    siteName: "Casa Italia Restaurant",
    images: [
      {
        url: "/logo/logo-01.webp",
        width: 800,
        height: 600,
        alt: "Casa Italia Logo",
      },
    ],
    locale: "it_IT",
    type: "website",
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
      suppressHydrationWarning
    >
      <body className="notranslate min-h-full flex flex-col font-sans bg-[#ededed] text-[#1a1816]">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
