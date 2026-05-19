import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function SiteFooter() {
  const t = await getTranslations("footer");
  const tNav = await getTranslations("nav");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--stroke)] bg-[var(--bg)] mt-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-16 lg:py-24">
        {/* Top — giant wordmark */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 mb-16 lg:mb-24">
          <div className="flex-1">
            <Link
              href="/"
              className="font-serif font-light text-[clamp(3rem,8vw,7rem)] leading-none tracking-tight text-[var(--text)] hover:text-[var(--accent)] transition-colors inline-block"
            >
              Tourbillon<span className="text-[var(--accent)]">.</span>
            </Link>
            <p className="mt-6 text-[var(--text-dim)] max-w-md text-[1.0625rem] leading-relaxed">
              {t("tagline")}
            </p>
          </div>

          {/* Column links */}
          <div className="grid grid-cols-2 gap-10 lg:gap-16 self-start">
            <div>
              <div className="text-eyebrow mb-5">{t("explore")}</div>
              <ul className="space-y-3 text-[0.95rem]">
                <li><Link href="/about" className="text-[var(--text)] hover:text-[var(--accent)] transition-colors">{tNav("about")}</Link></li>
                <li><Link href="/process" className="text-[var(--text)] hover:text-[var(--accent)] transition-colors">{tNav("process")}</Link></li>
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
                <li className="text-[var(--text-dim)]">Genève</li>
                <li className="text-[var(--text-dim)]">Lausanne</li>
                <li className="text-[var(--text-dim)]">Zürich</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 border-t border-[var(--stroke)] flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <p className="font-mono text-[0.6875rem] uppercase tracking-wider text-[var(--text-faint)]">
            © {year} Tourbillon Studios — {t("rights")}
          </p>
          <div className="flex items-center gap-2 text-[0.6875rem] font-mono uppercase tracking-wider text-[var(--text-faint)]">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
            {t("status")}
          </div>
        </div>
      </div>
    </footer>
  );
}
