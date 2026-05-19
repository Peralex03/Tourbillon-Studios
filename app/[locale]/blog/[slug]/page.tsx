import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getAllPosts, getPostBySlug, formatDate, BlogSection } from "@/lib/blog";
import { Link } from "@/i18n/navigation";

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Tourbillon Studios`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
    },
  };
}

function RenderSection({ section }: { section: BlogSection }) {
  switch (section.type) {
    case "h2":
      return (
        <h2 className="font-serif text-[clamp(1.75rem,3vw,2.5rem)] font-light tracking-tight mt-14 mb-5 text-[var(--text)]">
          {section.text}
        </h2>
      );
    case "h3":
      return (
        <h3 className="font-serif text-[clamp(1.375rem,2vw,1.75rem)] font-light tracking-tight mt-10 mb-4 text-[var(--text)]">
          {section.text}
        </h3>
      );
    case "p":
      return (
        <p className="text-[1.0625rem] lg:text-[1.125rem] text-[var(--text-dim)] leading-[1.75] mb-6">
          {section.text}
        </p>
      );
    case "ul":
      return (
        <ul className="mb-8 space-y-3">
          {section.items?.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-[1.0625rem] text-[var(--text-dim)] leading-relaxed"
            >
              <span className="mt-3 w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "blockquote":
      return (
        <blockquote className="my-10 pl-6 border-l-2 border-[var(--accent)] bg-[var(--surface-1)] py-6 pr-6 rounded-r-sm">
          <p className="font-serif text-[1.25rem] lg:text-[1.375rem] font-light italic leading-relaxed text-[var(--text)]">
            {section.text}
          </p>
        </blockquote>
      );
    default:
      return null;
  }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const t = await getTranslations("blog");

  return (
    <>
      <article className="pt-32 lg:pt-40 pb-20 px-6 lg:px-10">
        <div className="mx-auto max-w-[760px]">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center text-eyebrow text-[var(--text-dim)] hover:text-[var(--accent)] transition-colors mb-12"
          >
            {t("backToBlog")}
          </Link>

          {/* Article header */}
          <header className="mb-14">
            <div className="flex items-center gap-4 mb-6 flex-wrap">
              <span className="font-mono text-[0.6875rem] uppercase tracking-wider px-3 py-1.5 rounded-full bg-[var(--surface-1)] border border-[var(--stroke)] text-[var(--accent)]">
                {post.category}
              </span>
              <span className="font-mono text-[0.6875rem] uppercase tracking-wider text-[var(--text-faint)]">
                {post.readTime} {t("minRead")}
              </span>
              <time className="font-mono text-[0.6875rem] uppercase tracking-wider text-[var(--text-faint)]">
                {formatDate(post.date, locale)}
              </time>
            </div>
            <h1 className="font-serif text-[clamp(2.25rem,5vw,4rem)] font-light tracking-tight leading-[1.05] text-[var(--text)]">
              {post.title}
            </h1>
            <p className="mt-8 text-[1.125rem] lg:text-[1.25rem] text-[var(--text-dim)] leading-relaxed">
              {post.excerpt}
            </p>
          </header>

          <hr className="border-[var(--stroke)] mb-12" />

          {/* Article body */}
          <div>
            {post.content.map((section, i) => (
              <RenderSection key={i} section={section} />
            ))}
          </div>

          <hr className="border-[var(--stroke)] mt-16 mb-12" />

          {/* CTA — connects to interactive quiz */}
          <div className="bg-[var(--surface-1)] border border-[var(--stroke)] rounded-sm p-10 text-center">
            <h3 className="font-serif text-[1.75rem] lg:text-[2rem] font-light tracking-tight text-[var(--text)] mb-3">
              Vous avez un projet digital ?
            </h3>
            <p className="text-[var(--text-dim)] mb-7 text-[1rem] leading-relaxed max-w-md mx-auto">
              Quatre questions, vingt secondes, et on revient vers vous sous 24h.
            </p>
            <Link
              href="/start"
              className="inline-flex items-center gap-3 px-7 py-4 rounded-full bg-[var(--accent)] text-[var(--accent-ink)] font-medium hover:bg-[var(--accent-hover)] transition-colors"
            >
              Lancer le projet
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7M9 7h8v8" />
              </svg>
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
