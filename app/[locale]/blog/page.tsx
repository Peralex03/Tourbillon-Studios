import { getTranslations } from "next-intl/server";
import { getAllPosts } from "@/lib/blog";
import BlogCard from "@/components/BlogCard";
import RevealText from "@/components/RevealText";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  return {
    title: `${t("heading")} — Tourbillon Studios`,
    description: t("subtitle"),
  };
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations("blog");
  const posts = getAllPosts();

  return (
    <>
      {/* HERO */}
      <section className="px-6 lg:px-10 pt-32 lg:pt-40 pb-20 border-b border-[var(--stroke)]">
        <div className="mx-auto max-w-[1400px]">
          <div className="text-eyebrow mb-8">{t("label")}</div>
          <h1 className="text-h1 font-serif font-normal tracking-tight max-w-5xl">
            <RevealText as="span" splitBy="word">{t("heading")}</RevealText>
          </h1>
          <p className="mt-8 text-[1.0625rem] lg:text-[1.125rem] text-[var(--text-dim)] max-w-2xl">
            {t("subtitle")}
          </p>
        </div>
      </section>

      {/* GRID */}
      <section className="px-6 lg:px-10 py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {posts.map((post) => (
              <BlogCard
                key={post.slug}
                post={post}
                locale={locale}
                readMoreLabel={t("readMore")}
                minReadLabel={t("minRead")}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
