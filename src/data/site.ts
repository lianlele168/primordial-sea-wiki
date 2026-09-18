export const site = {
  name: "Primordial Sea Guide",
  gameName: "Primordial Sea",
  developer: "float-u-space",
  baseUrl: "https://primordialsea.robloxwikihub.com",
  officialUrl: "https://float-u-space.itch.io/primordial-sea",
  officialDevlogUrl: "https://float-u-space.itch.io/primordial-sea/devlog",
  directGameUrl: "https://html-classic.itch.zone/html/18918346/index.html?v=1787467980",
  published: "",
  lastChecked: "",
  description:
    "An unofficial Primordial Sea game guide with a merge evolution planner, complete 10-stage chain, hidden disk notes, enemy mode tactics, and browser play links.",
} as const;

export const evolutionStages = [
  { name: "Cosmic Dust", short: "Dust", color: "#d9e0e7", note: "The smallest verified body in the normal chain." },
  { name: "Pebble", short: "Pebble", color: "#9b7ac4", note: "Merge two Cosmic Dust bodies." },
  { name: "Rock", short: "Rock", color: "#b9673f", note: "Merge two Pebbles." },
  { name: "Planetesimal", short: "Planetesimal", color: "#d5a73f", note: "The chain begins to take a planetary shape." },
  { name: "Molten Core", short: "Molten Core", color: "#e77b2e", note: "A hot early-world body." },
  { name: "Magma Sphere", short: "Magma Sphere", color: "#e84b35", note: "Merge two Molten Cores." },
  { name: "Cooled World", short: "Cooled World", color: "#566272", note: "The surface cools before water appears." },
  { name: "Rain World", short: "Rain World", color: "#74b8a6", note: "A green-cyan world shaped by rain." },
  { name: "Ocean World", short: "Ocean World", color: "#438bd1", note: "An ocean-rich late-chain body." },
  { name: "Water Planet", short: "Water Planet", color: "#32c7c1", note: "The final named body in the normal 10-stage chain." },
] as const;

export const navItems = [
  { href: "/play", label: "Play" },
  { href: "/beginner-guide", label: "Guide" },
  { href: "/evolution-chain", label: "Evolution" },
  { href: "/merge-planner", label: "Planner" },
  { href: "/hidden-disks", label: "Hidden Disks" },
  { href: "/enemy-mode", label: "Enemy Mode" },
] as const;

export const routes = [
  { path: "/", priority: 1, changeFrequency: "daily" },
  { path: "/play", priority: 0.95, changeFrequency: "weekly" },
  { path: "/merge-planner", priority: 0.95, changeFrequency: "weekly" },
  { path: "/evolution-chain", priority: 0.9, changeFrequency: "weekly" },
  { path: "/beginner-guide", priority: 0.9, changeFrequency: "weekly" },
  { path: "/hidden-disks", priority: 0.85, changeFrequency: "weekly" },
  { path: "/enemy-mode", priority: 0.85, changeFrequency: "weekly" },
  { path: "/items-guide", priority: 0.8, changeFrequency: "weekly" },
  { path: "/updates", priority: 0.7, changeFrequency: "daily" },
  { path: "/about", priority: 0.35, changeFrequency: "monthly" },
  ] as const;
