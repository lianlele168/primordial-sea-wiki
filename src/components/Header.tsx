"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight,
  ChevronRight,
  Menu,
  Orbit,
  Search,
  Waves,
  X,
} from "lucide-react";
import { guidePages } from "@/data/pages";
import { navItems, site } from "@/data/site";

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }
      if (event.key === "Escape") {
        setSearchOpen(false);
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return guidePages.slice(0, 6);
    return guidePages
      .filter((page) => `${page.title} ${page.eyebrow} ${page.description}`.toLowerCase().includes(normalized))
      .slice(0, 8);
  }, [query]);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-white/10 bg-cosmos-950/95 backdrop-blur-md">
        <div className="page-shell flex h-16 items-center justify-between gap-3">
          <Link href="/" className="flex min-w-0 items-center gap-3" aria-label="Primordial Sea Guide home">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-tide-400/35 bg-tide-500/10 text-tide-300">
              <Orbit className="h-5 w-5" />
            </span>
            <span className="min-w-0">
              <span className="block truncate font-display text-xl font-bold text-white">Primordial Sea</span>
              <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-solar-400">Merge field guide</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 xl:flex" aria-label="Primary navigation">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-md px-3 py-2 text-sm font-bold transition ${
                    active ? "bg-tide-500/12 text-tide-300" : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={site.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden h-10 items-center gap-2 rounded-md border border-white/10 px-3 text-xs font-bold text-slate-200 transition hover:border-solar-400/60 hover:text-white lg:flex"
            >
              Official game
              <ArrowUpRight className="h-4 w-4 text-solar-400" />
            </a>
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="flex h-10 items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 text-sm font-bold text-slate-200 transition hover:border-tide-400/50 hover:text-white"
              aria-label="Search the guide"
              title="Search the guide"
            >
              <Search className="h-4 w-4 text-tide-300" />
              <span className="hidden sm:inline">Search</span>
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="grid h-10 w-10 place-items-center rounded-md border border-white/10 bg-white/5 text-white xl:hidden"
              aria-label="Toggle navigation"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {menuOpen ? (
          <div className="border-t border-white/10 bg-cosmos-950 px-4 py-4 xl:hidden">
            <div className="mx-auto grid max-w-7xl gap-2 sm:grid-cols-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between rounded-md border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-bold text-slate-200"
                >
                  {item.label}
                  <ChevronRight className="h-4 w-4 text-tide-300" />
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </header>

      {searchOpen ? (
        <div className="fixed inset-0 z-50 bg-cosmos-950/95 px-4 pt-16 backdrop-blur-sm sm:pt-24" role="dialog" aria-modal="true" aria-label="Guide search">
          <div className="mx-auto w-full max-w-2xl overflow-hidden rounded-lg border border-white/15 bg-cosmos-900 shadow-2xl">
            <div className="flex items-center border-b border-white/10 px-4">
              <Search className="h-5 w-5 shrink-0 text-tide-300" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search evolution, items, hidden disks..."
                className="h-14 w-full bg-transparent px-4 text-base font-semibold text-white outline-none placeholder:text-slate-500"
                autoFocus
              />
              <button type="button" onClick={() => setSearchOpen(false)} className="grid h-9 w-9 place-items-center rounded-md text-slate-400 hover:bg-white/5 hover:text-white" aria-label="Close search">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="max-h-[65vh] overflow-y-auto p-3">
              {results.length ? (
                <div className="space-y-2">
                  {results.map((page) => (
                    <Link
                      key={page.slug}
                      href={`/${page.slug}/`}
                      onClick={() => setSearchOpen(false)}
                      className="group flex items-center justify-between rounded-md border border-transparent px-3 py-3 transition hover:border-tide-400/25 hover:bg-tide-500/5"
                    >
                      <span className="min-w-0">
                        <span className="block truncate font-bold text-white">{page.title}</span>
                        <span className="block truncate text-xs text-slate-400">{page.description}</span>
                      </span>
                      <ChevronRight className="ml-4 h-4 w-4 shrink-0 text-tide-300 transition group-hover:translate-x-0.5" />
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="py-10 text-center">
                  <Waves className="mx-auto mb-3 h-7 w-7 text-tide-300" />
                  <p className="text-sm text-slate-400">No guide page matches that search.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
