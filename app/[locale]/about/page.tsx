import { getTranslations } from "next-intl/server";
import FeaturedTopo from "@/components/FeaturedTopo";
import Button from "@/components/Button";
import { TEAM, VALUES, CITIES } from "@/lib/team";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return {
    title: `À propos · Tourbillon Studios`,
    description: t("heroLine"),
  };
}

export default async function AboutPage() {
  const t = await getTranslations("about");

  return (
    <>
      {/* HERO */}
      <section className="relative px-6 lg:px-10 pt-32 lg:pt-36 pb-16 lg:pb-20 border-b border-[var(--stroke)] overflow-hidden">
        <FeaturedTopo opacity={0.18} />
        <div className="relative mx-auto max-w-[1400px]">
          <div className="text-eyebrow mb-6">{t("eyebrow")}</div>
          <h1 className="text-h1 tracking-tight max-w-3xl">
            Nous concevons des sites web qui{" "}
            <span className="accent-serif">financent leur abonnement</span>.
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
            <p className="text-h3 leading-[1.3] tracking-tight text-[var(--text)]">
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
            <h2 className="text-h2 tracking-tight">
              <span>{t("valuesTitle")}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
            {VALUES.map((value, i) => (
              <div
                key={i}
                className="glass rounded-lg p-7 lg:p-9 flex flex-col gap-5 min-h-[220px]"
              >
                <div className="font-mono text-[0.6875rem] tracking-wider text-[var(--accent)]">
                  {value.eyebrow}
                </div>
                <h3 className="text-[1.25rem] lg:text-[1.5rem] font-medium tracking-tight leading-tight">
                  {value.title}
                </h3>
                <p className="text-[var(--text-dim)] text-[0.9375rem] leading-relaxed max-w-md">
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
            <h2 className="text-h2 tracking-tight">
              <span>{t("teamTitle")}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {TEAM.map((member, i) => (
              <article key={i} className="group">
                <div className="glass aspect-[4/5] rounded-lg mb-6 flex items-center justify-center text-[clamp(3rem,6vw,5rem)] font-medium text-[var(--text-faint)] group-hover:text-[var(--accent)] transition-colors">
                  {member.initials}
                </div>
                <h3 className="text-[1.125rem] font-medium tracking-tight">{member.name}</h3>
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

      {/* BEHIND THE CODE · placeholders for atelier photos */}
      <section className="px-6 lg:px-10 py-20 lg:py-28 border-b border-[var(--stroke)]">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-12 lg:mb-14 max-w-3xl">
            <div className="text-eyebrow mb-6">Derrière le code</div>
            <h2 className="text-h2 tracking-tight">
              Comment nous{" "}
              <span className="accent-serif">construisons</span>.
            </h2>
            <p className="mt-5 text-[var(--text-dim)] text-[1rem] max-w-xl leading-relaxed">
              Notre atelier de production · équipement, outils et environnement de travail.
            </p>
          </div>

          <div className="grid grid-cols-12 gap-4 lg:gap-5">
            {BEHIND_CODE.map((item, i) => (
              <article
                key={i}
                className={[
                  "glass rounded-lg relative overflow-hidden",
                  item.span,
                ].join(" ")}
              >
                <div className="aspect-[4/3] flex items-end p-5 lg:p-7">
                  <PlaceholderArtwork variant={item.variant} />
                  <div className="relative z-10">
                    <div className="font-mono text-[0.6875rem] uppercase tracking-wider text-[var(--accent)] mb-1.5">
                      {item.label}
                    </div>
                    <h3 className="text-[1rem] lg:text-[1.125rem] font-medium tracking-tight">
                      {item.title}
                    </h3>
                  </div>
                </div>
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
            <h2 className="text-h2 tracking-tight">
              <span>{t("citiesTitle")}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5">
            {CITIES.map((city, i) => (
              <div key={i} className="glass rounded-lg p-7 lg:p-9">
                <div className="font-mono text-[0.6875rem] tracking-wider text-[var(--text-faint)] uppercase">
                  {city.role}
                </div>
                <div className="text-[clamp(1.625rem,3vw,2.125rem)] font-medium tracking-tight leading-none mt-3">
                  {city.name}
                </div>
                <div className="font-mono text-[0.75rem] text-[var(--text-dim)] mt-5">
                  {city.coords}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Button href="/start" size="lg">
              Démarrer un projet
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

/* ============================================
   BEHIND THE CODE · data + placeholder artworks
   ============================================ */

const BEHIND_CODE = [
  { label: "Atelier", title: "Studio principal · Genève", variant: "studio" as const, span: "col-span-12 md:col-span-6 lg:col-span-7" },
  { label: "Stack", title: "Outils et environnement", variant: "stack" as const, span: "col-span-12 md:col-span-6 lg:col-span-5" },
  { label: "Process", title: "Suivi en direct", variant: "process" as const, span: "col-span-12 md:col-span-6 lg:col-span-4" },
  { label: "Qualité", title: "Tests et performance", variant: "quality" as const, span: "col-span-12 md:col-span-6 lg:col-span-4" },
  { label: "Livraison", title: "Déploiement continu", variant: "delivery" as const, span: "col-span-12 lg:col-span-4" },
];

function PlaceholderArtwork({ variant }: { variant: "studio" | "stack" | "process" | "quality" | "delivery" }) {
  const common = "absolute inset-0 opacity-60";
  if (variant === "studio") {
    return (
      <svg viewBox="0 0 400 300" className={common} aria-hidden="true" preserveAspectRatio="xMidYMid slice">
        <rect x="60" y="80" width="280" height="160" rx="8" fill="var(--surface-2)" stroke="var(--stroke)" />
        <rect x="80" y="100" width="240" height="100" rx="4" fill="var(--surface-1)" />
        <rect x="100" y="120" width="40" height="40" rx="3" fill="var(--accent)" opacity="0.6" />
        <rect x="150" y="120" width="60" height="6" rx="2" fill="var(--text)" opacity="0.5" />
        <rect x="150" y="135" width="100" height="4" rx="2" fill="var(--text-dim)" opacity="0.4" />
        <rect x="150" y="148" width="80" height="4" rx="2" fill="var(--text-dim)" opacity="0.4" />
        <rect x="100" y="170" width="200" height="20" rx="3" fill="var(--surface-2)" />
        <rect x="60" y="220" width="120" height="6" rx="2" fill="var(--accent)" opacity="0.5" />
      </svg>
    );
  }
  if (variant === "stack") {
    return (
      <svg viewBox="0 0 400 300" className={common} aria-hidden="true" preserveAspectRatio="xMidYMid slice">
        {Array.from({ length: 5 }).map((_, i) => (
          <rect
            key={i}
            x={60 + i * 12}
            y={60 + i * 12}
            width="240"
            height="160"
            rx="6"
            fill="none"
            stroke="var(--stroke)"
            opacity={1 - i * 0.18}
          />
        ))}
        <rect x="116" y="116" width="184" height="104" rx="4" fill="var(--accent)" opacity="0.15" stroke="var(--accent)" />
      </svg>
    );
  }
  if (variant === "process") {
    return (
      <svg viewBox="0 0 400 300" className={common} aria-hidden="true" preserveAspectRatio="xMidYMid slice">
        <circle cx="100" cy="150" r="14" fill="var(--accent)" />
        <line x1="115" y1="150" x2="195" y2="150" stroke="var(--stroke)" strokeWidth="2" strokeDasharray="3 4" />
        <circle cx="210" cy="150" r="14" fill="var(--accent)" opacity="0.6" />
        <line x1="225" y1="150" x2="305" y2="150" stroke="var(--stroke)" strokeWidth="2" strokeDasharray="3 4" />
        <circle cx="320" cy="150" r="14" fill="none" stroke="var(--accent)" strokeWidth="2" />
      </svg>
    );
  }
  if (variant === "quality") {
    return (
      <svg viewBox="0 0 400 300" className={common} aria-hidden="true" preserveAspectRatio="xMidYMid slice">
        <circle cx="200" cy="150" r="80" fill="none" stroke="var(--stroke)" strokeWidth="2" />
        <circle cx="200" cy="150" r="80" fill="none" stroke="var(--accent)" strokeWidth="3" strokeDasharray="440" strokeDashoffset="44" transform="rotate(-90 200 150)" strokeLinecap="round" />
        <text x="200" y="160" textAnchor="middle" fill="var(--text)" fontSize="42" fontWeight="500" fontFamily="Inter, system-ui">95</text>
      </svg>
    );
  }
  // delivery
  return (
    <svg viewBox="0 0 400 300" className={common} aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <path d="M 50 220 Q 200 80 350 220" stroke="var(--accent)" strokeWidth="3" fill="none" strokeLinecap="round" />
      <circle cx="350" cy="220" r="10" fill="var(--accent)" />
      <line x1="50" y1="220" x2="350" y2="220" stroke="var(--stroke)" strokeWidth="1" strokeDasharray="2 4" />
    </svg>
  );
}
