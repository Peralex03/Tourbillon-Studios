import { getTranslations } from "next-intl/server";
import FeaturedTopo from "@/components/FeaturedTopo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    robots: { index: true, follow: true },
  };
}

type Block = string | { list: string[] };
interface Section {
  title: string;
  body: Block[];
}

export default async function PrivacyPage() {
  const t = await getTranslations("privacy");
  const sections = t.raw("sections") as Section[];

  return (
    <>
      {/* HERO */}
      <section className="relative px-6 lg:px-10 pt-32 lg:pt-36 pb-14 border-b border-[var(--stroke)] overflow-hidden">
        <FeaturedTopo opacity={0.18} />
        <div className="relative mx-auto max-w-[900px]">
          <div className="text-eyebrow mb-6">{t("eyebrow")}</div>
          <h1 className="text-h1 tracking-tight">
            {t("headingStart")}{" "}
            <span className="accent-serif">{t("headingItalic")}</span>.
          </h1>
          <p className="mt-6 text-[1rem] lg:text-[1.0625rem] text-[var(--text-dim)] max-w-2xl leading-relaxed">
            {t("intro")}
          </p>
          <p className="mt-4 font-mono text-[0.6875rem] uppercase tracking-wider text-[var(--text-faint)]">
            {t("lastUpdate")} · {t("lastUpdateValue")}
          </p>
        </div>
      </section>

      {/* BODY */}
      <section className="px-6 lg:px-10 py-16 lg:py-24">
        <div className="mx-auto max-w-[760px] space-y-12">
          {sections.map((sec, i) => (
            <div key={i}>
              <h2 className="text-h3 tracking-tight text-[var(--text)] mb-4">
                {sec.title}
              </h2>
              <div className="space-y-4">
                {sec.body.map((block, j) =>
                  typeof block === "string" ? (
                    <p
                      key={j}
                      className="text-[1rem] text-[var(--text-dim)] leading-[1.75]"
                    >
                      {block}
                    </p>
                  ) : (
                    <ul key={j} className="space-y-2.5">
                      {block.list.map((item, k) => (
                        <li
                          key={k}
                          className="flex items-start gap-3 text-[1rem] text-[var(--text-dim)] leading-relaxed"
                        >
                          <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )
                )}
              </div>
            </div>
          ))}

          {/* Contact card */}
          <div className="glass rounded-lg p-8 lg:p-10">
            <h2 className="text-h3 tracking-tight text-[var(--text)] mb-3">
              {t("contactTitle")}
            </h2>
            <p className="text-[0.9375rem] text-[var(--text-dim)] leading-relaxed mb-5">
              {t("contactBody")}
            </p>
            <a
              href="mailto:contact@tourbillonstudios.ch"
              className="inline-flex items-center gap-2 text-[1rem] font-medium text-[var(--accent)] hover:underline"
            >
              contact@tourbillonstudios.ch
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
