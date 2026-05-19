import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import RevealText from "@/components/RevealText";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "process" });
  return {
    title: `Méthode 48h — Tourbillon Studios`,
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
      <section className="px-6 lg:px-10 pt-32 lg:pt-40 pb-20 border-b border-[var(--stroke)]">
        <div className="mx-auto max-w-[1400px]">
          <div className="text-eyebrow mb-8">{t("eyebrow")}</div>
          <h1 className="text-h1 font-serif font-light tracking-tight max-w-5xl">
            <RevealText as="span" splitBy="word" className="block">{t("heroLine1")}</RevealText>
            <RevealText as="span" splitBy="word" className="block italic text-[var(--accent)]" delay={0.1}>{t("heroLine2Italic")}</RevealText>
          </h1>
          <RevealText
            as="p"
            className="mt-10 text-[1.0625rem] lg:text-[1.125rem] text-[var(--text-dim)] max-w-2xl"
            splitBy="word"
            delay={0.3}
            stagger={0.012}
          >
            {t("heroSubtitle")}
          </RevealText>
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
                  <div className="font-serif text-[clamp(3rem,5vw,4rem)] font-light leading-none mt-2 text-[var(--accent)]">
                    {step.number}
                  </div>
                </div>

                {/* Title */}
                <div className="col-span-12 lg:col-span-5">
                  <h3 className="font-serif text-h2 font-light tracking-tight leading-[1.05]">
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
      <section className="px-6 lg:px-10 py-24 lg:py-32 border-b border-[var(--stroke)] bg-[var(--surface-1)]">
        <div className="mx-auto max-w-[1100px] text-center">
          <div className="text-eyebrow mb-8">Garantie</div>
          <h2 className="font-serif text-h1 font-light tracking-tight leading-[1.05]">
            <RevealText as="span" splitBy="word">{t("guaranteeTitle")}</RevealText>
          </h2>
          <p className="mt-8 text-[var(--text-dim)] text-[1.0625rem] max-w-xl mx-auto">
            {t("guaranteeBody")}
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 lg:px-10 py-24 lg:py-32 border-b border-[var(--stroke)]">
        <div className="mx-auto max-w-[1100px]">
          <div className="text-eyebrow mb-6">FAQ</div>
          <h2 className="font-serif text-h2 font-light tracking-tight mb-12">
            {t("faqTitle")}
          </h2>
          <div className="divide-y divide-[var(--stroke)] border-y border-[var(--stroke)]">
            {faqs.map((item, i) => (
              <details key={i} className="group py-6 cursor-pointer" {...(i === 0 ? { open: true } : {})}>
                <summary className="flex items-start justify-between gap-6 list-none">
                  <span className="font-serif text-[1.25rem] lg:text-[1.5rem] text-[var(--text)] font-light tracking-tight">
                    {item.q}
                  </span>
                  <span className="shrink-0 mt-1 w-8 h-8 flex items-center justify-center rounded-full border border-[var(--stroke)] text-[var(--text-dim)] group-open:bg-[var(--accent)] group-open:text-[var(--accent-ink)] group-open:border-[var(--accent)] transition-colors">
                    <PlusIcon />
                  </span>
                </summary>
                <p className="mt-4 text-[var(--text-dim)] text-[1rem] leading-relaxed max-w-3xl">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 lg:px-10 py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] text-center">
          <h2 className="font-serif text-h1 font-light tracking-tight">
            <RevealText as="span" splitBy="word">{t("ctaTitle")}</RevealText>
          </h2>
          <div className="mt-10 inline-flex">
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[var(--accent)] text-[var(--accent-ink)] font-medium hover:bg-[var(--accent-hover)] transition-colors"
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

function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="transition-transform group-open:rotate-45">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7M9 7h8v8" />
    </svg>
  );
}
