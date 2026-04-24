import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "Complete documentation for Copied — the clipboard manager for macOS and iOS. Learn how to use history, search, lists, sync, share extensions, rules, formatters, and merge scripts.",
  alternates: { canonical: "/docs" },
};

const SUPPORT_EMAIL = "support@getcopied.app";

export default function DocsPage() {
  return (
    <main className="min-h-screen">
      <Nav />

      {/* Hero */}
      <section className="pt-32 pb-10 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-[var(--text-secondary)] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Covers macOS &amp; iOS
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-[1.05] mb-5">
            Documentation
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
            Everything Copied can do, written short. Skim the table of contents,
            jump to what you need.
          </p>
        </div>
      </section>

      {/* Table of contents */}
      <section className="px-6 pb-12">
        <div className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-3">
          <TOCLink href="#getting-started" label="Getting started" />
          <TOCLink href="#history" label="Clipboard history" />
          <TOCLink href="#search" label="Search" />
          <TOCLink href="#lists" label="Lists" />
          <TOCLink href="#actions" label="Actions" />
          <TOCLink href="#icloud-sync" label="iCloud Sync (paid)" />
          <TOCLink href="#share-extensions" label="Share extensions (iOS)" />
          <TOCLink href="#rules" label="Rules" />
          <TOCLink href="#formatters" label="Text formatters" />
          <TOCLink href="#merge-scripts" label="Merge scripts" />
          <TOCLink href="#siri" label="Siri Shortcuts (iOS)" />
          <TOCLink href="#shortcuts" label="Keyboard shortcuts (macOS)" />
          <TOCLink href="#privacy" label="Privacy &amp; data" />
          <TOCLink href="#troubleshooting" label="Troubleshooting" />
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-3xl mx-auto space-y-16">
          {/* Getting started */}
          <DocSection id="getting-started" title="Getting started">
            <SubHeading>macOS</SubHeading>
            <p>
              Copied lives in the menu bar. After install, look for the
              clipboard icon at the top-right of your screen. Click it to open
              the popover — this is where your clipboard history lives.
            </p>
            <ol className="list-decimal list-inside space-y-1 text-[var(--text-secondary)] mt-3">
              <li>Copy something (text, a link, an image).</li>
              <li>Open the Copied popover (menu bar or <kbd className="kbd">⌃</kbd>+<kbd className="kbd">⇧</kbd>+<kbd className="kbd">C</kbd>).</li>
              <li>Click any row to paste that clipping into the current app.</li>
            </ol>

            <SubHeading>iOS</SubHeading>
            <p>
              Tap <b>Copied</b> on the Home Screen to open the app. New
              clippings appear when the app is in the foreground (iOS doesn&rsquo;t
              let apps read your clipboard in the background).
            </p>
            <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)] mt-3">
              <li>
                Use the <b>Share</b> sheet in any app → <b>Save to Copied</b> to
                capture content while you browse or message.
              </li>
              <li>
                In Copied, the big teal <b>+</b> button in the action sheet saves
                whatever is on the clipboard as a new clipping.
              </li>
            </ul>
          </DocSection>

          {/* History */}
          <DocSection id="history" title="Clipboard history">
            <p>
              Every time you copy, Copied stores it. Text, rich text, images,
              URLs, and files are all captured. The current clipboard item
              shows at the top of the list.
            </p>
            <KeyValueTable
              rows={[
                ["Max history size", "Settings → General → Max History. Default 500."],
                ["Retention", "Settings → General → Retention Days. Clippings older than this move to Trash."],
                ["Trash retention", "Items in Trash are fully deleted after this many days."],
                ["Allow duplicates", "Off by default — copying the same text twice reuses the existing row."],
                ["Capture images", "Toggle in Settings if you don&rsquo;t want image captures."],
                ["Capture rich text", "Off = text only. Saves storage for most workflows."],
              ]}
            />
          </DocSection>

          {/* Search */}
          <DocSection id="search" title="Search">
            <p>
              The search field at the top of the list fuzzy-matches against
              title, text, URL, and detected language. On macOS use{" "}
              <kbd className="kbd">⌘</kbd>+<kbd className="kbd">F</kbd> to
              focus it from anywhere in the popover.
            </p>
            <p className="mt-3">
              Fuzzy means characters in order count — typing <code className="code">swft</code>{" "}
              finds <code className="code">Swift</code>. Exact substrings
              always win over fuzzy matches.
            </p>
          </DocSection>

          {/* Lists */}
          <DocSection id="lists" title="Lists">
            <p>
              Lists are user-defined collections — like folders for clippings
              you want to keep together (snippets, meeting notes, recurring
              replies). Create one from the <b>Lists</b> screen (iOS) or the{" "}
              <b>New List</b> button in the sidebar (macOS).
            </p>
            <p className="mt-3">
              Assign a clipping to a list from its edit sheet. One list per
              clipping. On iOS, the main <b>Copied</b> view shows a{" "}
              <b>Your Lists</b> section at the top so you can jump to any list
              in one tap.
            </p>
            <p className="mt-3">
              Use <b>Hide List Clippings</b> (action sheet on iOS, toggle on
              Mac) to hide everything that&rsquo;s been routed into a list,
              leaving only your general clipboard stream on the main view.
            </p>
          </DocSection>

          {/* Actions */}
          <DocSection id="actions" title="Actions">
            <p>
              Every clipping supports a core set of actions. The entry point
              differs per platform.
            </p>
            <KeyValueTable
              rows={[
                ["Copy again", "Puts the clipping back on the system clipboard, ready to paste."],
                ["Favorite", "Stars a clipping. Favorites pin to the top when you sort by Favorites First."],
                ["Pin", "Keeps a clipping visible even when history rolls over."],
                ["Share", "iOS: opens the system share sheet. Mac: opens the macOS Share menu."],
                ["Edit", "Adjust title and text. Edit preserves the original copy date."],
                ["Move to trash", "Soft-deletes. Recoverable from Trash within the retention window."],
              ]}
            />
            <p className="mt-3 text-[var(--text-secondary)] text-sm">
              On iOS, swipe a row left for Trash, right for Favorite/Copy. On
              Mac, right-click any row for the full action menu.
            </p>
          </DocSection>

          {/* iCloud Sync */}
          <DocSection id="icloud-sync" title="iCloud Sync (paid)">
            <p>
              iCloud Sync keeps your clipboard history in step across every
              device signed into the same iCloud account. One-time
              purchase — no subscription.
            </p>

            <SubHeading>Unlock paths</SubHeading>
            <KeyValueTable
              rows={[
                ["Mac App Store", "Settings → Sync → Unlock iCloud Sync $4.99. Handled by Apple in-app purchase."],
                ["Mac (Direct / Stripe)", "Buy at getcopied.app/buy. You&rsquo;ll get an emailed license JWT and a copied:// URL that unlocks the app."],
                ["iOS", "Settings → iCloud Sync → Unlock. Same $4.99 IAP as Mac App Store. Family Sharing and Restore Purchases both work."],
                ["Cross-platform license", "Bought the Mac license (Stripe)? On iOS: Settings → iCloud Sync → Enter License Key. Paste the JWT or copied://unlock URL to unlock iOS without paying twice."],
              ]}
            />

            <SubHeading>What gets synced</SubHeading>
            <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)]">
              <li>Clippings (text, rich text, images, URLs)</li>
              <li>Favorites, pins, titles, list assignments</li>
              <li>Trash state (deletions propagate within ~30 seconds)</li>
            </ul>

            <SubHeading>What doesn&rsquo;t</SubHeading>
            <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)]">
              <li>Excluded app lists (per-device setting)</li>
              <li>UI preferences, keyboard shortcut bindings</li>
              <li>Rules / Merge Scripts / Text Formatters (stored per-device for now)</li>
            </ul>

            <SubHeading>Sync and Universal Clipboard (Handoff)</SubHeading>
            <p>
              Apple&rsquo;s Universal Clipboard (Handoff) works independently of
              Copied. With sync off, you still get Apple&rsquo;s instant
              paste-between-devices for your <em>most recent</em> copy. With sync
              on, you get both: instant paste <em>and</em> a full persistent
              history on every device.
            </p>
          </DocSection>

          {/* Share extensions */}
          <DocSection id="share-extensions" title="Share extensions (iOS)">
            <p>
              Copied ships two iOS Share Sheet extensions so you can capture
              content from any app without opening Copied first.
            </p>
            <KeyValueTable
              rows={[
                ["Save to Copied", "Top icon row of the share sheet. Saves text, URLs, or images as a new clipping."],
                ["Copied Clipper", "Actions list in Safari&rsquo;s share sheet. Grabs the current page title + URL + any selected text as a rich clipping."],
              ]}
            />
            <p className="mt-3 text-[var(--text-secondary)] text-sm">
              Don&rsquo;t see them? Tap <b>Edit Actions</b> at the bottom of the
              share sheet and turn them on.
            </p>
          </DocSection>

          {/* Rules */}
          <DocSection id="rules" title="Rules">
            <p>
              Rules let Copied act on a clipping automatically the moment it&rsquo;s
              captured. A rule has a <b>condition</b> (what to match) and an{" "}
              <b>action</b> (what to do).
            </p>
            <KeyValueTable
              rows={[
                ["Conditions", "URL starts with… · URL contains… · Text contains… · Text matches regex · Content kind is (Text / Link / Image / Code)"],
                ["Actions", "Route to list · Mark favorite · Skip save (ignore this clip)"],
                ["Stacking", "Rules run top-to-bottom. All matching actions apply. Skip-save short-circuits — once ignored, the clip never lands in history."],
              ]}
            />
            <p className="mt-3">
              <b>Example:</b> a rule{" "}
              <em>URL starts with https://github.com</em> →{" "}
              <em>Route to list &ldquo;Work Links&rdquo;</em> keeps every GitHub URL
              organized without you thinking about it.
            </p>
          </DocSection>

          {/* Formatters */}
          <DocSection id="formatters" title="Text formatters">
            <p>
              Text formatters are one-tap transforms that copy the transformed
              text back to your clipboard. Great for reformatting snippets
              mid-flow.
            </p>
            <KeyValueTable
              rows={[
                ["Trim whitespace", "Removes leading/trailing spaces and newlines."],
                ["Collapse whitespace", "Multiple spaces → single space."],
                ["UPPERCASE", "All caps."],
                ["lowercase", "All lower."],
                ["Title Case", "Capitalizes each word."],
                ["Sentence case", "Capitalizes first letter of each sentence."],
                ["snake_case / kebab-case / camelCase / PascalCase", "Identifier-style transforms for code."],
                ["Reverse", "Reverses the string character-by-character."],
              ]}
            />
            <p className="mt-3 text-[var(--text-secondary)] text-sm">
              Turn individual formatters on/off in Settings → Text Formatters —
              only enabled ones show in the clipping&rsquo;s menu.
            </p>
          </DocSection>

          {/* Merge scripts */}
          <DocSection id="merge-scripts" title="Merge scripts">
            <p>
              Merge scripts combine multiple clippings into one. Select
              clippings (multi-select on iOS, ⌘-click on Mac), tap <b>Merge</b>,
              pick a script.
            </p>
            <SubHeading>Built-ins</SubHeading>
            <KeyValueTable
              rows={[
                ["Join with newlines", "Stacks texts line by line."],
                ["Markdown bullet list", "• item one\n• item two"],
                ["Markdown link list", "- [Title](URL) rows for each clipping with a URL"],
                ["Comma-separated", "one, two, three"],
              ]}
            />
            <SubHeading>Custom scripts</SubHeading>
            <p>
              Write your own template in Settings → Merge Scripts. Tokens:
              {" "}<code className="code">{"{{text}}"}</code>,{" "}
              <code className="code">{"{{url}}"}</code>,{" "}
              <code className="code">{"{{title}}"}</code>. The <b>separator</b>{" "}
              is the string placed between each merged clipping.
            </p>
          </DocSection>

          {/* Siri Shortcuts */}
          <DocSection id="siri" title="Siri Shortcuts (iOS)">
            <p>
              Copied exposes three App Intents, usable from the Shortcuts app,
              Siri, or the Home Screen:
            </p>
            <KeyValueTable
              rows={[
                ["Save Clipboard to Copied", "Captures whatever is on the clipboard right now as a new clipping."],
                ["Copy Last Clipping", "Puts your most recent Copied clipping back on the clipboard."],
                ["Open Copied", "Launches the app — useful as the final step in a longer Shortcut."],
              ]}
            />
            <p className="mt-3 text-[var(--text-secondary)] text-sm">
              Say &ldquo;Hey Siri, save clipboard to Copied&rdquo; anywhere in iOS.
            </p>
          </DocSection>

          {/* Shortcuts */}
          <DocSection id="shortcuts" title="Keyboard shortcuts (macOS)">
            <KeyValueTable
              rows={[
                ["Open popover", "⌃ + ⇧ + C (customize in Settings → Shortcuts)"],
                ["Paste top item", "⌘ + V (system default — always pastes newest clipboard)"],
                ["Paste previous item", "Open popover, then ↑↓ to select, ↩ to paste"],
                ["Focus search", "⌘ + F inside popover"],
                ["Delete selected clipping", "⌫ inside popover"],
                ["Quit", "⌘ + Q"],
              ]}
            />
          </DocSection>

          {/* Privacy */}
          <DocSection id="privacy" title="Privacy &amp; data">
            <p>
              Copied is local-first. With iCloud Sync off, nothing leaves your
              device — no analytics, no telemetry, no crash reports shipped to
              us. With sync on, your clipboard history is stored in your
              private CloudKit container, which only you can read.
            </p>
            <p className="mt-3">
              Full details in the{" "}
              <a className="link" href="/privacy">
                Privacy Policy
              </a>
              .
            </p>
          </DocSection>

          {/* Troubleshooting */}
          <DocSection id="troubleshooting" title="Troubleshooting">
            <p>
              For common issues — missed captures, hotkey not firing, sync
              not showing rows — the FAQ on the{" "}
              <a className="link" href="/support">
                Support page
              </a>{" "}
              covers the quick fixes.
            </p>
            <p className="mt-3">
              Still stuck? Email{" "}
              <a className="link" href={`mailto:${SUPPORT_EMAIL}`}>
                {SUPPORT_EMAIL}
              </a>{" "}
              with your version number (Settings → About on Mac, Settings
              footer on iOS) and a short description.
            </p>
          </DocSection>
        </div>
      </section>

      <Footer />
    </main>
  );
}

/* ---------- pieces ---------- */

function TOCLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="block px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-sm"
    >
      {label}
    </a>
  );
}

function DocSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="text-3xl font-bold tracking-tight mb-5">{title}</h2>
      <div className="text-[var(--text-secondary)] leading-relaxed space-y-0">
        {children}
      </div>
    </section>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-xs uppercase tracking-widest text-[var(--text-tertiary)] mt-6 mb-3">
      {children}
    </h3>
  );
}

function KeyValueTable({ rows }: { rows: [string, string][] }) {
  return (
    <div className="divide-y divide-white/5 border-y border-white/5 mt-2">
      {rows.map(([key, value]) => (
        <div
          key={key}
          className="grid grid-cols-1 sm:grid-cols-[12rem_1fr] gap-y-1 sm:gap-x-6 py-3"
        >
          <div className="text-sm font-medium text-white">{key}</div>
          <div className="text-sm text-[var(--text-secondary)]">{value}</div>
        </div>
      ))}
    </div>
  );
}
