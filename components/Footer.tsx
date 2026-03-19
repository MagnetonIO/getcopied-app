const RELEASES_URL =
  "https://github.com/MagnetonIO/copied-app/releases/latest";

export function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round">
              <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" />
              <rect x="8" y="2" width="8" height="4" rx="1" />
            </svg>
          </div>
          <span className="text-sm text-[var(--text-secondary)]">
            Copied &mdash; by Magneton Labs
          </span>
        </div>
        <div className="flex items-center gap-6 text-sm text-[var(--text-tertiary)]">
          <a href="https://github.com/MagnetonIO/copied-app" className="hover:text-white transition-colors">
            GitHub
          </a>
          <a href={RELEASES_URL} className="hover:text-white transition-colors">
            Releases
          </a>
          <span>&copy; {new Date().getFullYear()} Magneton Labs, LLC</span>
        </div>
      </div>
    </footer>
  );
}
