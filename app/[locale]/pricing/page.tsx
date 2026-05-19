import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PRICING_PLANS, PRICING_FAQ, PRICING_COMPARISON } from "@/lib/pricing";
import RoiCalculator from "./RoiCalculator";
import Accordion from "@/components/Accordion";
import FeaturedTopo from "@/components/FeaturedTopo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pricing" });
  return {
    title: `Tarifs · Tourbillon Studios`,
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
      <section className="px-6 lg:px-10 pt-32 lg:pt-36 pb-16 border-b border-[var(--stroke)]">
        <div className="mx-auto max-w-[1400px]">
          <div className="text-eyebrow mb-6">{t("eyebrow")}</div>

          <h1 className="text-h1 max-w-3xl">
            Un seul prix par mois.{" "}
            <span className="accent-serif">Tout inclus.</span>
          </h1>

          <p className="mt-6 text-[1rem] lg:text-[1.0625rem] text-[var(--text-dim)] max-w-xl leading-relaxed">
            {t("heroSubtitle")}
          </p>
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
                  "glass glass-shine relative flex flex-col p-7 lg:p-8 rounded-lg transition-colors",
                  plan.featured
                    ? "border-[var(--accent)] lg:scale-[1.02]"
                    : "hover:border-[var(--stroke-strong)]",
                ].join(" ")}
              >
                {plan.featured && (
                  <span className="absolute -top-3 left-7 px-3 py-1 bg-[var(--accent)] text-[var(--accent-ink)] text-[0.6875rem] font-mono uppercase tracking-wider rounded-full">
                    {t("popular")}
                  </span>
                )}

                <header className="mb-7">
                  <h2 className="text-h2 text-[var(--text)]">
                    {plan.name}
                  </h2>
                  <p className="mt-2 text-[var(--text-dim)] text-[0.9375rem] leading-relaxed">
                    {plan.tagline}
                  </p>
                </header>

                <div className="mb-7 pb-7 border-b border-[var(--stroke)]">
                  <div className="flex items-baseline gap-2">
                    <span className="text-[clamp(2.5rem,5vw,3.5rem)] font-medium tracking-tight leading-none text-[var(--text)]">
                      {plan.monthlyPrice}
                    </span>
                    <span className="font-mono text-[0.8125rem] text-[var(--text-dim)]">
                      CHF{t("perMonth")}
                    </span>
                  </div>
                  <p className="mt-2 text-[var(--text-faint)] text-[0.8125rem]">
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
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8 p-7 lg:p-9 glass rounded-lg">
            <div>
              <div className="text-eyebrow mb-3">{t("everyPlanIncludes")}</div>
              <h3 className="text-h3 text-[var(--text)]">{t("ownershipTitle")}</h3>
            </div>
            <p className="text-[var(--text-dim)] text-[0.9375rem] leading-relaxed self-end">
              {t("ownershipBody")}
            </p>
          </div>
        </div>
      </section>

      {/* ============================================
          COMPARISON TABLE
          ============================================ */}
      <section className="px-6 lg:px-10 py-20 lg:py-28 border-b border-[var(--stroke)]">
        <div className="mx-auto max-w-[1400px]">
          <div className="text-eyebrow mb-5">Comparatif</div>
          <h2 className="text-h2 text-[var(--text)] mb-10">
            Tout ce qui est inclus, formule par formule.
          </h2>

          <div className="glass rounded-lg overflow-hidden">
            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full text-left min-w-[640px]">
                <thead>
                  <tr className="border-b border-[var(--stroke)]">
                    <th className="py-4 px-5 lg:px-6 text-[0.75rem] font-mono uppercase tracking-wider text-[var(--text-dim)] font-medium">
                      Fonctionnalité
                    </th>
                    <th className="py-4 px-5 lg:px-6 text-[0.875rem] text-[var(--text)] font-medium">
                      Starter
                    </th>
                    <th className="py-4 px-5 lg:px-6 text-[0.875rem] text-[var(--accent)] font-medium">
                      Pro
                    </th>
                    <th className="py-4 px-5 lg:px-6 text-[0.875rem] text-[var(--text)] font-medium">
                      Custom
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {PRICING_COMPARISON.map((row, i) => (
                    <tr
                      key={i}
                      className="border-b border-[var(--stroke)] last:border-b-0 hover:bg-[var(--surface-2)]/30 transition-colors"
                    >
                      <td className="py-3.5 px-5 lg:px-6 text-[0.9375rem] text-[var(--text)]">
                        {row.label}
                      </td>
                      <FeatureCell value={row.starter} />
                      <FeatureCell value={row.pro} featured />
                      <FeatureCell value={row.custom} />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          ROI CALCULATOR
          ============================================ */}
      <section className="px-6 lg:px-10 py-20 lg:py-28 border-b border-[var(--stroke)]">
        <div className="mx-auto max-w-[1100px]">
          <div className="text-eyebrow mb-5">ROI</div>
          <h2 className="text-h2 text-[var(--text)]">
            {t("roiTitle")}
          </h2>
          <p className="mt-5 text-[var(--text-dim)] text-[1rem] max-w-xl leading-relaxed">
            {t("roiBody")}
          </p>

          <div className="mt-10">
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
      <section className="px-6 lg:px-10 py-20 lg:py-28 border-b border-[var(--stroke)]">
        <div className="mx-auto max-w-[1100px]">
          <div className="text-eyebrow mb-5">FAQ</div>
          <h2 className="text-h2 text-[var(--text)] mb-10">
            {t("faqTitle")}
          </h2>

          <Accordion items={PRICING_FAQ} initialOpen={0} />
        </div>
      </section>

      {/* ============================================
          CTA
          ============================================ */}
      <section className="relative px-6 lg:px-10 py-20 lg:py-28 overflow-hidden">
        <FeaturedTopo />
        <div className="relative mx-auto max-w-[1400px] text-center">
          <h2 className="text-h1">
            Lancer un projet dans les{" "}
            <span className="accent-serif">48 heures</span>.
          </h2>
          <div className="mt-8 inline-flex">
            <Link
              href="/start"
              className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-[var(--accent)] text-[var(--accent-ink)] text-[0.9375rem] font-medium hover:bg-[var(--accent-hover)] transition-colors"
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

function FeatureCell({ value, featured = false }: { value: boolean | string; featured?: boolean }) {
  const cellClass = [
    "py-3.5 px-5 lg:px-6 text-[0.9375rem]",
    featured ? "bg-[var(--accent-soft)]" : "",
  ].join(" ");

  if (typeof value === "boolean") {
    return (
      <td className={cellClass}>
        {value ? (
          <svg className="text-[var(--accent)]" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        ) : (
          <svg className="text-[var(--text-faint)]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M5 12h14" />
          </svg>
        )}
      </td>
    );
  }
  return (
    <td className={`${cellClass} text-[var(--text)]`}>
      {value}
    </td>
  );
}

function ArrowIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7M9 7h8v8" />
    </svg>
  );
}
