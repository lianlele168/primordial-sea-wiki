import React from 'react';

interface AuthorCardProps {
  authorName?: string;
  role?: string;
  experience?: string;
  patchVersion?: string;
  lastUpdated?: string;
  editorialNote?: string;
}

export default function AuthorCard({
  authorName = 'Hlele',
  role = 'Editor',
  experience = 'AI-assisted research, human-reviewed',
  patchVersion = 'Float-U-Space Build v1.12',
  lastUpdated = '',
  editorialNote = 'All data is compiled from public sources and community wikis. Any figure we could not confirm from a public source is labeled as unverified rather than estimated.',
}: AuthorCardProps) {
  return (
    <div className="w-full rounded-2xl bg-[#0a1220]/90 border border-cyan-800/40 p-4 sm:p-5 backdrop-blur-md my-6 shadow-xl font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-cyan-900/30">
        <div className="flex items-center space-x-3.5">
          <div className="w-11 h-11 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold text-lg shadow-inner font-mono">
            {authorName.charAt(0)}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-white text-sm sm:text-base">{authorName}</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono">
                Independent editorial
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">
              {role} • <span className="text-gray-300 font-medium">{experience}</span>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto font-mono">
          <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-amber-500/10 text-amber-300 border border-amber-500/20">
            ⚡ {patchVersion}
          </span>
          
        </div>
      </div>

      <p className="text-xs sm:text-sm text-gray-400 mt-3 leading-relaxed italic">
        "{editorialNote}"
      </p>
      <div className="mt-3 pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
        <span>Methodology: <a href="https://robloxwikihub.com/about#methodology" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">Roblox Wiki Hub Standards</a></span>
        <span>Corrections: <a href="mailto:lianlele168@gmail.com" className="underline hover:text-white">lianlele168@gmail.com</a></span>
      </div>
    </div>
  );
}
