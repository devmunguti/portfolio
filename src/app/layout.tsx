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
  title: "Augustine Munguti — Software Engineer",
  description: "Portfolio of Augustine Munguti, a software engineer focused on building web applications and software solutions.",
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
