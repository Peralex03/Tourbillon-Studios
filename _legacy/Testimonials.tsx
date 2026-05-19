import { getTranslations } from "next-intl/server";
import FadeIn from "./FadeIn";

const testimonialKeys = ["t1", "t2", "t3"] as const;
const testimonialMeta = [
  { initials: "ML", color: "bg-violet-100 text-violet-700" },
  { initials: "SC", color: "bg-indigo-100 text-indigo-700" },
  { initials: "RA", color: "bg-purple-100 text-purple-700" },
];

export default async function Testimonials() {
  const t = await getTranslations("testimonials");

  return (
    <section
      id="testimonials"
      className="py-28 px-6 bg-gray-50/70 relative overflow-hidden"
    >
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-violet-100/50 blur-[100px] -z-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <FadeIn className="text-center mb-16">
          <span className="text-sm font-medium text-violet-600 uppercase tracking-widest">
            {t("label")}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mt-3">
            {t("heading")}
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonialKeys.map((key, i) => (
            <FadeIn key={key} delay={i * 0.1}>
              <div className="bg-white/70 backdrop-blur-sm border border-gray-200/60 rounded-2xl p-7 flex flex-col gap-5 hover:shadow-lg hover:shadow-gray-200/60 transition-shadow duration-300">
                <p className="text-gray-600 leading-relaxed text-[15px] flex-1">
                  &ldquo;{t(`${key}.quote`)}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm ${testimonialMeta[i].color}`}
                  >
                    {testimonialMeta[i].initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{t(`${key}.name`)}</p>
                    <p className="text-xs text-gray-400">{t(`${key}.company`)}</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
