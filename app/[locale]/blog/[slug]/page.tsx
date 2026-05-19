import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import {
  getAllPosts,
  getPostBySlug,
  getRelatedPosts,
  formatDate,
  BlogSection,
} from "@/lib/blog";
import { Link } from "@/i18n/navigation";
import BlogCard from "@/components/BlogCard";
import Button from "@/components/Button";

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
    title: `${post.title} · Tourbillon Studios`,
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
        <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-medium tracking-tight mt-14 mb-5 text-[var(--text)]">
          {section.text}
        </h2>
      );
    case "h3":
      return (
        <h3 className="text-[clamp(1.375rem,2vw,1.75rem)] font-medium tracking-tight mt-10 mb-4 text-[var(--text)]">
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
          <p className="text-[1.25rem] lg:text-[1.375rem] font-medium italic leading-relaxed text-[var(--text)]">
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
            <h1 className="text-[clamp(2.25rem,5vw,4rem)] font-medium tracking-tight leading-[1.05] text-[var(--text)]">
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

          {/* CTA · connects to interactive quiz */}
          <div className="glass rounded-lg p-9 lg:p-10 text-center">
            <h3 className="text-[1.5rem] lg:text-[1.75rem] font-medium tracking-tight text-[var(--text)] mb-3">
              Un projet digital à lancer ?
            </h3>
            <p className="text-[var(--text-dim)] mb-6 text-[0.9375rem] leading-relaxed max-w-md mx-auto">
              Quelques questions pour cadrer votre projet. Nous vous recontactons sous 24 heures ouvrées.
            </p>
            <Button href="/start" size="md">
              Démarrer un projet
            </Button>
          </div>
        </div>
      </article>

      {/* RELATED ARTICLES */}
      <RelatedArticlesSection
        currentSlug={post.slug}
        locale={locale}
        readMoreLabel={t("readMore")}
        minReadLabel={t("minRead")}
      />
    </>
  );
}

async function RelatedArticlesSection({
  currentSlug,
  locale,
  readMoreLabel,
  minReadLabel,
}: {
  currentSlug: string;
  locale: string;
  readMoreLabel: string;
  minReadLabel: string;
}) {
  const related = getRelatedPosts(currentSlug, 3);
  if (related.length === 0) return null;

  return (
    <section className="px-6 lg:px-10 pt-12 pb-20 lg:pb-28 border-t border-[var(--stroke)] mt-12">
      <div className="mx-auto max-w-[1400px]">
        <div className="text-eyebrow mb-8">À lire ensuite</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {related.map((p) => (
            <BlogCard
              key={p.slug}
              post={p}
              locale={locale}
              readMoreLabel={readMoreLabel}
              minReadLabel={minReadLabel}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
