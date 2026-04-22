import type { MetadataRoute } from "next";

const SITE_URL = "https://www.getcopied.app";

// Allow Google + all major AI crawlers. Block only the server-side API and
// payment redirect routes — nothing useful to index there, and /unlock leaks
// per-session license keys in the HTML body if crawled with a real session
// id (not reachable without one, but defense in depth).
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/", "/unlock"] },
      // Explicitly welcome AI crawlers so the Copied page shows up in
      // ChatGPT / Perplexity / Claude / Gemini search tools.
      { userAgent: "GPTBot", allow: "/", disallow: ["/api/", "/unlock"] },
      { userAgent: "ChatGPT-User", allow: "/", disallow: ["/api/", "/unlock"] },
      { userAgent: "OAI-SearchBot", allow: "/", disallow: ["/api/", "/unlock"] },
      { userAgent: "PerplexityBot", allow: "/", disallow: ["/api/", "/unlock"] },
      { userAgent: "Perplexity-User", allow: "/", disallow: ["/api/", "/unlock"] },
      { userAgent: "ClaudeBot", allow: "/", disallow: ["/api/", "/unlock"] },
      { userAgent: "Claude-User", allow: "/", disallow: ["/api/", "/unlock"] },
      { userAgent: "Claude-SearchBot", allow: "/", disallow: ["/api/", "/unlock"] },
      { userAgent: "Google-Extended", allow: "/", disallow: ["/api/", "/unlock"] },
      { userAgent: "Bytespider", allow: "/", disallow: ["/api/", "/unlock"] },
      { userAgent: "Applebot", allow: "/", disallow: ["/api/", "/unlock"] },
      { userAgent: "Applebot-Extended", allow: "/", disallow: ["/api/", "/unlock"] },
      { userAgent: "Meta-ExternalAgent", allow: "/", disallow: ["/api/", "/unlock"] },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
