import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Copied — Clipboard Manager for macOS",
  description:
    "A modern clipboard manager with code detection, fuzzy search, smart transformations, and iCloud sync. Built for developers.",
  keywords: [
    "clipboard manager",
    "macOS",
    "clipboard history",
    "code snippets",
    "productivity",
    "developer tools",
  ],
  openGraph: {
    title: "Copied — Clipboard Manager for macOS",
    description:
      "Code detection, fuzzy search, smart paste, iCloud sync. Your clipboard, supercharged.",
    url: "https://getcopied.app",
    siteName: "Copied",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Copied — Clipboard Manager for macOS",
    description:
      "Code detection, fuzzy search, smart paste, iCloud sync. Your clipboard, supercharged.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
