import type { MetadataRoute } from "next";

const SITE_URL = "https://www.getcopied.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-04-21");
  return [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/docs`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/support`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/blog/reverse-engineering-copied`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.6,
    },
  ];
}
