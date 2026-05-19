import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getAllProjects } from "@/lib/projects";
import QuizClient from "./start/QuizClient";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("home");
  const featured = getAllProjects()[0];

  return (
    <>
      {/* ============================================
          QUIZ — embedded as the hero
          ============================================ */}
      <section className="relative">
        <QuizClient locale={locale} mode="embed" />
      </section>

      {/* Anchor target for in-quiz "Découvrir le studio" link */}
      <div id="below-quiz" />

      {/* ============================================
          METRICS BAND
          ============================================ */}
      <section className="px-6 lg:px-10 py-20 lg:py-28 border-t border-[var(--stroke)]">
        <div className="mx-auto max-w-[1400px]">
          <div className="text-eyebrow mb-10">{t("metricsEyebrow")}</div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
            <MetricItem
              value={t("metric1Value")}
              label={t("metric1Label")}
              index="01"
            />
            <MetricItem
              value={t("metric2Value")}
              label={t("metric2Label")}
              index="02"
            />
            <MetricItem
              value={t("metric3Value")}
              label={t("metric3Label")}
              index="03"
            />
          </div>
        </div>
      </section>

      {/* ============================================
          FEATURED CASE STUDY
          ============================================ */}
      {featured && (
        <section className="px-6 lg:px-10 py-20 lg:py-28 border-t border-[var(--stroke)]">
          <div className="mx-auto max-w-[1400px]">
            <div className="flex items-end justify-between mb-10">
              <div className="text-eyebrow">{t("featuredEyebrow")}</div>
              <Link
                href={`/work/${featured.slug}`}
                className="hidden sm:inline-flex items-center gap-2 text-[0.875rem] text-[var(--text-dim)] hover:text-[var(--accent)] transition-colors"
              >
                {t("featuredCta")}
                <ArrowIcon />
              </Link>
            </div>

            <Link href={`/work/${featured.slug}`} className="group block">
              <div
                className={`relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-gradient-to-br ${featured.cover}`}
              >
                <div className="absolute inset-0 flex items-end p-7 lg:p-10">
                  <div>
                    <div className="font-mono text-[0.6875rem] uppercase tracking-wider text-white/70 mb-2">
                      {featured.year} · {featured.category}
                    </div>
                    <h3 className="text-h2 text-white max-w-2xl">
                      {featured.client}
                    </h3>
                    <p className="mt-2 text-white/75 max-w-xl text-[0.9375rem]">
                      {featured.excerpt}
                    </p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* ============================================
          LOGOS MARQUEE
          ============================================ */}
      <section className="py-16 lg:py-20 border-t border-[var(--stroke)] overflow-hidden">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 mb-8">
          <div className="text-eyebrow">{t("logosEyebrow")}</div>
        </div>
        <div className="relative">
          <div className="marquee flex gap-14 lg:gap-20 whitespace-nowrap">
            {[...LOGOS, ...LOGOS].map((logo, i) => (
              <span
                key={i}
                className="text-[1.125rem] lg:text-[1.375rem] text-[var(--text-dim)] hover:text-[var(--text)] transition-colors font-medium tracking-tight"
              >
                {logo}
              </span>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[var(--bg)] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[var(--bg)] to-transparent" />
        </div>
      </section>

      {/* ============================================
          TESTIMONIAL
          ============================================ */}
      <section className="px-6 lg:px-10 py-20 lg:py-28 border-t border-[var(--stroke)]">
        <div className="mx-auto max-w-[900px]">
          <div className="text-eyebrow mb-8 text-center">
            {t("testimonialEyebrow")}
          </div>
          <blockquote className="text-[1.25rem] lg:text-[1.5rem] leading-[1.45] text-[var(--text)] text-center tracking-tight">
            <span className="accent-serif text-[var(--text)]">“</span>
            {t("testimonialQuote")}
            <span className="accent-serif text-[var(--text)]">”</span>
          </blockquote>
          <div className="mt-8 text-center text-eyebrow">
            — {t("testimonialAuthor")}
          </div>
        </div>
      </section>

      {/* ============================================
          FINAL CTA
          ============================================ */}
      <section className="px-6 lg:px-10 py-20 lg:py-28 border-t border-[var(--stroke)]">
        <div className="mx-auto max-w-[1400px] text-center">
          <h2 className="text-h1">
            Discutons de votre{" "}
            <span className="accent-serif">projet</span>.
          </h2>
          <p className="mt-5 text-[var(--text-dim)] text-[1rem] max-w-lg mx-auto leading-relaxed">
            {t("ctaFinalBody")}
          </p>
          <div className="mt-8 inline-flex">
            <Link
              href="/start"
              className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-[var(--accent)] text-[var(--accent-ink)] text-[0.9375rem] font-medium hover:bg-[var(--accent-hover)] transition-colors"
            >
              {t("ctaFinalButton")}
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function MetricItem({ value, label, index }: { value: string; label: string; index: string }) {
  return (
    <div className="relative">
      <span className="absolute -top-4 left-0 font-mono text-[0.6875rem] tracking-wider text-[var(--text-faint)]">
        {index}
      </span>
      <div className="text-[clamp(2.25rem,4vw,3rem)] leading-none tracking-tight text-[var(--text)] font-medium">
        {value}
      </div>
      <div className="mt-3 text-[0.9375rem] text-[var(--text-dim)] max-w-[28ch] leading-relaxed">
        {label}
      </div>
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7M9 7h8v8" />
    </svg>
  );
}

const LOGOS = [
  "Your Swiss Concierge",
  "Aspaklaria",
  "Late Night Milan",
  "Maison Helvetia",
  "Atelier Lémanique",
  "Studio Nord",
];
