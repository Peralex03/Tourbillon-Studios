import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import FeaturedTopo from "@/components/FeaturedTopo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    robots: { index: true, follow: true },
  };
}

export default async function ServicesPage() {
  const t = await getTranslations("services");
  const webItems = t.raw("web.items") as string[];
  const imageItems = t.raw("image.items") as string[];

  return (
    <>
      {/* HERO */}
      <section className="relative px-6 lg:px-10 pt-32 lg:pt-36 pb-16 border-b border-[var(--stroke)] overflow-hidden">
        <FeaturedTopo opacity={0.18} />
        <div className="relative mx-auto max-w-[1400px]">
          <div className="text-eyebrow mb-6">{t("eyebrow")}</div>
          <h1 className="text-h1 tracking-tight max-w-3xl">
            {t("headingStart")}{" "}
            <span className="accent-serif">{t("headingItalic")}</span>.
          </h1>
          <p className="mt-6 text-[1rem] lg:text-[1.0625rem] text-[var(--text-dim)] max-w-2xl leading-relaxed">
            {t("subtitle")}
          </p>
        </div>
      </section>

      {/* TWO POLES */}
      <section className="px-6 lg:px-10 py-20 lg:py-28 border-b border-[var(--stroke)]">
        <div className="mx-auto max-w-[1400px] grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          <Pole
            label={t("web.label")}
            title={t("web.title")}
            body={t("web.body")}
            items={webItems}
            ctaLabel={t("web.cta")}
            ctaHref="/pricing"
            ctaSecondaryLabel={t("web.ctaSecondary")}
            ctaSecondaryHref="/start"
          />
          <Pole
            label={t("image.label")}
            title={t("image.title")}
            body={t("image.body")}
            items={imageItems}
            ctaLabel={t("image.cta")}
            ctaHref="/image"
            ctaSecondaryLabel={t("image.ctaSecondary")}
            ctaSecondaryHref="/contact"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="relative px-6 lg:px-10 py-20 lg:py-28 overflow-hidden">
        <FeaturedTopo fade />
        <div className="relative mx-auto max-w-[1400px] text-center">
          <h2 className="text-h1">
            {t("ctaHeadingStart")}{" "}
            <span className="accent-serif">{t("ctaHeadingItalic")}</span>.
          </h2>
          <p className="mt-6 text-[1rem] text-[var(--text-dim)] max-w-xl mx-auto leading-relaxed">
            {t("ctaBody")}
          </p>
          <div className="mt-8 inline-flex">
            <Link
              href="/contact"
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

function Pole({
  label,
  title,
  body,
  items,
  ctaLabel,
  ctaHref,
  ctaSecondaryLabel,
  ctaSecondaryHref,
}: {
  label: string;
  title: string;
  body: string;
  items: string[];
  ctaLabel: string;
  ctaHref: string;
  ctaSecondaryLabel: string;
  ctaSecondaryHref: string;
}) {
  return (
    <article className="glass glass-shine flex flex-col p-7 lg:p-10 rounded-lg">
      <div className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-[var(--accent)] mb-5">
        {label}
      </div>
      <h2 className="text-h2 text-[var(--text)]">{title}</h2>
      <p className="mt-4 text-[var(--text-dim)] text-[0.9375rem] lg:text-[1rem] leading-relaxed">
        {body}
      </p>

      <ul className="mt-8 space-y-3 flex-1">
        {items.map((item, i) => (
          <li
            key={i}
            className="flex items-start gap-3 text-[0.95rem] text-[var(--text)]"
          >
            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="mt-10 flex flex-wrap items-center gap-3">
        <Link
          href={ctaHref}
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[var(--accent)] text-[var(--accent-ink)] text-[0.9375rem] font-medium hover:bg-[var(--accent-hover)] transition-colors"
        >
          {ctaLabel}
          <ArrowIcon />
        </Link>
        <Link
          href={ctaSecondaryHref}
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-[var(--stroke-strong)] text-[var(--text)] text-[0.9375rem] hover:border-[var(--text)] transition-colors"
        >
          {ctaSecondaryLabel}
        </Link>
      </div>
    </article>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 17L17 7M9 7h8v8" />
    </svg>
  );
}
