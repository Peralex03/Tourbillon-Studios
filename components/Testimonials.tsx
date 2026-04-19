import FadeIn from "./FadeIn";

const testimonials = [
  {
    initials: "ML",
    name: "Marc Lecomte",
    company: "Lecomte Architectes, Lausanne",
    quote:
      "Tourbillon Studios a transformé notre présence en ligne. Notre site vitrine génère maintenant des demandes de devis chaque semaine. Travail soigné, délais respectés.",
    color: "bg-violet-100 text-violet-700",
    delay: 0,
  },
  {
    initials: "SC",
    name: "Sophie Charron",
    company: "Maison Charron · Boutique en ligne",
    quote:
      "Notre boutique e-commerce a vu son taux de conversion tripler en trois mois. L'équipe comprend vraiment les enjeux business, pas seulement le design.",
    color: "bg-indigo-100 text-indigo-700",
    delay: 0.1,
  },
  {
    initials: "RA",
    name: "Romain Auriol",
    company: "AurTech SaaS, Genève",
    quote:
      "La web app livrée dépasse toutes nos attentes — interface fluide, code propre, et un accompagnement photo qui a vraiment professionnalisé notre image.",
    color: "bg-purple-100 text-purple-700",
    delay: 0.2,
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-28 px-6 bg-gray-50/70 relative overflow-hidden"
    >
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-violet-100/50 blur-[100px] -z-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <FadeIn className="text-center mb-16">
          <span className="text-sm font-medium text-violet-600 uppercase tracking-widest">
            Ce qu&apos;ils disent
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mt-3">
            Témoignages
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <FadeIn key={t.name} delay={t.delay}>
              <div className="bg-white/70 backdrop-blur-sm border border-gray-200/60 rounded-2xl p-7 flex flex-col gap-5 hover:shadow-lg hover:shadow-gray-200/60 transition-shadow duration-300">
                <p className="text-gray-600 leading-relaxed text-[15px] flex-1">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm ${t.color}`}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.company}</p>
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
