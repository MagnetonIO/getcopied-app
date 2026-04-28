// Single source of truth for the public Copied app version + download URL.
// Driven by NEXT_PUBLIC_APP_VERSION (set in .env.local for dev, in Vercel
// → Project Settings → Environment Variables for prod). The fallback
// matches whatever was last shipped so a missing env var never breaks
// the CTA — it just goes stale until someone bumps the var.
//
// To ship a new version end-to-end:
//   1. Build + upload the new .pkg to GitHub releases (tag = v<new>)
//   2. Bump NEXT_PUBLIC_APP_VERSION in .env.local AND on Vercel
//   3. Redeploy (Vercel auto-deploys on env-var change)

export const APP_VERSION = process.env.NEXT_PUBLIC_APP_VERSION ?? "1.3.1";

export const GITHUB_REPO = "MagnetonIO/copied-app";

export const PKG_FILENAME = `Copied-v${APP_VERSION}.pkg`;

export const PKG_URL =
  `https://github.com/${GITHUB_REPO}/releases/download/v${APP_VERSION}/${PKG_FILENAME}`;

export const RELEASES_URL =
  `https://github.com/${GITHUB_REPO}/releases/latest`;

export const RELEASE_TAG_URL =
  `https://github.com/${GITHUB_REPO}/releases/tag/v${APP_VERSION}`;
