import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How We Reverse-Engineered a Dead Mac App in 48 Hours with AI",
  description:
    "The story of rebuilding Copied, an abandoned macOS clipboard manager, using Claude Code as the primary development tool — from reverse engineering to open source in a weekend.",
  openGraph: {
    title: "How We Reverse-Engineered a Dead Mac App in 48 Hours with AI",
    description:
      "Rebuilding an abandoned macOS clipboard manager with AI — architecture, implementation, and lessons learned.",
    type: "article",
  },
};

export default function BlogPost() {
  return (
    <>
      <div className="mb-8 not-prose">
        <Link
          href="/"
          className="text-sm text-[var(--text-secondary)] hover:text-white transition-colors"
        >
          &larr; Back to home
        </Link>
      </div>

      <header className="mb-12 not-prose">
        <p className="text-sm text-[var(--text-secondary)] mb-4">
          March 2025 &middot; 12 min read
        </p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl leading-tight">
          How We Reverse-Engineered a Dead Mac App in 48 Hours with AI
        </h1>
        <p className="mt-6 text-xl text-[var(--text-secondary)] leading-relaxed">
          The original Copied was a beloved clipboard manager for macOS. Then its
          developer stopped maintaining it, macOS updates broke it, and thousands
          of users lost a tool they depended on daily. We rebuilt it from scratch
          using Claude Code — not just the code, but the architecture, debugging,
          CI/CD, and project management. Here&apos;s how.
        </p>
      </header>

      <h2>The Problem</h2>

      <p>
        If you used a Mac between 2015 and 2020, you might remember{" "}
        <a href="https://copied.macupdate.com/">Copied</a>. It was a clipboard
        manager that felt native — a menu bar popover that tracked everything you
        copied, organized it into lists, and synced across devices via iCloud. It
        wasn&apos;t flashy, but it was the kind of utility that became
        invisible infrastructure in your workflow.
      </p>

      <p>
        Then the developer went silent. No updates, no responses to support
        emails, no acknowledgement that macOS Ventura had broken everything. The
        app icon still sat in your menu bar, but it was a ghost — crashing on
        launch, losing data, unable to sync.
      </p>

      <p>
        The alternatives weren&apos;t great. Some were Electron apps that used
        200MB of RAM. Others were subscription-based. None of them matched
        Copied&apos;s specific workflow: the popover UI, the quick keyboard
        shortcuts, the way it just <em>stayed out of the way</em>.
      </p>

      <p>So we decided to rebuild it.</p>

      <h2>The Approach: AI as the Primary Developer</h2>

      <p>
        This wasn&apos;t a project where we used AI to autocomplete a few lines
        of code. We used{" "}
        <a href="https://claude.com/claude-code">Claude Code</a> as the primary
        development tool for the entire project — from the first architecture
        decision to the final signed installer.
      </p>

      <p>Here&apos;s what that actually looked like:</p>

      <ul>
        <li>
          <strong>Architecture planning</strong> — deciding on SwiftData over
          Core Data, structuring the app as a Swift Package (CopiedKit) shared
          between macOS and iOS targets
        </li>
        <li>
          <strong>Reverse engineering</strong> — understanding how the original
          app&apos;s clipboard monitoring, content type detection, and UI patterns
          worked
        </li>
        <li>
          <strong>Implementation</strong> — writing every service, model, and view
        </li>
        <li>
          <strong>Debugging</strong> — tracking down gesture conflicts, provisioning
          profile issues, iCloud sync race conditions
        </li>
        <li>
          <strong>Code review</strong> — finding 25 bugs including critical concurrency
          issues
        </li>
        <li>
          <strong>Project management</strong> — creating 38 Linear issues automatically
          from code analysis
        </li>
        <li>
          <strong>Build pipeline</strong> — signed DMG, PKG installer, GitHub Actions
          CI/CD
        </li>
      </ul>

      <p>
        The total development time was roughly 48 hours. Not 48 hours of human
        typing — 48 hours wall clock from &ldquo;let&apos;s do this&rdquo; to a
        signed, distributable app with CI/CD.
      </p>

      <h2>What We Reverse-Engineered</h2>

      <h3>Clipboard Monitoring</h3>

      <p>
        macOS doesn&apos;t have a clipboard change notification API. The standard
        approach — and the one the original Copied used — is polling{" "}
        <code>NSPasteboard.general.changeCount</code> on a timer. Our{" "}
        <code>ClipboardService</code> polls every 0.5 seconds, compares the
        change count, and captures new content when it changes:
      </p>

      <pre>
        <code>{`@Observable
@MainActor
public final class ClipboardService {
    private var pollingTask: Task<Void, Never>?
    private var lastChangeCount: Int = 0

    public func startMonitoring() {
        pollingTask = Task {
            while !Task.isCancelled {
                let current = NSPasteboard.general.changeCount
                if current != lastChangeCount {
                    lastChangeCount = current
                    captureClipboard()
                }
                try? await Task.sleep(for: .milliseconds(500))
            }
        }
    }
}`}</code>
      </pre>

      <p>
        The tricky part: you need to avoid capturing your own pastes. When the
        user pastes a clip <em>from</em> our app, the app itself writes to the
        pasteboard, which triggers the poll. We handle this with a{" "}
        <code>skipNextCapture</code> flag that gets set before writing and cleared
        after the next poll cycle.
      </p>

      <h3>Content Type Detection</h3>

      <p>
        The pasteboard can contain multiple representations of the same content
        simultaneously — plain text, RTF, HTML, and a URL might all be present
        for a single copy operation. We detect the &ldquo;best&rdquo; type by
        checking pasteboard types in priority order: image, RTF, HTML, URL, then
        plain text.
      </p>

      <h3>Global Hotkey System</h3>

      <p>
        Global keyboard shortcuts on macOS are surprisingly hard to get right.
        The modern approach (<code>CGEvent</code> tap) works everywhere including
        fullscreen apps, but requires accessibility permissions. The legacy
        approach (Carbon <code>RegisterEventHotKey</code>) is more reliable but
        doesn&apos;t work in all contexts.
      </p>

      <p>
        Our <code>GlobalHotkeyManager</code> tries the CGEvent tap first and
        falls back to Carbon:
      </p>

      <pre>
        <code>{`/// Uses CGEvent tap (HID level) as primary method — this works
/// in fullscreen apps across all Spaces. Falls back to Carbon
/// RegisterEventHotKey if the event tap can't be created.
@MainActor
final class GlobalHotkeyManager: NSObject {
    private var eventTap: CFMachPort?      // CGEvent tap
    private var hotkeyRef: EventHotKeyRef? // Carbon fallback
}`}</code>
      </pre>

      <h3>Data Model</h3>

      <p>
        SwiftData models that match the original&apos;s structure — a{" "}
        <code>Clipping</code> model for individual items, a{" "}
        <code>ClipList</code> for organizing them into collections, and an{" "}
        <code>Asset</code> model for binary data (images, files). All three are
        CloudKit-compatible, which means they use optional properties and avoid
        unique constraints (CloudKit doesn&apos;t support them).
      </p>

      <h2>New Features the Original Never Had</h2>

      <h3>Code Snippet Detection</h3>

      <p>
        The <code>CodeDetector</code> uses heuristic scoring to identify code
        snippets across 25+ languages. It looks for structural signals — shebang
        lines, indentation patterns, bracket ratios, language-specific keywords —
        and assigns a confidence score:
      </p>

      <pre>
        <code>{`public static func detect(in text: String) -> Result {
    var score: Double = 0
    var language: String?

    // Shebang — immediate strong signal
    if text.hasPrefix("#!") {
        score += 0.5
        language = detectShebangLanguage(text)
    }

    // Negative: prose-like (high ratio of spaces)
    let spaceRatio = Double(spaceCount) / Double(nonSpaceCount)
    if spaceRatio > 0.35 { score -= 0.2 }

    // ... 20+ more heuristics
    return Result(isCode: score > 0.4, language: language, confidence: score)
}`}</code>
      </pre>

      <p>
        It also detects config formats (YAML, JSON, TOML) as a separate pass,
        since those have distinct patterns that general code heuristics miss.
      </p>

      <h3>Fuzzy Search</h3>

      <p>
        The <code>FuzzyMatcher</code> implements Sublime Text-style matching:
        characters must appear in order but don&apos;t need to be contiguous.
        Consecutive matches, word boundary matches, and camelCase boundary
        matches score higher. It returns matched ranges for highlighting:
      </p>

      <pre>
        <code>{`public struct FuzzyMatch: Sendable {
    public let score: Int
    public let matchedRanges: [Range<String.Index>]
}

// "fzm" matches "FuzzyMatcher" with ranges highlighting F, z, M
FuzzyMatcher.match(query: "fzm", in: "FuzzyMatcher")
// → FuzzyMatch(score: 42, matchedRanges: [0..<1, 4..<5, 9..<10])`}</code>
      </pre>

      <h3>Smart Text Transformations</h3>

      <p>
        Built-in transforms that the original never had: JSON pretty-print,
        URL encode/decode, Base64, strip Markdown formatting, case conversions,
        and more. These work inline — select a clip, apply a transform, paste the
        result.
      </p>

      <h3>Everything Else</h3>

      <ul>
        <li>
          <strong>Content type visual icons</strong> — each clip shows its type
          (text, URL, image, code) with a distinctive icon and optional language
          badge
        </li>
        <li>
          <strong>Real-time iCloud sync status</strong> — a <code>SyncMonitor</code>{" "}
          that tracks CloudKit account status, import/export events, and shows sync
          state in the UI
        </li>
        <li>
          <strong>Keyboard-first navigation</strong> — ⌘1–9 quick paste, arrow key
          navigation, Enter to paste, Tab to preview
        </li>
        <li>
          <strong>Image thumbnail caching</strong> — uses{" "}
          <code>CGImageSourceCreateThumbnailAtIndex</code> for memory-efficient
          thumbnails with LRU cache eviction
        </li>
      </ul>

      <h2>Modern Apple Standards</h2>

      <p>
        One of the goals was to build with the <em>latest</em> Apple frameworks,
        not the ones available when the original was written:
      </p>

      <table>
        <thead>
          <tr>
            <th>Original Copied</th>
            <th>Our Rebuild</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>AppKit NIBs / Storyboards</td>
            <td>SwiftUI</td>
          </tr>
          <tr>
            <td>Core Data / Realm</td>
            <td>SwiftData</td>
          </tr>
          <tr>
            <td>ObservableObject / @Published</td>
            <td>@Observable (Observation framework)</td>
          </tr>
          <tr>
            <td>Manual CKRecord management</td>
            <td>CloudKit via SwiftData</td>
          </tr>
          <tr>
            <td>No concurrency model</td>
            <td>Swift 6 strict concurrency</td>
          </tr>
          <tr>
            <td>Manual builds</td>
            <td>GitHub Actions CI/CD</td>
          </tr>
        </tbody>
      </table>

      <p>
        The codebase is structured as a Swift Package (<code>CopiedKit</code>)
        that contains all models, services, and shared views. The macOS app
        (<code>CopiedMac</code>) imports this package and adds platform-specific
        UI — the menu bar popover, settings window, and main window. An iOS target
        (<code>CopiedIOS</code>) shares the same package.
      </p>

      <h2>The AI Workflow</h2>

      <p>
        Here&apos;s where it gets interesting. We didn&apos;t use Claude Code as
        a fancy autocomplete. It was the architect, implementer, debugger, and
        project manager.
      </p>

      <h3>Architecture Decisions</h3>

      <p>
        The first conversation was about structure: should we use Core Data or
        SwiftData? How should we handle CloudKit sync? What&apos;s the right way
        to share code between macOS and iOS? Claude Code analyzed the tradeoffs —
        SwiftData&apos;s CloudKit integration is simpler but has constraints
        (no unique constraints, optional properties only), Core Data offers more
        control but more boilerplate. We went with SwiftData for the simpler
        mental model.
      </p>

      <h3>Service Implementation</h3>

      <p>
        Each core service was built through conversation:{" "}
        <code>ClipboardService</code> for monitoring,{" "}
        <code>CodeDetector</code> for language detection,{" "}
        <code>FuzzyMatcher</code> for search,{" "}
        <code>ThumbnailCache</code> for image handling,{" "}
        <code>SyncMonitor</code> for iCloud status. The pattern was consistent:
        describe the requirement, let Claude Code propose an implementation,
        review it, iterate on edge cases.
      </p>

      <h3>Debugging</h3>

      <p>
        Some of the hardest bugs were platform-specific issues that are poorly
        documented:
      </p>

      <ul>
        <li>
          <strong>Gesture conflict</strong> — SwiftUI&apos;s{" "}
          <code>.onTapGesture</code> was eating keyboard events in the popover,
          making arrow key navigation impossible. Fixed by switching to{" "}
          <code>Button</code> with custom styling
        </li>
        <li>
          <strong>Menu bar popover positioning</strong> — <code>NSPopover</code>{" "}
          attached to a status item has quirks with multi-monitor setups and
          fullscreen spaces
        </li>
        <li>
          <strong>iCloud sync race conditions</strong> — SwiftData&apos;s CloudKit
          integration can trigger merge conflicts when the same device reads and
          writes in quick succession
        </li>
      </ul>

      <h3>Code Review</h3>

      <p>
        We ran Claude Code&apos;s code review on the entire codebase. It found 25
        issues, including:
      </p>

      <ul>
        <li>A concurrency bug where <code>@MainActor</code>-isolated state was accessed from a background task</li>
        <li>A memory leak in the thumbnail cache where evicted entries weren&apos;t releasing their <code>CGImage</code> references</li>
        <li>A race condition in the clipboard polling where two captures could fire for a single change</li>
      </ul>

      <h3>Project Management</h3>

      <p>
        Claude Code created 38 issues in Linear automatically — analyzing the
        codebase, identifying TODO comments, missing features, potential
        improvements, and filing them with proper descriptions, labels, and
        priority levels.
      </p>

      <h3>Build Pipeline</h3>

      <p>
        The final piece: a complete CI/CD pipeline. GitHub Actions builds,
        signs, and notarizes the app. The release artifacts include both a DMG
        (drag-to-Applications) and a PKG installer. The build script handles
        code signing, entitlements, and the notarization wait loop.
      </p>

      <h2>What We Learned</h2>

      <p>
        <strong>AI is better at breadth than depth.</strong> Claude Code excels
        at tasks that require knowing a lot of things at once — how SwiftData
        models interact with CloudKit constraints, how CGEvent taps relate to
        accessibility permissions, how to structure a GitHub Actions workflow for
        macOS code signing. It&apos;s less good at deep debugging where you need
        to hold a complex mental model of state across many execution paths.
      </p>

      <p>
        <strong>The 80/20 rule applies differently.</strong> AI gets you to 80%
        faster than you&apos;ve ever gotten there before. The last 20% — the
        platform edge cases, the UX polish, the &ldquo;it works but doesn&apos;t
        feel right&rdquo; — still requires human judgment and iteration.
      </p>

      <p>
        <strong>Code review is an underrated AI use case.</strong> Having an AI
        review the entire codebase — not just the diff, but all the code —
        caught issues that incremental review would have missed. The concurrency
        bug it found would have been a production crash.
      </p>

      <h2>Open Source</h2>

      <p>
        The entire project is open source. You can clone it, build it, modify it,
        and distribute it.
      </p>

      <ul>
        <li>
          <strong>GitHub:</strong>{" "}
          <a href="https://github.com/MagnetonIO/copied-app">
            MagnetonIO/copied-app
          </a>
        </li>
        <li>
          <strong>Download:</strong>{" "}
          <a href="https://github.com/MagnetonIO/copied-app/releases/latest">
            Latest release (DMG &amp; PKG)
          </a>
        </li>
        <li>
          <strong>Requirements:</strong> macOS 15 Sequoia or later
        </li>
      </ul>

      <p>
        Contributions welcome — whether it&apos;s bug fixes, new features, or
        just filing issues. The Linear project is public too if you want to see
        what&apos;s planned.
      </p>

      <hr />

      <p className="text-[var(--text-secondary)]">
        Built with SwiftUI, SwiftData, CloudKit, and Claude Code.
        <br />
        If you have questions or want to contribute, open an issue on GitHub.
      </p>
    </>
  );
}
