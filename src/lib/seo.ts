import { site } from "@/data/site";

export function absoluteUrl(path = "/") {
  const normalized = path.replace(/^\/+|\/+$/g, "");
  const isFile = /\.[a-z0-9]+$/i.test(normalized);
  const clean = path === "/" ? "/" : `/${normalized}${isFile ? "" : "/"}`;
  return `${site.baseUrl}${clean}`;
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: absoluteUrl(),
    description: site.description,
    publisher: { "@type": "Organization", name: site.name },
  };
}

export function videoGameSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: site.gameName,
    url: site.officialUrl,
    image: absoluteUrl("/primordial-sea-cover.png"),
    description: "A cosmic merge puzzle where matching planetesimals evolve from Cosmic Dust to a Water Planet.",
    applicationCategory: "Game",
    gamePlatform: "HTML5 browser",
    genre: ["Puzzle", "Casual", "Physics", "Merge"],
    author: { "@type": "Person", name: site.developer },
    datePublished: site.published,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function articleSchema(title: string, description: string, slug: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    mainEntityOfPage: absoluteUrl(slug),
    image: absoluteUrl("/primordial-sea-cover.png"),
    datePublished: "",

    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name },
  };
}
