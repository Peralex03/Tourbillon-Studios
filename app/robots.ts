import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // /work is noindex (hidden case studies) · /api is not a page
      disallow: ["/api/", "/fr/work", "/de/work", "/it/work", "/en/work"],
    },
    sitemap: "https://tourbillonstudios.ch/sitemap.xml",
  };
}
