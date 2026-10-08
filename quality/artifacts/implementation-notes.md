# Local implementation observations
- Current src/data/pages.ts, src/app/[slug]/page.tsx and actual built HTML were reviewed, including FAQ answer text and JSON-LD. No gameplay playthrough or human verification is claimed.
- EvolutionPlanner is a local binary-merge estimator. Inputs are normal-chain tier indices and an owned-body integer between 0 and 999 (UI limit, not a game limit). The displayed formula excludes losses, score, time, random spawns, higher-tier inventory and hidden disks. Board-pressure advice is explicitly editorial inference.
- Blank dates and false playable-build verification were removed. Hlele is the user-specified editorial identity; Codex agent is the actual source reviewer. The official page was checked on 8 October 2026 UTC.
- The current /play route links to the official release without rendering an iframe. No account or personal data form exists. The planner computes in-browser; clipboard requires a click and has a tested failure fallback.
- /calculator and /guides preserve notices correcting unsupported older content, noindex and outside sitemap. privacy-policy and terms are also noindex. Ten current public guide/tool URLs are in sitemap.
- Vercel buildCommand is npm run build. No push or live deployment has been performed by this reviewer.
