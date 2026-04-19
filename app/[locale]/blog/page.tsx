import { getTranslations } from "next-intl/server";
import { getAllPosts } from "@/lib/blog";
import BlogCard from "@/components/BlogCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
      <Navbar />
      <main className="pt-24 pb-20 px-6 min-h-screen">
        {/* Background blob */}
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-violet-100/30 blur-[120px] -z-10 pointer-events-none" />

        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-14">
            <span className="text-sm font-medium text-violet-600 uppercase tracking-widest">
              {t("label")}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mt-3">
              {t("heading")}
            </h1>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-lg">
              {t("subtitle")}
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
      </main>
      <Footer />
    </>
  );
}
