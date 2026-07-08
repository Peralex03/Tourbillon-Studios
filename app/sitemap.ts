import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { routing } from "@/i18n/routing";

const BASE = "https://tourbillonstudios.ch";

/** Indexable routes (path without locale prefix). /work is noindex, /start is a funnel. */
const ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/pricing", priority: 0.9, changeFrequency: "monthly" },
  { path: "/image", priority: 0.8, changeFrequency: "monthly" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/blog", priority: 0.7, changeFrequency: "daily" },
  { path: "/contact", priority: 0.6, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
];

function entry(
  path: string,
  priority: number,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
  lastModified?: string
): MetadataRoute.Sitemap[number] {
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l === "en" ? "en" : `${l}-CH`, `${BASE}/${l}${path}`])
  );
  return {
    url: `${BASE}/${routing.defaultLocale}${path}`,
    lastModified,
    changeFrequency,
    priority,
    alternates: { languages },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ROUTES.map((r) => entry(r.path, r.priority, r.changeFrequency));
  const articles = getAllPosts().map((p) =>
    entry(`/blog/${p.slug}`, 0.6, "yearly", p.date)
  );
  return [...pages, ...articles];
}
