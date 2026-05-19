import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import RevealText from "@/components/RevealText";
import { TEAM, VALUES, CITIES } from "@/lib/team";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return {
    title: `À propos — Tourbillon Studios`,
    description: t("heroLine"),
  };
}

export default async function AboutPage() {
  const t = await getTranslations("about");

  return (
    <>
      {/* HERO ÉDITORIAL */}
      <section className="px-6 lg:px-10 pt-32 lg:pt-40 pb-24 lg:pb-32 border-b border-[var(--stroke)]">
        <div className="mx-auto max-w-[1400px]">
          <div className="text-eyebrow mb-8">{t("eyebrow")}</div>
          <h1 className="text-h1 lg:text-display font-serif font-normal tracking-tight max-w-5xl">
            <RevealText as="span" splitBy="word">{t("heroLine")}</RevealText>
          </h1>
        </div>
      </section>

      {/* MANIFESTE */}
      <section className="px-6 lg:px-10 py-24 lg:py-32 border-b border-[var(--stroke)]">
        <div className="mx-auto max-w-[1400px] grid-12 gap-y-10">
          <div className="col-span-12 lg:col-span-4">
            <div className="text-eyebrow lg:sticky lg:top-32">{t("manifestoTitle")}</div>
          </div>
          <div className="col-span-12 lg:col-span-7 lg:col-start-6 space-y-8">
            <p className="font-serif text-h3 font-normal leading-[1.3] tracking-tight text-[var(--text)]">
              {t("manifestoP1")}
            </p>
            <p className="text-[1.0625rem] lg:text-[1.125rem] text-[var(--text-dim)] leading-relaxed">
              {t("manifestoP2")}
            </p>
            <p className="text-[1.0625rem] lg:text-[1.125rem] text-[var(--text-dim)] leading-relaxed">
              {t("manifestoP3")}
            </p>
          </div>
        </div>
      </section>

      {/* VALEURS */}
      <section className="px-6 lg:px-10 py-24 lg:py-32 border-b border-[var(--stroke)]">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-16 lg:mb-20 max-w-3xl">
            <div className="text-eyebrow mb-6">{t("valuesEyebrow")}</div>
            <h2 className="font-serif text-h2 font-normal tracking-tight">
              <RevealText as="span" splitBy="word">{t("valuesTitle")}</RevealText>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--stroke)]">
            {VALUES.map((value, i) => (
              <div
                key={i}
                className="p-8 lg:p-12 bg-[var(--bg)] flex flex-col gap-6 min-h-[260px]"
              >
                <div className="font-mono text-[0.6875rem] tracking-wider text-[var(--accent)]">
                  {value.eyebrow}
                </div>
                <h3 className="font-serif text-[2rem] lg:text-[2.5rem] font-normal tracking-tight leading-none">
                  {value.title}
                </h3>
                <p className="text-[var(--text-dim)] text-[1rem] leading-relaxed max-w-md">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ÉQUIPE */}
      <section className="px-6 lg:px-10 py-24 lg:py-32 border-b border-[var(--stroke)]">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-16 max-w-3xl">
            <div className="text-eyebrow mb-6">{t("teamEyebrow")}</div>
            <h2 className="font-serif text-h2 font-normal tracking-tight">
              <RevealText as="span" splitBy="word">{t("teamTitle")}</RevealText>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {TEAM.map((member, i) => (
              <article key={i} className="group">
                <div className="aspect-[4/5] bg-[var(--surface-1)] border border-[var(--stroke)] mb-6 flex items-center justify-center font-serif text-[clamp(4rem,8vw,7rem)] font-normal text-[var(--text-faint)] group-hover:text-[var(--accent)] transition-colors">
                  {member.initials}
                </div>
                <h3 className="font-serif text-[1.5rem] font-normal tracking-tight">{member.name}</h3>
                <div className="font-mono text-[0.75rem] uppercase tracking-wider text-[var(--text-faint)] mt-1">
                  {member.role}
                </div>
                <p className="mt-4 text-[var(--text-dim)] text-[0.95rem] leading-relaxed">
                  {member.bio}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CITIES */}
      <section className="px-6 lg:px-10 py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-16 max-w-3xl">
            <div className="text-eyebrow mb-6">{t("citiesEyebrow")}</div>
            <h2 className="font-serif text-h2 font-normal tracking-tight">
              <RevealText as="span" splitBy="word">{t("citiesTitle")}</RevealText>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--stroke)] border border-[var(--stroke)]">
            {CITIES.map((city, i) => (
              <div key={i} className="p-8 lg:p-12 bg-[var(--bg)]">
                <div className="font-mono text-[0.6875rem] tracking-wider text-[var(--text-faint)] uppercase">
                  {city.role}
                </div>
                <div className="font-serif text-[clamp(2.5rem,5vw,4rem)] font-normal tracking-tight leading-none mt-4">
                  {city.name}
                </div>
                <div className="font-mono text-[0.75rem] text-[var(--text-dim)] mt-6">
                  {city.coords}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/start"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[var(--accent)] text-[var(--accent-ink)] font-medium hover:bg-[var(--accent-hover)] transition-colors"
            >
              Démarrer un projet
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
