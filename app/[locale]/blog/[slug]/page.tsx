import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getAllPosts, getPostBySlug, formatDate, BlogSection } from "@/lib/blog";
import { Link } from "@/i18n/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
        <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">{section.text}</h2>
      );
    case "h3":
      return (
        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">{section.text}</h3>
      );
    case "p":
      return <p className="text-gray-600 leading-relaxed mb-5">{section.text}</p>;
    case "ul":
      return (
        <ul className="mb-5 space-y-2">
          {section.items?.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-gray-600">
              <span className="mt-1 w-1.5 h-1.5 rounded-full bg-violet-500 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      );
    case "blockquote":
      return (
        <blockquote className="my-6 pl-5 border-l-4 border-violet-400 bg-violet-50/50 rounded-r-xl py-4 pr-4">
          <p className="text-gray-700 italic leading-relaxed">{section.text}</p>
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
      <Navbar />
      <main className="pt-24 pb-20 px-6 min-h-screen">
        <div className="fixed top-0 right-0 w-[500px] h-[500px] rounded-full bg-violet-100/20 blur-[120px] -z-10 pointer-events-none" />

        <div className="max-w-2xl mx-auto">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center text-sm text-gray-400 hover:text-violet-600 transition-colors mb-8"
          >
            {t("backToBlog")}
          </Link>

          {/* Article header */}
          <header className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-semibold text-violet-600 bg-violet-50 border border-violet-100 px-2.5 py-1 rounded-full">
                {post.category}
              </span>
              <span className="text-xs text-gray-400">
                {post.readTime} {t("minRead")}
              </span>
              <time className="text-xs text-gray-400">
                {formatDate(post.date, locale)}
              </time>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 leading-tight">
              {post.title}
            </h1>
            <p className="text-lg text-gray-500 mt-4 leading-relaxed">{post.excerpt}</p>
          </header>

          <hr className="border-gray-100 mb-10" />

          {/* Article body */}
          <article className="prose-sm">
            {post.content.map((section, i) => (
              <RenderSection key={i} section={section} />
            ))}
          </article>

          <hr className="border-gray-100 mt-12 mb-8" />

          {/* CTA */}
          <div className="bg-gradient-to-br from-violet-50 to-indigo-50 border border-violet-100 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Vous avez un projet digital ?
            </h3>
            <p className="text-gray-500 mb-5 text-sm">
              Parlons de votre projet — premier échange gratuit et sans engagement.
            </p>
            <Link
              href="/#contact"
              className="inline-block font-medium bg-gray-900 text-white px-6 py-3 rounded-xl hover:bg-violet-600 transition-colors duration-200"
            >
              Prendre contact →
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
