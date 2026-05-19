import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getAllProjects } from "@/lib/projects";

export const metadata = {
  robots: { index: false, follow: false }, // Hidden from search
};

export default async function WorkPage() {
  const t = await getTranslations("work");
  const projects = getAllProjects();

  return (
    <>
      {/* HERO */}
      <section className="px-6 lg:px-10 pt-32 lg:pt-40 pb-20 border-b border-[var(--stroke)]">
        <div className="mx-auto max-w-[1400px]">
          <div className="text-eyebrow mb-8">{t("eyebrow")}</div>
          <h1 className="text-h1 tracking-tight max-w-5xl">
            <span>{t("heroLine")}</span>
          </h1>
          <p className="mt-10 text-[1.0625rem] lg:text-[1.125rem] text-[var(--text-dim)] max-w-2xl">
            {t("heroSubtitle")}
          </p>
        </div>
      </section>

      {/* BENTO GRID */}
      <section className="px-6 lg:px-10 py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
            {projects.map((project, i) => {
              const layouts = [
                "md:col-span-4", // 1st large
                "md:col-span-2", // 2nd small
                "md:col-span-3", // 3rd medium
                "md:col-span-3",
                "md:col-span-2",
                "md:col-span-4",
              ];
              const ratios = [
                "aspect-[16/10]",
                "aspect-[3/4]",
                "aspect-[4/3]",
                "aspect-[4/3]",
                "aspect-[3/4]",
                "aspect-[16/10]",
              ];
              const layout = layouts[i % layouts.length];
              const ratio = ratios[i % ratios.length];

              return (
                <Link
                  key={project.slug}
                  href={`/work/${project.slug}`}
                  className={`group block ${layout}`}
                >
                  <div
                    className={`relative w-full ${ratio} overflow-hidden rounded-lg`}
                    style={{ background: project.cover }}
                  >
                    <div className="absolute inset-0 p-6 lg:p-8 flex flex-col justify-between">
                      <div className="font-mono text-[0.6875rem] uppercase tracking-wider text-white/70">
                        {project.year} · {project.category}
                      </div>
                      <div>
                        <h2 className="text-[1.5rem] lg:text-[2rem] font-medium text-white tracking-tight leading-tight">
                          {project.client}
                        </h2>
                        <p className="mt-2 text-white/70 text-[0.875rem] line-clamp-2 max-w-md">
                          {project.excerpt}
                        </p>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors" />
                    {/* Bottom right arrow on hover */}
                    <div className="absolute bottom-6 right-6 lg:bottom-8 lg:right-8 w-10 h-10 rounded-full bg-white/0 group-hover:bg-[var(--accent)] flex items-center justify-center transition-all">
                      <span className="text-[var(--accent-ink)] opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M7 17L17 7M9 7h8v8" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
