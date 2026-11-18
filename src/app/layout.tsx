import type { Metadata } from "next";
import { Bricolage_Grotesque, Instrument_Sans, Caveat } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollRevealObserver from "@/components/ScrollRevealObserver";
import Tracker from "@/components/Tracker";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display", axes: ["opsz", "wdth"] });
const body = Instrument_Sans({ subsets: ["latin"], variable: "--font-body" });
const signature = Caveat({ subsets: ["latin"], variable: "--font-signature", weight: ["600", "700"] });

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://augustinemunguti.co.ke"
  ),
  title: "Augustine Munguti — Software Engineer",
  description:
    "Portfolio of Augustine Munguti, a software engineer focused on building fast, modern web applications and business management systems.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://augustinemunguti.co.ke",
    siteName: "Augustine Munguti — Portfolio",
    title: "Augustine Munguti — Software Engineer",
    description:
      "Portfolio of Augustine Munguti, a software engineer focused on building fast, modern web applications and business management systems.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Augustine Munguti — Software Engineer",
    description:
      "Portfolio of Augustine Munguti, a software engineer focused on building fast, modern web applications and business management systems.",
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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${signature.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <div className="wash" aria-hidden />
        <SmoothScroll />
        <ScrollRevealObserver />
        <Tracker />
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
