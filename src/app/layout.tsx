import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LiquidCursor } from "../components/liquid-cursor";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from "@next/third-parties/google";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: '%s | Agency WebOS',
    default: 'Agency WebOS | Premium Tech Solutions',
  },
  description: "A comprehensive tech agency offering DevOps, Full-Stack Dev, Cybersecurity, and AI Integration.",
  icons: {
    icon: '/icon.png?v=3',
  },
  openGraph: {
    title: 'Agency WebOS',
    description: 'A comprehensive tech agency offering DevOps, Full-Stack Dev, Cybersecurity, and AI Integration.',
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Agency WebOS",
    "image": "https://example.com/logo.png",
    "description": "A comprehensive tech agency offering DevOps, Full-Stack Dev, Cybersecurity, and AI Integration.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Delhi",
      "addressCountry": "IN"
    },
    "telephone": "+91-11-23456789",
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col overflow-hidden bg-background text-foreground font-sans">
        <LiquidCursor />
        {children}
        {modal}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Analytics />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  );
}
