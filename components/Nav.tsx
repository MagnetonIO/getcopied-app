"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { trackDownload } from "@/lib/analytics";

const PKG_URL =
  "https://github.com/MagnetonIO/copied-app/releases/download/v1.3.0/Copied-License-v1.3.0.pkg";

export function Nav() {
  const pathname = usePathname();
  const router = useRouter();

  const goHome = (e: React.MouseEvent) => {
    e.preventDefault();
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push("/");
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-black/70 border-b border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <a href="/" onClick={goHome} className="flex items-center gap-2 cursor-pointer">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
              <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" />
              <rect x="8" y="2" width="8" height="4" rx="1" />
            </svg>
          </div>
          <span className="font-semibold text-sm tracking-tight">Copied</span>
        </a>
        <div className="flex items-center gap-6">
          {/* Hide nav links on mobile, show on md+ */}
          <a href="/#features" className="hidden md:inline text-sm text-[var(--text-secondary)] hover:text-white transition-colors">Features</a>
          <Link href="/blog/reverse-engineering-copied" className="hidden md:inline text-sm text-[var(--text-secondary)] hover:text-white transition-colors">Blog</Link>
          <Link href="/support" className="hidden md:inline text-sm text-[var(--text-secondary)] hover:text-white transition-colors">Support</Link>
          <a href="/#download" className="hidden md:inline text-sm text-[var(--text-secondary)] hover:text-white transition-colors">Download</a>
          <a
            href={PKG_URL}
            onClick={() => trackDownload({ location: "nav_cta", variant: "license", version: "1.3.0" })}
            className="text-sm px-4 py-1.5 rounded-full bg-white text-black font-medium hover:bg-white/90 transition-colors"
          >
            Get Copied
          </a>
        </div>
      </div>
    </nav>
  );
}
