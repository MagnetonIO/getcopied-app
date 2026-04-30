// Single source of truth for the public Copied app version + download URL.
//
// Resolution order (first non-empty wins):
//   1. NEXT_PUBLIC_APP_VERSION — explicit pin (set in Vercel → Project
//      Settings → Environment Variables when you need to override).
//   2. LATEST_RELEASE_TAG from lib/version-generated.ts — overwritten at
//      build time by scripts/sync-version.mjs (runs as `prebuild`), which
//      hits api.github.com/repos/MagnetonIO/copied-app/releases/latest.
//
// Net effect: every Vercel rebuild picks up the latest GitHub release
// automatically. To trigger a rebuild on release, configure a release-
// published webhook on the copied-app repo pointing at a Vercel deploy hook.
// No env-var bump or per-release commit needed.

import { LATEST_RELEASE_TAG } from "./version-generated";

export const APP_VERSION = process.env.NEXT_PUBLIC_APP_VERSION ?? LATEST_RELEASE_TAG;

export const GITHUB_REPO = "MagnetonIO/copied-app";

export const PKG_FILENAME = `Copied-v${APP_VERSION}.pkg`;

export const PKG_URL =
  `https://github.com/${GITHUB_REPO}/releases/download/v${APP_VERSION}/${PKG_FILENAME}`;

export const RELEASES_URL =
  `https://github.com/${GITHUB_REPO}/releases/latest`;

export const RELEASE_TAG_URL =
  `https://github.com/${GITHUB_REPO}/releases/tag/v${APP_VERSION}`;
