import type { Metadata } from "next";
import { Inter, Geist_Mono, Instrument_Serif } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
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

const SITE_DESCRIPTION =
  "Studio digital suisse. Conception et développement de sites web professionnels, en abonnement mensuel, sans frais d'installation. Genève · Lausanne · Zürich.";

export const metadata: Metadata = {
  title: "Tourbillon Studios · Sites web professionnels, en abonnement",
  description: SITE_DESCRIPTION,
  metadataBase: new URL("https://tourbillonstudios.ch"),
  openGraph: {
    type: "website",
    siteName: "Tourbillon Studios",
    locale: "fr_CH",
    url: "https://tourbillonstudios.ch",
    title: "Tourbillon Studios · Sites web professionnels, en abonnement",
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Tourbillon Studios · Sites web professionnels",
    description: SITE_DESCRIPTION,
  },
};

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
