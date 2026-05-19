"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname, Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import ThemeToggle from "./ThemeToggle";

const NAV_ITEMS = [
  { key: "about", href: "/about" },
  { key: "process", href: "/process" },
  { key: "pricing", href: "/pricing" },
  { key: "blog", href: "/blog" },
] as const;

export default function SiteHeader() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  function switchLocale(next: string) {
    router.replace(pathname, { locale: next });
  }

  return (
    <header
      className={[
        "fixed top-0 inset-x-0 z-50 transition-[backdrop-filter,background,border-color] duration-300",
        scrolled
          ? "glass-strong border-b border-[var(--stroke)]"
          : "glass-subtle border-b border-transparent",
      ].join(" ")}
    >
      <nav className="mx-auto max-w-[1400px] px-6 lg:px-10 h-16 lg:h-20 flex items-center gap-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-[1.0625rem] font-medium tracking-tight text-[var(--text)] hover:text-[var(--accent)] transition-colors shrink-0"
          aria-label="Tourbillon Studios"
        >
          Tourbillon<span className="text-[var(--accent)]">.</span>
        </Link>

        {/* Desktop nav · center */}
        <div className="hidden md:flex items-center gap-8 mx-auto text-[0.875rem]">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.key}
                href={item.href}
                className={[
                  "relative py-2 transition-colors",
                  isActive
                    ? "text-[var(--text)]"
                    : "text-[var(--text-dim)] hover:text-[var(--text)]",
                ].join(" ")}
              >
                <span>{t(item.key)}</span>
                {isActive && (
                  <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-[var(--accent)]" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right cluster */}
        <div className="flex items-center gap-2 ml-auto">
          {/* Locale switcher */}
          <div className="hidden sm:flex items-center gap-px bg-[var(--surface-1)] border border-[var(--stroke)] rounded-full p-0.5">
            {routing.locales.map((loc) => (
              <button
                key={loc}
                onClick={() => switchLocale(loc)}
                className={[
                  "font-mono text-[0.6875rem] tracking-wider uppercase px-2 py-1 rounded-full transition-colors",
                  locale === loc
                    ? "bg-[var(--accent)] text-[var(--accent-ink)]"
                    : "text-[var(--text-dim)] hover:text-[var(--text)]",
                ].join(" ")}
                aria-label={`Switch to ${loc}`}
              >
                {loc}
              </button>
            ))}
          </div>

          <ThemeToggle />

          {/* Direct call · opens Calendly in new tab */}
          <a
            href="https://cal.com/tourbillon-studios/15min"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-flex items-center gap-2 ml-1 w-9 h-9 rounded-full glass-subtle hover:border-[var(--accent)] text-[var(--text)] hover:text-[var(--accent)] transition-colors items-center justify-center"
            aria-label="Réserver un appel"
            title="Réserver un appel"
          >
            <PhoneIcon />
          </a>

          {/* Start CTA · goes to interactive quiz */}
          <Link
            href="/start"
            className="hidden sm:inline-flex items-center gap-2 ml-1 px-4 py-2 rounded-full bg-[var(--accent)] text-[var(--accent-ink)] text-[0.875rem] font-medium hover:bg-[var(--accent-hover)] transition-colors"
          >
            {t("cta")}
            <ArrowIcon />
          </Link>

          {/* Mobile menu trigger */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden w-9 h-9 rounded-full border border-[var(--stroke)] flex items-center justify-center"
            aria-label="Menu"
            aria-expanded={open}
          >
            <MenuIcon open={open} />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden border-t border-[var(--stroke)] bg-[var(--bg)]/95 backdrop-blur-xl">
          <div className="px-6 py-6 flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="py-3 text-h4 text-[var(--text)] border-b border-[var(--stroke)]"
              >
                {t(item.key)}
              </Link>
            ))}
            <Link
              href="/start"
              className="mt-4 inline-flex items-center justify-between px-5 py-4 rounded-full bg-[var(--accent)] text-[var(--accent-ink)] font-medium"
            >
              {t("cta")} <ArrowIcon />
            </Link>
            <div className="mt-6 flex items-center gap-2">
              {routing.locales.map((loc) => (
                <button
                  key={loc}
                  onClick={() => switchLocale(loc)}
                  className={[
                    "font-mono text-xs uppercase tracking-wider px-3 py-2 rounded-full border",
                    locale === loc
                      ? "border-[var(--accent)] text-[var(--accent)]"
                      : "border-[var(--stroke)] text-[var(--text-dim)]",
                  ].join(" ")}
                >
                  {loc}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function ArrowIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7M9 7h8v8" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      {open ? (
        <>
          <path d="M5 5l14 14" />
          <path d="M19 5L5 19" />
        </>
      ) : (
        <>
          <path d="M3 7h18" />
          <path d="M3 17h18" />
        </>
      )}
    </svg>
  );
}
