import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import StudioStatus from "./StudioStatus";

export default async function SiteFooter() {
  const t = await getTranslations("footer");
  const tNav = await getTranslations("nav");
  const tCities = await getTranslations("common.cities");
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-[var(--stroke)] mt-24">
      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10 py-16 lg:py-20">
        {/* Top · giant wordmark */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 mb-12 lg:mb-16">
          <div className="flex-1">
            <Link
              href="/"
              className="text-[clamp(1.5rem,2.5vw,2rem)] font-medium tracking-tight text-[var(--text)] hover:text-[var(--accent)] transition-colors inline-block"
            >
              Tourbillon<span className="text-[var(--accent)]">.</span>
            </Link>
            <p className="mt-4 text-[var(--text-dim)] max-w-md text-[0.9375rem] leading-relaxed">
              {t("tagline")}
            </p>
          </div>

          {/* Column links */}
          <div className="grid grid-cols-2 gap-10 lg:gap-16 self-start">
            <div>
              <div className="text-eyebrow mb-5">{t("explore")}</div>
              <ul className="space-y-3 text-[0.95rem]">
                <li><Link href="/about" className="text-[var(--text)] hover:text-[var(--accent)] transition-colors">{tNav("about")}</Link></li>
                <li><Link href="/services" className="text-[var(--text)] hover:text-[var(--accent)] transition-colors">{tNav("services")}</Link></li>
                <li><Link href="/pricing" className="text-[var(--text)] hover:text-[var(--accent)] transition-colors">{tNav("pricing")}</Link></li>
                <li><Link href="/blog" className="text-[var(--text)] hover:text-[var(--accent)] transition-colors">{tNav("blog")}</Link></li>
                <li><Link href="/contact" className="text-[var(--text)] hover:text-[var(--accent)] transition-colors">{tNav("contact")}</Link></li>
              </ul>
            </div>

            <div>
              <div className="text-eyebrow mb-5">{t("contact")}</div>
              <ul className="space-y-3 text-[0.95rem]">
                <li>
                  <a href="mailto:contact@tourbillonstudios.ch" className="text-[var(--text)] hover:text-[var(--accent)] transition-colors">
                    contact@tourbillonstudios.ch
                  </a>
                </li>
                <li className="text-[var(--text-dim)]">{tCities("geneva")}</li>
                <li className="text-[var(--text-dim)]">{tCities("lausanne")}</li>
                <li className="text-[var(--text-dim)]">{tCities("zurich")}</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 border-t border-[var(--stroke)] flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <p className="font-mono text-[0.6875rem] uppercase tracking-wider text-[var(--text-faint)]">
              © {year} Tourbillon Studios · {t("rights")}
            </p>
            <Link
              href="/privacy"
              className="font-mono text-[0.6875rem] uppercase tracking-wider text-[var(--text-faint)] hover:text-[var(--accent)] transition-colors"
            >
              {t("privacy")}
            </Link>
          </div>
          <StudioStatus />
        </div>
      </div>
    </footer>
  );
}
