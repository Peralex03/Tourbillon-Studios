export interface Project {
  slug: string;
  client: string;
  title: string;
  excerpt: string;
  year: string;
  category: "vitrine" | "ecommerce" | "webapp" | "branding";
  services: string[];
  liveUrl?: string;
  /** Inline CSS gradient string (avoids Tailwind JIT issues with dynamic classes). */
  cover: string;
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
      "Site vitrine éditorial pour une conciergerie haut de gamme. Refonte complète avec design éditorial et système de réservation intégré.",
    year: "2025",
    category: "vitrine",
    services: ["Design", "Développement", "SEO"],
    liveUrl: "https://yourswissconcierge.ch",
    cover:
      "linear-gradient(135deg, #1A1614 0%, #2B2622 45%, #1F3A2E 100%)",
    results: [
      { label: "Conversion", value: "+42%" },
      { label: "Vitesse", value: "1.2s" },
      { label: "Score Lighthouse", value: "98" },
    ],
    story:
      "Une conciergerie genevoise positionnée premium disposait d'un site daté ne reflétant pas la qualité de service. L'objectif : un site inspirant confiance dès l'accueil et convertissant en demandes qualifiées.",
    challenge:
      "Le marché de la conciergerie de luxe est saturé d'agences génériques. Le site devait s'adresser immédiatement à une clientèle expatriée à haut revenu sans tomber dans les codes attendus.",
    solution:
      "Direction artistique éditoriale sobre, typographie serif moderne, mise en avant des histoires clients réelles plutôt que d'images stock. Formulaire de contact qualifiant en trois étapes.",
  },
  {
    slug: "aspaklaria-collection",
    client: "Aspaklaria Collection",
    title: "E-commerce mode contemporaine",
    excerpt:
      "Plateforme e-commerce sur mesure pour une marque de mode féminine. Catalogue, paiements internationaux, gestion multilingue.",
    year: "2024",
    category: "ecommerce",
    services: ["E-commerce", "Branding", "Multilingue"],
    cover:
      "linear-gradient(135deg, #2B1518 0%, #1A1614 50%, #3A2E14 100%)",
    results: [
      { label: "Panier moyen", value: "+28%" },
      { label: "Conversion mobile", value: "3.8%" },
      { label: "Pays livrés", value: "12" },
    ],
    story:
      "Une marque de mode lancée par deux sœurs cherchait une boutique en ligne capable d'exprimer leur direction artistique sans reproduire les codes des plateformes Shopify standard.",
    challenge:
      "Préserver l'âme éditoriale d'un magazine tout en assurant une expérience d'achat fluide. Gérer plusieurs devises et une logistique internationale.",
    solution:
      "E-commerce headless avec Stripe, design en grille asymétrique, transitions cinématiques entre produits. Multilingue natif FR/EN/HE.",
  },
  {
    slug: "late-night-milan",
    client: "Late Night Milan",
    title: "Restaurant et événementiel",
    excerpt:
      "Site vitrine immersif pour un restaurant événementiel à Milan. Réservations, programmation, espace presse.",
    year: "2025",
    category: "vitrine",
    services: ["Design", "Développement", "Booking"],
    cover:
      "linear-gradient(135deg, #1F1530 0%, #1A1614 50%, #3A2914 100%)",
    results: [
      { label: "Réservations", value: "+67%" },
      { label: "Trafic organique", value: "+120%" },
      { label: "Durée moyenne", value: "2:14" },
    ],
    story:
      "Un restaurant italien à concept hybride (gastronomie et soirées DJ) avait besoin d'un site reflétant l'ambiance plutôt qu'un menu PDF.",
    challenge:
      "Capturer une atmosphère nocturne et émotionnelle sans tomber dans le gimmick. Intégrer un système de réservation propre.",
    solution:
      "Hero vidéo plein écran, palette nocturne saturée, intégration TheFork, calendrier d'événements navigable. Site rapide malgré les médias riches.",
  },
];

export function getAllProjects(): Project[] {
  return PROJECTS;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
