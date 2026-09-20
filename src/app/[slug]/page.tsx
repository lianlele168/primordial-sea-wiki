import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, CheckCircle2, ExternalLink, Info } from "lucide-react";
import EvolutionChain from "@/components/EvolutionChain";
import JsonLd from "@/components/JsonLd";
import PlayFrame from "@/components/PlayFrame";
import { getGuidePage, guidePages } from "@/data/pages";
import { site } from "@/data/site";
import { getMonthYear } from "@/lib/date";
import { articleSchema, breadcrumbSchema, faqSchema } from "@/lib/seo";

export function generateStaticParams() {
  return guidePages.map((page) => ({ slug: page.slug }));
}

type GuideRouteProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: GuideRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getGuidePage(slug);
  if (!page) return {};
  const monthYear = getMonthYear();
  const isLegal = ["privacy-policy", "terms"].includes(slug);
  return {
    title: `${page.title} (${monthYear})`,
    description: page.description,
    alternates: { canonical: `/${page.slug}` },
    openGraph: {
      type: "article",
      url: `/${page.slug}/`,
      title: page.title,
      description: page.description,
      images: [page.image ?? "/primordial-sea-cover.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [page.image ?? "/primordial-sea-cover.png"],
    },
  };
}

export default async function GuidePageRoute({ params }: GuideRouteProps) {
  const { slug } = await params;
  const page = getGuidePage(slug);
  if (!page) notFound();

  const schemas: object[] = [
    breadcrumbSchema([{ name: "Home", path: "/" }, { name: page.title, path: `/${page.slug}/` }]),
    articleSchema(page.title, page.description, `/${page.slug}/`),
  ];
  if (page.faqs?.length) schemas.push(faqSchema(page.faqs));

  const related = guidePages.filter((candidate) => candidate.slug !== page.slug && !["privacy-policy", "terms", "about"].includes(candidate.slug)).slice(0, 4);

  return (
    <>
      <JsonLd data={schemas} />
      <section className="article-hero">
        {page.image ? (
          <Image src={page.image} alt={page.imageAlt ?? "Primordial Sea gameplay"} fill priority sizes="100vw" className="object-cover object-center" />
        ) : null}
        <div className="article-hero-shade" />
        <div className="page-shell relative z-10">
          <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span>{page.title}</span></nav>
          <p className="eyebrow mt-8">{page.eyebrow}</p>
          <h1>{page.title}</h1>
          <p className="article-summary">{page.summary}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={site.officialUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">Official game <ArrowUpRight className="h-4 w-4" /></a>
            {page.slug !== "play" ? <Link href="/play/" className="btn-secondary">Play guide <ArrowRight className="h-4 w-4" /></Link> : null}
          </div>
        </div>
      </section>

      {page.slug === "play" ? (
        <section className="page-section pb-0"><div className="page-shell"><PlayFrame /></div></section>
      ) : null}

      {page.slug === "evolution-chain" ? (
        <section className="page-section border-b border-white/10 bg-cosmos-900/70">
          <div className="page-shell">
            <p className="eyebrow">Order</p>
            <h2 className="mt-3 font-display text-4xl font-bold text-white">The complete normal evolution ladder</h2>
            <div className="mt-8"><EvolutionChain /></div>
            <Link href="/merge-planner/" className="btn-primary mt-8">Calculate a target <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </section>
      ) : null}

      <section className="page-section">
        <div className="page-shell grid gap-12 lg:grid-cols-[minmax(0,1fr)_300px]">
          <article className="article-body">
            {page.sections.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.steps ? (
                  <ol className="step-list">
                    {section.steps.map((step, index) => (
                      <li key={step.title}><span>{index + 1}</span><div><h3>{step.title}</h3><p>{step.body}</p></div></li>
                    ))}
                  </ol>
                ) : null}
                {section.bullets ? (
                  <ul className="bullet-list">
                    {section.bullets.map((bullet) => <li key={bullet}><CheckCircle2 className="h-5 w-5" /><span>{bullet}</span></li>)}
                  </ul>
                ) : null}
                {section.callout ? <p className="article-callout"><Info className="h-5 w-5" /><span>{section.callout}</span></p> : null}
              </section>
            ))}

            {page.faqs?.length ? (
              <section>
                <h2>Frequently asked questions</h2>
                <div className="faq-list">
                  {page.faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}
                </div>
              </section>
            ) : null}

            {page.slug === "updates" ? (
              <div className="source-links">
                <a href={site.officialUrl} target="_blank" rel="noopener noreferrer">Official itch.io release <ExternalLink className="h-4 w-4" /></a>
                <a href={site.officialDevlogUrl} target="_blank" rel="noopener noreferrer">{page.sourceLabel} <ExternalLink className="h-4 w-4" /></a>
              </div>
            ) : null}
          </article>

          <aside className="article-aside">
            <div>
              <p className="eyebrow">Source status</p>
              <strong>Checked against the playable build</strong>
              <p>Core rules verified against the official itch.io release. Strategy is labeled separately.</p>
            </div>
            <div>
              <p className="eyebrow">Continue reading</p>
              <nav>
                {related.map((item) => <Link key={item.slug} href={`/${item.slug}/`}>{item.title}<ArrowRight className="h-4 w-4" /></Link>)}
              </nav>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
