import { getTranslations } from "next-intl/server";
import Accordion from "@/components/Accordion";
import FeaturedTopo from "@/components/FeaturedTopo";
import ProcessTimeline from "@/components/ProcessTimeline";
import Button from "@/components/Button";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "process" });
  return {
    title: `Méthode 48h · Tourbillon Studios`,
    description: t("heroSubtitle"),
  };
}

export default async function ProcessPage() {
  const t = await getTranslations("process");

  const mockups: Array<"brief" | "build" | "preview" | "retouches"> = [
    "brief",
    "build",
    "preview",
    "retouches",
  ];

  const steps = [1, 2, 3, 4].map((n, i) => ({
    number: t(`step${n}Number` as "step1Number"),
    title: t(`step${n}Title` as "step1Title"),
    description: t(`step${n}Description` as "step1Description"),
    mockup: mockups[i],
  }));

  const faqs = [1, 2, 3, 4].map((n) => ({
    q: t(`faqQ${n}` as "faqQ1"),
    a: t(`faqA${n}` as "faqA1"),
  }));

  return (
    <>
      {/* HERO */}
      <section className="relative px-6 lg:px-10 pt-32 lg:pt-36 pb-16 border-b border-[var(--stroke)] overflow-hidden">
        <FeaturedTopo opacity={0.18} />
        <div className="relative mx-auto max-w-[1400px]">
          <div className="text-eyebrow mb-6">{t("eyebrow")}</div>
          <h1 className="text-h1 tracking-tight max-w-3xl">
            La méthode <span className="accent-serif">48 heures</span>.
          </h1>
          <p className="mt-6 text-[1rem] lg:text-[1.0625rem] text-[var(--text-dim)] max-w-2xl leading-relaxed">
            {t("heroSubtitle")}
          </p>
        </div>
      </section>

      {/* INTERACTIVE TIMELINE · sticky scroll + SVG mockups */}
      <section className="py-16 lg:py-20 border-b border-[var(--stroke)]">
        <ProcessTimeline steps={steps} />
      </section>

      {/* GUARANTEE */}
      <section className="px-6 lg:px-10 py-20 lg:py-28 border-b border-[var(--stroke)]">
        <div className="mx-auto max-w-[1100px] text-center">
          <div className="text-eyebrow mb-6">Garantie</div>
          <h2 className="text-h1 tracking-tight">
            {t("guaranteeTitle")}
          </h2>
          <p className="mt-6 text-[var(--text-dim)] text-[1rem] max-w-xl mx-auto leading-relaxed">
            {t("guaranteeBody")}
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 lg:px-10 py-24 lg:py-32 border-b border-[var(--stroke)]">
        <div className="mx-auto max-w-[1100px]">
          <div className="text-eyebrow mb-6">FAQ</div>
          <h2 className="text-h2 tracking-tight mb-12">
            {t("faqTitle")}
          </h2>
          <Accordion items={faqs} initialOpen={0} />
        </div>
      </section>

      {/* CTA */}
      <section className="relative px-6 lg:px-10 py-20 lg:py-28 overflow-hidden">
        <FeaturedTopo fade />
        <div className="relative mx-auto max-w-[1400px] text-center">
          <h2 className="text-h1 tracking-tight">
            Prêt à <span className="accent-serif">lancer un projet</span> ?
          </h2>
          <div className="mt-8">
            <Button href="/start">{t("ctaButton")}</Button>
          </div>
        </div>
      </section>
    </>
  );
}

