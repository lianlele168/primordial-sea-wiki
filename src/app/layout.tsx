import type { Metadata } from "next";
import { Cormorant_Garamond, Space_Grotesk } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { site } from "@/data/site";
import "./globals.css";

const space = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.baseUrl),
  title: {
    default: "Primordial Sea Guide (August 2026) - Evolution & Merge Planner",
    template: "%s | Primordial Sea Guide",
  },
  description: site.description,
  keywords: [
    "Primordial Sea game",
    "Primordial Sea guide",
    "Primordial Sea evolution chain",
    "Primordial Sea merge puzzle",
    "Primordial Sea hidden disks",
    "Primordial Sea enemy mode",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title: "Primordial Sea Guide - Evolution Chain & Merge Planner",
    description: site.description,
    images: [{ url: "/primordial-sea-cover.png", width: 628, height: 500, alt: "Primordial Sea cosmic merge puzzle" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Primordial Sea Guide - Evolution Chain & Merge Planner",
    description: site.description,
    images: ["/primordial-sea-cover.png"],
  },
  icons: { icon: "/favicon.svg", apple: "/primordial-sea-cover.png" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${space.variable} ${cormorant.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
