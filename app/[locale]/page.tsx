import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import QuizClient from "./start/QuizClient";
import FeaturedTopo from "@/components/FeaturedTopo";
import { TESTIMONIALS } from "@/lib/testimonials";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("home");

  return (
    <>
      {/* ============================================
          QUIZ · embedded as the hero with topo
          ============================================ */}
      <section className="relative overflow-hidden">
        <FeaturedTopo opacity={0.16} />
        <div className="relative z-10">
          <QuizClient locale={locale} mode="embed" />
        </div>
      </section>

      <div id="below-quiz" />

      {/* ============================================
          METRICS BAND
          ============================================ */}
      <section className="px-6 lg:px-10 py-20 lg:py-28 border-t border-[var(--stroke)]">
        <div className="mx-auto max-w-[1400px]">
          <div className="text-eyebrow mb-10">{t("metricsEyebrow")}</div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
            <MetricItem value={t("metric1Value")} label={t("metric1Label")} index="01" />
            <MetricItem value={t("metric2Value")} label={t("metric2Label")} index="02" />
            <MetricItem value={t("metric3Value")} label={t("metric3Label")} index="03" />
          </div>
        </div>
      </section>

      {/* ============================================
          TRUST BADGES · replaces logos marquee
          ============================================ */}
      <section className="px-6 lg:px-10 py-16 lg:py-20 border-t border-[var(--stroke)]">
        <div className="mx-auto max-w-[1400px]">
          <div className="text-eyebrow mb-10 text-center">Engagements</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 max-w-3xl mx-auto">
            <TrustBadge
              icon={<SwissCrossIcon />}
              title="Hébergement suisse"
              body="Données et site hébergés en Suisse romande. Conformité sectorielle."
            />
            <TrustBadge
              icon={<ShieldIcon />}
              title="Conforme nLPD"
              body="Protection des données respectant la loi fédérale 2023 et le RGPD européen."
            />
            <TrustBadge
              icon={<LockIcon />}
              title="Code propriétaire"
              body="Le code source vous appartient. Aucune dépendance, aucun verrouillage."
            />
          </div>
        </div>
      </section>

      {/* ============================================
          TESTIMONIALS · 3 glass cards
          ============================================ */}
      <section className="px-6 lg:px-10 py-20 lg:py-28 border-t border-[var(--stroke)]">
        <div className="mx-auto max-w-[1400px]">
          <div className="text-eyebrow mb-10">{t("testimonialEyebrow")}</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
            {TESTIMONIALS.map((tst, i) => (
              <article
                key={i}
                className="glass rounded-lg p-7 lg:p-8 flex flex-col gap-6 min-h-[260px]"
              >
                <QuoteIcon />
                <p className="flex-1 text-[0.9375rem] lg:text-[1rem] text-[var(--text)] leading-relaxed">
                  {tst.quote}
                </p>
                <div className="flex items-center gap-3 pt-5 border-t border-[var(--stroke)]">
                  <div className="w-9 h-9 rounded-full glass-subtle flex items-center justify-center font-mono text-[0.6875rem] tracking-wider text-[var(--accent)]">
                    {tst.initials}
                  </div>
                  <div>
                    <div className="text-[0.8125rem] font-medium text-[var(--text)]">
                      {tst.role}
                    </div>
                    <div className="text-[0.75rem] text-[var(--text-faint)]">
                      {tst.company}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          FINAL CTA · with featured topo + dual action
          ============================================ */}
      <section className="relative px-6 lg:px-10 py-20 lg:py-28 border-t border-[var(--stroke)] overflow-hidden">
        <FeaturedTopo />
        <div className="relative mx-auto max-w-[1400px] text-center">
          <h2 className="text-h1">
            Discutons de votre <span className="accent-serif">projet</span>.
          </h2>
          <p className="mt-5 text-[var(--text-dim)] text-[1rem] max-w-lg mx-auto leading-relaxed">
            {t("ctaFinalBody")}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/start"
              className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-[var(--accent)] text-[var(--accent-ink)] text-[0.9375rem] font-medium hover:bg-[var(--accent-hover)] transition-colors"
            >
              {t("ctaFinalButton")}
              <ArrowIcon />
            </Link>
            <a
              href="https://cal.com/tourbillon-studios/15min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full glass text-[var(--text)] hover:border-[var(--accent)] transition-colors text-[0.9375rem] font-medium"
            >
              <PhoneIcon />
              Réserver un appel
            </a>
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

function TrustBadge({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="glass rounded-lg p-6 lg:p-7 flex flex-col gap-3">
      <span className="text-[var(--accent)]">{icon}</span>
      <h3 className="text-[0.9375rem] font-medium text-[var(--text)]">{title}</h3>
      <p className="text-[0.8125rem] text-[var(--text-dim)] leading-relaxed">{body}</p>
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

function PhoneIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function SwissCrossIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <rect x="9" y="3" width="6" height="18" rx="0.5" />
      <rect x="3" y="9" width="18" height="6" rx="0.5" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l8 4v6c0 5-3.5 9.5-8 10-4.5-.5-8-5-8-10V6l8-4z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

function QuoteIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-[var(--accent)]" aria-hidden="true">
      <path d="M7 7h4v6H5v-3a3 3 0 0 1 2-2.83V7zm10 0h4v6h-6v-3a3 3 0 0 1 2-2.83V7z" opacity="0.5" />
      <path d="M3 11a3 3 0 0 1 3-3V5a6 6 0 0 0-6 6v5h6v-5H3zm10 0a3 3 0 0 1 3-3V5a6 6 0 0 0-6 6v5h6v-5h-3z" />
    </svg>
  );
}
