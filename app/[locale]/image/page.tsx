import { getTranslations } from "next-intl/server";
import FeaturedTopo from "@/components/FeaturedTopo";
import GalleryClient from "./GalleryClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "portfolio" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    robots: { index: true, follow: true },
  };
}

export default async function ImagePage() {
  const t = await getTranslations("portfolio");
  return (
    <>
      {/* HERO */}
      <section className="relative px-6 lg:px-10 pt-32 lg:pt-36 pb-14 border-b border-[var(--stroke)] overflow-hidden">
        <FeaturedTopo opacity={0.18} />
        <div className="relative mx-auto max-w-[1400px]">
          <div className="text-eyebrow mb-6">{t("eyebrow")}</div>
          <h1 className="text-h1 tracking-tight max-w-3xl">
            {t("headingStart")}{" "}
            <span className="accent-serif">{t("headingItalic")}</span>.
          </h1>
          <p className="mt-6 text-[1rem] lg:text-[1.0625rem] text-[var(--text-dim)] max-w-2xl leading-relaxed">
            {t("subtitle")}
          </p>
        </div>
      </section>

      {/* GALLERY · filters + grid + lightbox */}
      <GalleryClient />
    </>
  );
}
