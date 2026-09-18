import type { MetadataRoute } from "next";
import { routes, site } from "@/data/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${site.baseUrl}${route.path.endsWith("/") ? route.path : `${route.path}/`}`,
    lastModified: new Date(site.lastChecked),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
