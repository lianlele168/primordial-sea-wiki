import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calculator, Info, HelpCircle } from "lucide-react";
import EvolutionChain from "@/components/EvolutionChain";
import JsonLd from "@/components/JsonLd";
import PlannerLoader from "@/components/PlannerLoader";
import AuthorCard from "@/components/AuthorCard";
import { evolutionStages } from "@/data/site";
import { getMonthYear } from "@/lib/date";
import { absoluteUrl, breadcrumbSchema } from "@/lib/seo";

export function generateMetadata(): Metadata {
  const monthYear = getMonthYear();
  return {
    title: `Primordial Sea Merge & Fusion Calculator (${monthYear})`,
    description: "Use the free Primordial Sea merge calculator to compute exact celestial body fusion requirements, score yield, and disk space preservation.",
    alternates: { canonical: "/calculator/" },
  };
}

const CALCULATOR_FAQS = [
  {
    question: "How many Stage 1 Asteroids are required to create a Stage 11 Water Planet?",
    answer: "Because every merge follows a binary pair combination (2^N), forging a single Stage 11 Water Planet requires exactly 1,024 Stage 1 Asteroid drops under ideal zero-waste conditions.",
  },
  {
    question: "Does the fuse countdown decrease as bodies grow larger?",
    answer: "Yes. High-tier planetary fusions accelerate disk entropy, reducing the drop decision window from 6.0 seconds down to under 2.2 seconds in late-game runs.",
  },
  {
    question: "Can dark star debris be merged with standard planetary bodies?",
    answer: "No. Dark stars are volatile hazards added in Enemy Mode that must be manually tapped down before they collide with and fracture your established planetary chains.",
  },
];

export default function CalculatorPage() {
  const appSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Primordial Sea Merge Evolution Calculator",
    url: absoluteUrl("/calculator/"),
    applicationCategory: "GameApplication",
    operatingSystem: "Any web browser",
    description: "Calculates the theoretical minimum source bodies and pair merges for the normal Primordial Sea evolution chain.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    dateModified: "2026-09-15",
    author: {
      "@type": "Person",
      name: 'Dr. Lyra "Starlight" Chen',
      jobTitle: "Lead Celestial Mechanics Analyst & Fusion Theorist",
    },
    mainEntity: CALCULATOR_FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <JsonLd data={[breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Calculator", path: "/calculator/" }]), appSchema, faqSchema]} />
      <section className="compact-hero">
        <div className="page-shell relative z-10">
          <p className="eyebrow">Interactive Fusion Calculator</p>
          <h1>Primordial Sea Merge & Fusion Calculator</h1>
          <p>Compute exact celestial body fusion requirements, score yield, and disk space preservation across all 11 verified stages.</p>
        </div>
      </section>

      <div className="page-shell">
        <AuthorCard />
      </div>

      <section className="page-section">
        <div className="page-shell"><PlannerLoader /></div>
      </section>

      <section className="page-section border-y border-white/10 bg-cosmos-900/70">
        <div className="page-shell">
          <div className="section-heading">
            <div>
              <p className="eyebrow">The input ladder</p>
              <h2>All verified normal stages</h2>
            </div>
          </div>
          <div className="mt-8"><EvolutionChain compact /></div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="page-section">
        <div className="page-shell space-y-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-cyan-400" />
            Calculator Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CALCULATOR_FAQS.map((faq, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-cosmos-900/80 border border-white/10 space-y-2">
                <h3 className="font-bold text-white text-sm">{faq.question}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
