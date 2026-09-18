import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { LanguageProvider } from "@/context";
import { CookieConsent, RestaurantJsonLd, DisableZoom } from "@/components/layout";
import { PwaManager } from "@/components/pwa";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
  userScalable: false,
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
  other: {
    google: "notranslate",
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
      <head>
        <meta name="google" content="notranslate" />
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
