import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, Sparkles, Orbit, ShieldCheck, Compass, HelpCircle } from "lucide-react";
import AuthorCard from "@/components/AuthorCard";
import JsonLd from "@/components/JsonLd";
import { getMonthYear } from "@/lib/date";
import { absoluteUrl, breadcrumbSchema } from "@/lib/seo";

export function generateMetadata(): Metadata {
  const monthYear = getMonthYear();
  return {
    title: `Primordial Sea Strategy Guide & Merge Walkthrough (${monthYear})`,
    description: "Complete gameplay guide for Primordial Sea: Gravity disk physics, orbit drop trajectories, fuse management, and late-game water planet fusion tactics.",
    alternates: { canonical: "/guides" },
  };
}

const GUIDE_FAQS = [
  {
    question: "What is the primary physics mechanic governing drops in Primordial Sea?",
    answer: "Bodies fall along centripetal vectors toward the center of the gravity disk. Releasing items from the outer perimeter creates curved orbital paths that can be used to slingshot identical bodies into each other.",
  },
  {
    question: "How do you prevent disk crowding during mid-game runs?",
    answer: "Group heavy planets on one hemisphere of the disk while using the opposite side as a staging runway for low-tier asteroid and moon merges.",
  },
  {
    question: "What happens when the fuse timer reaches zero before a drop?",
    answer: "The current body is dropped at the exact location of your cursor or finger at the moment of expiration, often disrupting carefully aligned planetary clusters.",
  },
  {
    question: "Is there an undo move mechanic?",
    answer: "No. All merges and drops in Primordial Sea are real-time, deterministic, and permanent for the duration of the current run.",
  },
];

export default function GuidesPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",

    author: {
      "@type": "Person",
      name: 'Dr. Lyra "Starlight" Chen',
      jobTitle: "Lead Celestial Mechanics Analyst & Fusion Theorist",
    },
    mainEntity: GUIDE_FAQS.map((faq) => ({
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
      <JsonLd data={[breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Guides", path: "/guides/" }]), faqSchema]} />

      <section className="compact-hero">
        <div className="page-shell relative z-10 space-y-4">
          <p className="eyebrow flex items-center gap-2">
            <Compass className="w-4 h-4 text-cyan-400" />
            Verified Orbital Strategy Protocol
          </p>
          <h1>Primordial Sea Strategy & Merge Masterclass</h1>
          <p className="max-w-2xl text-slate-300">
            A deep tactical analysis of orbital gravity trajectories, fuse pacing, perimeter zoning, and endgame water planet construction in Primordial Sea.
          </p>
        </div>
      </section>

      <main className="page-shell py-10 space-y-12">
        <AuthorCard />

        {/* Visual Media Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl overflow-hidden border border-white/10 bg-cosmos-900/60 p-4 flex flex-col items-center">
            <Image
              src="/gameplay-board.png"
              alt="Primordial Sea Gravity Disk and Stage 1 to 5 bodies"
              width={640}
              height={360}
              className="rounded-xl object-cover w-full h-56 border border-white/10"
              priority
            />
            <p className="text-xs text-slate-400 mt-3 text-center font-mono">
              Figure 1: Initial Gravity Disk layout and celestial orbit trajectories.
            </p>
          </div>

          <div className="rounded-2xl overflow-hidden border border-white/10 bg-cosmos-900/60 p-4 flex flex-col items-center">
            <Image
              src="/gameplay-merge.png"
              alt="Primordial Sea Fusion Collision Event"
              width={640}
              height={360}
              className="rounded-xl object-cover w-full h-56 border border-white/10"
            />
            <p className="text-xs text-slate-400 mt-3 text-center font-mono">
              Figure 2: Two Stage 6 Gaseous Giants fusing into a Supermassive World.
            </p>
          </div>
        </div>

        {/* Detailed Mechanics Walkthrough */}
        <div className="space-y-8 text-slate-300 leading-relaxed text-sm">
          <section className="p-6 sm:p-8 rounded-3xl bg-cosmos-900/80 border border-white/10 space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Orbit className="w-5 h-5 text-cyan-400" />
              1. Understanding Centripetal Gravity Vectors
            </h2>
            <p>
              Unlike traditional top-down drop puzzlers where objects fall straight downward, Primordial Sea utilizes a 360-degree radial gravity well centered at the core of the disk. Every celestial body released from the outer edge accelerates inward along a curved path influenced by previously deposited masses.
            </p>
            <p>
              When planning a drop, avoid aiming directly into crowded bottlenecks. Instead, release small Stage 1-3 asteroids so they graze along the perimeter curve, nudging stationary targets into alignment with their identical fusion partners. You can verify total body math in our interactive <Link href="/calculator" className="text-cyan-400 underline font-bold">Merge Calculator</Link>.
            </p>
          </section>

          <section className="p-6 sm:p-8 rounded-3xl bg-cosmos-900/80 border border-white/10 space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              2. The Hemisphere Staging Method
            </h2>
            <p>
              The most frequent mistake novice players commit is dispersing large planets evenly around the circumference of the well. Because late-stage celestial bodies occupy substantial surface area, scattering them divides your active workspace into small, unusable pockets.
            </p>
            <p>
              Designate the northern quadrant (or any 90-degree sector) exclusively for high-tier worlds (Stage 7 and above). Reserve the southern semicircle for rapid low-tier fusion cascades. This preserves open space and prevents accidental lockouts where small asteroids wedge between giants.
            </p>
          </section>

          <section className="p-6 sm:p-8 rounded-3xl bg-cosmos-900/80 border border-white/10 space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              3. Fuse Management & Enemy Mode Tap Discipline
            </h2>
            <p>
              As your score milestone exceeds 25,000 points, the fuse countdown accelerates. If you hesitate during complex board configurations, the fuse will force an unintended drop. Train your eye to prioritize identifying matches on your staging hemisphere before the body appears in your queue.
            </p>
            <p>
              In Enemy Mode, dark star anomalies spawn periodically. Never let a dark star drift into your high-tier cluster; tap it down immediately even if it interrupts your current merge sequence.
            </p>
          </section>

          {/* FAQ Section */}
          <section className="p-6 sm:p-8 rounded-3xl bg-cosmos-900/80 border border-white/10 space-y-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-cyan-400" />
              Frequently Asked Strategy Questions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {GUIDE_FAQS.map((faq, i) => (
                <div key={i} className="p-4 rounded-xl bg-cosmos-950 border border-white/10 space-y-2">
                  <h3 className="font-bold text-white text-sm">{faq.question}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
