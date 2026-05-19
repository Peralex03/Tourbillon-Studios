import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Accordion from "@/components/Accordion";
import FeaturedTopo from "@/components/FeaturedTopo";

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

  const steps = [1, 2, 3, 4].map((n) => ({
    number: t(`step${n}Number` as "step1Number"),
    title: t(`step${n}Title` as "step1Title"),
    description: t(`step${n}Description` as "step1Description"),
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

      {/* STEPS TIMELINE */}
      <section className="px-6 lg:px-10 py-24 lg:py-32 border-b border-[var(--stroke)]">
        <div className="mx-auto max-w-[1400px]">
          <div className="space-y-20 lg:space-y-32">
            {steps.map((step, i) => (
              <div
                key={i}
                className="grid-12 items-start gap-y-6 border-t border-[var(--stroke)] pt-10 lg:pt-16"
              >
                {/* Number */}
                <div className="col-span-12 lg:col-span-2">
                  <div className="font-mono text-[0.6875rem] uppercase tracking-wider text-[var(--text-faint)]">
                    STEP
                  </div>
                  <div className="text-[clamp(2.25rem,3.5vw,3rem)] font-medium leading-none mt-2 text-[var(--accent)]">
                    {step.number}
                  </div>
                </div>

                {/* Title */}
                <div className="col-span-12 lg:col-span-5">
                  <h3 className="text-h2 tracking-tight leading-[1.05]">
                    {step.title}
                  </h3>
                </div>

                {/* Description */}
                <div className="col-span-12 lg:col-span-5 lg:pt-3">
                  <p className="text-[var(--text-dim)] text-[1.0625rem] leading-relaxed max-w-xl">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
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
        <FeaturedTopo />
        <div className="relative mx-auto max-w-[1400px] text-center">
          <h2 className="text-h1 tracking-tight">
            Prêt à <span className="accent-serif">lancer un projet</span> ?
          </h2>
          <div className="mt-8 inline-flex">
            <Link
              href="/start"
              className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-[var(--accent)] text-[var(--accent-ink)] font-medium hover:bg-[var(--accent-hover)] transition-colors text-[0.9375rem]"
            >
              {t("ctaButton")}
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function ArrowIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7M9 7h8v8" />
    </svg>
  );
}
