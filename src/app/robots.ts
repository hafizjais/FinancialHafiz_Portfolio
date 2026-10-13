import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // A/B variant route — the canonical page is "/".
      disallow: "/hero-b",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
