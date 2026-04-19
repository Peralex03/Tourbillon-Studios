import FadeIn from "./FadeIn";

const services = [
  {
    icon: "◻",
    title: "Site Vitrine",
    description:
      "Une présence web impactante qui reflète votre identité et transforme les visiteurs en clients.",
    tags: ["Next.js", "Tailwind", "SEO"],
    delay: 0,
  },
  {
    icon: "⬡",
    title: "Web App",
    description:
      "Des applications métier sur mesure, performantes et évolutives, adaptées à vos processus.",
    tags: ["React", "Node.js", "Supabase"],
    delay: 0.1,
  },
  {
    icon: "◈",
    title: "E-Commerce",
    description:
      "Boutiques en ligne optimisées pour la conversion, avec gestion de stock et paiement intégrés.",
    tags: ["Shopify", "Next.js", "Stripe"],
    delay: 0.2,
  },
  {
    icon: "◎",
    title: "Photographie",
    description:
      "Shootings produit, corporate et événementiel pour des visuels qui font la différence.",
    tags: ["Produit", "Corporate", "Événementiel"],
    delay: 0.3,
  },
];

export default function Services() {
  return (
    <section id="services" className="py-28 px-6 bg-white relative overflow-hidden">
      {/* Subtle background blob */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-violet-50/80 blur-[120px] -z-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <FadeIn className="text-center mb-16">
          <span className="text-sm font-medium text-violet-600 uppercase tracking-widest">
            Ce que nous faisons
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mt-3">
            Nos services
          </h2>
          <p className="text-gray-500 mt-4 max-w-xl mx-auto text-lg">
            De la conception à la mise en ligne, nous gérons chaque détail
            pour vous délivrer un produit irréprochable.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((s) => (
            <FadeIn key={s.title} delay={s.delay}>
              <div className="group relative bg-white/60 backdrop-blur-md border border-gray-200/70 rounded-2xl p-8 hover:border-violet-300/70 hover:shadow-xl hover:shadow-violet-100/40 transition-all duration-300 cursor-default">
                <span className="text-2xl text-violet-400 mb-5 block">{s.icon}</span>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-gray-500 leading-relaxed mb-5">{s.description}</p>
                <div className="flex flex-wrap gap-2">
                  {s.tags.map((tag) => (
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
