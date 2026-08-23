import { ArrowUpRight, Gamepad2 } from "lucide-react";
import { site } from "@/data/site";

export default function PlayFrame() {
  return (
    <section className="play-frame" aria-label="Primordial Sea browser game">
      <div className="flex flex-col gap-4 border-b border-white/10 bg-cosmos-900 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Gamepad2 className="h-5 w-5 text-tide-300" />
          <div>
            <h2 className="font-bold text-white">Official itch.io game frame</h2>
            <p className="text-xs text-slate-400">Served from the developer&apos;s current HTML5 upload</p>
          </div>
        </div>
        <a href={site.officialUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">
          Open on itch.io
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
      <div className="aspect-[16/10] min-h-[520px] bg-black sm:aspect-video sm:min-h-0">
        <iframe
          src={site.directGameUrl}
          title="Play Primordial Sea"
          className="h-full w-full border-0"
          allow="autoplay; fullscreen; gamepad"
          allowFullScreen
          loading="eager"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    </section>
  );
}
