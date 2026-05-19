import { getTranslations } from "next-intl/server";
import RevealText from "@/components/RevealText";
import ContactForm from "./ContactForm";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return {
    title: `Contact · Tourbillon Studios`,
    description: t("heroSubtitle"),
  };
}

export default async function ContactPage() {
  const t = await getTranslations("contact");

  return (
    <>
      {/* HERO */}
      <section className="px-6 lg:px-10 pt-32 lg:pt-40 pb-16 border-b border-[var(--stroke)]">
        <div className="mx-auto max-w-[1400px]">
          <div className="text-eyebrow mb-8">{t("eyebrow")}</div>
          <h1 className="text-h1 lg:text-display tracking-tight max-w-5xl">
            <RevealText as="span" splitBy="word">{t("heroLine")}</RevealText>
          </h1>
          <RevealText
            as="p"
            className="mt-10 text-[1.0625rem] lg:text-[1.125rem] text-[var(--text-dim)] max-w-2xl leading-relaxed"
            splitBy="word"
            delay={0.3}
            stagger={0.012}
          >
            {t("heroSubtitle")}
          </RevealText>
        </div>
      </section>

      {/* FORM + COORDS */}
      <section className="px-6 lg:px-10 py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] grid-12 gap-y-16">
          {/* Form */}
          <div className="col-span-12 lg:col-span-7">
            <ContactForm
              labels={{
                name: t("name"),
                namePlaceholder: t("namePlaceholder"),
                email: t("email"),
                emailPlaceholder: t("emailPlaceholder"),
                company: t("company"),
                companyPlaceholder: t("companyPlaceholder"),
                projectType: t("projectType"),
                projectTypeOptions: {
                  vitrine: t("projectTypeOptions.vitrine"),
                  ecommerce: t("projectTypeOptions.ecommerce"),
                  webapp: t("projectTypeOptions.webapp"),
                  refonte: t("projectTypeOptions.refonte"),
                  other: t("projectTypeOptions.other"),
                },
                budget: t("budget"),
                budgetOptions: {
                  starter: t("budgetOptions.starter"),
                  pro: t("budgetOptions.pro"),
                  custom: t("budgetOptions.custom"),
                  explore: t("budgetOptions.explore"),
                },
                deadline: t("deadline"),
                deadlineOptions: {
                  asap: t("deadlineOptions.asap"),
                  month: t("deadlineOptions.month"),
                  quarter: t("deadlineOptions.quarter"),
                  flexible: t("deadlineOptions.flexible"),
                },
                message: t("message"),
                messagePlaceholder: t("messagePlaceholder"),
                submit: t("submit"),
                submitSending: t("submitSending"),
                responseTime: t("responseTime"),
                successTitle: t("successTitle"),
                successText: t("successText"),
              }}
            />
          </div>

          {/* Coords */}
          <aside className="col-span-12 lg:col-span-4 lg:col-start-9 space-y-10 lg:pl-8 lg:border-l lg:border-[var(--stroke)]">
            <div>
              <div className="text-eyebrow mb-3">{t("directEmail")}</div>
              <a
                href="mailto:contact@tourbillonstudios.ch"
                className="text-[1.25rem] lg:text-[1.5rem] font-medium hover:text-[var(--accent)] transition-colors"
              >
                contact@tourbillonstudios.ch
              </a>
            </div>

            <div>
              <div className="text-eyebrow mb-3">{t("presence")}</div>
              <ul className="space-y-1 text-[1.125rem] font-medium text-[var(--text)]">
                <li>Genève</li>
                <li>Lausanne</li>
                <li>Zürich</li>
              </ul>
            </div>

            <div>
              <div className="text-eyebrow mb-3">{t("availability")}</div>
              <div className="flex items-center gap-2 text-[var(--text)]">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
                <span className="text-[0.95rem]">{t("responseTime")}</span>
              </div>
            </div>

            <div>
              <div className="text-eyebrow mb-3">{t("telegramLabel")}</div>
              <a
                href="https://t.me/TourbillonStudiosBot"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[0.95rem] text-[var(--text-dim)] hover:text-[var(--accent)] transition-colors"
              >
                @TourbillonStudiosBot
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M7 17L17 7M9 7h8v8" />
                </svg>
              </a>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
