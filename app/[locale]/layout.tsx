import type { Metadata } from "next";
import { Inter, Geist_Mono, Instrument_Serif } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { ThemeProvider } from "@/components/ThemeProvider";
import SmoothScroll from "@/components/SmoothScroll";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ScrollProgress from "@/components/ScrollProgress";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const OG_LOCALES: Record<string, string> = {
  fr: "fr_CH",
  de: "de_CH",
  it: "it_CH",
  en: "en_GB",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("siteTitle"),
    description: t("siteDescription"),
    metadataBase: new URL("https://tourbillonstudios.ch"),
    openGraph: {
      type: "website",
      siteName: "Tourbillon Studios",
      locale: OG_LOCALES[locale] ?? "fr_CH",
      url: `https://tourbillonstudios.ch/${locale}`,
      title: t("siteTitle"),
      description: t("siteDescription"),
    },
    twitter: {
      card: "summary_large_image",
      title: t("siteTitleShort"),
      description: t("siteDescription"),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full antialiased">
        <script
          type="application/ld+json"
          // Organization schema · static business facts, safe to inline
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Tourbillon Studios",
              url: "https://tourbillonstudios.ch",
              logo: "https://tourbillonstudios.ch/icon.png",
              email: "contact@tourbillonstudios.ch",
              description:
                "Studio digital suisse · sites web professionnels en abonnement mensuel, photo et vidéo de marque.",
              areaServed: ["Genève", "Lausanne", "Zürich", "Suisse"],
              sameAs: [],
            }),
          }}
        />
        <ThemeProvider>
          <NextIntlClientProvider messages={messages}>
            <SmoothScroll />
            <ScrollProgress />
            <SiteHeader />
            <main>{children}</main>
            <SiteFooter />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
