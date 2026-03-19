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
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Copied — Clipboard Manager for macOS",
    description:
      "Code detection, fuzzy search, smart paste, iCloud sync. Your clipboard, supercharged.",
    url: "https://getcopied.app",
    siteName: "Copied",
    type: "website",
    images: [
      {
        url: "https://getcopied.app/og.png",
        width: 1200,
        height: 630,
        alt: "Copied — Clipboard Manager for macOS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Copied — Clipboard Manager for macOS",
    description:
      "Code detection, fuzzy search, smart paste, iCloud sync. Your clipboard, supercharged.",
    images: ["https://getcopied.app/og.png"],
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
