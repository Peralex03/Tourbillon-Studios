import { getTranslations } from "next-intl/server";
import FeaturedTopo from "@/components/FeaturedTopo";
import Button from "@/components/Button";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <section className="relative min-h-[calc(100svh-5rem)] flex items-center px-6 lg:px-10 py-20 overflow-hidden">
      <FeaturedTopo opacity={0.2} fade />
      <div className="relative mx-auto max-w-[800px] text-center">
        <div className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-[var(--accent)] mb-6">
          {t("errorCode")}
        </div>
        <h1 className="text-[clamp(2.5rem,6vw,4rem)] font-medium leading-[1.05] tracking-tight">
          {t("headingStart")} <span className="accent-serif">{t("headingItalic")}</span>.
        </h1>
        <p className="mt-7 text-[1rem] lg:text-[1.0625rem] text-[var(--text-dim)] max-w-xl mx-auto leading-relaxed">
          {t("description")}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button href="/">{t("homeButton")}</Button>
          <Button href="/start" variant="secondary" icon="none">
            {t("startButton")}
          </Button>
        </div>
      </div>
    </section>
  );
}
