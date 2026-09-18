import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context";
import { CookieConsent, RestaurantJsonLd } from "@/components/layout";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ba935a",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://casaitaliarestaurants.com"),
  title: {
    default: "Casa Italia | Authentic Italian Restaurant & Pizza in Porto Ghalib",
    template: "%s | Casa Italia Ristorante",
  },
  description:
    "Experience authentic Italian dining at Casa Italia in Porto Ghalib Marina, Red Sea. Fresh artisanal pasta, wood-fired Neapolitan pizza, Tuscan charcoal steaks, seafood, and fine Italian wine pairings.",
  keywords: [
    "Casa Italia",
    "Casa Italia Porto Ghalib",
    "Italian Restaurant Porto Ghalib",
    "Porto Ghalib Restaurants",
    "Porto Ghalib Marina Dining",
    "Best Restaurant Marsa Alam",
    "Wood Fired Pizza Egypt",
    "Fresh Pasta Red Sea",
    "Authentic Italian Food Egypt",
    "Italian Restaurant Marsa Alam",
    "Wine Pairing Porto Ghalib",
    "Digital Menu Casa Italia",
  ],
  authors: [{ name: "Casa Italia Ristorante", url: "https://casaitaliarestaurants.com" }],
  creator: "Casa Italia Ristorante",
  publisher: "Casa Italia Ristorante",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/logo/logo-01.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/logo/logo-01.webp", sizes: "180x180", type: "image/webp" },
    ],
  },
  alternates: {
    canonical: "/",
    languages: {
      "it-IT": "/",
      "en-US": "/",
      "x-default": "/",
    },
  },
  openGraph: {
    title: "Casa Italia | Autentica Cucina Italiana a Porto Ghalib",
    description:
      "Experience authentic Italian dining at Casa Italia in Porto Ghalib Marina, Red Sea. Fresh pasta, wood-fired pizza & fine Italian wines.",
    url: "https://casaitaliarestaurants.com",
    siteName: "Casa Italia Ristorante",
    images: [
      {
        url: "/logo/logo-01.webp",
        width: 1200,
        height: 630,
        alt: "Casa Italia Ristorante - Porto Ghalib Marina",
      },
    ],
    locale: "it_IT",
    alternateLocale: ["en_US"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Casa Italia | Authentic Italian Restaurant in Porto Ghalib",
    description:
      "Authentic Italian cuisine at Porto Ghalib Marina. Fresh handmade pasta, wood-fired pizza & seafood.",
    images: ["/logo/logo-01.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "restaurant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="it"
      className="h-full antialiased light"
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans bg-[#ededed] text-[#1a1816]">
        <RestaurantJsonLd />
        <LanguageProvider>
          {children}
          <CookieConsent />
        </LanguageProvider>
      </body>
    </html>
  );
}
