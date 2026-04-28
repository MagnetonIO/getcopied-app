"use client";

import { motion } from "framer-motion";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { trackDownload, trackUnlockClick } from "@/lib/analytics";

const PKG_URL =
  "https://github.com/MagnetonIO/copied-app/releases/download/v1.3.0/Copied-License-v1.3.0.pkg";
const RELEASES_URL =
  "https://github.com/MagnetonIO/copied-app/releases/latest";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <Nav />
      <Hero />
      <Features />
      <CodeDemo />
      <Shortcuts />
      <Download />
      <Footer />
    </main>
  );
}

/* ── Nav & Footer imported from components/ ── */

/* ── Hero ────────────────────────────────────── */

function Hero() {
  return (
    <section className="pt-32 pb-20 px-6">
      <motion.div
        className="max-w-4xl mx-auto text-center"
        initial="hidden"
        animate="visible"
        variants={stagger}
      >
        <motion.div variants={fadeUp} className="mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-[var(--text-secondary)] mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Now on macOS &middot; iOS Beta available
          </div>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="text-6xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-6"
        >
          Your clipboard,
          <br />
          <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
            supercharged.
          </span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Copied auto-detects code, searches your history instantly, transforms
          text on the fly, and syncs across all your Macs and iOS devices.
        </motion.p>

        <motion.div variants={fadeUp} className="flex items-center justify-center gap-4">
          <a
            href={PKG_URL}
            onClick={() => trackDownload({ location: "hero", variant: "license", version: "1.3.0" })}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-black font-semibold text-base hover:bg-white/90 transition-all hover:scale-105"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
            </svg>
            Download for Mac
          </a>
          <a
            href="mailto:support@getcopied.app?subject=iOS%20Beta%20Invite&body=Please%20add%20me%20to%20the%20Copied%20iOS%20Beta."
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/20 text-white/80 font-medium text-base hover:bg-white/5 transition-all"
          >
            Join iOS Beta
          </a>
          <a
            href="https://github.com/MagnetonIO/copied-app"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/20 text-white/80 font-medium text-base hover:bg-white/5 transition-all"
          >
            View on GitHub
          </a>
        </motion.div>

        {/* App Preview */}
        <motion.div
          variants={fadeUp}
          className="mt-16 mx-auto max-w-lg"
        >
          <div className="rounded-2xl border border-white/10 bg-[var(--bg-card)] shadow-2xl shadow-black/50 overflow-hidden">
            {/* Title bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              </div>
              <div className="flex-1 text-center text-xs text-[var(--text-tertiary)]">
                Copied
              </div>
            </div>
            {/* Search bar */}
            <div className="px-4 py-3 border-b border-white/5">
              <div className="flex items-center gap-2 text-sm text-[var(--text-tertiary)]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
                </svg>
                Search clippings...
              </div>
            </div>
            {/* Clipping rows */}
            <div className="divide-y divide-white/5">
              <ClipRow icon="code" color="text-emerald-400" label="func fetchUser()" badge="Swift" time="2s" shortcut="1" />
              <ClipRow icon="link" color="text-blue-400" label="https://api.example.com/v2" time="45s" shortcut="2" />
              <ClipRow icon="text" color="text-[var(--text-tertiary)]" label="Meeting notes from standup — discussed..." time="3m" shortcut="3" />
              <ClipRow icon="image" color="text-purple-400" label="Screenshot 1024 x 768" time="12m" shortcut="4" />
            </div>
            {/* Status bar */}
            <div className="px-4 py-2 border-t border-white/5 flex items-center justify-between text-[10px] text-[var(--text-tertiary)]">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Monitoring
              </div>
              <span>Ctrl+Shift+C</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function ClipRow({ icon, color, label, badge, time, shortcut }: {
  icon: string; color: string; label: string; badge?: string; time: string; shortcut: string;
}) {
  const icons: Record<string, React.ReactNode> = {
    code: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>,
    link: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" /></svg>,
    text: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>,
    image: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>,
  };

  return (
    <div className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors cursor-default">
      <span className="text-[10px] text-[var(--text-tertiary)] font-mono w-4 text-right">&#8984;{shortcut}</span>
      <span className={color}>{icons[icon]}</span>
      <span className="text-sm flex-1 truncate">{label}</span>
      {badge && (
        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-400/10 text-emerald-400">
          {badge}
        </span>
      )}
      <span className="text-[10px] text-[var(--text-tertiary)]">{time}</span>
    </div>
  );
}

/* ── Features ────────────────────────────────── */

const features = [
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>,
    title: "Code Detection",
    desc: "Auto-detects 25+ languages. Code snippets get monospaced preview with language badges.",
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>,
    title: "Fuzzy Search",
    desc: "Sublime Text-style matching. Type a few characters to find any clipping instantly.",
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>,
    title: "Smart Transforms",
    desc: "JSON format, URL encode, UPPERCASE, strip markdown, and more. One click.",
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>,
    title: "iCloud Sync",
    desc: "Your clipboard history syncs across all your Macs and iOS devices automatically via iCloud.",
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 3l-4 4-4-4" /></svg>,
    title: "Keyboard First",
    desc: "Arrow keys navigate, Enter copies, ⌘1–9 for quick paste. No mouse needed.",
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>,
    title: "Favorites & Pins",
    desc: "Star important clippings, pin items to the top. Never lose what matters.",
  },
];

function Features() {
  return (
    <section id="features" className="py-24 px-6">
      <motion.div
        className="max-w-5xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={stagger}
      >
        <motion.div variants={fadeUp} className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight mb-4">
            Everything you copy.
            <br />
            <span className="text-[var(--text-secondary)]">Nothing you lose.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="p-6 rounded-2xl bg-[var(--bg-card)] border border-white/5 hover:border-white/10 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[var(--text-secondary)] mb-4">
                {f.icon}
              </div>
              <h3 className="font-semibold text-base mb-2">{f.title}</h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ── Code Demo ───────────────────────────────── */

function CodeDemo() {
  return (
    <section className="py-24 px-6 bg-[var(--bg-secondary)]">
      <motion.div
        className="max-w-4xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={stagger}
      >
        <motion.div variants={fadeUp} className="text-center mb-12">
          <h2 className="text-4xl font-bold tracking-tight mb-4">
            Knows your code.
          </h2>
          <p className="text-[var(--text-secondary)] text-lg">
            Copy a function, get syntax-aware preview with language detection.
          </p>
        </motion.div>

        <motion.div variants={fadeUp} className="flex flex-col md:flex-row gap-6 items-start">
          {/* Code snippet */}
          <div className="flex-1 rounded-2xl border border-white/10 bg-black overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2 border-b border-white/5 text-xs text-[var(--text-tertiary)]">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Detected: Swift
            </div>
            <pre className="p-4 text-sm font-mono text-emerald-300/90 leading-relaxed overflow-x-auto">
              <code>{`func fetchClippings() async throws {
    let descriptor = FetchDescriptor<Clipping>(
        sortBy: [SortDescriptor(\\.addDate, order: .reverse)]
    )
    let results = try modelContext.fetch(descriptor)
    self.clippings = results
}`}</code>
            </pre>
          </div>

          {/* Arrow + result */}
          <div className="flex flex-col items-center gap-4 pt-8">
            <div className="text-[var(--text-tertiary)] text-2xl">&#8594;</div>
          </div>

          {/* Card result */}
          <div className="flex-1 rounded-2xl border border-white/10 bg-[var(--bg-card)] p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="text-emerald-400">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
              </div>
              <span className="text-sm font-medium">func fetchClippings()</span>
            </div>
            <div className="text-xs font-mono text-[var(--text-secondary)] leading-relaxed mb-3 line-clamp-3">
              let descriptor = FetchDescriptor&lt;Clipping&gt;(...
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-400/10 text-emerald-400">
              Swift
            </span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ── Keyboard Shortcuts ──────────────────────── */

function Shortcuts() {
  return (
    <section className="py-24 px-6">
      <motion.div
        className="max-w-4xl mx-auto text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={stagger}
      >
        <motion.div variants={fadeUp}>
          <h2 className="text-4xl font-bold tracking-tight mb-4">
            Keyboard first.
          </h2>
          <p className="text-[var(--text-secondary)] text-lg mb-12">
            Every action has a shortcut. Your hands never leave the keyboard.
          </p>
        </motion.div>

        <motion.div variants={fadeUp} className="inline-grid grid-cols-2 gap-x-16 gap-y-6 text-left">
          <ShortcutRow keys={["Ctrl", "Shift", "C"]} action="Toggle Copied" />
          <ShortcutRow keys={["Enter"]} action="Copy & close" />
          <ShortcutRow keys={["⌘", "1–9"]} action="Quick paste" />
          <ShortcutRow keys={["↑", "↓"]} action="Navigate" />
          <ShortcutRow keys={["Esc"]} action="Dismiss" />
          <ShortcutRow keys={["Type"]} action="Fuzzy search" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function ShortcutRow({ keys, action }: { keys: string[]; action: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex gap-1">
        {keys.map((k, i) => (
          <kbd
            key={i}
            className="px-2.5 py-1.5 rounded-lg bg-[var(--bg-card)] border border-white/10 text-xs font-mono text-[var(--text-secondary)] min-w-[28px] text-center shadow-sm"
          >
            {k}
          </kbd>
        ))}
      </div>
      <span className="text-sm text-[var(--text-secondary)]">{action}</span>
    </div>
  );
}

/* ── Download ────────────────────────────────── */

function Download() {
  return (
    <section id="download" className="py-24 px-6 bg-[var(--bg-secondary)]">
      <motion.div
        className="max-w-3xl mx-auto text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={stagger}
      >
        <motion.div variants={fadeUp}>
          <h2 className="text-4xl font-bold tracking-tight mb-4">
            Ready to try?
          </h2>
          <p className="text-[var(--text-secondary)] text-lg mb-10">
            Free download. iCloud Sync unlocks for $4.99 (one-time). macOS 15+ or iOS 18+.
          </p>
        </motion.div>

        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={PKG_URL}
            onClick={() => trackDownload({ location: "download_section", variant: "license", version: "1.3.0" })}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white text-black font-semibold text-base hover:bg-white/90 transition-all hover:scale-105"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
            </svg>
            Download Installer
            <span className="text-xs text-black/50 font-normal">.pkg</span>
          </a>
          <a
            href="/buy?app=mac"
            onClick={() => trackUnlockClick("download_section")}
            className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl border border-white/20 text-white/80 font-medium text-base hover:bg-white/5 transition-all"
          >
            Unlock iCloud Sync
            <span className="text-xs text-white/30 font-normal">$4.99</span>
          </a>
        </motion.div>

        <motion.p variants={fadeUp} className="mt-6 text-xs text-[var(--text-tertiary)]">
          Requires macOS Sequoia (15.0) or later (Apple Silicon &amp; Intel) or iOS 18.0+ (iPhone &amp; iPad — Beta).
        </motion.p>
      </motion.div>
    </section>
  );
}

