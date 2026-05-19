import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import RevealText from "@/components/RevealText";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";

export const metadata = {
  robots: { index: false, follow: false },
};

export async function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const t = await getTranslations("work");

  return (
    <>
      {/* HERO COVER */}
      <section className="pt-24 lg:pt-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-eyebrow text-[var(--text-dim)] hover:text-[var(--accent)] transition-colors mb-10"
          >
            {t("backToWork")}
          </Link>

          <div className="flex flex-col gap-6 mb-12">
            <div className="font-mono text-[0.6875rem] uppercase tracking-wider text-[var(--text-faint)]">
              {project.year} · {project.category}
            </div>
            <h1 className="font-serif text-h1 font-normal tracking-tight max-w-5xl">
              <RevealText as="span" splitBy="word">{project.client}</RevealText>
            </h1>
            <p className="text-[1.0625rem] lg:text-[1.25rem] text-[var(--text-dim)] max-w-2xl leading-relaxed">
              {project.excerpt}
            </p>
          </div>

          <div
            className={`relative aspect-[16/9] w-full overflow-hidden bg-gradient-to-br ${project.cover}`}
          >
            <div className="absolute inset-0 flex items-end p-8 lg:p-12">
              <h2 className="font-serif text-[clamp(2rem,5vw,4.5rem)] text-white font-normal tracking-tight">
                {project.title}
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* META + RESULTS */}
      <section className="px-6 lg:px-10 py-20 lg:py-28 border-b border-[var(--stroke)]">
        <div className="mx-auto max-w-[1400px] grid-12 gap-y-10">
          <div className="col-span-12 lg:col-span-4">
            <div className="text-eyebrow mb-3">{t("servicesLabel")}</div>
            <ul className="space-y-1 text-[var(--text)] text-[1rem]">
              {project.services.map((s) => (
                <li key={s} className="font-serif text-[1.125rem] font-normal">
                  — {s}
                </li>
              ))}
            </ul>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 text-[0.95rem] text-[var(--accent)] hover:underline"
              >
                {t("viewLive")}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M7 17L17 7M9 7h8v8" />
                </svg>
              </a>
            )}
          </div>

          {project.results && (
            <div className="col-span-12 lg:col-span-7 lg:col-start-6">
              <div className="text-eyebrow mb-6">{t("resultsLabel")}</div>
              <div className="grid grid-cols-3 gap-6 lg:gap-10">
                {project.results.map((r, i) => (
                  <div key={i}>
                    <div className="font-serif text-[clamp(2rem,5vw,3.5rem)] font-normal tracking-tight leading-none text-[var(--accent)]">
                      {r.value}
                    </div>
                    <div className="mt-3 text-[0.875rem] text-[var(--text-dim)]">
                      {r.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* STORY / CHALLENGE / SOLUTION */}
      <section className="px-6 lg:px-10 py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] space-y-20 lg:space-y-32">
          {project.story && (
            <StoryBlock label="Le contexte" body={project.story} />
          )}
          {project.challenge && (
            <StoryBlock label={t("challengeLabel")} body={project.challenge} />
          )}
          {project.solution && (
            <StoryBlock label={t("solutionLabel")} body={project.solution} />
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 lg:px-10 py-24 lg:py-32 border-t border-[var(--stroke)]">
        <div className="mx-auto max-w-[1400px] text-center">
          <h2 className="font-serif text-h1 font-normal tracking-tight">
            Lancer un projet similaire ?
          </h2>
          <div className="mt-10 inline-flex">
            <Link
              href="/start"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[var(--accent)] text-[var(--accent-ink)] font-medium hover:bg-[var(--accent-hover)] transition-colors"
            >
              Démarrer un projet
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7M9 7h8v8" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function StoryBlock({ label, body }: { label: string; body: string }) {
  return (
    <div className="grid-12 gap-y-6 border-t border-[var(--stroke)] pt-10 lg:pt-16">
      <div className="col-span-12 lg:col-span-3">
        <div className="text-eyebrow">{label}</div>
      </div>
      <div className="col-span-12 lg:col-span-8 lg:col-start-5">
        <p className="font-serif text-[1.5rem] lg:text-[1.875rem] font-normal leading-[1.35] tracking-tight text-[var(--text)]">
          {body}
        </p>
      </div>
    </div>
  );
}
