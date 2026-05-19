import { getTranslations } from "next-intl/server";
import QuizClient from "./QuizClient";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
    title: `Lancer un projet · Tourbillon Studios`,
    description:
      "Quatre questions pour cadrer votre projet. Réponse sous 24h ouvrées.",
    robots: { index: true, follow: true },
    other: { locale },
  };
}

export default async function StartPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <QuizClient locale={locale} />;
}
