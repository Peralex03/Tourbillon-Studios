import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import RevealText from "@/components/RevealText";
import { PRICING_PLANS, PRICING_FAQ } from "@/lib/pricing";
import RoiCalculator from "./RoiCalculator";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pricing" });
  return {
    title: `Tarifs — Tourbillon Studios`,
    description: t("heroSubtitle"),
  };
}

export default async function PricingPage() {
  const t = await getTranslations("pricing");

  return (
    <>
      {/* ============================================
          HERO
          ============================================ */}
      <section className="px-6 lg:px-10 pt-32 lg:pt-40 pb-20 border-b border-[var(--stroke)]">
        <div className="mx-auto max-w-[1400px]">
          <div className="text-eyebrow mb-8">{t("eyebrow")}</div>

          <h1 className="text-h1 font-serif font-light tracking-tight max-w-5xl">
            <RevealText as="span" splitBy="word" className="block">{t("heroLine1")}</RevealText>
            <RevealText as="span" splitBy="word" className="block" delay={0.1}>{t("heroLine2")}</RevealText>
            <RevealText as="span" splitBy="word" className="block italic text-[var(--accent)]" delay={0.2}>{t("heroLine3Italic")}</RevealText>
          </h1>

          <RevealText
            as="p"
            className="mt-10 text-[1.0625rem] lg:text-[1.125rem] text-[var(--text-dim)] max-w-xl"
            splitBy="word"
            delay={0.4}
            stagger={0.012}
          >
            {t("heroSubtitle")}
          </RevealText>
        </div>
      </section>

      {/* ============================================
          PLANS GRID
          ============================================ */}
      <section className="px-6 lg:px-10 py-20 lg:py-28 border-b border-[var(--stroke)]">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {PRICING_PLANS.map((plan) => (
              <article
                key={plan.id}
                className={[
                  "relative flex flex-col p-8 lg:p-10 rounded-sm border transition-colors",
                  plan.featured
                    ? "bg-[var(--surface-1)] border-[var(--accent)] lg:scale-[1.02]"
                    : "bg-transparent border-[var(--stroke)] hover:border-[var(--stroke-strong)]",
                ].join(" ")}
              >
                {plan.featured && (
                  <span className="absolute -top-3 left-8 px-3 py-1 bg-[var(--accent)] text-[var(--accent-ink)] text-[0.6875rem] font-mono uppercase tracking-wider rounded-full">
                    {t("popular")}
                  </span>
                )}

                <header className="mb-8">
                  <h2 className="font-serif text-[2.25rem] font-light text-[var(--text)] tracking-tight">
                    {plan.name}
                  </h2>
                  <p className="mt-3 text-[var(--text-dim)] text-[0.95rem] leading-relaxed">
                    {plan.tagline}
                  </p>
                </header>

                <div className="mb-8 pb-8 border-b border-[var(--stroke)]">
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-[clamp(3.5rem,6vw,5rem)] font-light tracking-tight leading-none text-[var(--text)]">
                      {plan.monthlyPrice}
                    </span>
                    <span className="font-mono text-[0.875rem] text-[var(--text-dim)]">
                      CHF{t("perMonth")}
                    </span>
                  </div>
                  <p className="mt-3 text-[var(--text-faint)] text-[0.8125rem]">
                    {t("vatNote")}
                  </p>
                </div>

                <ul className="space-y-3 mb-10 flex-1">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-3 text-[0.95rem] text-[var(--text)]">
                      <CheckIcon />
                      <span>{feat}</span>
                    </li>
                  ))}
                  {plan.notIncluded?.map((feat, i) => (
                    <li
                      key={`n${i}`}
                      className="flex items-start gap-3 text-[0.95rem] text-[var(--text-faint)] line-through"
                    >
                      <DashIcon />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.ctaHref}
                  className={[
                    "inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full text-[0.95rem] font-medium transition-colors",
                    plan.featured
                      ? "bg-[var(--accent)] text-[var(--accent-ink)] hover:bg-[var(--accent-hover)]"
                      : "border border-[var(--stroke-strong)] text-[var(--text)] hover:border-[var(--text)]",
                  ].join(" ")}
                >
                  {plan.ctaLabel}
                  <ArrowIcon />
                </Link>
              </article>
            ))}
          </div>

          {/* Ownership note */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 p-8 lg:p-10 border border-[var(--stroke)] rounded-sm bg-[var(--surface-1)]">
            <div>
              <div className="text-eyebrow mb-3">{t("everyPlanIncludes")}</div>
              <h3 className="font-serif text-h3 font-light tracking-tight">{t("ownershipTitle")}</h3>
            </div>
            <p className="text-[var(--text-dim)] text-[1rem] leading-relaxed self-end">
              {t("ownershipBody")}
            </p>
          </div>
        </div>
      </section>

      {/* ============================================
          ROI CALCULATOR
          ============================================ */}
      <section className="px-6 lg:px-10 py-24 lg:py-32 border-b border-[var(--stroke)]">
        <div className="mx-auto max-w-[1100px]">
          <div className="text-eyebrow mb-6">ROI</div>
          <h2 className="font-serif text-h2 font-light tracking-tight">
            <RevealText as="span" splitBy="word">{t("roiTitle")}</RevealText>
          </h2>
          <p className="mt-6 text-[var(--text-dim)] text-[1.0625rem] max-w-xl">
            {t("roiBody")}
          </p>

          <div className="mt-12">
            <RoiCalculator
              visitorsLabel={t("roiVisitorsLabel")}
              avgValueLabel={t("roiAvgValueLabel")}
              currentRateLabel={t("roiCurrentRateLabel")}
              resultLabel={t("roiResultLabel")}
              resultNote={t("roiResultNote")}
            />
          </div>
        </div>
      </section>

      {/* ============================================
          FAQ
          ============================================ */}
      <section className="px-6 lg:px-10 py-24 lg:py-32 border-b border-[var(--stroke)]">
        <div className="mx-auto max-w-[1100px]">
          <div className="text-eyebrow mb-6">FAQ</div>
          <h2 className="font-serif text-h2 font-light tracking-tight mb-12 lg:mb-16">
            {t("faqTitle")}
          </h2>

          <div className="divide-y divide-[var(--stroke)] border-y border-[var(--stroke)]">
            {PRICING_FAQ.map((item, i) => (
              <details
                key={i}
                className="group py-6 cursor-pointer"
                {...(i === 0 ? { open: true } : {})}
              >
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

      {/* ============================================
          CTA
          ============================================ */}
      <section className="px-6 lg:px-10 py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] text-center">
          <h2 className="font-serif text-h1 font-light tracking-tight">
            <RevealText as="span" splitBy="word">{t("ctaTitle")}</RevealText>
          </h2>
          <div className="mt-10 inline-flex">
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[var(--accent)] text-[var(--accent-ink)] text-[1rem] font-medium hover:bg-[var(--accent-hover)] transition-colors"
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

function CheckIcon() {
  return (
    <svg className="mt-1 shrink-0 text-[var(--accent)]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

function DashIcon() {
  return (
    <svg className="mt-1 shrink-0 text-[var(--text-faint)]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <path d="M5 12h14" />
    </svg>
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
