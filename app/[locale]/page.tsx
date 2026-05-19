import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import RevealText from "@/components/RevealText";
import MouseReactiveBackground from "@/components/MouseReactiveBackground";
import { getAllProjects } from "@/lib/projects";

export default async function HomePage() {
  const t = await getTranslations("home");
  const featured = getAllProjects()[0];

  return (
    <>
      {/* ============================================
          HERO — fullscreen with mouse-reactive bg
          ============================================ */}
      <section className="relative min-h-[100svh] flex items-end pt-28 pb-20 px-6 lg:px-10 overflow-hidden">
        <MouseReactiveBackground />

        <div className="mx-auto max-w-[1400px] w-full grid-12 items-end">
          <div className="col-span-12 lg:col-span-10">
            <RevealText
              as="div"
              className="text-eyebrow mb-8 inline-block"
              splitBy="word"
              stagger={0.03}
            >
              GENÈVE · LAUSANNE · ZÜRICH
            </RevealText>

            <h1 className="text-display font-serif font-light text-[var(--text)]">
              <RevealText as="span" className="block" splitBy="word">
                {t("heroLine1")}
              </RevealText>
              <RevealText as="span" className="block" splitBy="word" delay={0.1}>
                {t("heroLine2")}
              </RevealText>
              <RevealText
                as="span"
                className="block italic text-[var(--accent)]"
                splitBy="word"
                delay={0.2}
              >
                {t("heroLine3Italic")}
              </RevealText>
              <RevealText as="span" className="block" splitBy="word" delay={0.3}>
                {t("heroLine3End")}
              </RevealText>
            </h1>
          </div>

          <div className="col-span-12 lg:col-span-7 lg:col-start-6 mt-12 lg:mt-16">
            <RevealText
              as="p"
              className="text-[1.0625rem] lg:text-[1.125rem] text-[var(--text-dim)] leading-relaxed max-w-xl"
              splitBy="word"
              delay={0.5}
              stagger={0.012}
            >
              {t("heroSubtitle")}
            </RevealText>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[var(--accent)] text-[var(--accent-ink)] font-medium hover:bg-[var(--accent-hover)] transition-colors"
              >
                {t("ctaPrimary")}
                <ArrowIcon />
              </Link>
              <Link
                href="/process"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-[var(--stroke-strong)] text-[var(--text)] font-medium hover:border-[var(--text)] transition-colors"
              >
                {t("ctaSecondary")}
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-6 right-6 lg:right-10 flex items-center gap-3 text-eyebrow opacity-60">
          <span>SCROLL</span>
          <span className="block w-8 h-px bg-[var(--text-dim)]" />
        </div>
      </section>

      {/* ============================================
          METRICS BAND
          ============================================ */}
      <section className="px-6 lg:px-10 py-24 lg:py-32 border-t border-[var(--stroke)]">
        <div className="mx-auto max-w-[1400px]">
          <div className="text-eyebrow mb-12">{t("metricsEyebrow")}</div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
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
        <section className="px-6 lg:px-10 py-24 lg:py-32 border-t border-[var(--stroke)]">
          <div className="mx-auto max-w-[1400px]">
            <div className="flex items-end justify-between mb-12 lg:mb-16">
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
              <div className={`relative aspect-[16/9] w-full overflow-hidden rounded-sm bg-gradient-to-br ${featured.cover}`}>
                <div className="absolute inset-0 flex items-end p-8 lg:p-12">
                  <div>
                    <div className="font-mono text-[0.6875rem] uppercase tracking-wider text-white/70 mb-3">
                      {featured.year} · {featured.category}
                    </div>
                    <h3 className="text-h2 font-serif text-white max-w-2xl">
                      {featured.client}
                    </h3>
                    <p className="mt-3 text-white/75 max-w-xl text-[1rem] lg:text-[1.0625rem]">
                      {featured.excerpt}
                    </p>
                  </div>
                </div>
                {/* Subtle hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* ============================================
          LOGOS MARQUEE
          ============================================ */}
      <section className="py-20 lg:py-28 border-t border-[var(--stroke)] overflow-hidden">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 mb-12">
          <div className="text-eyebrow">{t("logosEyebrow")}</div>
        </div>
        <div className="relative">
          <div className="marquee flex gap-16 lg:gap-24 whitespace-nowrap">
            {[...LOGOS, ...LOGOS].map((logo, i) => (
              <span
                key={i}
                className="font-serif text-[clamp(1.5rem,3vw,2.25rem)] italic font-light text-[var(--text-dim)] hover:text-[var(--text)] transition-colors"
              >
                {logo}
              </span>
            ))}
          </div>
          {/* Edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[var(--bg)] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[var(--bg)] to-transparent" />
        </div>
      </section>

      {/* ============================================
          TESTIMONIAL — single, large
          ============================================ */}
      <section className="px-6 lg:px-10 py-24 lg:py-40 border-t border-[var(--stroke)]">
        <div className="mx-auto max-w-[1100px]">
          <div className="text-eyebrow mb-10 text-center">
            {t("testimonialEyebrow")}
          </div>
          <blockquote className="font-serif text-[clamp(1.75rem,4vw,3.25rem)] font-light leading-[1.15] text-[var(--text)] text-center tracking-tight">
            <RevealText as="span" splitBy="word" stagger={0.025}>
              {`"${t("testimonialQuote")}"`}
            </RevealText>
          </blockquote>
          <div className="mt-10 text-center text-eyebrow">
            — {t("testimonialAuthor")}
          </div>
        </div>
      </section>

      {/* ============================================
          FINAL CTA
          ============================================ */}
      <section className="px-6 lg:px-10 py-24 lg:py-32 border-t border-[var(--stroke)]">
        <div className="mx-auto max-w-[1400px] text-center">
          <h2 className="text-h1 font-serif font-light tracking-tight">
            <RevealText as="span" splitBy="word">{t("ctaFinalTitle")}</RevealText>
          </h2>
          <p className="mt-6 text-[var(--text-dim)] text-[1.0625rem] max-w-lg mx-auto">
            {t("ctaFinalBody")}
          </p>
          <div className="mt-10 inline-flex">
            <Link
              href="/start"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[var(--accent)] text-[var(--accent-ink)] text-[1rem] font-medium hover:bg-[var(--accent-hover)] transition-colors"
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
      <div className="font-serif text-[clamp(4rem,8vw,7rem)] leading-none tracking-tight text-[var(--text)] font-light">
        {value}
      </div>
      <div className="mt-4 text-[0.95rem] text-[var(--text-dim)] max-w-[16ch]">
        {label}
      </div>
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
