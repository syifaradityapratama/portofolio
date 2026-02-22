import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Preloader from "@/components/Preloader";
import GodModeWrapper from "@/components/GodModeWrapper";
import CustomCursor from "@/components/CustomCursor";
import { ScrollRevealProvider } from "@/context/ScrollRevealContext";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@next/third-parties/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL("https://radityaportofolio.is-a.dev"),
  title: "Syifa Raditya Pratama | Full Stack Developer",
  description: "Portfolio of Syifa Raditya Pratama, a Full Stack Developer specializing in Laravel, Next.js, and Enterprise Systems. Experienced in Digital Transformation at PT LEN Industri.",
  keywords: ["Syifa Raditya Pratama", "Web Developer Bandung", "Laravel Developer", "Next.js Portfolio", "Software Engineer Indonesia", "Full Stack Developer"],
  openGraph: {
    title: "Syifa Raditya Pratama | Portfolio",
    description: "Building high-performance web applications and digital solutions.",
    url: "https://radityaportofolio.is-a.dev",
    siteName: "Syifa Raditya Portfolio",
    images: [
      {
        url: "/icon.svg",
        width: 512,
        height: 512,
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Syifa Raditya Pratama | Portfolio",
    description: "Building high-performance web applications and digital solutions.",
    images: ["/icon.svg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  verification: {
    google: "cWlpAuX4rBkGVRV1QhKWvGiDDQ9c8zhvrH11SHZGe6E",
  },
};

const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        {/* Preconnect hints — reduce third-party latency */}
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CustomCursor />
        <GodModeWrapper>
          <Preloader />
          <ScrollRevealProvider>
            <Script
              src="/scripts/suppress-ws-warn.js"
              strategy="afterInteractive"
            />
            {children}
          </ScrollRevealProvider>
        </GodModeWrapper>

        {/* Vercel Analytics — only loads on Vercel (avoids 404 on localhost) */}
        {process.env.NEXT_PUBLIC_VERCEL_URL && (
          <>
            <Analytics />
            <SpeedInsights />
          </>
        )}

        {/* Google Analytics 4 — User Behavior & Conversion Tracking */}
        {gaId && gaId !== "G-XXXXXXXXXX" && (
          <GoogleAnalytics gaId={gaId} />
        )}
      </body>
    </html>
  );
}
