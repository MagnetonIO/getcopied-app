import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      <main className="pt-20 pb-24">
        <article className="prose prose-invert prose-lg mx-auto max-w-[720px] px-6 prose-headings:tracking-tight prose-a:text-emerald-400 prose-a:no-underline hover:prose-a:text-emerald-300 prose-code:before:content-[''] prose-code:after:content-[''] prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-pre:bg-[var(--bg-card)] prose-pre:border prose-pre:border-white/10 prose-img:rounded-xl prose-img:border prose-img:border-white/10">
          {children}
        </article>
      </main>
      <Footer />
    </>
  );
}
