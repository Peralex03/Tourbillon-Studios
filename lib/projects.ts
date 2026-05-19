export interface Project {
  slug: string;
  client: string;
  title: string;
  excerpt: string;
  year: string;
  category: "vitrine" | "ecommerce" | "webapp" | "branding";
  services: string[];
  liveUrl?: string;
  cover: string; // Tailwind gradient classes for now
  results?: { label: string; value: string }[];
  story?: string;
  challenge?: string;
  solution?: string;
}

export const PROJECTS: Project[] = [
  {
    slug: "your-swiss-concierge",
    client: "Your Swiss Concierge",
    title: "Conciergerie de luxe à Genève",
    excerpt:
      "Site vitrine éditorial pour une conciergerie haut de gamme — refonte complète avec design éditorial et booking intégré.",
    year: "2025",
    category: "vitrine",
    services: ["Design", "Développement", "SEO"],
    liveUrl: "https://yourswissconcierge.ch",
    cover: "from-zinc-900 via-zinc-800 to-emerald-950",
    results: [
      { label: "Conversion ↑", value: "+42%" },
      { label: "Vitesse", value: "1.2s" },
      { label: "Score Lighthouse", value: "98" },
    ],
    story:
      "Une conciergerie genevoise positionnée premium avait un site daté qui ne reflétait pas la qualité de service. L'objectif : un site qui inspire confiance dès la home, et qui convertit en demandes qualifiées.",
    challenge:
      "Le marché de la conciergerie de luxe est saturé d'agences génériques. Il fallait que le site parle immédiatement à une clientèle expatriée à haut revenu sans tomber dans le cliché 'or et marbre'.",
    solution:
      "Direction art éditorial sobre, typographie serif moderne, focus sur les histoires clients réelles plutôt que sur des images stock. Formulaire de contact qualifiant en 3 étapes.",
  },
  {
    slug: "aspaklaria-collection",
    client: "Aspaklaria Collection",
    title: "E-commerce mode contemporaine",
    excerpt:
      "Plateforme e-commerce sur mesure pour une marque de mode féminine — catalogue, paiements, multilingue.",
    year: "2024",
    category: "ecommerce",
    services: ["E-commerce", "Branding", "Multilingue"],
    cover: "from-rose-950 via-zinc-900 to-amber-950",
    results: [
      { label: "Panier moyen ↑", value: "+28%" },
      { label: "Conversion mobile", value: "3.8%" },
      { label: "Pays livrés", value: "12" },
    ],
    story:
      "Une marque de mode lancée par deux soeurs cherchait une boutique en ligne qui exprime leur direction artistique sans copier les plateformes Shopify lambda.",
    challenge:
      "Garder l'âme éditoriale d'un magazine tout en assurant une expérience d'achat fluide. Gérer plusieurs devises et une logistique internationale.",
    solution:
      "E-commerce headless avec Stripe, design grid asymétrique, transitions cinématiques entre produits. Multilingue natif FR/EN/HE.",
  },
  {
    slug: "late-night-milan",
    client: "Late Night Milan",
    title: "Restaurant & événementiel",
    excerpt:
      "Site vitrine immersif pour un restaurant événementiel — réservations, programmation, presse.",
    year: "2025",
    category: "vitrine",
    services: ["Design", "Développement", "Booking"],
    cover: "from-violet-950 via-zinc-900 to-amber-900",
    results: [
      { label: "Réservations ↑", value: "+67%" },
      { label: "Trafic organique", value: "+120%" },
      { label: "Durée moyenne", value: "2:14" },
    ],
    story:
      "Un restaurant italien à concept hybride (gastro + DJ sets) avait besoin d'un site qui reflète l'ambiance plutôt que de juste afficher un menu PDF.",
    challenge:
      "Capturer une atmosphère nocturne et émotionnelle sans tomber dans le gimmick. Intégrer un système de réservation propre.",
    solution:
      "Hero vidéo full-screen, palette nocturne saturée, intégration TheFork, calendrier d'événements scrollable. Site rapide malgré les médias riches.",
  },
];

export function getAllProjects(): Project[] {
  return PROJECTS;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
