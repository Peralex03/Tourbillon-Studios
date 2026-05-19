import { getTranslations } from "next-intl/server";
import FadeIn from "./FadeIn";

const serviceKeys = ["vitrine", "webapp", "ecommerce", "photo"] as const;
const serviceIcons = ["◻", "⬡", "◈", "◎"];
const serviceTags = [
  ["Next.js", "Tailwind", "SEO"],
  ["React", "Node.js", "Supabase"],
  ["Shopify", "Next.js", "Stripe"],
  ["Product", "Corporate", "Events"],
];

export default async function Services() {
  const t = await getTranslations("services");

  return (
    <section id="services" className="py-28 px-6 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-violet-50/80 blur-[120px] -z-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <FadeIn className="text-center mb-16">
          <span className="text-sm font-medium text-violet-600 uppercase tracking-widest">
            {t("label")}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mt-3">
            {t("heading")}
          </h2>
          <p className="text-gray-500 mt-4 max-w-xl mx-auto text-lg">
            {t("subtitle")}
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {serviceKeys.map((key, i) => (
            <FadeIn key={key} delay={i * 0.1}>
              <div className="group relative bg-white/60 backdrop-blur-md border border-gray-200/70 rounded-2xl p-8 hover:border-violet-300/70 hover:shadow-xl hover:shadow-violet-100/40 transition-all duration-300 cursor-default">
                <span className="text-2xl text-violet-400 mb-5 block">{serviceIcons[i]}</span>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{t(`${key}.title`)}</h3>
                <p className="text-gray-500 leading-relaxed mb-5">{t(`${key}.description`)}</p>
                <div className="flex flex-wrap gap-2">
                  {serviceTags[i].map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium text-violet-600 bg-violet-50 border border-violet-100 px-2.5 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
