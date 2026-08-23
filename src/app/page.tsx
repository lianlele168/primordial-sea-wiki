import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Bomb,
  BookOpen,
  Clock3,
  Gamepad2,
  Gift,
  Layers3,
  Orbit,
  Sparkles,
  Target,
  Waves,
} from "lucide-react";
import EvolutionChain from "@/components/EvolutionChain";
import JsonLd from "@/components/JsonLd";
import PlannerLoader from "@/components/PlannerLoader";
import { guidePages, homeFaqs } from "@/data/pages";
import { site } from "@/data/site";
import { faqSchema, videoGameSchema, websiteSchema } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const intentCards = [
  { href: "/evolution-chain/", title: "Evolution Chain", detail: "All 10 verified normal bodies", icon: Layers3, tone: "tide" },
  { href: "/merge-planner/", title: "Merge Planner", detail: "Calculate theoretical body needs", icon: Target, tone: "solar" },
  { href: "/hidden-disks/", title: "Hidden Disks", detail: "Invitations, special rules, next worlds", icon: Sparkles, tone: "flare" },
  { href: "/enemy-mode/", title: "Enemy Mode", detail: "Defend your largest planet", icon: Bomb, tone: "tide" },
] as const;

export default function HomePage() {
  return (
    <>
      <JsonLd data={[websiteSchema(), videoGameSchema(), faqSchema(homeFaqs)]} />

      <section className="hero-home">
        <Image
          src="/gameplay-hidden-disk.png"
          alt="Primordial Sea hidden disk filled with evolving planets"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="hero-shade" />
        <div className="page-shell relative z-10 flex min-h-[560px] items-end pb-14 pt-24 sm:min-h-[600px] sm:pb-16">
          <div className="max-w-3xl">
            <p className="eyebrow mb-4">Unofficial browser game companion</p>
            <h1 className="font-display text-6xl font-bold leading-[0.86] text-white sm:text-7xl lg:text-8xl">Primordial<br />Sea</h1>
            <p className="mt-6 max-w-2xl text-base font-medium leading-7 text-slate-200 sm:text-lg">
              Build a world from Cosmic Dust. Plan the ten-stage merge chain, protect your largest planet, and enter the hidden disks without guessing at unpublished data.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/merge-planner/" className="btn-primary">
                Open Merge Planner
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/play/" className="btn-secondary">
                <Gamepad2 className="h-4 w-4" />
                Play in browser
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-cosmos-900">
        <div className="page-shell grid grid-cols-2 divide-x divide-y divide-white/10 md:grid-cols-4 md:divide-y-0">
          <div className="fact-cell"><strong>10</strong><span>normal evolution stages</span></div>
          <div className="fact-cell"><strong>3 + endless</strong><span>difficulty stages and free play</span></div>
          <div className="fact-cell"><strong>3 strengths</strong><span>optional enemy pressure</span></div>
          <div className="fact-cell"><strong>HTML5</strong><span>mobile and desktop browser play</span></div>
        </div>
      </section>

      <section className="page-section">
        <div className="page-shell">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Choose your next move</p>
              <h2>Choose what this run needs</h2>
            </div>
            <Link href="/beginner-guide/" className="text-link">Start with the beginner route <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="guide-grid mt-8">
            {intentCards.map((card) => {
              const Icon = card.icon;
              return (
                <Link key={card.href} href={card.href} className={`guide-card tone-${card.tone}`}>
                  <Icon className="h-5 w-5" />
                  <span>
                    <strong>{card.title}</strong>
                    <small>{card.detail}</small>
                  </span>
                  <ArrowRight className="ml-auto h-4 w-4" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="page-section border-y border-white/10 bg-cosmos-900/70">
        <div className="page-shell">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Verified normal disk</p>
              <h2>From dust to a living water planet</h2>
            </div>
            <Link href="/evolution-chain/" className="text-link">Read the chain guide <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="mt-9"><EvolutionChain /></div>
        </div>
      </section>

      <section className="page-section">
        <div className="page-shell">
          <PlannerLoader />
        </div>
      </section>

      <section className="page-section border-y border-white/10 bg-[#080a13]">
        <div className="page-shell">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Actual game state</p>
              <h2>See the gravity disk before you play</h2>
            </div>
            <a href={site.officialUrl} target="_blank" rel="noopener noreferrer" className="text-link">Official itch.io page <ArrowUpRight className="h-4 w-4" /></a>
          </div>
          <div className="screenshot-grid mt-8">
            <figure className="screenshot-feature">
              <Image src="/gameplay-board.png" alt="Stage 1 Primordial Sea board" width={782} height={1722} sizes="(max-width: 768px) 100vw, 50vw" />
              <figcaption>Stage 1: normal gravity disk and the visible ten-body chain.</figcaption>
            </figure>
            <figure className="screenshot-feature">
              <Image src="/gameplay-hidden-disk.png" alt="Invitation-only Primordial Sea hidden disk" width={782} height={1722} sizes="(max-width: 768px) 100vw, 50vw" />
              <figcaption>Hidden disk: special rules, rewards, and golden-world progression.</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="page-shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="eyebrow">Quick orientation</p>
            <h2 className="mt-3 font-display text-4xl font-bold text-white sm:text-5xl">The rules that shape every run</h2>
            <p className="mt-5 max-w-lg leading-7 text-slate-400">These points come from the official release page. Strategy pages build on them, and clearly label any practical inference.</p>
          </div>
          <div className="rule-list">
            <div><Orbit /><span><strong>Match two</strong><small>Identical bodies merge into the next stage.</small></span></div>
            <div><Clock3 /><span><strong>Beat the fuse</strong><small>Your held piece can explode, and the timer tightens as score rises.</small></span></div>
            <div><Waves /><span><strong>Preserve the disk</strong><small>The blast can scatter a carefully built board.</small></span></div>
            <div><Gift /><span><strong>Clear for items</strong><small>Items lead to invitations and the hidden-disk route.</small></span></div>
          </div>
        </div>
      </section>

      <section className="page-section border-y border-white/10 bg-cosmos-900/70">
        <div className="page-shell grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="eyebrow">Questions players ask</p>
            <h2 className="mt-3 font-display text-4xl font-bold text-white sm:text-5xl">Primordial Sea FAQ</h2>
            <Link href="/updates/" className="text-link mt-6">Check the source log <BookOpen className="h-4 w-4" /></Link>
          </div>
          <div className="faq-list">
            {homeFaqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section pb-0">
        <div className="page-shell">
          <div className="source-banner">
            <div>
              <p className="eyebrow">Source-first guide</p>
              <h2 className="mt-2 font-display text-3xl font-bold text-white">No invented drop rates. No fake recipes.</h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">Facts are checked against the official itch.io release and devlog. Unknown details stay visibly unknown until they can be verified.</p>
            </div>
            <Link href="/updates/" className="btn-secondary">View verification log <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
