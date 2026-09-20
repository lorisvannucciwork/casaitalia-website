import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { fontVariables } from "./fonts";
import { SITE_URL, CDN_URL } from "@/config/site";
import { LanguageProvider } from "@/context";
import { CookieConsent, RestaurantJsonLd, DisableZoom } from "@/components/layout";
import { PwaManager } from "@/components/pwa";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#ba935a",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Casa Italia | Authentic Italian Restaurant & Pizza in Porto Ghalib",
    template: "%s | Casa Italia Ristorante",
  },
  description:
    "Experience authentic Italian dining at Casa Italia in Porto Ghalib Marina, Red Sea. Fresh artisanal pasta, wood-fired Neapolitan pizza, Tuscan charcoal steaks, seafood, and fine Italian wine pairings. Open daily 12 PM – 11:30 PM.",
  keywords: [

    "Casa Italia",
    "Casa Italia Porto Ghalib",
    "Casa Italia Restaurant",
    "Casa Italia Ristorante",

    "Italian Restaurant Porto Ghalib",
    "Porto Ghalib Restaurants",
    "Porto Ghalib Marina Dining",
    "Best Restaurant Marsa Alam",
    "Italian Restaurant Marsa Alam",
    "Restaurant Red Sea Egypt",

    "best Italian food Porto Ghalib",
    "pizza Porto Ghalib Marina",
    "romantic dinner Porto Ghalib",
    "family restaurant Marsa Alam",
    "waterfront dining Red Sea",
    "marina restaurant Red Sea coast",

    "Wood Fired Pizza Egypt",
    "Fresh Pasta Red Sea",
    "Authentic Italian Food Egypt",
    "Neapolitan pizza Marsa Alam",
    "handmade pasta Red Sea",
    "charcoal steak Porto Ghalib",
    "Italian seafood Red Sea",
    "gluten free pizza Egypt",

    "Wine Pairing Porto Ghalib",
    "Digital Menu Casa Italia",
    "fine dining Marsa Alam",
    "outdoor dining Porto Ghalib",
    "best pizza near Red Sea resorts",

    "Porto Ghalib holiday restaurant",
    "where to eat Porto Ghalib",
    "best restaurants near Porto Ghalib hotels",

    "مطعم إيطالي بورتو غالب",
    "بيتزا بورتو غالب",
    "كازا إيطاليا",
  ],
  authors: [{ name: "Casa Italia Ristorante", url: SITE_URL }],
  creator: "Casa Italia Ristorante",
  publisher: "Casa Italia Ristorante",
  manifest: "/manifest.webmanifest",

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icons/android/launchericon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/android/launchericon-512x512.png", sizes: "512x512", type: "image/png" },
      { url: "/logo/logo-01.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/icons/ios/180.png", sizes: "180x180", type: "image/png" },
      { url: "/icons/ios/167.png", sizes: "167x167", type: "image/png" },
      { url: "/icons/ios/152.png", sizes: "152x152", type: "image/png" },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Casa Italia",
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
      "Experience authentic Italian dining at Casa Italia in Porto Ghalib Marina, Red Sea. Fresh pasta, wood-fired pizza & fine Italian wines. Open daily.",
    url: SITE_URL,
    siteName: "Casa Italia Ristorante",
    images: [
      {
        url: "/logo/logo-01.webp",
        width: 1200,
        height: 630,
        alt: "Casa Italia Ristorante - Authentic Italian Restaurant at Porto Ghalib Marina, Red Sea",
        type: "image/webp",
      },
    ],
    locale: "it_IT",
    alternateLocale: ["en_US"],
    type: "website",
    countryName: "Egypt",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  category: "restaurant",
  classification: "Restaurant, Italian Food, Dining",
  other: {
    google: "notranslate",

    "geo.region": "EG-BA", 
    "geo.placename": "Porto Ghalib, Red Sea, Egypt",
    "geo.position": "25.3548;34.6367",
    ICBM: "25.3548, 34.6367",

    rating: "general",

    "revisit-after": "3 days",

    author: "Casa Italia Ristorante",
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
      dir="ltr"
      translate="no"
      className={`notranslate h-full antialiased light ${fontVariables}`}
      suppressHydrationWarning
    >
      <head>
        <meta name="google" content="notranslate" />

        <link rel="preconnect" href={CDN_URL} />
      </head>
      <body className="notranslate min-h-full flex flex-col font-sans bg-[#ededed] text-[#1a1816]">
        <DisableZoom />
        <RestaurantJsonLd />
        <LanguageProvider>
          {children}
          <CookieConsent />
          <PwaManager />
        </LanguageProvider>
        {process.env.NEXT_PUBLIC_CF_ANALYTICS_TOKEN && (
          <Script
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={`{"token": "${process.env.NEXT_PUBLIC_CF_ANALYTICS_TOKEN}"}`}
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
