"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname, Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  // pathname from next-intl is locale-stripped, so "/" = home, "/blog" = blog list
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function switchLocale(next: string) {
    router.replace(pathname, { locale: next });
  }

  // Smart anchor: on home → in-page anchor; elsewhere → navigate to home with hash
  function AnchorLink({
    hash,
    children,
    className,
  }: {
    hash: string;
    children: React.ReactNode;
    className?: string;
  }) {
    if (isHome) {
      return (
        <a href={`#${hash}`} className={className}>
          {children}
        </a>
      );
    }
    return (
      <Link href={`/#${hash}`} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/70 backdrop-blur-lg border-b border-gray-200/60 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-gray-900 shrink-0"
        >
          Tourbillon<span className="text-violet-600">.</span>
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm text-gray-600">
          <AnchorLink hash="services" className="hover:text-gray-900 transition-colors">
            {t("services")}
          </AnchorLink>
          <AnchorLink hash="testimonials" className="hover:text-gray-900 transition-colors">
            {t("testimonials")}
          </AnchorLink>
          <Link href="/blog" className="hover:text-gray-900 transition-colors">
            {t("blog")}
          </Link>
          <AnchorLink hash="contact" className="hover:text-gray-900 transition-colors">
            {t("contact")}
          </AnchorLink>
        </div>

        <div className="flex items-center gap-3 ml-auto">
          {/* Language switcher */}
          <div className="hidden sm:flex items-center gap-0.5 bg-gray-100/80 rounded-lg p-0.5">
            {routing.locales.map((loc) => (
              <button
                key={loc}
                onClick={() => switchLocale(loc)}
                className={`text-xs font-semibold px-2.5 py-1.5 rounded-md transition-all duration-150 ${
                  locale === loc
                    ? "bg-white text-violet-600 shadow-sm"
                    : "text-gray-400 hover:text-gray-700"
                }`}
              >
                {loc.toUpperCase()}
              </button>
            ))}
          </div>

          <AnchorLink
            hash="contact"
            className="text-sm font-medium bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-violet-600 transition-colors duration-200 shrink-0"
          >
            {t("cta")}
          </AnchorLink>
        </div>
      </nav>
    </header>
  );
}
