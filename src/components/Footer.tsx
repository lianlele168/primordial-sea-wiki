import Link from "next/link";
import { ArrowUpRight, Orbit, ShieldCheck } from "lucide-react";
import { navItems, site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-cosmos-950">
      <div className="border-b border-white/10 bg-tide-500/[0.04]">
        <div className="page-shell flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2 text-sm font-semibold text-slate-300">
            <span className="h-2.5 w-2.5 rounded-full bg-tide-400 shadow-tide" />
            Checked against official sources
          </p>
          <a href={site.officialUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-solar-400 hover:text-solar-300">
            Play on itch.io
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>

      <div className="page-shell grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <Orbit className="h-6 w-6 text-tide-300" />
            <span className="font-display text-2xl font-bold text-white">Primordial Sea Guide</span>
          </div>
          <p className="max-w-md text-sm leading-7 text-slate-400">
            An unofficial companion for the HTML5 cosmic merge puzzle by {site.developer}. Built around verified rules, transparent merge math, and an original planning tool.
          </p>
        </div>

        <div>
          <h2 className="mb-4 text-xs font-black uppercase tracking-[0.16em] text-solar-400">Explore</h2>
          <ul className="space-y-2 text-sm text-slate-300">
            {navItems.slice(0, 5).map((item) => (
              <li key={item.href}><Link href={item.href} className="hover:text-white">{item.label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-xs font-black uppercase tracking-[0.16em] text-solar-400">Site</h2>
          <ul className="space-y-2 text-sm text-slate-300">
            <li><Link href="/updates/" className="hover:text-white">Updates & Sources</Link></li>
            <li><Link href="/about/" className="hover:text-white">About</Link></li>
            <li><Link href="/privacy-policy/" className="hover:text-white">Privacy Policy</Link></li>
            <li><Link href="/terms/" className="hover:text-white">Terms</Link></li>
          </ul>
          <p className="mt-5 flex gap-2 rounded-md border border-white/10 bg-white/[0.03] p-3 text-xs leading-5 text-slate-400">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-tide-300" />
            Not affiliated with itch.io or float-u-space. Game art and screenshots belong to the developer.
          </p>
        </div>
      </div>

      <div className="page-shell border-t border-white/10 py-6 text-xs text-slate-500">
        (c) {new Date().getFullYear()} Primordial Sea Guide. Independent fan reference.
      </div>
    </footer>
  );
}
