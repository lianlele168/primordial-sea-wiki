export type ContentSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  steps?: { title: string; body: string }[];
  callout?: string;
};

export type GuidePage = {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  summary: string;
  image?: string;
  imageAlt?: string;
  sections: ContentSection[];
  faqs?: { question: string; answer: string }[];
  sourceLabel?: string;
};

export const guidePages: GuidePage[] = [
  {
    slug: "play",
    title: "Play Primordial Sea Online",
    eyebrow: "Official browser game",
    description: "Play Primordial Sea in your browser and learn the verified drag, drop, merge, and fuse rules before your first run.",
    summary: "Primordial Sea is free to play in a browser on mobile and desktop. The embedded game below is served by the developer's official itch.io upload.",
    image: "/gameplay-board.png",
    imageAlt: "Primordial Sea gravity disk with planet bodies during Stage 1",
    sections: [
      {
        heading: "How the controls work",
        steps: [
          { title: "Aim around the disk", body: "Drag to choose a release point anywhere around the gravity disk." },
          { title: "Release the body", body: "Let go to drop the current body into the field before its fuse burns out." },
          { title: "Match identical bodies", body: "When two bodies of the same stage meet, they merge into the next stage." },
          { title: "Respond to pressure", body: "Higher scores shorten the fuse. Enemy mode also adds dark stars that must be tapped down." },
        ],
      },
      {
        heading: "If the embed does not load",
        paragraphs: [
          "Browser privacy settings, content blockers, or third-party cookie rules can stop an itch.io game frame from loading. Use the official-game button to open the developer's page directly.",
          "Progress and availability are controlled by the official game, not this guide. This site does not mirror or redistribute the game files.",
        ],
      },
    ],
    faqs: [
      { question: "Is Primordial Sea free?", answer: "Yes. The official itch.io page lists the browser version at no charge." },
      { question: "Does Primordial Sea work on mobile?", answer: "The developer states that it plays on mobile and desktop with no installation." },
      { question: "Who made Primordial Sea?", answer: "Primordial Sea was published on itch.io by float-u-space." },
    ],
  },
  {
    slug: "beginner-guide",
    title: "Primordial Sea Beginner Guide",
    eyebrow: "First-run route",
    description: "A practical Primordial Sea beginner guide for building the merge chain, managing the fuse, and recovering a crowded gravity disk.",
    summary: "Your first objective is not to rush the Water Planet. Learn to make predictable pairs while preserving enough room for the larger worlds near the end of the chain.",
    image: "/gameplay-merge.png",
    imageAlt: "Primordial Sea Stage 2 board with merged planets",
    sections: [
      {
        heading: "A clean first-run loop",
        steps: [
          { title: "Read the next body first", body: "Identify the incoming body before you drag. The fuse punishes deciding after you have already started aiming." },
          { title: "Build nearby pairs", body: "Try to place matching small bodies within reach of each other instead of scattering every tier across the disk." },
          { title: "Protect open lanes", body: "Larger worlds need room to settle. Avoid sealing every edge with unrelated small bodies." },
          { title: "Use rescue items for recovery", body: "Save fuse control, small-body cleanup, and field reset effects for boards that are genuinely failing." },
        ],
      },
      {
        heading: "What changes as score rises",
        paragraphs: [
          "The official description says the fuse gets shorter as your score climbs. That turns late runs into a recognition test: know where each tier belongs before the body appears.",
          "The exact fuse times and score thresholds are not published. Any precise timer table would be guesswork, so this guide does not present one.",
        ],
        callout: "Strategy on this page is practical guidance inferred from the verified merge and fuse rules, not a developer-authored solution.",
      },
    ],
    faqs: [
      { question: "What is the goal in Primordial Sea?", answer: "Merge identical bodies through the creation chain, from Cosmic Dust to a Water Planet, while keeping the gravity disk under control." },
      { question: "Why did my held piece explode?", answer: "A fuse runs while you aim. If it expires, the piece explodes and can scatter your stack." },
      { question: "Is there an endless mode?", answer: "Yes. The official feature list includes endless free play in addition to three difficulty stages." },
    ],
  },
  {
    slug: "evolution-chain",
    title: "Primordial Sea Evolution Chain",
    eyebrow: "All 10 normal stages",
    description: "See the complete verified Primordial Sea evolution chain from Cosmic Dust to Water Planet, with merge math and planning notes.",
    summary: "The normal disk has ten named stages. Every step requires two matching bodies, so a Water Planet represents 512 Cosmic Dust bodies in the theoretical no-loss case.",
    image: "/primordial-sea-cover.png",
    imageAlt: "Primordial Sea cover showing the body evolution sequence and Water Planet",
    sections: [
      {
        heading: "How the merge math works",
        paragraphs: [
          "Two identical bodies create one body at the next stage. Moving up n stages therefore requires 2 to the power of n source bodies. For example, one Rain World theoretically requires eight Molten Cores.",
          "This is a planning minimum, not a score forecast. Physics, fuse explosions, enemy attacks, and imperfect drops can increase what a real run needs.",
        ],
      },
      {
        heading: "What comes after Water Planet",
        paragraphs: [
          "The official page confirms that hidden disks can evolve worlds beyond the Water Planet, including golden and rainbow bodies. It does not publish the full post-Water-Planet names or recipes.",
        ],
        callout: "Use the Merge Planner to calculate any verified section of the normal ten-stage chain.",
      },
    ],
    faqs: [
      { question: "How many stages are in the normal Primordial Sea chain?", answer: "There are ten named stages from Cosmic Dust through Water Planet." },
      { question: "What comes after Ocean World?", answer: "Two Ocean Worlds merge into a Water Planet in the normal chain." },
      { question: "Can worlds evolve beyond Water Planet?", answer: "Yes, but only the existence of further hidden-disk evolution is officially described; the full chain is not published." },
    ],
  },
  {
    slug: "hidden-disks",
    title: "Primordial Sea Hidden Disks Guide",
    eyebrow: "Invitation progression",
    description: "Learn what Primordial Sea hidden disks are, how invitations fit the progression loop, and which details are still unconfirmed.",
    summary: "Hidden disks are invitation-only boards with their own rules and rewards. They introduce golden and rainbow bodies and allow evolution beyond the normal Water Planet endpoint.",
    image: "/gameplay-hidden-disk.png",
    imageAlt: "Primordial Sea invitation-only hidden disk with a golden world",
    sections: [
      {
        heading: "Unlock loop",
        steps: [
          { title: "Clear stages", body: "Stage clears award items according to the official description." },
          { title: "Trade items", body: "Items can be exchanged for invitations; exact costs are not publicly listed on the game page." },
          { title: "Open a hidden disk", body: "Invitations unlock special disks with different rules and rewards." },
          { title: "Push past Water Planet", body: "Hidden disks add golden and rainbow bodies and a longer evolution path." },
        ],
      },
      {
        heading: "What is not confirmed yet",
        bullets: [
          "The exact invitation recipe for each hidden disk",
          "The complete hidden evolution chain and English body names",
          "Reward probabilities or guaranteed drop tables",
          "The number of clears required for the grand finale",
        ],
        callout: "This page will be updated from official devlogs or directly observable game text. It will not fill gaps with invented recipes.",
      },
    ],
    faqs: [
      { question: "How do you unlock hidden disks in Primordial Sea?", answer: "The official page says to clear stages for items, then trade items for invitations that open hidden disks." },
      { question: "What is special about hidden disks?", answer: "They have distinct rules and rewards, golden and rainbow bodies, and evolution beyond the Water Planet." },
      { question: "Is there a grand finale?", answer: "Yes. The developer lists a grand finale at the end of the hidden-disk progression." },
    ],
  },
  {
    slug: "enemy-mode",
    title: "Primordial Sea Enemy Mode Guide",
    eyebrow: "Dark-star pressure",
    description: "Understand Primordial Sea enemy mode, its three strength settings, dark-star targeting, and a practical defense routine.",
    summary: "Enemy mode is optional and has three strength settings. Dark stars hunt your largest planet; tap them down before they detonate it.",
    image: "/gameplay-merge.png",
    imageAlt: "Primordial Sea board with the enemy-mode star control visible",
    sections: [
      {
        heading: "Defense priorities",
        steps: [
          { title: "Know your largest body", body: "Dark stars target the largest planet, so keep track of its position before pressure begins." },
          { title: "Scan between drops", body: "Use the moment after a stable merge to check the board edge for a threat." },
          { title: "Tap before detonation", body: "The verified counter is direct tapping. Delaying risks losing the body that holds the most merge value." },
          { title: "Lower the strength to learn", body: "Use the three enemy strength settings as a progression ladder rather than adding maximum pressure immediately." },
        ],
      },
      {
        heading: "What enemy mode does not change",
        paragraphs: [
          "The core match-two evolution chain remains the foundation. Enemy mode adds attention pressure; it does not replace planning, fuse management, or board-space control.",
          "The official page does not publish enemy health, spawn intervals, or strength multipliers. Those values are intentionally absent here.",
        ],
      },
    ],
    faqs: [
      { question: "Is enemy mode required?", answer: "No. The developer describes enemy mode as optional." },
      { question: "How many enemy strengths are there?", answer: "There are three selectable strengths." },
      { question: "What do dark stars attack?", answer: "They hunt the largest planet on the disk and can detonate it if they are not tapped down." },
    ],
  },
  {
    slug: "items-guide",
    title: "Primordial Sea Items Guide",
    eyebrow: "Three rescue effects",
    description: "A source-safe Primordial Sea items guide covering the three verified board-rescue effects without inventing names or drop rates.",
    summary: "The official page describes three rescue effects: still the fuse, purify small bodies, or reset the field. It does not provide official English item names or numerical drop rates.",
    image: "/gameplay-board.png",
    imageAlt: "Primordial Sea item controls above a crowded gravity disk",
    sections: [
      {
        heading: "When each effect matters",
        steps: [
          { title: "Fuse control", body: "Use it when the board is readable but the shorter late-run fuse is preventing a careful placement." },
          { title: "Small-body purification", body: "Use it when low-tier clutter blocks the movement or pairing of larger worlds." },
          { title: "Field reset", body: "Treat the reset as the broadest recovery option for a board whose structure is no longer salvageable." },
        ],
      },
      {
        heading: "Items and invitation progression",
        paragraphs: [
          "The official description connects stage clears, earned items, and invitation trading. Because the exact economy is not published, this guide separates verified effects from unknown costs.",
        ],
        callout: "No made-up item rarity, cooldown, price, or drop chance is shown on this site.",
      },
    ],
    faqs: [
      { question: "How many rescue item effects are confirmed?", answer: "Three effects are described: stop the fuse, remove small bodies, and reset the field." },
      { question: "How do you earn items?", answer: "The official page says that clearing stages earns items." },
      { question: "Can items unlock hidden disks?", answer: "Items can be traded for invitations, which unlock hidden disks." },
    ],
  },
  {
    slug: "updates",
    title: "Primordial Sea Updates and Sources",
    eyebrow: "Verification log",
    description: "Track Primordial Sea release facts, official devlogs, source links, and which guide details were verified or remain unknown.",
    summary: "This page is the audit trail for the guide. Player-facing claims are traced to the official itch.io page, its screenshots, or its devlog.",
    sections: [
      {
        heading: "Current release record",
        bullets: [
          "Published on itch.io on at 07:46 UTC",
          "Status listed as Released and platform listed as HTML5",
          "Updated on at 06:52 UTC when this guide was checked",
          "v1.1 devlog: mobile layout fix, app icon, and home-screen naming update",
        ],
      },
      {
        heading: "Source policy",
        paragraphs: [
          "Official descriptions and visible in-game text are treated as facts. Strategy advice is labeled as guidance. Unknown numbers, recipes, names, and probabilities stay unknown until they can be verified.",
          "This source-first policy keeps the site useful without multiplying unverified text across many pages.",
        ],
        callout: "Last source check: .",
      },
    ],
    sourceLabel: "Open the official devlog",
  },
  {
    slug: "about",
    title: "About Primordial Sea Guide",
    eyebrow: "Independent companion",
    description: "About this unofficial Primordial Sea browser game guide, its source policy, interactive planner, and relationship to the developer.",
    summary: "Primordial Sea Guide is an independent player companion built around verified rules, transparent merge math, and direct links to the official game.",
    sections: [
      {
        heading: "What this site adds",
        bullets: [
          "A searchable explanation of the normal ten-stage evolution chain",
          "An original merge planner that calculates theoretical body requirements",
          "Focused guides for hidden disks, enemy mode, and rescue items",
          "A public source log that separates confirmed facts from open questions",
        ],
      },
      {
        heading: "Independence and attribution",
        paragraphs: [
          "This site is not affiliated with itch.io or float-u-space. Primordial Sea, its artwork, and its screenshots belong to the developer. The game is loaded from or linked to the official itch.io release.",
        ],
      },
    ],
  },
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    eyebrow: "Site information",
    description: "Privacy policy for the unofficial Primordial Sea Guide website.",
    summary: "This static guide does not require an account and does not collect personal information through its own forms.",
    sections: [
      {
        heading: "Information and storage",
        paragraphs: [
          "The merge planner runs in your browser. Its inputs are not sent to this site. Standard hosting logs may record technical information such as IP address, browser type, requested page, and time of access for security and reliability.",
          "Third-party embeds and outbound links, including itch.io, operate under their own privacy policies. Opening or playing embedded content may allow those services to set cookies or collect usage data.",
        ],
      },
      {
        heading: "Advertising and analytics",
        paragraphs: [
          "If analytics or advertising is added later, this policy and any required consent controls will be updated before those services are enabled. Contact details will also be published before accepting privacy requests through the site.",
        ],
      },
    ],
  },
  {
    slug: "terms",
    title: "Terms of Use",
    eyebrow: "Site information",
    description: "Terms of use and disclaimer for the unofficial Primordial Sea Guide website.",
    summary: "Use this site as an unofficial reference. Game behavior can change, and the official itch.io page remains the authoritative source.",
    sections: [
      {
        heading: "Guide disclaimer",
        paragraphs: [
          "Information is provided in good faith from publicly available official material and practical interpretation. No guarantee is made that every strategy will work for every version, difficulty, or board state.",
          "Primordial Sea, associated artwork, and trademarks belong to their respective owner. This guide does not claim ownership and does not sell access to the game.",
        ],
      },
      {
        heading: "Acceptable use",
        paragraphs: [
          "You may use the planner and guides for personal gameplay. Do not represent this site as official, use it to distribute the game files, or rely on it for any transaction with the developer or itch.io.",
        ],
      },
    ],
  },
];

export const homeFaqs = [
  { question: "What is Primordial Sea?", answer: "Primordial Sea is a free HTML5 cosmic merge puzzle by float-u-space. Players drop matching planetesimals into a gravity disk and evolve them from Cosmic Dust to a Water Planet." },
  { question: "Can I play Primordial Sea in a browser?", answer: "Yes. The official itch.io release supports browser play on mobile and desktop with no installation." },
  { question: "What is the full Primordial Sea evolution chain?", answer: "The verified normal chain is Cosmic Dust, Pebble, Rock, Planetesimal, Molten Core, Magma Sphere, Cooled World, Rain World, Ocean World, and Water Planet." },
  { question: "How do hidden disks work?", answer: "Stage clears earn items that can be traded for invitations. Invitations open special disks with distinct rules, golden and rainbow bodies, and evolution beyond the Water Planet." },
  { question: "What happens when the fuse expires?", answer: "The held body explodes and the blast can scatter the bodies already stacked on the disk. The fuse becomes shorter as score rises." },
  { question: "Does Primordial Sea have enemy mode?", answer: "Yes. Optional enemy mode has three strengths. Dark stars target the largest planet and must be tapped before they detonate it." },
];

export function getGuidePage(slug: string) {
  return guidePages.find((page) => page.slug === slug);
}
