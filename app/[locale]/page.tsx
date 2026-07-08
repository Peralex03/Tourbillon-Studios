import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import QuizClient from "./start/QuizClient";
import FeaturedTopo from "@/components/FeaturedTopo";
import { whatsappUrl } from "@/lib/whatsapp";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("home");
  const tc = await getTranslations("common");
  const waUrl = whatsappUrl(tc("whatsappPrefill"));

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
          <div className="text-eyebrow mb-10 text-center">{t("trustEyebrow")}</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 max-w-3xl mx-auto">
            <TrustBadge
              icon={<SwissCrossIcon />}
              title={t("trustBadge1Title")}
              body={t("trustBadge1Body")}
            />
            <TrustBadge
              icon={<ShieldIcon />}
              title={t("trustBadge2Title")}
              body={t("trustBadge2Body")}
            />
            <TrustBadge
              icon={<LockIcon />}
              title={t("trustBadge3Title")}
              body={t("trustBadge3Body")}
            />
          </div>
        </div>
      </section>

      {/* ============================================
          CONTACT · WhatsApp
          ============================================ */}
      <section className="px-6 lg:px-10 py-20 lg:py-28 border-t border-[var(--stroke)]">
        <div className="mx-auto max-w-[1400px]">
          <div className="text-eyebrow mb-10">{t("bookingEyebrow")}</div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <h2 className="text-h1">
                {t("bookingHeadingStart")} <span className="accent-serif">{t("bookingHeadingItalic")}</span> {t("bookingHeadingEnd")}
              </h2>
              <p className="mt-6 text-[var(--text-dim)] text-[1.0625rem] leading-relaxed max-w-[44ch]">
                {t("bookingDescription")}
              </p>
              <ul className="mt-8 space-y-3 text-[0.9375rem] text-[var(--text-dim)]">
                <li className="flex items-start gap-3">
                  <CheckIcon />
                  <span>{t("bookingBenefit1")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckIcon />
                  <span>{t("bookingBenefit2")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckIcon />
                  <span>{t("bookingBenefit3")}</span>
                </li>
              </ul>
            </div>

            <div className="glass rounded-lg p-8 lg:p-10 flex flex-col gap-7">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[var(--accent)] text-[var(--accent-ink)] flex items-center justify-center shrink-0">
                  <WhatsAppIcon size={24} />
                </div>
                <div>
                  <div className="text-eyebrow">{t("discoveryCallLabel")}</div>
                  <div className="text-[1.0625rem] font-medium text-[var(--text)] mt-1">{t("discoveryCallDuration")}</div>
                </div>
              </div>

              <div className="border-t border-[var(--stroke)] pt-6 space-y-3">
                <div className="flex items-center justify-between text-[0.875rem]">
                  <span className="text-[var(--text-dim)]">{t("availabilityLabel")}</span>
                  <span className="text-[var(--text)] font-mono">{t("availabilityValue")}</span>
                </div>
                <div className="flex items-center justify-between text-[0.875rem]">
                  <span className="text-[var(--text-dim)]">{t("timezoneLabel")}</span>
                  <span className="text-[var(--text)] font-mono">{t("timezoneValue")}</span>
                </div>
                <div className="flex items-center justify-between text-[0.875rem]">
                  <span className="text-[var(--text-dim)]">{t("languagesLabel")}</span>
                  <span className="text-[var(--text)] font-mono">{t("languagesValue")}</span>
                </div>
              </div>

              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center justify-center gap-3 px-7 py-4 rounded-full bg-[var(--accent)] text-[var(--accent-ink)] text-[0.9375rem] font-medium hover:bg-[var(--accent-hover)] transition-colors"
              >
                <WhatsAppIcon size={16} />
                {t("bookSlotButton")}
                <ArrowIcon />
              </a>
              <p className="text-[0.75rem] text-[var(--text-faint)] text-center">
                {t("bookingNote")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          FINAL CTA · with featured topo + dual action
          ============================================ */}
      <section className="relative px-6 lg:px-10 py-20 lg:py-28 border-t border-[var(--stroke)] overflow-hidden">
        <FeaturedTopo fade />
        <div className="relative mx-auto max-w-[1400px] text-center">
          <h2 className="text-h1">
            {t("ctaFinalHeadingStart")} <span className="accent-serif">{t("ctaFinalHeadingItalic")}</span>.
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
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full glass text-[var(--text)] hover:border-[var(--accent)] transition-colors text-[0.9375rem] font-medium"
            >
              <WhatsAppIcon />
              {t("ctaFinalBookCall")}
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

function WhatsAppIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--accent)] mt-[3px] shrink-0">
      <path d="M5 12l5 5L20 7" />
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

