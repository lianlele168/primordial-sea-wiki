import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calculator, Info } from "lucide-react";
import EvolutionChain from "@/components/EvolutionChain";
import JsonLd from "@/components/JsonLd";
import PlannerLoader from "@/components/PlannerLoader";
import { evolutionStages } from "@/data/site";
import { getMonthYear } from "@/lib/date";
import { absoluteUrl, breadcrumbSchema } from "@/lib/seo";

export function generateMetadata(): Metadata {
  const monthYear = getMonthYear();
  return {
    title: `Primordial Sea Merge Planner (${monthYear})`,
    description: "Use the free Primordial Sea merge planner to calculate theoretical body requirements between any two stages of the verified evolution chain.",
    alternates: { canonical: "/merge-planner/" },
    openGraph: { url: "/merge-planner/", images: ["/primordial-sea-cover.png"] },
    twitter: {
      card: "summary_large_image",
      title: `Primordial Sea Merge Planner (${monthYear})`,
      description: "Calculate theoretical body requirements for any verified segment of the Primordial Sea evolution chain.",
      images: ["/primordial-sea-cover.png"],
    },
  };
}

export default function MergePlannerPage() {
  const appSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Primordial Sea Merge Evolution Planner",
    url: absoluteUrl("/merge-planner/"),
    applicationCategory: "GameApplication",
    operatingSystem: "Any web browser",
    description: "Calculates the theoretical minimum source bodies and pair merges for the normal Primordial Sea evolution chain.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  return (
    <>
      <JsonLd data={[breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Merge Planner", path: "/merge-planner/" }]), appSchema]} />
      <section className="compact-hero">
        <div className="page-shell relative z-10">
          <p className="eyebrow">Free interactive calculator</p>
          <h1>Primordial Sea Merge Planner</h1>
          <p>Turn a target world into transparent merge math. No account, no hidden formula, no fabricated drop forecast.</p>
        </div>
      </section>

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
            <Link href="/evolution-chain/" className="text-link">Read the full chain <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="mt-8"><EvolutionChain compact /></div>
        </div>
      </section>

      <section className="page-section">
        <div className="page-shell grid gap-8 md:grid-cols-2">
          <article className="plain-panel">
            <Calculator className="h-6 w-6 text-tide-300" />
            <h2>Formula</h2>
            <p>Moving up <em>n</em> stages needs <strong>2<sup>n</sup></strong> bodies of the starting tier. Combining them into one target requires one fewer pair merge than the source-body count.</p>
          </article>
          <article className="plain-panel">
            <Info className="h-6 w-6 text-solar-400" />
            <h2>Boundary</h2>
            <p>The calculation covers the {evolutionStages.length}-stage normal chain only. It cannot predict physics losses, fuse explosions, enemy attacks, random drops, or unpublished hidden-disk recipes.</p>
          </article>
        </div>
      </section>
    </>
  );
}
